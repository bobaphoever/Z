import Link from 'next/link';
import type { FC } from 'react';
import { PiLink } from 'react-icons/pi';
const stopEventPropagation = (event: any) => event.stopPropagation();

type MarkupLinkProps = {
    href?: string;
    title?: string;
};

const ExternalLink: FC<MarkupLinkProps> = ({ href, title = href }) => {
  if (!href) {
    return null;
  }

  if (!href.includes('://')) {
    href = `https://${href}`;
  }

  return (
    <Link
      href={href}
      onClick={stopEventPropagation}
      target={href.includes(location.host) ? '_self' : '_blank'}
      rel="noopener"
      className='text-indigo-600 flex gap-1 align-middle items-center font-medium'
    >
      <PiLink />{title}
    </Link>
  );
};

export default ExternalLink;