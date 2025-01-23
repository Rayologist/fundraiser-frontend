'use client';

import { createStore } from 'zustand';
import { createSafeStoreContext } from '@/hooks/create-safe-store-context';
import { DonorInfo } from '@/libs/entities/donor-info.entity';
import { CartDto } from '@/services/cart/types';
import { NewebpayData } from '@/services/payment/types';

export type State = {
  donorInfo: DonorInfo | null;
  cartDto: CartDto | null;
  newebpayData: NewebpayData | null;
};

export type Actions = {
  setDonorInfo: (donorInfo: DonorInfo | null) => void;
  setCartDto: (cartDto: CartDto | null) => void;
  setNewebpayData: (newebpayData: NewebpayData | null) => void;
};

export type Store = State & Actions;

export const [CheckoutStoreProvider, useCheckoutStore] = createSafeStoreContext<State, Actions>({
  errorMessage: 'CheckoutStoreContext is not provided',
  createStore: (state) =>
    createStore<Store>((set) => {
      if (!state) {
        throw new Error('CheckoutStoreContext value is not provided');
      }

      return {
        donorInfo: state.donorInfo,
        cartDto: state.cartDto,
        newebpayData: state.newebpayData,
        setNewebpayData: (newebpayData) => set({ newebpayData }),
        setDonorInfo: (donorInfo) => set({ donorInfo }),
        setCartDto: (cartDto) => set({ cartDto }),
      };
    }),
});
