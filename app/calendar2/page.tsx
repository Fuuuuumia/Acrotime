// app/page.tsx
"use client";

import { useState } from "react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );

  const startDay = startOfMonth.getDay();
  const daysInMonth = endOfMonth.getDate();

  const today = new Date();

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const monthNames = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (

<div className="h-screen grid grid-rows-6 grid-cols-7 border-t border-l border-gray-300 dark:border-gray-700">
  <div className="border-r border-b border-gray-300 dark:border-gray-700">1</div>
  <div className="border-r border-b border-gray-300 dark:border-gray-700">2</div>
  <div className="border-r border-b border-gray-300 dark:border-gray-700">3</div>
  <div className="border-r border-b border-gray-300 dark:border-gray-700">4</div>
  <div className="border-r border-b border-gray-300 dark:border-gray-700">5</div>
  <div className="border-r border-b border-gray-300 dark:border-gray-700">6</div>
  <div className="border-b border-gray-300 dark:border-gray-700">7</div>

  {/* 2行目以降も… */}
</div>
)
}