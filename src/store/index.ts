import { User } from "../shared/types";
import create from "zustand";

interface Store {
  currentUser: null | undefined | User;

  setCurrentUser: (user: any) => void;
}

export const useStore = create<Store>((set: any) => ({
  currentUser: undefined,
  setCurrentUser: (user: any) => set({ currentUser: user }),
}));
