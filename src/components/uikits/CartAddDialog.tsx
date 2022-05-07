import { Button, Popover, Group, Text, TextInput } from '@mantine/core';
import { useState } from 'react';
import { ShoppingCart } from 'tabler-icons-react';

export const CartAddDialog = () => {
  const [opened, setOpened] = useState(false);
  return (
    <>
      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        target={
          <Group position="left">
            <ShoppingCart className="items-start" onClick={() => setOpened((o) => !o)} />
          </Group>
        }
        width={260}
        position="bottom"
        withCloseButton
        transitionDuration={300}
        closeOnClickOutside={true}
      >
        <Group position="center">
          <Text size="md" style={{ marginBottom: 10 }} weight={500}>
            Thank You Add Cart !!
          </Text>
        </Group>
      </Popover>
    </>
  );
};
