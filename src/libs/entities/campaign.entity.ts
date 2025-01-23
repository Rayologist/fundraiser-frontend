export type CampaignConfig = {
  color: {
    primary: string;
    secondary: string;
  };
};

export interface Campaign {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  config: CampaignConfig;
  title: string;
  description: string;
  longDescription: string;
  pictures: string[];
  active: boolean;
  deleted: boolean;
}

export type CampaignDto = Pick<
  Campaign,
  'id' | 'title' | 'description' | 'config' | 'pictures' | 'longDescription'
>;
