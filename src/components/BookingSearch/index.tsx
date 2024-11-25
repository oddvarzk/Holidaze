import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/datepicker.css";

export default function CheckinData() {
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  return (
    <div className="flex flex-row">
      <DatePicker
        selectsStart
        selected={startDate}
        onChange={(date: Date | null) => setStartDate(date ?? undefined)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
        startDate={startDate}
        endDate={endDate}
        placeholderText="Checkin date"
      />
      <DatePicker
        selectsEnd
        selected={endDate}
        onChange={(date: Date | null) => setEndDate(date ?? undefined)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-lg text-gray-700 focus:ring-2 focus:ring-green-500 focus:outline-none"
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="Checkout date"
      />
      <button className="px-4 text-paleSand bg-btns py-2 shadow-lg rounded-md ml-2 hover:bg-amber-100 hover:text-black">
        Search
      </button>
    </div>
  );
}
