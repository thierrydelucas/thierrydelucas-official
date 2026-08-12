export type YoutubeVideo = {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  durationLabel: string;
  publishedAt: string;
};

type YoutubeThumbnail = {
  url?: string;
};

type YoutubeThumbnails = {
  maxres?: YoutubeThumbnail;
  standard?: YoutubeThumbnail;
  high?: YoutubeThumbnail;
  medium?: YoutubeThumbnail;
  default?: YoutubeThumbnail;
};

type YoutubePlaylistItem = {
  snippet?: {
    title?: string;
    description?: string;
    thumbnails?: YoutubeThumbnails;
    resourceId?: {
      videoId?: string;
    };
  };
  contentDetails?: {
    videoId?: string;
    videoPublishedAt?: string;
  };
};

type YoutubePlaylistItemsResponse = {
  items?: YoutubePlaylistItem[];
  nextPageToken?: string;
  error?: {
    message?: string;
  };
};

type YoutubeVideoItem = {
  id?: string;
  contentDetails?: {
    duration?: string;
  };
};

type YoutubeVideosResponse = {
  items?: YoutubeVideoItem[];
  error?: {
    message?: string;
  };
};

export type GetYoutubePlaylistVideosResult = {
  videos: YoutubeVideo[];
  error: string | null;
};

const REVALIDATE_SECONDS = 60;
const PLAYLIST_PAGE_SIZE = 50;
const VIDEO_ID_CHUNK_SIZE = 50;
const SKIPPED_TITLES = new Set(["deleted video", "private video"]);

function formatIso8601Duration(isoDuration: string): string {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  if (!match) {
    return "0:00";
  }

  const hours = Number(match[1] ?? 0);
  const minutes = Number(match[2] ?? 0);
  const seconds = Number(match[3] ?? 0);
  const paddedSeconds = String(seconds).padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${paddedSeconds}`;
  }

  return `${minutes}:${paddedSeconds}`;
}

function resolveThumbnailUrl(
  thumbnails: YoutubeThumbnails | undefined,
  videoId: string,
): string {
  return (
    thumbnails?.maxres?.url ??
    thumbnails?.standard?.url ??
    thumbnails?.high?.url ??
    thumbnails?.medium?.url ??
    thumbnails?.default?.url ??
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
  );
}

function chunkIds(ids: string[], size: number): string[][] {
  const chunks: string[][] = [];

  for (let index = 0; index < ids.length; index += size) {
    chunks.push(ids.slice(index, index + size));
  }

  return chunks;
}

async function fetchYoutubeJson<T extends { error?: { message?: string } }>(
  url: URL,
): Promise<{ data: T | null; error: string | null }> {
  const response = await fetch(url.toString(), {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  const data = (await response.json()) as T;

  if (!response.ok) {
    return {
      data: null,
      error: data.error?.message ?? response.statusText,
    };
  }

  return { data, error: null };
}

async function fetchPlaylistItems(
  apiKey: string,
  playlistId: string,
): Promise<{ items: YoutubePlaylistItem[]; error: string | null }> {
  const items: YoutubePlaylistItem[] = [];
  let pageToken: string | undefined;

  do {
    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.searchParams.set("part", "snippet,contentDetails");
    url.searchParams.set("playlistId", playlistId);
    url.searchParams.set("maxResults", String(PLAYLIST_PAGE_SIZE));
    url.searchParams.set("key", apiKey);

    if (pageToken) {
      url.searchParams.set("pageToken", pageToken);
    }

    const { data, error } =
      await fetchYoutubeJson<YoutubePlaylistItemsResponse>(url);

    if (error || !data) {
      return { items: [], error: error ?? "Failed to load playlist" };
    }

    items.push(...(data.items ?? []));
    pageToken = data.nextPageToken;
  } while (pageToken);

  return { items, error: null };
}

async function fetchVideoDurations(
  apiKey: string,
  videoIds: string[],
): Promise<{ durations: Map<string, string>; error: string | null }> {
  const durations = new Map<string, string>();

  for (const ids of chunkIds(videoIds, VIDEO_ID_CHUNK_SIZE)) {
    const url = new URL("https://www.googleapis.com/youtube/v3/videos");
    url.searchParams.set("part", "contentDetails");
    url.searchParams.set("id", ids.join(","));
    url.searchParams.set("key", apiKey);

    const { data, error } = await fetchYoutubeJson<YoutubeVideosResponse>(url);

    if (error || !data) {
      return { durations, error: error ?? "Failed to load video details" };
    }

    for (const item of data.items ?? []) {
      if (!item.id || !item.contentDetails?.duration) {
        continue;
      }

      durations.set(item.id, formatIso8601Duration(item.contentDetails.duration));
    }
  }

  return { durations, error: null };
}

export async function getYoutubePlaylistVideos(): Promise<GetYoutubePlaylistVideosResult> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  const playlistId = process.env.YOUTUBE_PLAYLIST_ID;

  if (!apiKey || !playlistId) {
    return {
      videos: [],
      error: "YouTube is not configured",
    };
  }

  try {
    const { items, error: playlistError } = await fetchPlaylistItems(
      apiKey,
      playlistId,
    );

    if (playlistError) {
      return { videos: [], error: "Failed to load playlist videos" };
    }

    const pendingVideos = items.flatMap((item) => {
      const id = item.contentDetails?.videoId ?? item.snippet?.resourceId?.videoId;
      const title = item.snippet?.title?.trim();

      if (!id || !title || SKIPPED_TITLES.has(title.toLowerCase())) {
        return [];
      }

      return [
        {
          id,
          title,
          description: item.snippet?.description?.trim() ?? "",
          thumbnailUrl: resolveThumbnailUrl(item.snippet?.thumbnails, id),
          publishedAt: item.contentDetails?.videoPublishedAt ?? "",
        },
      ];
    });

    if (pendingVideos.length === 0) {
      return { videos: [], error: null };
    }

    const { durations, error: durationError } = await fetchVideoDurations(
      apiKey,
      pendingVideos.map((video) => video.id),
    );

    if (durationError) {
      return { videos: [], error: "Failed to load playlist videos" };
    }

    const videos = pendingVideos
      .flatMap((video) => {
        const durationLabel = durations.get(video.id);

        if (!durationLabel) {
          return [];
        }

        return [{ ...video, durationLabel }];
      })
      .sort((left, right) => {
        const leftTime = left.publishedAt ? Date.parse(left.publishedAt) : 0;
        const rightTime = right.publishedAt ? Date.parse(right.publishedAt) : 0;
        return rightTime - leftTime;
      });

    return { videos, error: null };
  } catch (error) {
    return {
      videos: [],
      error: "Failed to load playlist videos",
    };
  }
}
