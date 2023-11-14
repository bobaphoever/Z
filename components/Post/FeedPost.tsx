import React from "react";
import { ExplorePublicationsQuery } from "@/graphql/generated";
import SingleFeed from "./SingleFeed";
import { CollectIcon, HeartIcon, MessageIcon, MirrorIcon } from "../icons";
import { useRouter } from "next/router";

// import Collect from './Actions/Collect'
// import Comment from './Actions/Comment'
// import PostMenu from './Actions/Menu'
// import Mirror from './Actions/Mirror'

type Props = {
  publication: ExplorePublicationsQuery["explorePublications"]["items"][0];
};

export default function FeedPost({ publication }: Props) {
  const { push } = useRouter()
 
  return (
      <div 
        className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900"
        onClick={(event) => {
            const selection = window.getSelection();
            if (!selection || selection.toString().length === 0) {
              push(`/post/${publication?.id}`);
            }
            event.stopPropagation()
          }}
        >
        <SingleFeed publication={publication}/>
        <div className="flex items-center ml-[75px] px-3 py-1.5 dark:border-gray-800 gap-6">
          {/* <Comment post={publication} />
          <Mirror post={publication} />
          { publication?.collectModule?.__typename !== 'RevertCollectModuleSettings' && (
            <Collect post={publication} />
            )}
            <PostMenu post={publication} /> */}
            {/* <p>{publication?.stats?.totalAmountOfCollects} Collects</p>
            <p>{publication?.stats?.totalAmountOfComments} Comments</p>
            <p>{publication?.stats?.totalAmountOfMirrors} Mirrors</p> */}
            <span className="flex flex-row gap-2 font-semibold text-sm text-pink-600 justify-center items-center">
              <HeartIcon color='#ff0055'/>
            </span>
            <span className="flex flex-row gap-2 font-semibold text-sm text-blue-600 justify-center items-center">
              <MessageIcon color='#0048ff'/>
              {publication?.stats?.totalAmountOfComments || 0}
            </span>
            <span className="flex flex-row gap-2 font-semibold text-sm text-purple-600 justify-center items-center">
              <MirrorIcon color='#c800ff'/>
              {publication?.stats?.totalAmountOfMirrors || 0}
            </span>
            <span className="flex flex-row gap-2 font-semibold text-sm text-cyan-600 justify-center items-center">
              <CollectIcon color='#00c9d7'/>
              {publication?.stats?.totalAmountOfCollects || 0}
            </span>
          </div>
          <div className="w-full border-b pt-3 h-1"></div>
      </div>
  );
}
