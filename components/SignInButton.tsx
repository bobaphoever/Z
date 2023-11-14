import {
  useAddress,
  useNetworkMismatch,
  useNetwork,
  ConnectWallet,
  ChainId,
  MediaRenderer,
} from "@thirdweb-dev/react";
import React from "react";
import useLensUser from "../lib/auth/useLensUser";
import useLogin from "../lib/auth/useLogin";

type Props = {};

export default function SignInButton({}: Props) {
  const address = useAddress(); // Detect the connected address
  const isOnWrongNetwork = useNetworkMismatch(); // Detect if the user is on the wrong network
  const [, switchNetwork] = useNetwork(); // Function to switch the network.
  const { isSignedInQuery, profileQuery } = useLensUser();
  const { mutate: requestLogin } = useLogin();

  // 1. User needs to connect their wallet
  if (!address) {
    return <ConnectWallet className="hover:bg-blue-600 border-purple-600 border bg-blue-500 text-white px-3 py-2 text-sm focus:ring-0" />;
  }

  // 2. User needs to switch network to Polygon
  if (isOnWrongNetwork) {
    return (
      <button onClick={() => switchNetwork?.(ChainId.Polygon)} className="hover:bg-blue-600 border-blue-600 border bg-blue-500 text-white px-3 py-2 text-sm focus:ring-0">
        Switch Network
      </button>
    );
  }

  // Loading their signed in state
  if (isSignedInQuery.isLoading) {
    return <div className="hover:bg-blue-600 border-blue-600 border bg-blue-500 text-white px-3 py-2 text-sm focus:ring-0" >Loading...</div>;
  }

  // If the user is not signed in, we need to request a login
  if (!isSignedInQuery.data) {
    return <button onClick={() => requestLogin()} className="hover:bg-purple-600 border-purple-600 border bg-purple-500 text-white px-3 py-2 text-sm focus:ring-0">Sign in with Lens</button>;
  }

  // Loading their profile information
  if (profileQuery.isLoading) {
    return <div className="hover:bg-blue-600 border-blue-600 border bg-blue-500 text-white px-3 py-2 text-sm focus:ring-0" >Loading...</div>;
  }

  // If it's done loading and there's no default profile
  if (!profileQuery.data?.defaultProfile) {
    return <div className="hover:bg-blue-600 border-blue-600 border bg-blue-500 text-white px-3 py-2 text-sm focus:ring-0" >No Lens Profile.</div>;
  }

  // If it's done loading and there's a default profile
  if (profileQuery.data?.defaultProfile) {
    return (
      <div>
        <MediaRenderer
          // @ts-ignore
          src={profileQuery?.data?.defaultProfile?.picture?.original?.url || ""}
          alt={profileQuery.data.defaultProfile.name || ""}
          style={{
            width: 48,
            height: 48,
            borderRadius: "50%",
          }}
        />
      </div>
    );
  }

  return <div className="hover:bg-blue-600 border-blue-600 border bg-blue-500 text-white px-3 py-2 text-sm focus:ring-0" >Something went wrong.</div>;
}
