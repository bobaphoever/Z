import { PublicationSortCriteria, useExplorePublicationsQuery } from "../graphql/generated";
import React, { FC } from 'react'
import CustomError from "./Error";
import PostsShimmer from "./Shimmer/PostsShimmer";
import ListFeed from "./ListFeed";

interface FeedProps {
  feedType?: PublicationSortCriteria;
}

const Feed: FC<FeedProps> = ({
  feedType = PublicationSortCriteria.Latest
}) => {

  const { isLoading, error, data } = useExplorePublicationsQuery(
    {
      request: {
        sortCriteria: feedType,
      },
    },
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const publications = data?.explorePublications?.items;
  const pageInfo = data?.explorePublications?.pageInfo;
  const hasMore = pageInfo?.next;


  if (error) {
    return <CustomError/>;
  }

  if (isLoading) {
    return (
        <PostsShimmer/>
    )
  }

  if (!data || publications?.length === 0) {
    return (
        <PostsShimmer/>
    )
  }

  return (
      <div className="space-y-3">
          <ListFeed data={data.explorePublications.items} hasMore={hasMore}/>
      </div>
  );
}

export default Feed;