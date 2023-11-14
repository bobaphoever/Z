import { ExplorePublicationsQuery, PublicationMainFocus, PublicationSortCriteria, useExplorePublicationsQuery } from "../graphql/generated";
import { GridItemEight, GridItemFour, GridLayout } from '@/components/GridLayout'
import React, { useEffect, useState } from 'react'
import CustomError from "./Error";
import PostsShimmer from "./Shimmer/PostsShimmer";
import Footer from "./Footer";
import ListFeed from "./ListFeed";
import { useRouter } from "next/router";
import { Tab } from '@headlessui/react';
import clsx from "clsx";
import Feed from "@/components/Feed";
import useLensUser from "@/lib/auth/useLensUser";
import Hero from "./Hero";

export default function Explore() {
    const router = useRouter();
    const { profileQuery } = useLensUser();
    const currentProfile = profileQuery?.data?.defaultProfile;
  
    const { isLoading, error, data } = useExplorePublicationsQuery(
    {
        request: {
        sortCriteria: PublicationSortCriteria.Latest,
        },
    },
    {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
    }
    );

  if (error) {
    return <CustomError/>;
  }

  if (isLoading) {
    return (
      <>
        {!currentProfile && <Hero />}
        <GridLayout>
            <GridItemEight className="space-y-5">
                <PostsShimmer/>
            </GridItemEight>
            <GridItemFour>
              <Footer />
          </GridItemFour>
        </GridLayout>
      </>
    )
  }

  if (!data || data?.explorePublications.items?.length === 0) {
    return (
      <>
        {!currentProfile && <Hero />}
        <GridLayout>
            <GridItemEight className="space-y-5">
                <PostsShimmer/>
            </GridItemEight>
            <GridItemFour>
              <Footer />
          </GridItemFour>
        </GridLayout>
      </>
    )
  }

  return (
    <>
      {!currentProfile && <Hero />}
      <GridLayout>
        <GridItemEight className="space-y-5">
          <Feed feedType={PublicationSortCriteria.Latest} />
          </GridItemEight>
        <GridItemFour>
          {/* <Streak /> */}
          {/* <RecommendedProfiles /> */}
          <Footer />
        </GridItemFour>
      </GridLayout>
    </>
  );
}
