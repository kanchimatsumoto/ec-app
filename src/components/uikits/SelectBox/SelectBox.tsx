import { ErrorMessage } from '@hookform/error-message';
import {
  FieldValues,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormReturn,
} from 'react-hook-form';
import { string } from 'yup';
import { option } from '@components/uikits/SelectBox/types';
import { RequiredBadge } from '@components/uikits/RequiredBadge';

interface Props {
  label: string;
  name: string;
  options: option[];
  required: boolean;
  methods: UseFormReturn;
}

export const SelectBox = ({ label, name, options, required, methods }: Props) => {
  return (
    <div className="relative mb-3 w-full">
      <label className="block mb-2 font-bold text-gray-700 uppercase label text-sx" htmlFor={name}>
        <span className="mr-4">{label}</span>
        <RequiredBadge required={required} />
      </label>
      <select
        placeholder={name}
        id={name}
        className="p-3 w-full text-sm placeholder:text-gray-400 text-gray-700 bg-white rounded border-0 focus:outline-none focus:ring shadow"
        {...methods.register(name)}
        style={{ transition: 'all .15s ease' }}
      >
        {options.map((option) => {
          return (
            <option key={option.id} selected={option.selected ?? false}>
              {option.name}
            </option>
          );
        })}
      </select>
      {/* 参考 https://zenn.dev/knaka0209/books/9e86ccb888758c/viewer/78a199*/}
      <ErrorMessage
        errors={methods.formState.errors}
        name={name}
        render={({ message }) => {
          return (
            <div
              className="py-3 px-4 mt-3 text-red-700 bg-red-100 rounded border border-red-400"
              role="alert"
            >
              <span className="block sm:inline">{message}</span>
            </div>
          );
        }}
      />
    </div>
  );
};
