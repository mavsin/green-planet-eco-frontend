import Marquee from "react-fast-marquee";
import { NEWS_LINKS } from "../../../utils/constants";

export default function NewsBar() {
  return (
    <div>
      <Marquee direction="right" speed={100}>
        <div className="flex items-center gap-16 md:gap-24">
          {NEWS_LINKS.map((link, index) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              className={
                index === NEWS_LINKS.length - 1 ? "pr-16 md:pr-24" : ""
              }
            >
              <img
                src={link.imgSrc}
                alt={link.imgAlt}
                className={link.imgClassName}
              />
            </a>
          ))}
        </div>
      </Marquee>
    </div>
  );
}
