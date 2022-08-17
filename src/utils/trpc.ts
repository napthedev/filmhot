import { createReactQueryHooks } from "@trpc/react";

import type { AppRouter } from "../server/createRouter";

export const trpc = createReactQueryHooks<AppRouter>();
