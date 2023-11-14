import { Profile } from '@/generated/types'
import Link from 'next/link'
import React, { useState } from 'react'

// import Follow from './Follow'
import Slug from './Slug'
// import Unfollow from './Unfollow'
// import Image from 'next/image'

//@ts-ignore
import { MediaRenderer } from "@thirdweb-dev/react";

interface Props {
  profile: Profile
  showFollow?: boolean
  followStatusLoading?: boolean
  isFollowing?: boolean
}

export const formatUsername = (username: string | null | undefined) => {
    if (!username) return ''
  
    let regex = /^0x[a-fA-F0-9]{40}$/g
    if (username.match(regex)) {
      // Skip over ENS names
      if (username.includes('.')) return username
  
      return `${username.slice(0, 4)}…${username.slice(
        username.length - 4,
        username.length
      )}`
    } else {
      return username
    }
  }  

const stopEventPropagation = (event: any) => event?.stopPropagation();
const UserProfile: React.FC<Props> = ({
  profile,
  showFollow = false,
  followStatusLoading = false,
  isFollowing = false
}) => {
  const [following, setFollowing] = useState<boolean>(isFollowing)

  return (
    <div className="flex items-center justify-between">
      <Link href={`/u/${profile?.handle}`} onClick={(event) => event.stopPropagation()}>
          <div className="flex items-center space-x-3">
            <MediaRenderer
                // @ts-ignore
                src={profile?.picture?.original?.url || "/nyan-cat-nyan.gif"}
                alt={""}
                className="w-10 h-10 bg-gray-200 border rounded-full"
                height={"56px"}
                width={"56px"}
                />
            <div className='h-full'>
                <div className='flex flex-col items-start justify-between'>
                    <span  className="text-md font-medium">
                        {profile?.name || profile?.handle}
                    </span>
                    {
                    profile?.name ? (
                        <Slug className="text-sm" slug={profile?.handle} prefix="@" />
                    ) : (
                        <Slug
                        className="text-sm"
                        slug={formatUsername(profile?.ownedBy)}
                        />
                    )}
                    </div>
                </div>
          </div> 
        {/* </a> */}
    </Link>
      {/* 
      {showFollow &&
        (followStatusLoading ? (
          <div className="w-10 h-8 rounded-lg shimmer" />
        ) : following ? (
          <Unfollow profile={profile} setFollowing={setFollowing} />
        ) : (
          <Follow profile={profile} setFollowing={setFollowing} />
        ))} */}
    </div>
  )
}

export default UserProfile
