import Link from 'next/link';
import type { FC } from 'react';
import { PiHash } from 'react-icons/pi';
const stopEventPropagation = (event: any) => event.stopPropagation();

type MarkupLinkProps = {
    href?: string;
    title?: string;
};

const Hashtag: FC<MarkupLinkProps> = ({ href, title = href }) => {
  if (!title) {
    return null;
  }

  return (
    <span className="inline-flex items-center space-x-1">
      <span>
        <Link
          href={`/search?q=${title.slice(1)}&type=pubs&src=link_click`}
          onClick={(event) => {
            stopEventPropagation(event);
          }}
          className='text-amber-500 flex gap-1 align-middle items-center font-medium'
        >
          <PiHash /> {title.slice(1)}
        </Link>
      </span>
    </span>
  );
};

export default Hashtag;