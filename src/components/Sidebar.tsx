import { Link, useLocation } from "react-router-dom";

import { FC } from "react";
import { SIDEBAR_LINKS } from "../shared/constants";
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
    <div className="flex-shrink-0 sticky top-0 flex flex-col items-stretch p-10 pr-0 w-72 border-r border-gray-800 h-screen overflow-y-auto">
      <Link to="/" className="flex gap-2 items-center">
        <img className="w-6 h-6" src="/icon.png" alt="" />
        <p className="font-semibold text-xl">FilmHot</p>
      </Link>

      <div>
        <p className="text-gray-400 uppercase mt-10 mb-4">Menu</p>

        <div className="flex flex-col items-stretch gap-3">
          {SIDEBAR_LINKS.map((item) => (
            <Link
              to={item.link as string}
              className={`flex items-center gap-2 transition ${
                location.pathname === item.link
                  ? "text-primary border-r-4 border-primary hover:brightness-125"
                  : "text-gray-400 hover:text-gray-300"
              }`}
              key={item.link}
            >
              <i className={`fas fa-${item.icon} text-xl`}></i>
              <p>{item.name}</p>
            </Link>
          ))}
        </div>

        <p className="text-gray-400 uppercase mt-10 mb-4">Personal</p>

        {!currentUser ? (
          <Link
            to={`/sign-in?redirect=${encodeURIComponent(location.pathname)}`}
            className="flex items-center cursor-pointer gap-2 transition text-gray-400 hover:text-gray-300"
          >
            <i className="fas fa-sign-in-alt text-xl"></i>
            <p>Sign In</p>
          </Link>
        ) : (
          <div className="flex flex-col items-stretch gap-3">
            <div className="flex gap-2 items-center">
              <img
                className="w-[20px] h-[20px] rounded-full"
                src={resizeImage(currentUser.photoURL, "20", "20")}
                alt=""
              />

              <p className="text-gray-400">{currentUser.displayName}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center cursor-pointer gap-2 transition text-gray-400 hover:text-gray-300"
            >
              <i className="fas fa-sign-out-alt text-xl"></i>
              <p>Sign Out</p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
