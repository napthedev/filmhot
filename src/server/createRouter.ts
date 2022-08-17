import superjson from "superjson";

import { createRouter } from "./context";
import { homeRouter } from "./routers/home";
import { searchRouter } from "./routers/search";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("home.", homeRouter)
  .merge("search.", searchRouter);

export type AppRouter = typeof appRouter;
