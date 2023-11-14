import PostsShimmer from '@/components/Shimmer/PostsShimmer';
import { HiOutlineCollection } from 'react-icons/hi';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorMessage  } from '@/components/ui/ErrorMessage';
import type { FC } from 'react';
import { ExplorePublicationsQuery, Profile, PublicationMainFocus, PublicationTypes, usePublicationsQuery } from '@/graphql/generated';
import FeedPost from '../Post/FeedPost';
// import { useInView } from 'react-cool-inview';
// import { ProfileFeedType } from 'src/enums';
// import { useAppStore } from 'src/store/app';
// import { useProfileFeedStore } from 'src/store/profile-feed';

enum ProfileFeedType {
    Feed = 'FEED',
    Replies = 'REPLIES',
    Media = 'MEDIA',
    Collects = 'COLLECTS',
    Nft = 'NFT',
    Stats = 'STATS'
}

interface FeedProps {
  profile: Profile;
  type:
    | ProfileFeedType.Feed
    | ProfileFeedType.Replies
    | ProfileFeedType.Media
    | ProfileFeedType.Collects;
}

const Feed: FC<FeedProps> = ({ profile, type }) => {
  
  const publicationTypes =
    type === ProfileFeedType.Feed
      ? [PublicationTypes.Post, PublicationTypes.Mirror]
      : type === ProfileFeedType.Replies
      ? [PublicationTypes.Comment]
      : type === ProfileFeedType.Media
      ? [PublicationTypes.Post, PublicationTypes.Comment]
      : [
          PublicationTypes.Post,
          PublicationTypes.Comment,
          PublicationTypes.Mirror
        ];
  
// const request: PublicationsQueryRequest = {
//     publicationTypes,
//     metadata,
//     ...(type !== ProfileFeedType.Collects
//       ? { profileId: profile?.id }
//       : { collectedBy: profile?.ownedBy }),
//     limit: 10
//   };
//   const reactionRequest = currentProfile
//     ? { profileId: currentProfile?.id }
//     : null;
//   const profileId = currentProfile?.id ?? null;

//   const { data, loading, error, fetchMore } = useProfileFeedQuery({
//     variables: { request, reactionRequest, profileId },
//     skip: !profile?.id
//   });

    const metadata = type === ProfileFeedType.Media ? {
            mainContentFocus: [PublicationMainFocus.Image, PublicationMainFocus.Video, PublicationMainFocus.Audio]
    } : null;

    const {
    isLoading,
    data,
    error,
  } = usePublicationsQuery(
    {
      request: {
        metadata,
        ...(type !== ProfileFeedType.Collects
        ? { profileId: profile?.id }
        : { collectedBy: profile?.ownedBy }),
        publicationTypes,
        profileId: profile?.id,
      },
    },
    {
      enabled: !!profile?.id,
    }
  );

  const publications = data?.publications?.items;
  const pageInfo = data?.publications?.pageInfo;
  const hasMore = pageInfo?.next;

//   const { observe } = useInView({
//     onChange: async ({ inView }) => {
//       if (!inView || !hasMore) {
//         return;
//       }

//       await fetchMore({
//         variables: {
//           request: { ...request, cursor: pageInfo?.next },
//           reactionRequest,
//           profileId
//         }
//       });
//     }
//   });

  if (isLoading) {
    return <PostsShimmer />;
  }

  if (publications?.length === 0) {
    const emptyMessage =
      type === ProfileFeedType.Feed
        ? 'has nothing in their feed yet!'
        : type === ProfileFeedType.Media
        ? 'has no media yet!'
        : type === ProfileFeedType.Replies
        ? "hasn't replied yet!"
        : type === ProfileFeedType.Collects
        ? "hasn't collected anything yet!"
        : '';

    return (
      <EmptyState
        message={
          <div>
            <span className="mr-1 font-bold">
              @{profile?.handle}
            </span>
            <span>{emptyMessage}</span>
          </div>
        }
        icon={<HiOutlineCollection className="text-brand h-8 w-8" />}
      />
    );
  }

  if (error) {
    return (
      <ErrorMessage title={`Failed to load profile feed`} error={{message: error} as Error} />
    );
  }

  return (
    <Card
      className="divide-y-[1px] dark:divide-gray-700"
    >
      {publications?.map((publication, index) => (
        <FeedPost
          key={`${publication.id}_${index}`}
          publication={publication as ExplorePublicationsQuery["explorePublications"]["items"][0]}
        />
      ))}
      {/* {hasMore ? <span ref={observe} /> : null} */}
    </Card>
  );
};

export default Feed;