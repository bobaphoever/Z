import TabButton  from '@/components/ui/TabButton';
import type { Dispatch, FC } from 'react';
import { PiChatsDuotone, PiFilmReelBold, PiPencilBold } from 'react-icons/pi';
import { HiOutlineCollection } from 'react-icons/hi';

enum ProfileFeedType {
Feed = 'FEED',
Replies = 'REPLIES',
Media = 'MEDIA',
Collects = 'COLLECTS',
Nft = 'NFT',
Stats = 'STATS'
}

 
interface FeedTypeProps {
setFeedType: Dispatch<string>;
feedType: string;
}

const FeedType: FC<FeedTypeProps> = ({ setFeedType, feedType }) => {
const switchTab = (type: string) => {
    setFeedType(type);
};

return (
    <div className="flex items-center justify-between">
    <div className="mt-3 flex gap-3 overflow-x-auto px-5 pb-2 sm:mt-0 sm:px-0 md:pb-0">
        <TabButton
        name={`Feed`}
        icon={<PiPencilBold className="h-4 w-4" />}
        active={feedType === ProfileFeedType.Feed}
        type={ProfileFeedType.Feed.toLowerCase()}
        onClick={() => switchTab(ProfileFeedType.Feed)}
        />
        <TabButton
        name={`Replies`}
        icon={<PiChatsDuotone className="h-4 w-4" />}
        active={feedType === ProfileFeedType.Replies}
        type={ProfileFeedType.Replies.toLowerCase()}
        onClick={() => switchTab(ProfileFeedType.Replies)}
        />
        <TabButton
        name={`Media`}
        icon={<PiFilmReelBold className="h-4 w-4" />}
        active={feedType === ProfileFeedType.Media}
        type={ProfileFeedType.Media.toLowerCase()}
        onClick={() => switchTab(ProfileFeedType.Media)}
        />
        <TabButton
        name={`Collected`}
        icon={<HiOutlineCollection className="h-4 w-4" />}
        active={feedType === ProfileFeedType.Collects}
        type={ProfileFeedType.Collects.toLowerCase()}
        onClick={() => switchTab(ProfileFeedType.Collects)}
        />
    </div>
    {/* <div>{feedType === ProfileFeedType.Media && <MediaFilter />}</div> */}
    </div>
);
};

export default FeedType;