import { UseFormReturn } from 'react-hook-form';
import { IconContext } from 'react-icons';
import { RiGalleryUploadFill } from 'react-icons/ri';
import { RequiredBadge } from '@components/uikits/RequiredBadge';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import './ImageArea.module.css';
import { ImagePreview } from './ImagePreview';
import { UploadImage } from '@features/products/types';
import { uuid } from 'uuidv4';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage';
import { storage } from '@src/firebase';

interface Props {
  name: string;
  label: string;
  required: boolean;
  methods: UseFormReturn;
  selectedFiles: UploadImage[];
  setSelectedFile: Dispatch<SetStateAction<UploadImage[]>>;
}

// 参考 https://tailwindcomponents.com/component/file-upload-with-drop-on-and-preview
// TODO: ドラッグ&ドロップできるようにする https://zenn.dev/takumi0620/articles/2657b96af57b28
export const ImageArea = ({
  name,
  label,
  required,
  methods,
  selectedFiles,
  setSelectedFile,
}: Props) => {
  const [progresspercent, setProgresspercent] = useState(0);

  const deleteImage = useCallback(
    async (id: string, isUpload?: boolean) => {
      const ret = window.confirm('この画像を削除しますか？');
      if (!ret) {
        return false;
      } else {
        const newImages = selectedFiles.filter((selectedFile) => selectedFile.id !== id);
        setSelectedFile(newImages);
        const desertRef = ref(storage, `images/${id}`);
        return deleteObject(desertRef);
      }
    },
    [selectedFiles, setSelectedFile],
  );

  const uploadImage = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files === null || event.target.files.length === 0) {
        return;
      }
      const uploadImages = Object.values(event.target.files).concat();
      const id = uuid();

      uploadImages.map((uploadImage) => {
        const uploadRef = ref(storage, `/images/${id}`);
        const uploadTask = uploadBytesResumable(uploadRef, uploadImage);

        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgresspercent(progress);
          },
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              const newImage = {
                ...uploadImage,
                id: id,
                url: downloadURL,
                name: uploadImage.name,
              };
              setSelectedFile((prevValue) => [...prevValue, newImage]);
            });
          },
        );
      });
    },
    [methods],
  );

  const previewFileInputRef = useRef<HTMLInputElement>(null);

  return (
    <IconContext.Provider value={{ size: '40px' }}>
      <label className="block mb-2 font-bold text-gray-700 uppercase label text-sx" htmlFor={name}>
        <span className="mr-4">{label}</span>
        <RequiredBadge required={required} />
      </label>
      <div className="mb-4 w-full h-full bg-gray-500 sm:p-8 md:px-16">
        <div className="container mx-auto h-full">
          <article
            aria-label="File Upload Modal"
            className="flex relative flex-col h-full bg-white rounded-md shadow-xl hasImage"
          >
            <section className="flex overflow-auto flex-col p-8 w-full h-full">
              <header className="flex flex-col justify-center items-center py-12 border-2 border-gray-400 border-dashed">
                <input
                  type="file"
                  multiple
                  className="hidden"
                  accept="image/*"
                  {...methods.register('images')}
                  onChange={uploadImage}
                  ref={previewFileInputRef}
                />
                <button
                  type="button"
                  onClick={() => previewFileInputRef.current?.click()}
                  className="py-1 px-3 mt-2 bg-gray-200 hover:bg-gray-300 rounded-sm focus:outline-none focus:shadow-outline"
                >
                  Upload Files
                </button>
              </header>
              <h1 className="pt-8 pb-3 font-semibold text-gray-900 sm:text-lg">To Upload</h1>

              <ul id="gallery" className="flex flex-wrap flex-1 -m-1">
                <li
                  id="empty"
                  className="flex flex-col justify-center items-center w-full h-full text-center"
                >
                  {selectedFiles.length > 0 ? (
                    <ImagePreview selectedFiles={selectedFiles} deleteImage={deleteImage} />
                  ) : (
                    <>
                      <RiGalleryUploadFill className="mx-auto w-32" />
                      <span className="text-gray-500 text-small">No files selected</span>
                    </>
                  )}
                </li>
              </ul>
            </section>
          </article>
        </div>
      </div>
    </IconContext.Provider>
  );
};
