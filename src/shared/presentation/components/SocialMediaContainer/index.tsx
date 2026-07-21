import Image from "next/image";
import Link from "next/link";
import { ICON_DATA } from "../../utils/socialMediaList";

export default function SocialMediaContainer() {
  return (
    <div data-cy="footer-social-links" className="flex items-center gap-6">
      {ICON_DATA.map(({ id, icon, link, image }) => (
        <Link
          key={id}
          data-cy={`footer-social-link-${id}`}
          href={link}
          target="_blank"
          className="cursor-pointer"
          title={icon}
        >
          <Image
            src={image}
            alt={icon}
            width={24}
            height={24}
            className="hover:scale-125 transition-all duration-350 ease-in-out"
          />
        </Link>
      ))}
    </div>
  );
}
