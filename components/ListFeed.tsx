
import FeedPost from "./Post/FeedPost";
import React from 'react'
import { ExplorePublicationsQuery } from "@/graphql/generated";
import { Card } from "./ui/Card";
import { useInView } from "react-cool-inview"

export default function ListFeed({ data, hasMore = false, fetchMore } : {
    data : ExplorePublicationsQuery["explorePublications"]["items"];
    hasMore?: boolean;
    fetchMore?: () => void
}) {

  const { observe } = useInView({
    onChange: async ({ inView }) => {
      if (!inView || !hasMore) {
        return;
      }

      // await fetchMore({
      //   variables: {
      //     request: { ...request, cursor: pageInfo?.next },
      //     reactionRequest,
      //     profileId
      //   }
      // });
    }
  });

  return (
    <Card>
    {
      data?.map((publication) => (
          <FeedPost publication={publication} key={publication.id} />
      ))
    }
    {hasMore && <span ref={observe} />}
    </Card>
  );
}
