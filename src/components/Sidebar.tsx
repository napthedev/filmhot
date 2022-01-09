import { Link, useLocation } from "react-router-dom";

import { FC } from "react";
import { auth } from "../shared/firebase";
import { resizeImage } from "../shared/constants";
import { signOut } from "firebase/auth";
import { useStore } from "../store";

const Sidebar: FC = () => {
  const location = useLocation();

  const currentUser = useStore((state) => state.currentUser);

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className="flex-shrink-0 sticky top-0 flex flex-col items-stretch py-10 pl-5 xl:pl-10 pr-0 w-16 xl:w-72 border-r border-gray-800 h-screen overflow-y-auto">
      <Link to="/" className="flex gap-2 items-center">
        <img className="w-6 h-6" src="/icon.png" alt="" />
        <p className="font-semibold text-xl hidden xl:block">FilmHot</p>
      </Link>

      <div className="mt-4 xl:mt-0 flex flex-col gap-4 xl:block xl:flex-row xl:gap-0">
        <p className="text-gray-400 uppercase mt-10 mb-4 hidden xl:block">
          Menu
        </p>

        <div className="flex flex-col items-stretch gap-3">
          <Link
            to="/"
            className={`flex items-center gap-2 transition ${
              location.pathname === "/"
                ? "text-primary border-r-4 border-primary hover:brightness-125"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <i className={`fas fa-home text-xl`}></i>
            <p className="hidden xl:block">Home</p>
          </Link>

          <Link
            to="/discovery"
            className={`flex items-center gap-2 transition ${
              location.pathname === "/discovery"
                ? "text-primary border-r-4 border-primary hover:brightness-125"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <i className={`fas fa-compass text-xl`}></i>
            <p className="hidden xl:block">Discovery</p>
          </Link>

          <Link
            to="/explore"
            className={`flex items-center gap-2 transition ${
              location.pathname === "/explore"
                ? "text-primary border-r-4 border-primary hover:brightness-125"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <i className={`fas fa-desktop text-xl`}></i>
            <p className="hidden xl:block">Explore</p>
          </Link>

          <Link
            to="/history"
            className={`flex items-center gap-2 transition ${
              location.pathname === "/history"
                ? "text-primary border-r-4 border-primary hover:brightness-125"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <i className={`fas fa-history text-xl`}></i>
            <p className="hidden xl:block">History</p>
          </Link>

          <Link
            to="/search"
            className={`md:!hidden flex items-center gap-2 transition ${
              location.pathname === "/search"
                ? "text-primary border-r-4 border-primary hover:brightness-125"
                : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <i className={`fas fa-search text-xl`}></i>
            <p className="hidden xl:block">Search</p>
          </Link>
        </div>

        <p className="text-gray-400 uppercase mt-10 mb-4 hidden xl:block">
          Personal
        </p>

        {!currentUser ? (
          <Link
            to={`/sign-in?redirect=${encodeURIComponent(location.pathname)}`}
            className="flex items-center cursor-pointer gap-2 transition text-gray-400 hover:text-gray-300"
          >
            <i className="fas fa-sign-in-alt text-xl"></i>
            <p className="hidden xl:block">Sign In</p>
          </Link>
        ) : (
          <div className="flex flex-col items-stretch gap-3">
            <div className="flex gap-2 items-center">
              <img
                className="w-[20px] h-[20px] rounded-full"
                src={resizeImage(currentUser.photoURL, "20", "20")}
                alt=""
              />

              <p className="text-gray-400 hidden xl:block">
                {currentUser.displayName}
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center cursor-pointer gap-2 transition text-gray-400 hover:text-gray-300"
            >
              <i className="fas fa-sign-out-alt text-xl"></i>
              <p className="hidden xl:block">Sign Out</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
