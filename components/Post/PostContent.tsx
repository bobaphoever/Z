import { Regex } from '@/const/regex';
import type { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
// @ts-expect-error
import linkifyRegex from 'remark-linkify-regex';
import stripMarkdown from 'strip-markdown';

import Code from './PostContentUtil/Code';
import MarkupLink from './PostContentUtil';

const plugins = [
  [stripMarkdown, { keep: ['strong', 'emphasis', 'inlineCode'] }],
  remarkBreaks,
  linkifyRegex(Regex.url),
  linkifyRegex(Regex.mention),
  linkifyRegex(Regex.hashtag)
];

const trimify = (value: string): string => value?.replace(/\n\n\s*\n/g, '\n\n').trim();
const components = {
  a: MarkupLink,
  code: Code
};

interface MarkupProps {
  children: string;
  className?: string;
  matchOnlyUrl?: boolean;
}

const PostContent: FC<MarkupProps> = ({ children, className = '' }) => {
  return (
    <ReactMarkdown
      className={className}
      components={components}
      remarkPlugins={plugins}
    >
      {trimify(children)}
    </ReactMarkdown>
  );
};

export default PostContent;
