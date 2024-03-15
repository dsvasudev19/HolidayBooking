import { DEMO_POSTS } from "data/posts";
import { PostDataType } from "data/types";
import React from "react";
import { Link } from "react-router-dom";
import Avatar from "shared/Avatar/Avatar";
import Badge from "shared/Badge/Badge";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import Comment from "shared/Comment/Comment";
import NcImage from "shared/NcImage/NcImage";
import SocialsList from "shared/SocialsList/SocialsList";
import Textarea from "shared/Textarea/Textarea";
import { Helmet } from "react-helmet";

const BlogSingle = () => {
  const renderHeader = () => {
    return (
      <header className="container rounded-xl">
        <div className="max-w-screen-md mx-auto space-y-5">
          <Badge href="##" color="blue" name="Traveler" />
          <h1
            className=" text-neutral-900 font-semibold text-3xl md:text-4xl md:!leading-[120%] lg:text-4xl dark:text-neutral-100 max-w-4xl "
            title="Quiet ingenuity: 120,000 lunches and counting"
          >
            Unveiling the Magnificence: Exploring the Lord Shiva Temple at
            Murudeshwar
          </h1>
          <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
            At the heart of the temple complex rises the towering statue of Lord
            Shiva, standing an imposing 123 feet tall, making it one of the
            tallest statues in the world. Its sheer size and majestic presence
            command reverence, drawing pilgrims and tourists alike from far and
            wide to witness its splendor.
          </span>

          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex flex-col items-baseline sm:flex-row sm:justify-between">
            <div className="nc-PostMeta2 flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 text-sm leading-none flex-shrink-0">
              <Avatar
                containerClassName="flex-shrink-0"
                sizeClass="w-8 h-8 sm:h-11 sm:w-11 "
              />
              <div className="ml-3">
                <div className="flex items-center">
                  <a className="block font-semibold" href="/">
                    Rahul Sharma
                  </a>
                </div>
                <div className="text-xs mt-[6px]">
                  <span className="text-neutral-700 dark:text-neutral-300">
                    May 24, 2023
                  </span>
                  <span className="mx-2 font-semibold">·</span>
                  <span className="text-neutral-700 dark:text-neutral-300">
                    6 min read
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <SocialsList />
            </div>
          </div>
        </div>
      </header>
    );
  };

  const renderContent = () => {
    return (
      <div
        id="single-entry-content"
        className="prose dark:prose-invert prose-sm !max-w-screen-md sm:prose lg:prose-lg mx-auto dark:prose-dark"
      >
        <p>
          As visitors step inside the temple premises, they are greeted by
          intricate carvings, vibrant murals, and ornate architecture that tell
          the stories of Hindu mythology. Every corner exudes a sense of
          tranquility and devotion, inviting visitors to immerse themselves in
          prayer and reflection.
        </p>
        <p>
          The temple's location, perched atop a hillock overlooking the azure
          waters of the Arabian Sea, adds to its allure, offering breathtaking
          panoramic views that leave visitors spellbound. Whether bathed in the
          golden hues of <strong>sunrise</strong> or the ethereal glow of
          sunset, the temple casts a mesmerizing silhouette against the backdrop
          of the sea, creating a scene of &nbsp;
          <a href="/#" target="_blank" rel="noopener noreferrer">
            unparalleled beauty.
          </a>{" "}
        </p>
        <ol>
          <li>
            Murudeshwar Shiva Temple: 123-foot statue, panoramic sea views,
            intricate carvings.
          </li>
          <li>
            Features a mesmerizing lift ride inside the statue, providing
            visitors with unparalleled views.
          </li>
          <li>
            Hosts the annual Maha Shivaratri festival, drawing devotees for
            grand celebrations and rituals.
          </li>
        </ol>
        <h3>History Should be Known</h3>
        <p>
          Intricate carvings and vibrant murals adorn the temple's interior,
          narrating captivating tales from Hindu mythology and enriching
          visitors' cultural experience.
        </p>
        <p>Intersting Facts About This Place :</p>
        <blockquote>
          <p>
            The lift inside the statue provides panoramic views of the Arabian
            Sea and surrounding landscapes.
          </p>
        </blockquote>
        <p>
          It's probably important that images look okay here by default as well:
        </p>
        <figure>
          <img
            src="https://images.unsplash.com/photo-1693139441439-95ddfb2ecdba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="nc blog"
            className="rounded-2xl"
          />
          <figcaption>
            Beyond its architectural splendor, the Lord Shiva Temple at
            Murudeshwar holds deep spiritual significance for devotees, who
            flock here seeking blessings, solace, and divine intervention. It
            serves as a sacred sanctuary where the faithful can connect with the
            divine and find inner peace amidst the chaos of the world.
          </figcaption>
        </figure>
        <p>Things to do in these Place :</p>
        <ul>
          <li>
            Explore the intricately carved interiors of the temple, adorned with
            vibrant murals depicting Hindu mythology.
          </li>
          <li>
            Soak in the spiritual ambiance and participate in rituals and
            prayers at the temple complex. .
          </li>
          <li>
            Capture memorable moments against the backdrop of the majestic Raja
            Gopura, a towering gateway to the temple.
          </li>
        </ul>
        <p>And that's the end of this section.</p>

        <h3>What can visitors experience inside the temple complex?</h3>

        <p>
          Inside the temple complex, visitors can explore intricately carved
          interiors adorned with vibrant murals depicting scenes from Hindu
          mythology. They can also take a lift ride inside the statue for
          panoramic views of the Arabian Sea and surrounding landscapes.
        </p>
        <p>
          Murudeshwar Shiva Temple holds immense significance in Hindu mythology
          as it is believed to be the place where Lord Shiva is said to have
          consumed the Halahala poison during the churning of the ocean (Samudra
          Manthan).
        </p>
        <p>
          What I've written here is probably long enough, but adding this final
          sentence can't hurt.
        </p>
      </div>
    );
  };

  const renderTags = () => {
    return (
      <div className="max-w-screen-md mx-auto flex flex-wrap">
        <a
          className="nc-Tag inline-block bg-white text-sm text-neutral-600 dark:text-neutral-300 py-2 rounded-lg border border-neutral-100  md:px-4 dark:bg-neutral-700 dark:border-neutral-700 hover:border-neutral-200 dark:hover:border-neutral-6000 mr-2 mb-2"
          href="##"
        >
          Near By Attractions
        </a>
        <a
          className="nc-Tag inline-block bg-white text-sm text-neutral-600 dark:text-neutral-300 py-2 rounded-lg border border-neutral-100  md:px-4 dark:bg-neutral-700 dark:border-neutral-700 hover:border-neutral-200 dark:hover:border-neutral-6000 mr-2 mb-2"
          href="##"
        >
          Beaches
        </a>
        <a
          className="nc-Tag inline-block bg-white text-sm text-neutral-600 dark:text-neutral-300 py-2 rounded-lg border border-neutral-100  md:px-4 dark:bg-neutral-700 dark:border-neutral-700 hover:border-neutral-200 dark:hover:border-neutral-6000 mr-2 mb-2"
          href="##"
        >
          Shopping
        </a>
      </div>
    );
  };

  const renderAuthor = () => {
    return (
      <div className="max-w-screen-md mx-auto ">
        <div className="nc-SingleAuthor flex">
          <Avatar sizeClass="w-11 h-11 md:w-24 md:h-24" />
          <div className="flex flex-col ml-3 max-w-lg sm:ml-5 space-y-1">
            <span className="text-xs text-neutral-400 uppercase tracking-wider">
              WRITEN BY
            </span>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
              <a href="/">Ravindar Chary</a>
            </h2>
            <span className="text-sm text-neutral-500 sm:text-base dark:text-neutral-300">
              Ravindar Chary is an accomplished author and historian renowned
              for his in-depth research and captivating storytelling. With a
              passion for unraveling the mysteries of ancient civilizations and
              exploring the intricacies of cultural heritage
              <a className="text-primary-6000 font-medium ml-1" href="/">
                Readmore
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderCommentForm = () => {
    return (
      <div className="max-w-screen-md mx-auto pt-5">
        <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
          Responses (14)
        </h3>
        <form className="nc-SingleCommentForm mt-5">
          <Textarea />
          <div className="mt-2 space-x-3">
            <ButtonPrimary>Submit</ButtonPrimary>
            <ButtonSecondary>Cancel</ButtonSecondary>
          </div>
        </form>
      </div>
    );
  };

  const renderCommentLists = () => {
    return (
      <div className="max-w-screen-md mx-auto">
        <ul className="nc-SingleCommentLists space-y-5">
          <li>
            <Comment />
            <ul className="pl-4 mt-5 space-y-5 md:pl-11">
              <li>
                <Comment isSmall />
              </li>
            </ul>
          </li>
          <li>
            <Comment />
            <ul className="pl-4 mt-5 space-y-5 md:pl-11">
              <li>
                <Comment isSmall />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  };

  const renderPostRelated = (post: PostDataType) => {
    return (
      <div
        key={post.id}
        className="relative aspect-w-3 aspect-h-4 rounded-3xl overflow-hidden group"
      >
        <Link to={post.href} />
        <NcImage
          className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
          src={post.featuredImage}
        />
        <div>
          <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black"></div>
        </div>
        <div className="flex flex-col justify-end items-start text-xs text-neutral-300 space-y-2.5 p-4">
          <Badge name="Categories" />
          <h2 className="block text-lg font-semibold text-white ">
            <span className="line-clamp-2">{post.title}</span>
          </h2>

          <div className="flex">
            <span className="block text-neutral-200 hover:text-white font-medium truncate">
              {post.author.displayName}
            </span>
            <span className="mx-1.5 font-medium">·</span>
            <span className="font-normal truncate">{post.date}</span>
          </div>
        </div>
        <Link to={post.href} />
      </div>
    );
  };

  return (
    <div className="nc-PageSingle pt-8 lg:pt-16 ">
      <Helmet>
        <title>Single Blog || Booking React Template</title>
      </Helmet>
      {renderHeader()}
      <NcImage
        className="w-full rounded-xl"
        containerClassName="container my-10 sm:my-12 "
        src="https://images.unsplash.com/photo-1693205118032-9382f7267f55?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />

      <div className="nc-SingleContent container space-y-10">
        {renderContent()}
        {renderTags()}
        <div className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700"></div>
        {renderAuthor()}
        {renderCommentForm()}
        {renderCommentLists()}
      </div>
      <div className="relative bg-neutral-100 dark:bg-neutral-800 py-16 lg:py-28 mt-16 lg:mt-24">
        <div className="container ">
          <h2 className="text-3xl font-semibold">Related posts</h2>
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {/*  */}
            {DEMO_POSTS.filter((_, i) => i < 4).map(renderPostRelated)}
            {/*  */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSingle;
