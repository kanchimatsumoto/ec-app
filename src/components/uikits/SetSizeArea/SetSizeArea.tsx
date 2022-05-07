import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { Table } from '@mantine/core';
import { MdDelete, MdAddCircle } from 'react-icons/md';
import { IconContext } from 'react-icons';

interface Props {
  name: string;
  required: boolean;
  methods: UseFormReturn;
}

export const SetSizeArea = ({ name, required, methods }: Props) => {
  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name,
  });

  const rows = fields.map((field, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        <input
          className="p-3 w-full text-sm placeholder:text-gray-400 text-gray-700 bg-white rounded border-0 focus:outline-none focus:ring shadow"
          type="text"
          {...methods.register(`${name}[${index}].size` as const)}
        />
      </td>
      <td>
        <input
          className="p-3 w-full text-sm placeholder:text-gray-400 text-gray-700 bg-white rounded border-0 focus:outline-none focus:ring shadow"
          type="number"
          {...methods.register(`${name}[${index}].quantity` as const)}
        />
      </td>
      <td>
        <button type={'button'} onClick={() => remove(index)}>
          <MdDelete />
        </button>
      </td>
    </tr>
  ));

  return (
    <IconContext.Provider value={{ size: '24px' }}>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <Table
                className="min-w-full text-center"
                horizontalSpacing="sm"
                verticalSpacing="sm"
                highlightOnHover
              >
                <thead className="bg-teal-500 border-b">
                  <tr>
                    <th>#</th>
                    <th>SIZE</th>
                    <th>QUANTITY</th>
                    <th>REMOVE</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
              <div className="mt-4 text-center">
                <button
                  onClick={() =>
                    append({
                      size: '',
                      quantity: null,
                    })
                  }
                  type={'button'}
                >
                  <MdAddCircle />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IconContext.Provider>
  );
};
