import { Badge } from '@mantine/core';

export const RequiredBadge = ({ required }: { required: boolean }) => {
  return required ? (
    <Badge variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>
      required
    </Badge>
  ) : (
    <Badge variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
      optional
    </Badge>
  );
};
