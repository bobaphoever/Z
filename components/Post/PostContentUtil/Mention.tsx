import Link from 'next/link';
import type { FC } from 'react';
import Slug from '../../Slug';
const stopEventPropagation = (event: any) => event.stopPropagation();

type MarkupLinkProps = {
    href?: string;
    title?: string;
};

const Mention: FC<MarkupLinkProps> = ({ href, title = href }) => {
  const handle = title?.slice(1);

  if (!handle) {
    return null;
  }

  return (
    <Link
      href={`/u/${handle}`}
      onClick={(event) => {
        stopEventPropagation(event);
      }}
    >
        <Slug slug={handle} prefix="@" className='font-semibold'/>
    </Link>
  );
};

export default Mention;