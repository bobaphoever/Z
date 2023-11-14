import { NextPage } from "next";
import { useRouter } from "next/router";
import CustomError from "../Error";
import PublicationPageShimmer from "./Shimmer";
import NotFound from "../NotFound";
import { GridItemEight, GridLayout, GridItemFour } from "../GridLayout";
import { Card } from "../ui/Card";
import UserProfile from "../UserProfile";
import Footer from "../Footer";
import { usePublicationQuery } from "@/graphql/generated";
import SingleFeed from "../Post/SingleFeed";
import CommentWarning from "../ui/CommentWarning";
import OnchainMeta from "./ViewPostUtils/OnChainMetaData";

const ViewPost: NextPage = () => {
    // const currentProfile = useAppStore((state) => state.currentProfile);
    // const { allowed: staffMode } = useStaffMode();
    const {
      query: { id }
    } = useRouter();
    
    // const { data, loading, error } = usePublicationQuery({
    //   variables: {
    //     request: { publicationId: id },
    //     reactionRequest: currentProfile
    //       ? { profileId: currentProfile?.id }
    //       : null,
    //     profileId: currentProfile?.id ?? null
    //   },
    //   skip: !id
    // });
    const { isLoading, error, data } = usePublicationQuery(
        {
          request: {
             publicationId: id
          },
        },
        {
          refetchOnWindowFocus: false,
          refetchOnReconnect: false,
        }
      );
  
    if (error) {
      return <CustomError />;
    }
  
    if (isLoading || !data) {
      return <PublicationPageShimmer />;
    }
  
    if (!data.publication) {
      return <NotFound />;
    }
  
    const { publication } = data as any;
    const canComment = publication?.canComment?.result;
  
    return (
      <GridLayout>
        <GridItemEight className="space-y-5">
          <Card>
            <SingleFeed publication={publication} showFull/>
          </Card>
          {/* {!publication?.hidden ? (
            canComment ? (
              <NewPublication publication={publication} />
            ) : (
              <CommentWarning />
            )
          ) : null} */}
          {/* <SingleFeed publication={publication} /> */}
          {/* <NoneRelevantFeed publication={publication} /> */}
        </GridItemEight>
        <GridItemFour className="space-y-5">
          <Card as="aside" className="p-5">
            <UserProfile
              profile={
                publication.__typename === 'Mirror'
                  ? publication?.mirrorOf?.profile
                  : publication?.profile
              }
            />
          </Card>
          {/* <RelevantPeople publication={publication} /> */}
          <OnchainMeta publication={publication} />
          <Footer />
        </GridItemFour>
      </GridLayout>
    );
  };
  
  export default ViewPost;