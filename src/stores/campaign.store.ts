'use client';

import { createStore } from 'zustand';
import { createSafeStoreContext } from '@/hooks/create-safe-store-context';
import { CampaignDto } from '@/libs/entities/campaign.entity';
import { ProductDto } from '@/libs/entities/product.entity';

export type State = {
  campaign: CampaignDto;
  products: ProductDto[];
};

export type Actions = {};

export type Store = State & Actions;

export const [CampaignStoreProvider, useCampaignStore] = createSafeStoreContext<State, Actions>({
  errorMessage: 'CampaignStoreContext is not provided',
  createStore: (state) =>
    createStore<Store>(() => {
      if (!state) {
        throw new Error('CampaignStoreContext value is not provided');
      }

      return {
        campaign: state.campaign,
        products: state.products,
      };
    }),
});
