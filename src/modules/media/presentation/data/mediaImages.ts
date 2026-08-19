import image1 from "@/public/images/image_1.png";
import image2 from "@/public/images/image_2.png";
import image6 from "@/public/images/image_6.jpg";
import image7 from "@/public/images/image_7.jpg";
import image8 from "@/public/images/image_8.jpg";
import image9 from "@/public/images/image_9.jpg";
import image10 from "@/public/images/image_10.jpg";
import image11 from "@/public/images/image_11.jpg";
import image14 from "@/public/images/image_14.jpg";
import image15 from "@/public/images/image_15.jpg";
import image19 from "@/public/images/image_19.jpg";
import image21 from "@/public/images/image_21.png";
import image22 from "@/public/images/image_22.jpg";
import type { StaticImageData } from "next/image";

export type MediaImage = {
  src: StaticImageData;
  alt: string;
};

export const MEDIA_IMAGES: MediaImage[] = [
  { src: image6, alt: "Thierry de Lucas, concert violinist, studio portrait" },
  { src: image21, alt: "Thierry de Lucas holding a violin" },
  { src: image2, alt: "Thierry de Lucas with violin, formal portrait" },
  { src: image22, alt: "Thierry de Lucas playing the violin" },
  { src: image1, alt: "Thierry de Lucas holding his violin" },
  { src: image8, alt: "Thierry de Lucas performing on stage" },
  { src: image14, alt: "Thierry de Lucas, close-up portrait" },
  { src: image9, alt: "Thierry de Lucas in concert" },
  { src: image7, alt: "Thierry de Lucas standing with violin" },
  { src: image10, alt: "Thierry de Lucas performing with orchestra" },
  { src: image15, alt: "Thierry de Lucas, portrait in concert attire" },
  { src: image11, alt: "Thierry de Lucas on stage with violin" },
  { src: image19, alt: "Thierry de Lucas, seated portrait" },
];
