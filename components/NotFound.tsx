import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/Button'
import { PiHouseBold } from 'react-icons/pi'
import Head from 'next/head'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 Not Found</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/image2vector.svg" />
        <link
          href="https://assets.lenster.xyz/css/font.css"
          rel="stylesheet"
        />
      </Head>
      <body>
        <div className="flex-col page-center mt-32 flex justify-center items-center overflow-hidden">
          <Image
            src={`/nyan-cat-nyan.gif`}
            alt="Nyan Cat"
            className="h-60 w-60 object-fill"
            height={60}
            width={120}
          />
          <div className="py-10 text-center">
          <h1 className="mb-4 text-3xl font-bold">
              Oops, Lost‽
            </h1>
            <div className="mb-4 font-medium">
              This page could not be found.
            </div>
            <div className="mb-4">
            <Link href="/">
              <Button
                className="mx-auto flex items-center py-3 px-6 bg-blue-600 hover:bg-blue-700"
                size="lg"
                icon={<PiHouseBold className="h-4 w-4" />}
              >
                <span className='font-medium'>
                  Go to home
                </span>
              </Button>
            </Link>
            </div>
          </div>
        </div>
      </body>
    </>
  )
}
