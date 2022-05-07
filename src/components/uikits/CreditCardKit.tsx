export const CreditCardKit = () => {
  return (
    <div className="overflow-visible p-5 bg-gray-800 rounded">
      <span className="block pb-3 text-xl font-medium text-gray-100">Card Details</span>

      <span className="text-xs text-gray-400 ">Card Type</span>

      <div className="flex overflow-visible justify-between items-center mt-2">
        <div className="relative right-10 py-2 px-4 w-52 h-28 bg-gray-500 rounded">
          <span className="text-lg italic font-medium text-gray-200 underline">VISA</span>

          <div className="flex justify-between items-center pt-4 ">
            <span className="text-xs font-medium text-gray-200">****</span>
            <span className="text-xs font-medium text-gray-200">****</span>
            <span className="text-xs font-medium text-gray-200">****</span>
            <span className="text-xs font-medium text-gray-200">****</span>
          </div>

          <div className="flex justify-between items-center mt-3">
            <span className="text-xs  text-gray-200">Giga Tamarashvili</span>
            <span className="text-xs  text-gray-200">12/18</span>
          </div>
        </div>

        <div className="flex flex-col  justify-center items-center">
          <img
            src="https://img.icons8.com/color/96/000000/mastercard-logo.png"
            width="40"
            className="relative right-5"
          />
          <span className="relative right-5 bottom-2 text-xs font-medium text-gray-200">
            mastercard.
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center pt-3">
        <label className="text-xs text-gray-400 ">Name on Card</label>
        <input
          type="text"
          className="py-4 w-full h-6 text-sm text-white placeholder:text-gray-300 bg-gray-800 border-b border-gray-600 focus:outline-none"
          placeholder="Giga Tamarashvili"
        />
      </div>

      <div className="flex flex-col justify-center pt-3">
        <label className="text-xs text-gray-400 ">Card Number</label>
        <input
          type="text"
          className="py-4 w-full h-6 text-sm text-white placeholder:text-gray-300 bg-gray-800 border-b border-gray-600 focus:outline-none"
          placeholder="****     ****      ****      ****"
        />
      </div>

      <div className="grid grid-cols-3 gap-2 pt-2 mb-3">
        <div className="col-span-2 ">
          <label className="text-xs text-gray-400">Expiration Date</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              className="py-4 w-full h-6 text-sm text-white placeholder:text-gray-300 bg-gray-800 border-b border-gray-600 focus:outline-none"
              placeholder="mm"
            />
            <input
              type="text"
              className="py-4 w-full h-6 text-sm text-white placeholder:text-gray-300 bg-gray-800 border-b border-gray-600 focus:outline-none"
              placeholder="yyyy"
            />
          </div>
        </div>

        <div className="">
          <label className="text-xs text-gray-400">CVV</label>
          <input
            type="text"
            className="py-4 w-full h-6 text-sm text-white placeholder:text-gray-300 bg-gray-800 border-b border-gray-600 focus:outline-none"
            placeholder="XXX"
          />
        </div>
      </div>

      <button className="w-full h-12 text-white bg-blue-500 hover:bg-blue-600 rounded focus:outline-none">
        Check Out
      </button>
    </div>
  );
};
