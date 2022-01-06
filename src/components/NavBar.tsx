import { FC } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./Search/SearchBox";

const NavBar: FC = () => {
  return (
    <div className="flex justify-between items-center my-7">
      <Link to="/" className="flex items-center gap-2 text-2xl">
        <img className="w-8 h-8" src="/icon.png" alt="" />
        <span>FilmHot</span>
      </Link>

      <div className="max-w-[500px]">
        <SearchBox />
      </div>
    </div>
  );
};

export default NavBar;
