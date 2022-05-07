type Props = {
  text: string;
};

export const SubmitButton = ({ text }: Props) => {
  return (
    <div className="mt-6 text-center">
      <button
        className="py-3 px-6 mr-1 mb-1 w-full text-sm
                                   font-bold text-white uppercase bg-gray-900 active:bg-gray-700 rounded outline-none focus:outline-none shadow hover:shadow-lg"
      >
        {text}
      </button>
    </div>
  );
};
