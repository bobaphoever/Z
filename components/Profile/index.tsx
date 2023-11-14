import React, { useState } from "react";
import { Profile, useProfileQuery, usePublicationsQuery } from "../../graphql/generated";
import styles from "../../styles/Profile.module.css";
import { useRouter } from "next/router";

//@ts-ignore
import { MediaRenderer, Web3Button } from "@thirdweb-dev/react";
import FeedPost from "../../components/Post/FeedPost";
import {
  LENS_CONTRACT_ABI,
  LENS_CONTRACT_ADDRESS,
} from "../../const/contracts";
import { useFollow } from "../../lib/useFollow";
import CustomError from "../Error";
import ProfilePageShimmer from "./Shimmer";
import NotFound from "../NotFound";
import Cover from "../ui/Cover";
import { GridItemEight, GridItemFour, GridLayout } from "../GridLayout";
import Details from "../ui/ProfileDetails";
import FeedType from "./FeedType";
import Feed from "./Feed";
import useLensUser from "@/lib/auth/useLensUser";
import NewPost from "../NewPost";

enum ProfileFeedType {
  Feed = 'FEED',
  Replies = 'REPLIES',
  Media = 'MEDIA',
  Collects = 'COLLECTS',
  Nft = 'NFT',
  Stats = 'STATS'
  }

type Props = {};

export default function ProfilePage({}: Props) {
  const router = useRouter();
  const { profileQuery } = useLensUser();

  const profileId = profileQuery.data?.defaultProfile?.id;
      
  // Grab the path / [id] field from the URL
  const { id, type } = router.query;
  const lowerCaseProfileFeedType = [
    ProfileFeedType.Feed.toLowerCase(),
    ProfileFeedType.Replies.toLowerCase(),
    ProfileFeedType.Media.toLowerCase(),
    ProfileFeedType.Collects.toLowerCase(),
    ProfileFeedType.Nft.toLowerCase(),
    ProfileFeedType.Stats.toLowerCase()
  ];
  const [feedType, setFeedType] = useState(
    type && lowerCaseProfileFeedType.includes(type as string)
      ? type.toString().toUpperCase()
      : ProfileFeedType.Feed
  );

  const {
    isLoading: loadingProfile,
    data: profileData,
    error: profileError,
  } = useProfileQuery(
    {
      request: {
        handle: id,
      },
    },
    {
      enabled: !!id,
    }
  );

  if (profileError) {
    return <CustomError />;
  }

  if (loadingProfile) {
    return <ProfilePageShimmer />;
  }

  if (!profileData?.profile) {
    return <NotFound />;
  }

  return (
    <>
    <Cover
        // @ts-ignore
        cover={ profileData?.profile?.coverPicture?.original?.url || 'none' }
      />
      <GridLayout className="pt-6">
        <GridItemFour>
          <Details
            profile={profileData?.profile as Profile}
          />
        </GridItemFour>
        <GridItemEight className="space-y-5">
          <FeedType setFeedType={setFeedType} feedType={feedType} />
          {profileId === profileData?.profile?.id ? <NewPost /> : null}
          {(feedType === ProfileFeedType.Feed ||
            feedType === ProfileFeedType.Replies ||
            feedType === ProfileFeedType.Media ||
            feedType === ProfileFeedType.Collects) && (
            <Feed profile={profileData?.profile as Profile} type={feedType} />
          )}
          {/* {feedType === ProfileFeedType.Nft ? (
            isNftGalleryEnabled ? (
              <NftGallery profile={profile as Profile} />
            ) : (
              <NftFeed profile={profile as Profile} />
            )
          ) : null}
          {feedType === ProfileFeedType.Stats && IS_MAINNET ? (
            <Achievements profile={profile as Profile} />
          ) : null} */}
        </GridItemEight>
      </GridLayout>
    </>
  );
}
