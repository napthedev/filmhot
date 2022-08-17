import { z } from "zod";

import { getSearchKeywords } from "@/services/search";

import { createRouter } from "../context";

export const searchRouter = createRouter().mutation("keywords", {
  input: z.object({
    keyword: z.string(),
  }),
  resolve: async ({ input }) => {
    const data = await getSearchKeywords(input.keyword);
    return data;
  },
});
