import React, { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useNavigate } from "react-router-dom";

const CheckinData: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState<{
    from?: Date;
    to?: Date;
  }>({
    from: undefined,
    to: undefined,
  });
  const [showCheckinCalendar, setShowCheckinCalendar] =
    useState<boolean>(false);
  const [showCheckoutCalendar, setShowCheckoutCalendar] =
    useState<boolean>(false);

  const navigate = useNavigate();

  const checkinRef = useRef<HTMLDivElement>(null);
  const checkoutRef = useRef<HTMLDivElement>(null);

  // Handle outside clicks to close calendars
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showCheckinCalendar &&
        checkinRef.current &&
        !checkinRef.current.contains(event.target as Node)
      ) {
        setShowCheckinCalendar(false);
      }
      if (
        showCheckoutCalendar &&
        checkoutRef.current &&
        !checkoutRef.current.contains(event.target as Node)
      ) {
        setShowCheckoutCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCheckinCalendar, showCheckoutCalendar]);

  const handleCheckinClick = () => {
    setShowCheckinCalendar((prev) => !prev);
    setShowCheckoutCalendar(false);
  };

  const handleCheckoutClick = () => {
    setShowCheckoutCalendar((prev) => !prev);
    setShowCheckinCalendar(false);
  };

  const handleCheckinSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedRange((prev) => ({
        from: date,
        to: prev.to && date <= prev.to ? prev.to : undefined,
      }));
      setShowCheckinCalendar(false);
    }
  };

  const handleCheckoutSelect = (date: Date | undefined) => {
    if (selectedRange.from && date && date >= selectedRange.from) {
      setSelectedRange((prev) => ({
        ...prev,
        to: date,
      }));
      setShowCheckoutCalendar(false);
    } else if (date && selectedRange.from && date < selectedRange.from) {
      alert("Check-out date cannot be before check-in date.");
    }
  };

  const handleSearch = () => {
    const { from, to } = selectedRange;
    if (from && to) {
      const dateFrom = from.toISOString();
      const dateTo = to.toISOString();
      navigate(
        `/venues?dateFrom=${encodeURIComponent(
          dateFrom
        )}&dateTo=${encodeURIComponent(dateTo)}`
      );
    } else {
      alert("Please select both check-in and check-out dates.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 relative">
      {/* Check-in Date */}
      <div className="relative" ref={checkinRef}>
        <input
          type="text"
          readOnly
          value={
            selectedRange.from ? selectedRange.from.toLocaleDateString() : ""
          }
          onClick={handleCheckinClick}
          placeholder="Check-in Date"
          className="w-full px-4 py-2 border border-tin rounded-md shadow-lg text-gray-700 focus:ring-2 focus:ring-amber-100 focus:outline-none cursor-pointer"
        />
        {showCheckinCalendar && (
          <div className="absolute z-10 mt-2">
            <DayPicker
              mode="single"
              selected={selectedRange.from}
              onSelect={handleCheckinSelect}
              disabled={{ before: new Date() }} // Replacing fromDate
              className="bg-white border rounded-md shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Check-out Date */}
      <div className="relative" ref={checkoutRef}>
        <input
          type="text"
          readOnly
          value={selectedRange.to ? selectedRange.to.toLocaleDateString() : ""}
          onClick={handleCheckoutClick}
          placeholder="Check-out Date"
          className="w-full px-4 py-2 border border-tin rounded-md shadow-lg text-gray-700 focus:ring-2 focus:ring-amber-100 focus:outline-none cursor-pointer"
        />
        {showCheckoutCalendar && (
          <div className="absolute z-10 mt-2">
            <DayPicker
              mode="single"
              selected={selectedRange.to}
              onSelect={handleCheckoutSelect}
              disabled={{ before: selectedRange.from || new Date() }} // Replacing fromDate
              className="bg-white border rounded-md shadow-lg"
            />
          </div>
        )}
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-btns text-white rounded-md hover:bg-amber-100 shadow-lg hover:text-charcoal transition-colors"
      >
        Search
      </button>
    </div>
  );
};

export default CheckinData;
