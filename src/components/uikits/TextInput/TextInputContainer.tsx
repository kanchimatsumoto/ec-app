import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextInput } from '@components/uikits/TextInput/TextInput';

interface TextInputContainerProps {
  name: string;
  label?: string;
  type?: string;
  required?: boolean;
}

export const TextInputContainer: FC<TextInputContainerProps> = ({
  name,
  label,
  type = 'text',
  required = false,
}: TextInputContainerProps) => {
  const methods = useFormContext();

  return <TextInput methods={methods} label={label} name={name} type={type} required={required} />;
};
