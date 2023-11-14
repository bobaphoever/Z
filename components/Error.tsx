import Head from 'next/head'
import Image from 'next/image'

export default function CustomError() {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/favicon.svg" />
        <link
          href="https://assets.lenster.xyz/css/font.css"
          rel="stylesheet"
        />
        <title>Error</title>
      </Head>
      <body>
        <div className="flex-col page-center">
          <Image
            src={`/nyan-cat-nyan.gif`}
            alt="Nyan Cat"
            className="h-60 w-60 object-fill"
            height={60}
            width={120}
          />
          <div className="py-10 text-center">
            <h1 className="mb-4 text-3xl font-bold">
              Looks like something went wrong!
            </h1>
            <div className="mb-4">
              We track these errors automatically, but if the problem persists feel
              free to contact us. In the meantime, try refreshing.
            </div>
          </div>
        </div>
      </body>
    </>
  )
}
