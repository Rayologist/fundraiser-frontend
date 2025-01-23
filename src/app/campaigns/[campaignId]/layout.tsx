import { redirect } from 'next/navigation';
import { getOneCampaign } from '@/services/campaign/server';
import { getProducts } from '@/services/product/server';
import { CampaignStoreProvider } from '@/stores/campaign.store';

export default async function CampaignLayout(props: {
  params: Promise<{ campaignId: string }>;
  children: React.ReactNode;
}) {
  const { campaignId } = await props.params;

  const [campaign, campaignError] = await getOneCampaign({ id: campaignId });
  const [products, productError] = await getProducts({ campaignId });

  if (!campaign || campaignError) {
    return redirect(`/`);
  }

  if (!products || productError) {
    return redirect(`/campaigns/${campaignId}`);
  }

  return (
    <CampaignStoreProvider values={{ campaign, products }}>{props.children}</CampaignStoreProvider>
  );
}
