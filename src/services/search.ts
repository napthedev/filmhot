import { SearchResultItem, TopSearches } from "@/types/search";

import axios from "./client";

export const getSearchKeywords = async (keyword: string): Promise<string[]> =>
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

export const getTopSearches = async (): Promise<TopSearches> =>
  (await axios.get("search/v1/searchLeaderboard")).data.data.list;
