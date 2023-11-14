import clsx from 'clsx';
import type { FC } from 'react';

interface SlugProps {
  slug: string;
  prefix?: string;
  className?: string;
}

const Slug: FC<SlugProps> = ({ slug, prefix, className = '' }) => {
  return (
    <span
      className={clsx(
        'from-brand-600 dark:text-white text-blue-600',
        className
      )}
      onClick={(event) => event.stopPropagation()}
    >
      {prefix}
      {slug}
    </span>
  );
};

export default Slug;