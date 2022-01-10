import { AdvanceSearchItem, SearchConfig } from "../shared/types";

import axios from "../shared/axios";

export const getSearchConfig = async (): Promise<SearchConfig[]> =>
  (await axios.get("search/list")).data.data;

export const advanceSearch = async (
  params: string,
  configs: { [key: string]: any },
  sort: string
): Promise<AdvanceSearchItem[]> =>
  (
    await axios.post("search/v1/search", {
      size: 20,
      params,
      ...configs,
      sort,
    })
  ).data.data.searchResults;
