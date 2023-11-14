import { Web3Button } from "@thirdweb-dev/react";
import React, { useState } from "react";
import { LENS_CONTRACT_ABI, LENS_CONTRACT_ADDRESS } from "../const/contracts";
import { useCreatePost } from "../lib/useCreatePost";
import { Card } from "@/components/ui/Card";
import clsx from "clsx";
import { GridItemEight, GridItemFour, GridLayout } from "@/components/GridLayout";
import Footer from "@/components/Footer";
import ImagePreview from "@/components/ui/FilePreview";

export default function Create() {
  const [images, setImages] = useState<File[] | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { mutateAsync: createPost } = useCreatePost();

  return (
    <GridLayout>
      <GridItemEight className="space-y-5">
        <Card className="p-4">
          <div className="text-3xl text-gray-600 font-semibold ml-4 mt-4">
            Create New Post
          </div>
        <div className="w-11/12 pt-6 flex flex-col gap-4 ml-4">
          <div className='w-full flex flex-col gap-1'>
            <label className="w-full text-base font-medium text-gray-600" rel="title">
              Title
            </label>
            <input
              className="w-full text-sm rounded-lg px-4 py-2 hover:bg-slate-100 border-blue-200 border-solid border-2 bg-slate-50 text-gray-900 font-medium focus:ring-0 outline-none focus:border-blue-600"
              id="title"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              />
          </div>
          <div className='w-full flex flex-col gap-1'>
            <label className="w-full text-base font-medium text-gray-600" rel="description">
              Description
            </label>
            <textarea
              className="w-full text-sm rounded-lg px-4 py-2 hover:bg-slate-100 border-blue-200 border-solid border-2 bg-slate-50 text-gray-900 font-medium focus:ring-0 outline-none resize-none focus:border-blue-600" 
              rows={4}
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              />
          </div>
          <div className='w-full flex flex-col gap-1'>
            <label className="w-full text-base font-medium text-gray-600" rel="content">
              Content
            </label>
            <textarea
              className="w-full text-sm rounded-lg px-4 py-2 hover:bg-slate-100 border-blue-200 border-solid border-2 bg-slate-50 text-gray-900 font-medium focus:ring-0 outline-none resize-none focus:border-blue-600" 
              rows={8}
              id="contnet"
              onChange={(e) => setContent(e.target.value)}
              />
          </div>
          <div className='w-full flex flex-col gap-1'>
            <label className="w-full text-base font-medium text-gray-600" rel="content">
              Attachments
            </label>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  //convert `FileList` to `File[]`
                  const _files = Array.from(e.target.files);
                  setImages(_files);
                }
              }}
              multiple
              className={clsx({
                "file:bg-slate-50 file:text-blue-500 hover:file:bg-slate-100": true,
                "file:rounded-lg file:rounded-tr-none file:rounded-br-none": true,
                "file:px-4 file:py-2 file:mr-4 file:border-none file:hover:cursor-pointer": true,
                "hover:cursor-pointer border rounded-lg text-transparent": true,
              })+" w-full text-sm rounded-lg px-4 py-2 hover:bg-slate-100 border-blue-200 border-solid border-2 bg-slate-50 text-gray-900 font-medium focus:ring-0 outline-none resize-none focus:border-purple-600"}
            />
          </div>
          <div className="w-full p-2">
            <ImagePreview images={images? images : [] as File[]} setImages={setImages}/>
          </div>
          <div className='w-full flex flex-col gap-1'>
            <Web3Button
              className="px-4 py-2 hover:bg-blue-600 border-blue-600 border bg-blue-500 text-white text-sm font-bold focus:ring-0"
              contractAddress={LENS_CONTRACT_ADDRESS}
              contractAbi={LENS_CONTRACT_ABI}
              action={async () => {
                if (!images) return;

                return await createPost({
                  images,
                  title,
                  description,
                  content,
                });
              }}
            >
              Create Post
            </Web3Button>
          </div>
        </div>
        </Card>
      </GridItemEight>
      <GridItemFour>
        <Footer />
      </GridItemFour>
  </GridLayout>

  //     <Web3Button
  //        className="px-4 py-2 text-sm hover:bg-slate-100 border-blue-600 border-solid border-2 bg-slate-50 text-blue-600 font-semibold focus:ring-0"
  //       contractAddress={LENS_CONTRACT_ADDRESS}
  //       contractAbi={LENS_CONTRACT_ABI}
  //       action={async () => {
  //         if (!image) return;

  //         return await createPost({
  //           image,
  //           title,
  //           description,
  //           content,
  //         });
  //       }}
  //     >
  //       Create Post
  //     </Web3Button>

  );
}
