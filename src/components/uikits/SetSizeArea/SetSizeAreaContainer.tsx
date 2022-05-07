import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { SetSizeArea } from '@components/uikits/SetSizeArea/SetSizeArea';

interface SetSizeAreaContainerProps {
  name: string;
  required?: boolean;
}

export const SetSizeAreaContainer: FC<SetSizeAreaContainerProps> = ({
  name,
  required = false,
}: SetSizeAreaContainerProps) => {
  const methods = useFormContext();

  return <SetSizeArea methods={methods} name={name} required={required} />;
};
