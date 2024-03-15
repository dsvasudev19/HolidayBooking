import React, { FC } from "react";
import { DEMO_POSTS } from "data/posts";
import { PostDataType } from "data/types";
import Card3 from "./Card3";


const postsDemo: PostDataType[] = DEMO_POSTS.filter((_, i) => i > 9 && i < 14);

export interface SectionLatestPostsProps {
  posts?: PostDataType[];
  className?: string;
  postCardName?: "card3";
}

const SectionLatestPosts: FC<SectionLatestPostsProps> = ({
  posts = postsDemo,
  postCardName = "card3",
  className = "",
}) => {
  const renderCard = (post: PostDataType) => {
    switch (postCardName) {
      case "card3":
        return <Card3 key={post.id} className="" post={post} />;

      default:
        return null;
    }
  };

  return (
    <div className={`nc-SectionLatestPosts relative ${className}`}>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-full xl:w-full xl:pr-10">
          <div className={`grid gap-6 md:gap-8 grid-cols-2`}>
            {posts.map((post) => renderCard(post))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionLatestPosts;
