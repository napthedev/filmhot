import { FC } from "react";
import NavBar from "../components/NavBar";
import SearchBox from "../components/Search/SearchBox";
import SearchResult from "../components/Search/SearchResult";
import { useLocation } from "react-router-dom";

const Search: FC = () => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const query = searchParams.get("q");

  if (!query?.trim())
    return (
      <div className="flex justify-center mx-4 my-[200px]">
        <div className="w-full max-w-[400px] flex flex-col items-center gap-4">
          <h1 className="text-2xl">Search for your favorite movies</h1>
          <SearchBox />
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-stretch mx-[7vw]">
      <NavBar />
      <div>
        <h1 className="mb-6 text-3xl">Search result for {query}</h1>
      </div>
      <SearchResult query={query} />
    </div>
  );
};

export default Search;
