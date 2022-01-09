import axios from "../shared/axios";

export const getCategoryItems = async (categoryId: string, sort: string) =>
  (
    await axios.post("search/v1/search", {
      size: 20,
      params: "",
      category: categoryId,
      sort,
    })
  ).data.data.searchResults;
