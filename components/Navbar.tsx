import Link from "next/link";
import React from "react";
import styles from "../styles/Header.module.css";
import SignInButton from "./SignInButton";
import Image from "next/image";
import clsx from 'clsx'
import { useRouter } from 'next/router'

interface NavItemProps {
  url: string
  name: string
  current: boolean
}

const NavItem = ({ url, name, current }: NavItemProps) => {
  return (
    <Link href={url} className={clsx('px-4 py-1 rounded-md font-semibold text-sm cursor-pointer', {
      'text-black dark:text-white bg-gray-200 dark:bg-gray-800 font-bold': current,
      'text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800':
        !current
      })}aria-current={current ? 'page' : undefined}>
        {name}
    </Link>
  )
}

const NavItems = () => {
  const router = useRouter()

  return (
    <>
      <NavItem url="/" name="Home" current={router.pathname == '/'} />
      <NavItem
        url="/explore"
        name="Explore"
        current={router.pathname == '/explore'}
      />
      <NavItem
        url="/create"
        name="Create"
        current={router.pathname == '/create'}
      />
    </>
  )
}

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-10 w-full bg-white border-b dark:bg-gray-800 dark:border-b-gray-700">
      <div className="container max-w-screen-xl px-5 mx-auto">
        <div className="relative flex items-center justify-between h-14 sm:h-16">
          <div className="flex items-center justify-start flex-1">
            <div className="flex items-center flex-shrink-0 space-x-3">
              <Link href="/">
                  <div className="text-3xl font-black">
                    <Image className="w-8 h-8" src="/image2vector.svg" alt="Logo" height={8} width={8}/>
                  </div>
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex items-center space-x-4">
                <div className="hidden md:block">
                  {/* <Search /> */}
                </div>
                <NavItems />
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center gap-5 pr-2 sm:static sm:inset-auto sm:pr-0 sm:ml-6">
            <div className="flex items-center gap-5">
              <SignInButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
