import { Image, Indicator, Group } from '@mantine/core';
import { IconContext } from 'react-icons';
import { MdDelete } from 'react-icons/md';
import { UploadImage } from '@features/products/types';

export const ImagePreview = ({
  selectedFiles,
  deleteImage,
}: {
  selectedFiles: UploadImage[];
  deleteImage: (id: string) => void;
}) => {
  return (
    <IconContext.Provider value={{ size: '25px' }}>
      <ul>
        {selectedFiles.map((selectedFile: UploadImage, index: number) => {
          return (
            <li className="inline-flex p-1 sm:w-1/3 md:w-1/4 lg:w-1/6 xl:w-1/2" key={index}>
              <Image
                radius="md"
                src={selectedFile.url}
                alt="preview image"
                width={300}
                height={150}
                caption={
                  <div className="flex justify-between items-center">
                    {selectedFile.name}
                    <button
                      type="button"
                      className="p-1 ml-auto hover:bg-gray-300 rounded-md focus:outline-none delete"
                      onClick={() => deleteImage(selectedFile.id)}
                    >
                      <MdDelete />
                    </button>
                  </div>
                }
              />
            </li>
          );
        })}
      </ul>
    </IconContext.Provider>
  );
};
