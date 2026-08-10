import type { StaticImageData } from "next/image";
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
import image16 from "@/public/images/image_16.jpg";
import image17 from "@/public/images/image_17.jpg";
import image19 from "@/public/images/image_19.jpg";
import image20 from "@/public/images/image_20.jpg";
import image21 from "@/public/images/image_21.png";
import image22 from "@/public/images/image_22.jpg";
import image24 from "@/public/images/image_24.jpg";
import image25 from "@/public/images/image_25.jpg";

export type MediaImage = {
  src: StaticImageData;
  alt: string;
};

export const MEDIA_IMAGES: MediaImage[] = [
  { src: image6, alt: "Thierry de Lucas portrait" },
  { src: image21, alt: "Thierry de Lucas with violin" },
  { src: image2, alt: "Thierry de Lucas portrait with violin" },
  { src: image22, alt: "Thierry de Lucas playing violin" },
  { src: image1, alt: "Thierry de Lucas holding violin" },
  { src: image8, alt: "Thierry de Lucas in performance" },
  { src: image25, alt: "Thierry de Lucas with violin" },
  { src: image16, alt: "Thierry de Lucas portrait" },
  { src: image14, alt: "Thierry de Lucas portrait" },
  { src: image24, alt: "Thierry de Lucas with violin" },
  { src: image9, alt: "Thierry de Lucas performing" },
  { src: image7, alt: "Thierry de Lucas with violin" },
  { src: image20, alt: "Thierry de Lucas performing" },
  { src: image17, alt: "Thierry de Lucas portrait" },
  { src: image10, alt: "Thierry de Lucas performing" },
  { src: image15, alt: "Thierry de Lucas portrait" },
  { src: image11, alt: "Thierry de Lucas performing" },
  { src: image19, alt: "Thierry de Lucas portrait" },
];
