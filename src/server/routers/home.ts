import { z } from "zod";

import { getHome } from "@/services/home";

import { createRouter } from "../context";

export const homeRouter = createRouter().query("infinite", {
  input: z.object({
    cursor: z.number().nullish(),
  }),
  resolve: async ({ input }) => {
    const data = await getHome(input.cursor || 0);
    return data;
  },
});
