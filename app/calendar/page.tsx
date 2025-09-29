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
    <div className=" overflow-hidden h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      {/* ヘッダー */}
      <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 shadow">
        <button
          onClick={handlePrevMonth}
          className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          ←
        </button>

        <h2 className="text-xl font-bold">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h2>
        <a className="px-6 py-2 bg-gray-300 hover:bold"href="/" >logout</a>
        <button
          onClick={handleNextMonth}
          className="px-3 py-1 rounded-lg bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          →
        </button>
      </div>

      {/* カレンダー */}
      <div className=" flex-1 grid grid-rows-[30px_repeat(5,1fr)] grid-cols-7 border-t border-l border-gray-300 dark:border-gray-700">
          {dayNames.map((day) => (
          <div
            key={day}
            className="border-r border-b border-gray-300 dark:border-gray-700 flex items-center justify-center font-medium bg-gray-50 dark:bg-gray-800"
          >
            {day}
          </div>
        ))}

        {/* 空白（前月分） */}
        {Array.from({ length: startDay }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="border-r border-b border-gray-300 dark:border-gray-700"
          />
        ))}

        {/* 当月の日付 */}
        {Array.from({ length: daysInMonth }, (_, i) => {
          const day = i + 1;
          const isToday =
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
          return (
            <div
              key={day}
              className={`border-r border-b border-gray-300 dark:border-gray-700 p-1 flex flex-col`}
            >
              {/* 日付部分 */}
              <div
                className={`text-sm mb-1 ${
                  isToday
                    ? "bg-blue-500 text-white px-2 rounded inline-block"
                    : ""
                }`}
              >
                {day}
              </div>
              {/* 予定を表示するエリア */}
              <div className="flex-1 text-xs text-gray-600 dark:text-gray-300 overflow-hidden">
                {/* 仮の予定サンプル */}
                {day === today.getDate() ? (
                  <div className="bg-blue-100 dark:bg-blue-600 text-blue-800 dark:text-white rounded px-1">
                    Meeting
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
