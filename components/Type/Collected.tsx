import Slug from '@/components/Slug'
import { LensterPost } from '@/generated/lenstertypes'
import { HiOutlineCollection } from 'react-icons/hi'
import Link from 'next/link'
import React from 'react'

interface Props {
  publication: LensterPost
}

const Collected: React.FC<Props> = ({ publication }) => {
  return (
    <div className="flex items-center pb-4 space-x-1 text-sm text-gray-500">
      <HiOutlineCollection className="w-4 h-4" />
      <div className="flex items-center space-x-1">
        <div>Collected by</div>
        {/* @ts-ignore */}
        <Link href={`/u/${publication?.collectedBy?.defaultProfile?.handle}`}>
          {/* <a> */}
            {/* @ts-ignore */}
            <Slug slug={publication?.collectedBy?.defaultProfile?.handle} prefix="@" />
          {/* </a> */}
        </Link>
      </div>
    </div>
  )
}

export default Collected
