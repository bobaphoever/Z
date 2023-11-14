import { PublicationMainFocus, PublicationSortCriteria, useExplorePublicationsQuery } from "../graphql/generated";
import { GridItemEight, GridItemFour, GridLayout } from '@/components/GridLayout'
import React, { useEffect, useState } from 'react'
import CustomError from "./Error";
import PostsShimmer from "./Shimmer/PostsShimmer";
import Footer from "./Footer";
import { useRouter } from "next/router";
import { Tab } from '@headlessui/react';
import clsx from "clsx";
import Feed from "@/components/Feed";

export default function Explore() {
    const router = useRouter();
    // const currentProfile = useAppStore((state) => state.currentProfile);
    const [focus, setFocus] = useState<PublicationMainFocus>();
    const [curTab, setCurTab] = useState<number>(1)

    const tabs = [
        { name: `For you`, type: PublicationSortCriteria.Latest },
        { name: `Popular`, type: PublicationSortCriteria.TopCommented },
        { name: `Trending`, type: PublicationSortCriteria.TopCollected },
        { name: `Interesting`, type: PublicationSortCriteria.TopMirrored }
    ];
    
    const fetchData = (index : number) => {
        router.replace(
            { query: { ...router.query, tab: index } },
            undefined,
            { shallow: true }
          );
    }

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
    useEffect(() => {
    
    }, [curTab])

  if (error) {
    return <CustomError/>;
  }

  if (isLoading) {
    return (
        <GridLayout>
            <GridItemEight className="space-y-5">
                <PostsShimmer/>
            </GridItemEight>
            <GridItemFour>
              <Footer />
          </GridItemFour>
        </GridLayout>
    )
  }

  if (!data || data?.explorePublications.items?.length === 0) {
    return (
        <GridLayout>
            <GridItemEight className="space-y-5">
                <PostsShimmer/>
            </GridItemEight>
            <GridItemFour>
              <Footer />
          </GridItemFour>
        </GridLayout>
    )
  }

  return (
    <GridLayout>
      <GridItemEight className="space-y-5">
        <Tab.Group
          defaultIndex={Number(router.query.tab)}
          onChange={ (index) => { setCurTab(index); console.log(index) }}
        >
            <Tab.List className="divider space-x-8 bg-white pt-3 px-8 border dark:border-gray-800 dark:bg-gray-900 rounded-lg">
            {tabs.map((tab, index) => (
              <Tab
                key={tab.type}
                defaultChecked={index === 1}
                className={({ selected }) =>
                  clsx(
                    {
                      'border-blue-600 border-b-2 !text-gray-900 dark:!text-white':
                        selected
                    },
                    'text-gray-500 px-4 pb-2 text-xs font-semibold outline-none sm:text-sm'
                  )
                }
                data-testid={`explore-tab-${index}`}
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            {tabs.map((tab) => (
              <Tab.Panel key={tab.type}>
                <Feed feedType={tab.type} />
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
        <Feed />
    </GridItemEight>
      <GridItemFour>
        {/* <Streak /> */}
        {/* <RecommendedProfiles /> */}
        <Footer />
      </GridItemFour>
    </GridLayout>
  );
}
