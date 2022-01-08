import { FC } from "react";
import MovieGrid from "../MovieGrid";
import { searchWithKeyword } from "../../services/search";
import useSWR from "swr";

interface SearchResultProps {
  query: string;
}

const SearchResult: FC<SearchResultProps> = ({ query }) => {
  const { data, error } = useSWR(`search-${query}`, () =>
    searchWithKeyword(query)
  );

  if (error) return <div>Error</div>;

  return <MovieGrid data={data} />;
};

export default SearchResult;
