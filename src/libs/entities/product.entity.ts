import { Currency } from './shared';

export interface Product {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  pictures: string[];
  goalAmount: number;
  currentAmount: number;
  totalContributors: number;
  currency: Currency;
  active: boolean;
  deleted: boolean;
  campaignId: string;
}

export interface ProductDto {
  id: string;
  title: string;
  description: string;
  pictures: string[];
  goalAmount: number;
  currency: string;
  currentAmount: number;
  totalContributors: number;
}
