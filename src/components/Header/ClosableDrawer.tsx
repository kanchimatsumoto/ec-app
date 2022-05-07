import { Drawer, List, ThemeIcon, Input, Badge, Divider, Button } from '@mantine/core';
import {
  CircleCheck,
  CircleDashed,
  Search,
  History,
  Pacman,
  Logout,
  Plus,
} from 'tabler-icons-react';
import { genders } from '@src/const';
import { useTypedDispatch, useTypedSelector } from '@store';
import { signOutFunc } from '@features/users/signout';
import { useRouter } from 'next/router';

type Props = {
  opened: boolean;
  setOpened: (opened: boolean) => void;
};

export const ClosableDrawer = ({ opened, setOpened }: Props) => {
  const { isSignedIn } = useTypedSelector((state) => state.user);

  const dispatch = useTypedDispatch();
  const router = useRouter();

  return (
    <Drawer opened={opened} onClose={() => setOpened(false)} padding="xl" size="xl" position="left">
      <Input
        icon={<Search size={16} />}
        placeholder="Search ..."
        rightSectionWidth={80}
        styles={{ rightSection: { pointerEvents: 'none' } }}
        rightSection={
          <Badge color="blue" variant="filled">
            SEARCH
          </Badge>
        }
      />
      {/*TODO: ログアウトしても2回押さないと消えないバグ*/}
      {isSignedIn && (
        <>
          <Divider my="sm" label="ETC" labelPosition="center" />
          <List spacing="xs" size="sm" center>
            <List.Item
              icon={
                <ThemeIcon color="blue" size={24} radius="xl">
                  <Plus size={16} />
                </ThemeIcon>
              }
              onClick={() => router.push('/product/edit')}
            >
              ADD ITEM
            </List.Item>
            <List.Item
              icon={
                <ThemeIcon color="blue" size={24} radius="xl">
                  <History size={16} />
                </ThemeIcon>
              }
            >
              ORDER HISTORY
            </List.Item>
            <List.Item
              icon={
                <ThemeIcon color="blue" size={24} radius="xl">
                  <Pacman size={16} />
                </ThemeIcon>
              }
            >
              PROFILE
            </List.Item>
            <List.Item
              icon={
                <ThemeIcon color="blue" size={24} radius="xl">
                  <Logout size={16} />
                </ThemeIcon>
              }
              onClick={() => dispatch(signOutFunc())}
            >
              LOGOUT
            </List.Item>
          </List>
        </>
      )}
      <Divider my="sm" label="gender" labelPosition="center" />
      <List
        spacing="xs"
        size="sm"
        center
        icon={
          <ThemeIcon color="teal" size={24} radius="xl">
            <CircleCheck size={16} />
          </ThemeIcon>
        }
      >
        {genders.map((gender, index) => {
          return <List.Item key={index}>{gender.name}</List.Item>;
        })}
      </List>
    </Drawer>
  );
};
