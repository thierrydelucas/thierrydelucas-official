interface IIconData {
  id: number;
  icon: string;
  link: string;
  image: string;
}

export const ICON_DATA: IIconData[] = [
  {
    id: 1,
    icon: "facebook",
    link: "https://www.facebook.com/thierry.delucasneves",
    image: "/icons/icon-facebook.svg",
  },
  {
    id: 2,
    icon: "instagram",
    link: "https://www.instagram.com/thierrydelucas",
    image: "/icons/icon-instagram.svg",
  },
  {
    id: 3,
    icon: "spotify",
    link: "",
    image: "/icons/icon-spotify.svg",
  },
];
