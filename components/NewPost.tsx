import useLensUser from '@/lib/auth/useLensUser';
import { Card } from '@/components/ui/Card';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import { PiPencilBold } from 'react-icons/pi';
// import { useGlobalModalStateStore } from 'src/store/modals';
// import { usePublicationStore } from 'src/store/publication';
import { useEffectOnce } from 'usehooks-ts';
//@ts-ignore
import { MediaRenderer } from "@thirdweb-dev/react";

const NewPost: FC = () => {
  const { query, isReady, push } = useRouter();
  const { profileQuery } = useLensUser();
  const currentProfile = profileQuery?.data?.defaultProfile;
//   const setShowNewPostModal = useGlobalModalStateStore(
//     (state : any) => state.setShowNewPostModal
//   );
//   const setPublicationContent = usePublicationStore(
//     (state : any) => state.setPublicationContent
//   );

  const openModal = () => {
    null;
    // setShowNewPostModal(true);
  };

  useEffectOnce(() => {
    if (isReady && query.text) {
      const { text, url, via, hashtags } = query;
      let processedHashtags;

      if (hashtags) {
        processedHashtags = (hashtags as string)
          .split(',')
          .map((tag) => `#${tag} `)
          .join('');
      }

      const content = `${text}${
        processedHashtags ? ` ${processedHashtags} ` : ''
      }${url ? `\n\n${url}` : ''}${via ? `\n\nvia @${via}` : ''}`;

    //   setShowNewPostModal(true);
    //   setPublicationContent(content);
    }
  });

  return (
    <Card className="space-y-3 p-5">
      <div className="flex items-center space-x-3">
        <MediaRenderer
            // @ts-ignore
            src={currentProfile?.picture?.original?.url || "/nyan-cat-nyan.gif"}
            alt={""}
            className="h-9 w-9 cursor-pointer rounded-full border bg-gray-200 dark:border-gray-700"
            height={"36px"}
            width={"36px"}
        />
        
        <button
          className="flex w-full items-center space-x-2 rounded-xl border bg-gray-100 px-4 py-2 dark:border-gray-700 dark:bg-gray-900"
          type="button"
          onClick={() => openModal()}
        >
          <PiPencilBold className="h-5 w-5" />
          <span>
            {`What's happening?`}
          </span>
        </button>
      </div>
    </Card>
  );
};

export default NewPost;