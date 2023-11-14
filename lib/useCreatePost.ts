import { useMutation } from "@tanstack/react-query";
import { useSDK, useStorageUpload } from "@thirdweb-dev/react";
import {
  PublicationMainFocus,
  useCreatePostTypedDataMutation,
} from "../graphql/generated";
import useLensUser from "./auth/useLensUser";
import { signTypedDataWithOmmittedTypename, splitSignature } from "./helpers";
import { v4 as uuidv4 } from "uuid";
import { LENS_CONTRACT_ABI, LENS_CONTRACT_ADDRESS } from "../const/contracts";
import useLogin from "./auth/useLogin";

type CreatePostArgs = {
  images: File[];
  title: string;
  description: string;
  content: string;
};

export function useCreatePost() {
  const { mutateAsync: requestTypedData } = useCreatePostTypedDataMutation();
  const { mutateAsync: uploadToIpfs } = useStorageUpload();
  const { profileQuery } = useLensUser();
  const sdk = useSDK();
  const { mutateAsync: loginUser } = useLogin();

  async function createPost({
    images,
    title,
    description,
    content,
  }: CreatePostArgs) {
    console.log("createPost", images, title, description, content);
    // 0. Login
    await loginUser();

    // 0. Upload the image to IPFS
    const imageIpfsUrls = (await uploadToIpfs({ data: images }));

    console.log("imageIpfsUrls", imageIpfsUrls);

    // 0B) Upload the actual content to IPFS
    // This is going to be a Object which contains the image field as well
    const postMetadata = {
      version: "2.0.0",
      mainContentFocus: PublicationMainFocus.TextOnly,
      metadata_id: uuidv4(),
      description: description,
      locale: "en-US",
      content: content,
      external_url: null,
      images: imageIpfsUrls,
      imageMimeType: null,
      name: title,
      attributes: [],
      tags: [],
    };

    const postMetadataIpfsUrl = (
      await uploadToIpfs({ data: [postMetadata] })
    )[0];

    console.log("postMetadataIpfsUrl", postMetadataIpfsUrl);

    // 1. Ask Lens to give us the typed data
    const typedData = await requestTypedData({
      request: {
        collectModule: {
          freeCollectModule: {
            followerOnly: false,
          },
        },
        referenceModule: {
          followerOnlyReferenceModule: false,
        },
        contentURI: postMetadataIpfsUrl,
        profileId: profileQuery.data?.defaultProfile?.id,
      },
    });

    const { domain, types, value } = typedData.createPostTypedData.typedData;

    if (!sdk) return;

    // 2. Sign the typed data
    const signature = await signTypedDataWithOmmittedTypename(
      sdk,
      domain,
      types,
      value
    );

    const { v, r, s } = splitSignature(signature.signature);

    // 3. Use the signed typed data to send the transaction to the smart contract
    const lensHubContract = await sdk.getContractFromAbi(
      LENS_CONTRACT_ADDRESS,
      LENS_CONTRACT_ABI
    );

    // Destructure the stuff we need out of the typedData.value field
    const {
      collectModule,
      collectModuleInitData,
      contentURI,
      deadline,
      profileId,
      referenceModule,
      referenceModuleInitData,
    } = typedData.createPostTypedData.typedData.value;

    const result = await lensHubContract.call("postWithSig", {
      //@ts-ignore
      profileId: profileId,
      contentURI: contentURI,
      collectModule,
      collectModuleInitData,
      referenceModule,
      referenceModuleInitData,
      sig: {
        v,
        r,
        s,
        deadline: deadline,
      },
    });

    console.log(result);
  }

  return useMutation(createPost);
}
