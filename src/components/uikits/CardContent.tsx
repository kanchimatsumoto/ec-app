import { Badge, Button, Card, Group, Image, Text, Menu } from '@mantine/core';
import { Product } from '@features/products/types';
import { useRouter } from 'next/router';
import { NextLink } from '@mantine/next';
import { Edit, Trash } from 'tabler-icons-react';
import { useTypedDispatch } from '@store';
import { deleteProduct } from '@features/products/delete';

export const CardContent = ({ product }: { product: Product }) => {
  const router = useRouter();
  const dispatch = useTypedDispatch();
  const imageUrl = product.images && product.images?.length > 0 ? product.images[0].url : '';

  return (
    <Card shadow="sm" p="lg" className="bg-gray-50">
      <Card.Section>
        <Image
          src={imageUrl}
          height={160}
          alt="Image"
          className="object-scale-down"
          withPlaceholder
        />
      </Card.Section>

      <Group position="apart" className="mt-3">
        <Text className="font-medium">{product.name}</Text>
        <Badge color="pink" variant="light">
          On Sale
        </Badge>
      </Group>

      <Group position="apart" className="mt-3">
        <Text size="sm" style={{ color: 'blue', lineHeight: 1.5 }} className="mt-3">
          {'$' + Number(product.price).toLocaleString('jp-JP')}
        </Text>

        <Menu>
          <Menu.Item
            icon={<Edit size={14} />}
            component={NextLink}
            href={`/product/edit/${product.id}`}
          >
            <Text size="sm" color="dimmed">
              EDIT
            </Text>
          </Menu.Item>
          <Menu.Item
            icon={<Trash size={14} />}
            onClick={() => {
              product.id && dispatch(deleteProduct(product.id));
            }}
          >
            <Text size="sm" color="dimmed">
              DELETE
            </Text>
          </Menu.Item>
        </Menu>
      </Group>

      <Button
        variant="light"
        color="blue"
        fullWidth
        style={{ marginTop: 14 }}
        onClick={() => {
          router.push(`/product/detail/${product.id}`);
        }}
      >
        Go To Detail
      </Button>
    </Card>
  );
};
