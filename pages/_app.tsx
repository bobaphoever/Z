import "../styles/globals.css";
import { Inter } from 'next/font/google'

import { ModalProvider } from '@/providers/modal-provider'
import { ToastProvider } from '@/providers/toast-provider'
import { ThemeProvider } from '@/providers/theme-provider'

import NextNprogress from 'nextjs-progressbar'
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import { ScrollArea } from '@/components/ui/scroll-area'

//@ts-ignore
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import Head from "next/head";

const inter = Inter({ subsets: ['latin'] })


export default function App({ Component, pageProps }: AppProps) {
  
  const desiredChainId = ChainId.Polygon;
  const queryClient = new QueryClient();

  return (
    <ThirdwebProvider activeChain={desiredChainId} clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT}>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider 
          // attribute="class" 
          // defaultTheme="light" 
          enableSystem
        >
          <Head>
              <title>Z</title>
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0, viewport-fit=cover"
              />
          </Head>
          <NextNprogress
            color="#8b5cf6"
            height={2}
            options={{ showSpinner: false }}
            showOnShallow
          />
          <ToastProvider />
          <ModalProvider />
          <div className="flex flex-col h-screen">
            <Navbar />
            <ScrollArea className="flex-auto w-screen overflow-hidden">
              <Component {...pageProps} className={inter.className} />
            </ScrollArea>
          </div>
        </ThemeProvider>
      </QueryClientProvider>
    </ThirdwebProvider>
  );
}
