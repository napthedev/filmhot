import { FC, Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

import { SIDEBAR_LINKS } from "../shared/constants";

const Sidebar: FC = () => {
  const location = useLocation();

  return (
    <div className="flex-shrink-0 sticky top-0 flex flex-col items-stretch p-10 pr-0 w-72 border-r border-gray-800 h-screen overflow-y-auto">
      <Link to="/" className="flex gap-2 items-center">
        <img className="w-6 h-6" src="/icon.png" alt="" />
        <p className="font-semibold text-xl">FilmHot</p>
      </Link>

      <div>
        {SIDEBAR_LINKS.map((section) => (
          <div key={section.title}>
            <p className="text-gray-400 uppercase mt-10 mb-4">
              {section.title}
            </p>

            <div className="flex flex-col items-stretch gap-3">
              {section.children.map((item) => (
                <Fragment key={item.name}>
                  {item.auth ? (
                    <div
                      className={`flex items-center cursor-pointer gap-2 transition text-gray-400 hover:text-gray-300`}
                    >
                      <i className={`bx bx-log-out text-2xl`}></i>
                      <p>Sign Out</p>
                    </div>
                  ) : (
                    <Link
                      to={item.link as string}
                      className={`flex items-center gap-2 transition ${
                        location.pathname === item.link
                          ? "text-primary border-r-4 border-primary hover:text-primary-lighten hover:border-primary-lighten"
                          : "text-gray-400 hover:text-gray-300"
                      }`}
                      key={item.link}
                    >
                      <i
                        className={`bx ${
                          location.pathname === item.link ? "bxs" : "bx"
                        }-${item.icon} text-2xl`}
                      ></i>
                      <p>{item.name}</p>
                    </Link>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
