import { SearchConfig } from "../shared/types";
import axios from "../shared/axios";

export const getSearchConfig = async (): Promise<SearchConfig[]> =>
  (await axios.get("search/list")).data.data;

export const advanceSearch = async (
  params: string,
  configs: { [key: string]: any }
) =>
  (
    await axios.post("search/v1/search", {
      size: 100,
      params,
      ...configs,
    })
  ).data.data.searchResults;
