import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { TextArea } from '@components/uikits/TextArea/TextArea';

interface TextAreaContainerProps {
  name: string;
  label: string;
  required?: boolean;
}

export const TextAreaContainer: FC<TextAreaContainerProps> = ({
  name,
  label,
  required = false,
}: TextAreaContainerProps) => {
  const methods = useFormContext();

  return <TextArea methods={methods} label={label} name={name} required={required} />;
};
