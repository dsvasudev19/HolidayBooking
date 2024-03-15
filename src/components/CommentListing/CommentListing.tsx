import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";
import Avatar from "shared/Avatar/Avatar";
// import {faker} from '@faker-js/faker'

// interface CommentListingDataType {
//   name: string;
//   avatar?: string;
//   date: string;
//   comment: string;
//   starPoint: number;
// }

interface Review{
    id: number;
    reviewable_id: number;
    reviewable_type: string;
    content: string;
    userId: number;
    rating: number;
    createdAt: string;
    updatedAt: string;
    User: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      password: string;
      role: string;
      createdAt: string;
      updatedAt: string;
    }
}


export interface CommentListingProps {
  className?: string;
  data:any;
  hasListingTitle?: boolean;
}



const CommentListing: FC<CommentListingProps> = ({
  className = "",
  data = [],
  hasListingTitle,
}) => {
  return (
    <>
      {data
        .filter((_:any, i:number) => i < 5)
        .map((item:Review, index:any) => (
          <div
            className={`nc-CommentListing flex space-x-4 ${className}`}
            data-nc-id="CommentListing"
            key={index}
          >
            <div className="pt-0.5">
              <Avatar
                sizeClass="h-10 w-10 text-lg"
                radius="rounded-full"
                userName={item.User.first_name + "" + item.User.last_name}
                // imgUrl={toAbsoluteUrl("/media/svg/boy-1.svg")}
              />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between space-x-3">
                <div className="flex flex-col">
                  <div className="text-sm font-semibold">
                    <span>
                      {item.User.first_name + "" + item.User.last_name}
                    </span>
                    {hasListingTitle && (
                      <>
                        <span className="text-neutral-500 dark:text-neutral-400 font-normal">
                          {` review in `}
                        </span>
                        <a href="/">The Lounge & Bar</a>
                      </>
                    )}
                  </div>
                  <span className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {new Date(item.createdAt).toISOString().split("T")[0]}
                  </span>
                </div>
                <div className="flex text-yellow-500">
                  
                  {Array.from({ length: item.rating }, (_, index) => (
                    <StarIcon key={index} className="w-4 h-4 text-yellow-500" />
                  ))}
                </div>
              </div>
              <span className="block mt-3 text-neutral-6000 dark:text-neutral-300">
                {item.content}
              </span>
            </div>
          </div>
        ))}
    </>
  );
};

export default CommentListing;
