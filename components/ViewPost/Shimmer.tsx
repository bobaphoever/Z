import Footer from '@/components/Footer';
import PostShimmer from '@/components/Shimmer/PostShimmer';
import PostsShimmer from '@/components/Shimmer/PostsShimmer';
import UserProfileShimmer from '@/components/Shimmer/UserProfileShimmer';
import { GridItemEight, GridItemFour, GridLayout } from '@/components/GridLayout';
import type { FC } from 'react';
import { Card } from '../ui/Card';

const PublicationPageShimmer: FC = () => {
  return (
    <GridLayout>
      <GridItemEight className="space-y-5">
        <Card>
          <PostShimmer />
        </Card>
        <PostsShimmer />
      </GridItemEight>
      <GridItemFour className="space-y-5">
        <Card className="p-5">
          <UserProfileShimmer />
        </Card>
        {/* <Card className="space-y-4 p-5">
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
          <UserProfileShimmer showFollow />
        </Card> */}
        <Card className="flex justify-between p-5">
          <div className="shimmer h-3 w-1/2 rounded-lg" />
          <div className="shimmer h-3 w-1/4 rounded-lg" />
        </Card>
        <Footer />
      </GridItemFour>
    </GridLayout>
  );
};

export default PublicationPageShimmer;