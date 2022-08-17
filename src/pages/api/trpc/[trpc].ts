import { createNextApiHandler } from "@trpc/server/adapters/next";

import { createContext } from "@/server/context";
import { appRouter } from "@/server/createRouter";

export default createNextApiHandler({
  router: appRouter,
  createContext: createContext,
});
