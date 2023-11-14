// components/ImagePreview.tsx
import React, { useEffect } from "react";
import Image from "next/image";
import { PiXCircleBold } from "react-icons/pi";

type Props = {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[] | null>>;
};

const ImagePreview = ({ images, setImages }: Props) => {
    
  const handleRemove = (image : File) => {
        const newImages = images.filter((file) => file !== image)
        setImages(newImages)
  }

  useEffect(()=>{

  },[images]);

  return (
      <div className="grid grid-cols-12 gap-2 my-2">
        {images.map((image) => {
          const src = URL.createObjectURL(image);
          return (
            <div className="relative aspect-video col-span-4 bg-slate-50 border-2 border-purple-500 rounded-md" key={image.name}>
                <button
                    onClick={() => handleRemove(image)} 
                    className="absolute top-0 right-0 outline-none z-10 bg-white/40 p-1 rounded-full backdrop-blur-md flex justify-center items-center m-1"
                >
                    <PiXCircleBold className="h-4 w-4 text-purple-600" />
                </button>
              <Image src={src} alt={image.name} className="object-contain" fill />
            </div>
          );
        })}
      </div>
  );
};

export default ImagePreview;