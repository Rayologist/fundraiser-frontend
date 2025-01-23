import { Box, Stack, Text, Title } from '@mantine/core';
import { getCampaigns } from '@/services/campaign/server';
import { Campaign } from '../Campaign/Campaign';

export async function Home() {
  const [campaigns, error] = await getCampaigns();

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <Stack gap="xl">
      <Box
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dankjwppl/image/upload/v1737573141/location.b6fefcb9_yqvzub.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: 16,
        }}
        w="100%"
        h={300}
      />

      <Title order={1}>臺大語言所 相惜相依 語時俱進 募款活動</Title>
      <Text>
        親愛的朋友們，2025年初，臺大語言所將帶著滿滿的回憶，告別師生成長的樂學館，搬遷至充滿現代與傳統交融氣息的人文大樓。
        樂學館的走廊和窗外的風景見證了無數次的課堂討論、研究突破，也陪伴師生度過無數深夜的學習時光。如今，臺大語言所將帶著這些寶貴的記憶，進入新的空間，期待在新的環境中再次啟航。
        為了讓臺大語言所的師生們在新大樓能夠安心學習與研究，協會希望能協助為學生們規劃更舒適的自習空間、提供更具互動性以及智能視訊設備的多功能教室、並在人文大樓打造新的隔音錄音室，為未來臺大語言所的發展注入更多的動力，讓每一位師生都能在這裡找到自己的成長舞台。
        這次的搬遷是臺大語言所師生集體夢想的延續。我們誠摯地邀請您加入這段旅程，成為語言所故事的一部分。竭誠期盼所胞們能以實際行動支持臺大語言所的發展，無論是一筆捐款或是小額支持，都將化為我們前行的力量。
        讓我們攜手合作，為臺大語言所打造一個充滿活力的新家，共同見證臺灣語言研究的蓬勃發展。期待2025六月臺大語言所所慶我們能共聚一堂，一同回憶樂學館的點滴，也一起開箱新大樓！
      </Text>

      <Title order={2}>捐助專案</Title>

      <Campaign campaigns={campaigns} />
    </Stack>
  );
}
