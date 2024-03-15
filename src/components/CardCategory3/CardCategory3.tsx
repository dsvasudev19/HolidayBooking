import { FC } from "react";
import NcImage from "shared/NcImage/NcImage";
import { TaxonomyType } from "data/types";
import { Link } from "react-router-dom";
import convertNumbThousand from "utils/convertNumbThousand";

const CardCategory3: FC<any> = ({ className = "", taxonomy }) => {
  const {  href = "/", name, path } = taxonomy;
  // const { count, name, href = "/", thumbnail ,title,featuredPropertyMedia} = taxonomy;

  return (
    <Link
      to={href}
      className={`nc-CardCategory3 flex flex-col ${className}`}
      data-nc-id="CardCategory3"
    >
      <div
        className={`flex-shrink-0 relative w-full aspect-w-5 aspect-h-4 sm:aspect-h-7 h-0 rounded-2xl overflow-hidden group`}
      >
        <NcImage
          src={path}
          // src={thumbnail}
          className="object-cover w-full h-full rounded-2xl"
        />
        <span className="opacity-0 group-hover:opacity-100 absolute inset-0 bg-black bg-opacity-10 transition-opacity"></span>
      </div>
      <div className="mt-4 truncate">
        <h2
          className={`text-base sm:text-lg text-neutral-900 dark:text-neutral-100 font-medium truncate`}
        >
          {name}
        </h2>
        <span
          className={`block mt-2 text-sm text-neutral-6000 dark:text-neutral-400`}
        >
          {/* {convertNumbThousand(count || 100)} Visited */}
        </span>
      </div>
    </Link>
  );
};

export default CardCategory3;
