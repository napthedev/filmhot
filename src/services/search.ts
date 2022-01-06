import { SearchResultItem } from "../shared/types";
import axios from "../shared/axios";

export const searchKeywords = async (keyword: string): Promise<string[]> =>
  (
    await axios.post(`search/searchLenovo`, {
      searchKeyWord: keyword,
      size: 10,
    })
  ).data.data.searchResults;

export const searchWithKeyword = async (
  keyword: string
): Promise<SearchResultItem[]> =>
  (
    await axios.post("search/v1/searchWithKeyWord", {
      searchKeyWord: keyword,
      size: 50,
      sort: "",
      searchType: "",
    })
  ).data.data.searchResults;
