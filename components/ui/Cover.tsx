import type { FC } from 'react';
import colors from 'tailwindcss/colors';

//@ts-ignore
import { MediaRenderer } from "@thirdweb-dev/react";

interface CoverProps {
  cover: string;
}

const Cover: FC<CoverProps> = ({ cover }) => {
  return (
    <MediaRenderer
        className="h-52 sm:h-80 bg-purple-500 w-full object-cover bg-center"
        src={cover === 'none' ? '/public/2.png' : cover }
        alt={" "}
        height={"320px"}
        width={"100vw"}
        style={{
            objectFit: 'cover'
        }}
    />
  );
};

export default Cover;