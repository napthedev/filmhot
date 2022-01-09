import { FC } from "react";
import { Link } from "react-router-dom";
import SearchBox from "./Search/SearchBox";

const NavBar: FC = () => {
  return (
    <div className="flex justify-between items-center my-7">
      <Link to="/" className="flex items-center gap-2">
        <img className="w-8 h-8" src="/icon.png" alt="" />
        <span className="text-xl font-medium">FilmHot</span>
      </Link>

      <Link className="block md:hidden" to="/search">
        <i className="fas fa-search text-2xl"></i>
      </Link>

      <div className="max-w-[500px] hidden md:block">
        <SearchBox />
      </div>
    </div>
  );
};

export default NavBar;
