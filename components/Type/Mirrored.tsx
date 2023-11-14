import Slug from '@/components/Slug'
import { HiOutlineSwitchHorizontal } from 'react-icons/hi'
import Link from 'next/link'
import React from 'react'
import { Mirror } from '@/graphql/generated'

interface Props {
  publication: Mirror
}

const Mirrored: React.FC<Props> = ({ publication }) => {
  return (
    <div className="flex items-center pb-4 space-x-1 text-sm text-gray-500">
      <HiOutlineSwitchHorizontal className="w-4 h-4" />
      <div className="flex items-center space-x-1">
        <div>Mirrored from</div>
        <Link href={`/post/${publication?.mirrorOf?.id}`} className="font-semibold" onClick={(event) => event.stopPropagation()}>
          { 'post' }
        </Link>
        <div>by</div>
        <Link href={`/u/${publication?.mirrorOf?.profile?.handle}`} onClick={(event) => event.stopPropagation()}>
            <Slug slug={publication?.mirrorOf?.profile?.handle} prefix="@" className='font-semibold' />
        </Link>
      </div>
    </div>
  )
}

export default Mirrored
