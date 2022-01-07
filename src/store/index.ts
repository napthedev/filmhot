import create from "zustand";

interface Store {
  currentUser:
    | null
    | undefined
    | {
        uid: string;
        email: string;
        photoURL: string;
        displayName: string;
      };

  setCurrentUser: (user: any) => void;
}

export const useStore = create<Store>((set: any) => ({
  currentUser: undefined,
  setCurrentUser: (user: any) => set({ currentUser: user }),
}));
