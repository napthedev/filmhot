import { HomeSection } from "../types/home";
import axios from "./client";

export const getHome = async (page = 0): Promise<HomeSection[]> => {
  try {
    const data = (
      await axios.get("homePage/getHome", {
        params: {
          page,
        },
      })
    ).data.data.recommendItems.filter(
      (section: any) => section.homeSectionType !== "BLOCK_GROUP"
    );

    if (!data) {
      return [];
    }

    return data;
  } catch (error) {
    return [];
  }
};
