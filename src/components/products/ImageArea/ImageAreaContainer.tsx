import { Dispatch, FC, SetStateAction } from 'react';
import { useFormContext } from 'react-hook-form';
import { ImageArea } from './ImageArea';
import { UploadImage } from '@features/products/types';

interface ImageAreaContainerProps {
  name: string;
  label: string;
  required?: boolean;
  selectedFiles: UploadImage[];
  setSelectedFile: Dispatch<SetStateAction<UploadImage[]>>;
}

export const ImageAreaContainer: FC<ImageAreaContainerProps> = ({
  name,
  label,
  required = false,
  selectedFiles,
  setSelectedFile,
}: ImageAreaContainerProps) => {
  const methods = useFormContext();

  return (
    <ImageArea
      methods={methods}
      name={name}
      label={label}
      required={required}
      selectedFiles={selectedFiles}
      setSelectedFile={setSelectedFile}
    />
  );
};
