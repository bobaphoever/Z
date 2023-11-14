import Link from "next/link";
import React from "react";
import { ExplorePublicationsQuery } from "@/graphql/generated";
import { formatDistance } from 'date-fns'

import Attachments from './Attachments'
import UserProfile from '@/components/UserProfile'
import { CardBody } from '@/components/ui/Card'
import { useRouter } from 'next/router'

import Collected from '@/components/Type/Collected'
import Commented from '@/components/Type/Commented'
import Mirrored from '@/components/Type/Mirrored'

import PostContent from "./PostContent";
import clsx from "clsx";
import { PiEye } from "react-icons/pi";

type Props = {
  publication: ExplorePublicationsQuery["explorePublications"]["items"][0];
  showFull?: boolean
};

export default function SingleFeed({ publication, showFull = false }: Props) {
  const { pathname } = useRouter()
  const canShowMore = publication?.metadata?.content?.length > 450;

  return (
      <CardBody>
        {/* @ts-ignore */}
        { publication?.__typename === 'Mirror' && <Mirrored publication={publication} /> }
        {/* @ts-ignore */}
        { publication?.__typename === 'Comment' && pathname !== '/post/[id]' && ( <Commented publication={publication} /> )}
        {/* @ts-ignore */}
        { publication?.collectedBy && <Collected publication={publication} /> }
         <div className="flex justify-between pb-4">
            {/* @ts-ignore */}
            <UserProfile profile={publication.profile} />
            <Link href={`/post/${publication.id}`} className="text-xs text-gray-500 font-medium">
                {`${formatDistance(new Date(publication.createdAt), Date.now())} ago`}
            </Link>
         </div>
         <div className="flex flex-col pl-16 pb-4">
         <PostContent className={clsx(
            { 'line-clamp-5': canShowMore && !showFull },
            'markup linkify text-md break-words align-middle'
            )}>
            { publication?.metadata?.content }
          </PostContent>
          {(canShowMore && !showFull) && (
                <div className="w-full justify-center text-gray-500 mt-4 flex items-center space-x-1 text-sm font-semibold">
                <PiEye className="h-4 w-4" />
                <Link href={`/post/${publication?.id}`}>
                    Show more
                </Link>
                </div>
            )}
          
          {publication?.metadata?.media?.length > 0 && (
            <Attachments attachments={publication?.metadata?.media} altName={publication.metadata.name || " "} />
            )}
          </div>
      </CardBody>
  );
}
