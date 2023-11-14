import Image from "next/image"

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center flex-grow h-screen animate-pulse">
      <Image className="h-28 w-28" src="/image2vector.svg" alt="Logo" width={28} height={28} />
    </div>
  )
}

export default Loading
