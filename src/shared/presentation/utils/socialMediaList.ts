interface IIconData {
  id: number;
  icon: string;
  label: string;
  link: string;
  image: string;
}

export const ICON_DATA: IIconData[] = [
  {
    id: 1,
    icon: "facebook",
    label: "Thierry de Lucas on Facebook",
    link: "https://www.facebook.com/thierry.delucasneves",
    image: "/icons/icon-facebook.svg",
  },
  {
    id: 2,
    icon: "instagram",
    label: "Thierry de Lucas on Instagram",
    link: "https://www.instagram.com/thierrydelucas",
    image: "/icons/icon-instagram.svg",
  },
  {
    id: 3,
    icon: "spotify",
    label: "Thierry de Lucas on Spotify",
    link: "",
    image: "/icons/icon-spotify.svg",
  },
];
