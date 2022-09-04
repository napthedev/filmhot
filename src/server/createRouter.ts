import superjson from "superjson";

import { createRouter } from "./context";
import { homeRouter } from "./routers/home";
import { searchRouter } from "./routers/search";
import { videoRouter } from "./routers/video";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("home.", homeRouter)
  .merge("search.", searchRouter)
  .merge("video.", videoRouter);

export type AppRouter = typeof appRouter;
