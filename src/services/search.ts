import axios from "../shared/axios";

export const searchKeywords = async (keyword: string) =>
  (
    await axios.post(`search/searchLenovo`, {
      searchKeyWord: keyword,
      size: 10,
    })
  ).data.data.searchResults;
