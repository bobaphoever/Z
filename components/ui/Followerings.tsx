// import { UsersIcon } from '@heroicons/react/outline';
// import { PROFILE } from '@lenster/data/tracking';
// import type { Profile } from '@lenster/lens';
import { Modal } from './Modal';
import { Profile } from '@/graphql/generated';
import type { FC } from 'react';
import { useState } from 'react';
import { PiUsers } from 'react-icons/pi';

// import Followers from './Followers';
// import Following from './Following';

interface FolloweringsProps {
  profile: Profile;
}

const humanize = (number: number): string => {
if (typeof number !== 'number' || isNaN(number)) {
    return '';
}

return number.toLocaleString();
};
  

const Followerings: FC<FolloweringsProps> = ({ profile }) => {
  const [showFollowingModal, setShowFollowingModal] = useState(false);
  const [showFollowersModal, setShowFollowersModal] = useState(false);

  return (
    <div className="flex gap-8">
      <button
        type="button"
        className="text-left"
        onClick={() => {
            setShowFollowingModal(!showFollowingModal);
        }}
      >
        <div className="text-xl font-medium">
          {humanize(profile?.stats?.totalFollowing)}
        </div>
        <div className="text-gray-500 font-medium">
            {"Following"}
        </div>
      </button>
      <button
        type="button"
        className="text-left"
        onClick={() => {
            setShowFollowersModal(!showFollowersModal);
          }}
      >
        <div className="text-xl font-medium">
          {humanize(profile?.stats?.totalFollowers)}
        </div>
        <div className="text-gray-500 font-medium">
          { "Followers" }
        </div>
      </button>
      <Modal
        title={'Following'}
        icon={<PiUsers className="text-brand h-5 w-5" />}
        show={showFollowingModal}
        onClose={() => setShowFollowingModal(false)}
      >
        {/* <Following profile={profile} /> */}
      </Modal>
      <Modal
        title={`Followers`}
        icon={<PiUsers className="text-brand h-5 w-5" />}
        show={showFollowersModal}
        onClose={() => setShowFollowersModal(false)}
      >
        {/* <Followers profile={profile} /> */}
      </Modal>
    </div>
  );
};

export default Followerings;