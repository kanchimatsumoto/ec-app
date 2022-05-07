import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { SelectBox } from './SelectBox';
import { option } from '@components/uikits/SelectBox/types';

interface SelectBoxContainerProps {
  label: string;
  name: string;
  required?: boolean;
  options: option[];
}

export const SelectBoxContainer: FC<SelectBoxContainerProps> = ({
  label,
  name,
  required = false,
  options,
}: SelectBoxContainerProps) => {
  const methods = useFormContext();

  return (
    <SelectBox methods={methods} label={label} name={name} options={options} required={required} />
  );
};
