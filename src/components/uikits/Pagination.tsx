export const Pagination = () => {
  return (
    <div className="flex justify-center mt-10 space-x-1">
      <button className="flex justify-center items-center w-8 h-8 text-gray-400 rounded">
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <button
        className="flex justify-center items-center px-2 h-8 text-sm font-medium text-gray-400 rounded"
        disabled
      >
        Prev
      </button>
      <button
        className="flex justify-center items-center w-8 h-8 text-sm font-medium text-indigo-600 bg-indigo-200 rounded"
        disabled
      >
        1
      </button>
      <button className="flex justify-center items-center w-8 h-8 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-200 rounded">
        2
      </button>
      <button className="flex justify-center items-center w-8 h-8 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-200 rounded">
        3
      </button>
      <button className="flex justify-center items-center px-2 h-8 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-indigo-200 rounded">
        Next
      </button>
      <button className="flex justify-center items-center w-8 h-8 text-gray-600 hover:text-indigo-600 hover:bg-indigo-200 rounded">
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};
