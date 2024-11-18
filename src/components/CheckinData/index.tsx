import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import DatePicker from "react-datepicker";

export function CheckinData() {
  const [date, setDate] = useState(new Date());
  return (
    <div>
        <DatePicker
        selected={date}
        onChange={(date) => setDate(date ?? new Date())} // Fallback to new Date if null
        />
    </div>
  );
}

export default CheckinData;
