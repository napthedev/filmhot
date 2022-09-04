import { z } from "zod";

import { getMovieDetail } from "@/services/movie";

import { createRouter } from "../context";

export const videoRouter = createRouter().query("info", {
  input: z.object({
    id: z.string(),
    category: z.number(),
    episodeIndex: z.number().nullish(),
  }),
  resolve: async ({ input, ctx: { res } }) => {
    res?.revalidate(
      input.category === 0
        ? `/movie/${input.id}`
        : `/tv/${input.id}/${input.episodeIndex}`
    );
    const data = await getMovieDetail(
      input.id,
      input.category as 0 | 1,
      input.episodeIndex || undefined
    );
    return data;
  },
});
