import { ErrorMessage } from '@hookform/error-message';
import { Badge } from '@mantine/core';
import {
  FieldValues,
  UseFormRegister,
  UseFormRegisterReturn,
  UseFormReturn,
} from 'react-hook-form';
import { RequiredBadge } from '@components/uikits/RequiredBadge';

interface Props {
  type: string;
  label?: string;
  name: string;
  required: boolean;
  methods: UseFormReturn;
}

export const TextInput = ({ type, label, name, required, methods }: Props) => {
  return (
    <div className="relative mb-3 w-full">
      {label && (
        <label
          className="block mb-2 font-bold text-gray-700 uppercase label text-sx"
          htmlFor={name}
        >
          <span className="mr-4">{label}</span>
          <RequiredBadge required={required} />
        </label>
      )}
      <input
        type={type}
        placeholder={name}
        id={name}
        className="p-3 w-full text-sm placeholder:text-gray-400 text-gray-700 bg-white rounded border-0 focus:outline-none focus:ring shadow"
        {...methods.register(name)}
        style={{ transition: 'all .15s ease' }}
      />
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
