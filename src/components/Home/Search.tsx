import { FC } from "react";

const Search: FC = () => {
  return (
    <div>
      <form className="relative">
        <input
          className="bg-transparent outline-none border border-gray-600 w-full rounded-full py-2 pl-4 pr-8"
          type="text"
          placeholder="Search..."
        />
        <button className="absolute right-2 top-1/2 -translate-y-1/2">
          <i className="bx bx-search text-xl"></i>
        </button>
      </form>
    </div>
  );
};

export default Search;
