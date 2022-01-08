import axios from "../shared/axios";

export const getCategoryItems = async (categoryId: string, limit: number) =>
  (
    await axios.post("search/v1/search", {
      size: limit,
      params: "",
      category: categoryId,
    })
  ).data.data.searchResults;
