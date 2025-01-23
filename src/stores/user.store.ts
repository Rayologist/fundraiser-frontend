'use client';

import { createStore } from 'zustand';
import { createSafeStoreContext } from '@/hooks/create-safe-store-context';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  picture: string;
}

export type UserState = {
  user: User | null;
};

export type UserActions = {
  setUser: (user: User) => void;
  refresh: () => void;
  logout: () => void;
};

export type UserStore = UserState & UserActions;

export const [UserStoreProvider, useUserStore] = createSafeStoreContext<UserState, UserActions>({
  errorMessage: 'UserStoreContext is not provided',
  createStore: (state) =>
    createStore<UserStore>((set) => ({
      user: state?.user ?? null,
      setUser: (user) => set({ user }),
      refresh: () => set((state) => state),
      logout: () => set({ user: null }),
    })),
});
