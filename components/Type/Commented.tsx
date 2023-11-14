import Slug from '@/components/Slug'
import { PiChats } from 'react-icons/pi'
import Link from 'next/link'
import React from 'react'
import { Comment } from '@/graphql/generated'

interface Props {
  publication: Comment
}

const Commented: React.FC<Props> = ({ publication }) => {
  return (
    <div className="flex items-center pb-4 space-x-1 text-sm text-gray-500">
      <PiChats className="w-4 h-4" />
      <div className="flex items-center space-x-1">
        <span>Commenting on </span>
        <Link href={`/post/${publication?.mainPost?.id}`} className='font-semibold' onClick={(event) => event.stopPropagation()}>
          {" post "}
        </Link>
        <span>by</span> 
        <Link href={`/u/${publication?.mainPost?.profile?.handle}`} onClick={(event) => event.stopPropagation()}>
            <Slug slug={publication?.mainPost?.profile?.handle} prefix="@" className='font-semibold'/>
        </Link>
      </div>
    </div>
  )
}

export default Commented
