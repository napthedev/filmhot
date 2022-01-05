import { HomeSection, TopSearched } from "../shared/types";

import axios from "../shared/axios";
import normalAxios from "axios";

export const getHome = async (page: number = 0): Promise<HomeSection[]> => {
  try {
    const data = (
      await axios.get("homePage/getHome", {
        params: {
          page,
        },
      })
    ).data.data.recommendItems;

    if (data) return data;
    else throw new Error("");
  } catch (error) {
    const data = (
      await normalAxios.get("https://filmhot-backup.napdev.workers.dev")
    ).data;

    return data;
  }
};

export const getTopSearched = async (): Promise<TopSearched[]> =>
  (await axios.get("search/v1/searchLeaderboard")).data.data.list;
