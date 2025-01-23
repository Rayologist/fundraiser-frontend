'use client';

import { createContext, useContext, useRef } from 'react';
import { StoreApi, useStore } from 'zustand';

export function createSafeStoreContext<State, Actions>(props: {
  errorMessage: string;
  createStore: (defaultValues: State | null) => StoreApi<State & Actions>;
}) {
  type Store = State & Actions;

  const { errorMessage, createStore } = props;

  const Context = createContext<StoreApi<Store> | null>(null);

  const useSafeStore = <T,>(selector: (store: Store) => T): T => {
    const ctx = useContext(Context);

    if (ctx === null) {
      throw new Error(errorMessage);
    }

    return useStore(ctx, selector);
  };

  const Provider = ({ children, values }: { children: React.ReactNode; values: State | null }) => {
    const storeRef = useRef<StoreApi<Store> | null>(null);

    if (!storeRef.current) {
      storeRef.current = createStore(values);
    }

    return <Context.Provider value={storeRef.current}>{children}</Context.Provider>;
  };

  return [Provider, useSafeStore] as const;
}
