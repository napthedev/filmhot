import classNames from "classnames";
import { useAtom } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import {
  FaHistory,
  FaHome,
  FaSearch,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";

import { userAtom } from "@/store";
import { supabase } from "@/utils/supabase";

import ImageFade from "../Shared/ImageFade";

interface SidebarProps {
  sidebarActive: boolean;
  setSidebarActive: Function;
}

const Sidebar: FC<SidebarProps> = ({ sidebarActive, setSidebarActive }) => {
  const [user] = useAtom(userAtom);

  const router = useRouter();

  return (
    <>
      <div
        className={classNames(
          "flex-shrink-0 sm:sticky left-auto right-full sm:!right-0 sm:!left-0 fixed top-0 flex flex-col items-stretch py-10 pl-5 xl:pl-10 pr-0 w-[90vw] max-w-[288px] sm:max-w-none sm:w-16 xl:w-72 border-r border-gray-800 h-screen overflow-y-auto z-10 bg-dark sm:bg-transparent sm:!translate-x-0 transition-all duration-500",
          {
            "translate-x-full": sidebarActive,
            "translate-x-0": !sidebarActive,
          }
        )}
      >
        <Link href="/">
          <a className="flex gap-2 items-center">
            <img className="w-6 h-6" src="/icon.png" alt="" />
            <p className="font-semibold text-xl block sm:hidden xl:block">
              FilmHot
            </p>
          </a>
        </Link>

        <div className="mt-0 sm:mt-4 xl:mt-0 block sm:flex flex-col gap-0 sm:gap-4 xl:block xl:gap-0">
          <p className="text-gray-400 uppercase mt-10 mb-4 block sm:hidden xl:block">
            Menu
          </p>

          <div className="flex flex-col items-stretch gap-3">
            <Link href="/">
              <a
                className={classNames("flex items-center gap-2 transition", {
                  "text-primary border-r-4 border-primary hover:brightness-125":
                    router.pathname === "/",
                  "text-gray-400 hover:text-gray-300": router.pathname !== "/",
                })}
              >
                <FaHome className="w-6 h-6 fill-current" />
                <p className="block sm:hidden xl:block">Home</p>
              </a>
            </Link>

            <Link href="/history">
              <a
                className={classNames("flex items-center gap-2 transition", {
                  "text-primary border-r-4 border-primary hover:brightness-125":
                    router.pathname === "/history",
                  "text-gray-400 hover:text-gray-300":
                    router.pathname !== "/history",
                })}
              >
                <FaHistory className="w-6 h-6 fill-current" />
                <p className="block sm:hidden xl:block">History</p>
              </a>
            </Link>

            <Link href="/search">
              <a
                className={classNames(
                  "md:!hidden flex items-center gap-2 transition",
                  {
                    "text-primary border-r-4 border-primary hover:brightness-125":
                      router.pathname === "/search",
                    "text-gray-400 hover:text-gray-300":
                      router.pathname !== "/search",
                  }
                )}
              >
                <FaSearch className="w-6 h-6 fill-current" />
                <p className="block sm:hidden xl:block">Search</p>
              </a>
            </Link>
          </div>

          <p className="text-gray-400 uppercase mt-10 mb-4 block sm:hidden xl:block">
            Personal
          </p>

          {!user ? (
            <Link href="/sign-in">
              <a className="flex items-center gap-2 transition text-gray-400 hover:text-gray-300">
                <FaSignInAlt className="w-6 h-6 fill-current" />
                <p className="block sm:hidden xl:block">Sign In</p>
              </a>
            </Link>
          ) : (
            <div className="flex flex-col items-stretch gap-3">
              <div className="flex gap-2 items-center">
                <ImageFade
                  src={
                    user.user_metadata.avatar_url || user.user_metadata.picture
                  }
                  width={24}
                  height={24}
                  className="rounded-full"
                  alt=""
                />

                <p className="text-gray-400 block sm:hidden xl:block">
                  {user.user_metadata.full_name || user.user_metadata.name}
                </p>
              </div>
              <button
                onClick={() => supabase.auth.signOut()}
                className="flex items-center cursor-pointer gap-2 transition text-gray-400 hover:text-gray-300"
              >
                <FaSignOutAlt className="w-6 h-6 fill-current" />
                <p className="block sm:hidden xl:block">Sign Out</p>
              </button>
            </div>
          )}
        </div>
      </div>
      <div
        onClick={() => setSidebarActive(false)}
        className={classNames(
          "bg-[#00000080] z-[5] fixed top-0 left-0 w-full h-full transition-all duration-500 sm:!opacity-0",
          {
            "opacity-100 visible": sidebarActive,
            "opacity-0 invisible": !sidebarActive,
          }
        )}
      ></div>
    </>
  );
};

export default Sidebar;
