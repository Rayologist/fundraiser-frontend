import { Box, SimpleGrid } from '@mantine/core';
import { ProductCard } from '@/components/Product/Card';
import { ProductDto } from '@/libs/entities/product.entity';

export function Product(props: { products: ProductDto[] }) {
  const { products } = props;
  return (
    <SimpleGrid cols={{ sm: 1, md: 2 }} spacing="xl">
      {products.map((product, index) => (
        <Box key={`${product.title}-${index}`}>
          <ProductCard product={product} />
        </Box>
      ))}
    </SimpleGrid>
  );
}
