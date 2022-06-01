import Image from 'next/image'

export default function ReloadPage() {
  return (
    <div className="w-full">
      <div className="container mx-auto h-96 justify-center flex items-center">
        <div className="w-1/2 bg-gray-150 flex items-center justify-center h-full">
          <h1 className="font-bold text-xl">Please refresh this page </h1>
        </div>
        <div className="w-1/2">
          <Image
            src="/refresh.png"
            height={300}
            width={750}
            alt="refresh page"
          />
        </div>
      </div>
    </div>
  )
}
