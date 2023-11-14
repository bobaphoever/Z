import PostContent from '@/components/Post/PostContent';
import Slug from '@/components/Slug';
import { Profile } from '@/graphql/generated';
import { useRouter } from 'next/router';
import { Dispatch, FC } from 'react';
import {
    LENS_CONTRACT_ABI,
    LENS_CONTRACT_ADDRESS,
  } from "../../const/contracts";

import { useFollow } from "../../lib/useFollow";

//@ts-ignore
import { MediaRenderer, Web3Button } from "@thirdweb-dev/react";
import Image from 'next/image';
import { formatUsername } from '../UserProfile';
import Followerings from './Followerings';
import Link from 'next/link';
import { PiGlobeBold, PiHashBold, PiMapPinLineBold, PiTwitterLogoBold, PiUserPlus } from 'react-icons/pi';
import { Tooltip } from './Tooltip';

interface DetailsProps {
  profile: Profile;
}

import type { Attribute, Maybe } from '@/graphql/generated'

type Key =
  | 'hasPrideLogo'
  | 'app'
  | 'twitter'
  | 'location'
  | 'website'
  | 'statusEmoji'
  | 'statusMessage';


const getProfileAttribute = (
    attributes: Maybe<Attribute[]> = [],
    key: Key
  ): string => {
    const attribute = attributes?.find((attr) => attr.key === key);
    return attribute?.value ?? '';
  };
  

const Details: FC<DetailsProps> = ({ profile }) => {
    
  const { mutateAsync: followUser } = useFollow();
  const router = useRouter();
  const MetaDetails = ({
    children,
    icon,
    dataTestId = ''
  }: {
    children: React.ReactNode;
    icon: React.ReactNode;
    dataTestId?: string;
  }) => (
    <div className="flex items-center gap-2 align-middle w-4/5" data-testid={dataTestId}>
      <span className='text-purple-600'>{icon}</span>
      <div className="text-sm font-medium text-gray-800 truncate">{children}</div>
    </div>
  );

  return (
    <div className="mb-4 space-y-5 px-5 sm:px-0">
      <div className="relative -mt-24 h-40 w-40 sm:-mt-32 sm:h-52 sm:w-52">
        <MediaRenderer
            // @ts-ignore
            src={profile?.picture?.original?.url || "/nyan-cat-nyan.gif"}
            alt={profile?.name || profile?.handle || ""}
            className='h-52 w-52 cursor-pointer rounded-xl bg-gray-200 ring-8 ring-gray-50 dark:bg-gray-700 dark:ring-black sm:h-52 sm:w-52'
            height='13rem'
            width='13rem'
            style={{
                objectFit: 'cover'
            }}
          />
      </div>
      <div className="space-y-1 py-2">
        <div className="flex items-center gap-1.5 text-2xl font-bold">
          <div className="truncate" data-testid="profile-name">
            {profile?.name ?? profile?.handle}
          </div>
        </div>
        <div
          className="flex items-center space-x-3"
          data-testid="profile-handle"
        >
          {profile?.name ? (
            <Slug
              className="text-sm sm:text-base font-semibold"
              slug={profile?.handle}
              prefix="@"
            />
          ) : (
            <Slug
              className="text-sm sm:text-base font-semibold"
              slug={formatUsername(profile?.ownedBy)}
            />
          )}
        </div>
      </div>
      {profile?.bio && (
        <div
          className="markup linkify text-base mr-0 break-words sm:mr-10 font-medium w-4/5"
        >
          <PostContent>{profile?.bio}</PostContent>
        </div>
      )} 
      <div className="space-y-5">
        <Followerings profile={profile} />
        <div className="flex items-center space-x-2">
          {
        //   currentProfile?.id === profile.id ? (
        //     <Link href="/settings">
        //       <Button
        //         variant="secondary"
        //         icon={<PiGear className="h-5 w-5" />}
        //         outline
        //       >
        //         Edit Profile
        //       </Button>
        //     </Link>
        //   ) : (
            //   <Follow
            //     profile={profile}
            //     setFollowing={setFollowing}
            //     followUnfollowSource={FollowUnfollowSource.PROFILE_PAGE}
            //     showText
            //   />
            <Web3Button
              className="px-4 py-2 text-sm hover:bg-slate-100 border-purple-600 border-solid border-2 bg-slate-50 text-purple-600 font-semibold focus:ring-0"
                contractAddress={LENS_CONTRACT_ADDRESS}
                contractAbi={LENS_CONTRACT_ABI}
                action={async () => await followUser(profile?.id)}
                >
                <PiUserPlus className="h-4 w-4" /> Follow
            </Web3Button>
          }
          {/* <ProfileMenu profile={profile} /> */}
        </div>        
        <div className="divider w-full" />
        <div className="space-y-2">
          <MetaDetails
            icon={<PiHashBold className="h-4 w-4" />}
            dataTestId="profile-meta-id"
          >
            <Tooltip content={`#${profile?.id}`}>
              <Link
                href={`https://rarible.com/token/polygon/${
                    `0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d`
                }:${parseInt(profile?.id)}`}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
              >
                {parseInt(profile?.id)}
              </Link>
            </Tooltip>
          </MetaDetails>
          {getProfileAttribute(profile?.attributes, 'location') && (
            <MetaDetails
              icon={<PiMapPinLineBold className="h-4 w-4" />}
              dataTestId="profile-meta-location"
            >
              {getProfileAttribute(profile?.attributes, 'location')}
            </MetaDetails>
          )}
          {profile?.onChainIdentity?.ens?.name && (
            <MetaDetails
              icon={
                <Image
                  src={`/ens.svg`}
                  className="h-4 w-4"
                  height={16}
                  width={16}
                  alt="ENS Logo"
                />
              }
              dataTestId="profile-meta-ens"
            >
              {profile?.onChainIdentity?.ens?.name}
            </MetaDetails>
          )}
          {getProfileAttribute(profile?.attributes, 'website') && (
            <MetaDetails
              icon={ <PiGlobeBold className="h-4 w-4" height={16} width={16} /> }
              dataTestId="profile-meta-website"
            >
              <Link
                href={`https://${getProfileAttribute(
                  profile?.attributes,
                  'website'
                )
                  ?.replace('https://', '')
                  .replace('http://', '')}`}
                target="_blank"
                rel="noreferrer noopener me"
              >
                {getProfileAttribute(profile?.attributes, 'website')
                  ?.replace('https://', '')
                  .replace('http://', '')}
              </Link>
            </MetaDetails>
          )}
          {getProfileAttribute(profile?.attributes, 'twitter') && (
            <MetaDetails
              icon={<PiTwitterLogoBold className="h-4 w-4" height={16} width={16} />}
              dataTestId="profile-meta-twitter"
            >
              <Link
                href={`https://twitter.com/${getProfileAttribute(
                  profile?.attributes,
                  'twitter'
                )?.replace('https://twitter.com/', '')}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {getProfileAttribute(profile?.attributes, 'twitter')?.replace(
                  'https://twitter.com/',
                  ''
                )}
              </Link>
            </MetaDetails>
          )}
        </div>
      </div>
    </div>
  );
};

export default Details;