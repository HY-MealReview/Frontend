import React from 'react';

const days = ['월', '화', '수', '목', '금', '토', '일'];
const diningOptions = ['전체', '학생식당', '창업보육센터', '창의인재원식당'];

interface DiningSelectorProps {
  selectedDay: string;
  setSelectedDay: (day: string) => void;
  selectedDining: string;
  setSelectedDining: (dining: string) => void;
}

function DiningSelector({
  selectedDay,
  setSelectedDay,
  selectedDining,
  setSelectedDining,
}: DiningSelectorProps) {
  return (
    <div className="">
      {/* 요일 선택 버튼 */}
      <div className="flex justify-center font-medium mb-[12px] gap-[12px] ">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-[10px] py-[12px] w-[40px] h-[40px] text-[12px] items-center justify-center rounded border-[1px] ${
              selectedDay === day ? 'border-[#134B84] text-[#134B84] font-bold' : ' border-[#444444] text-[#444444] font-medium'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* 식당 선택 버튼 */}
      <div className="flex justify-center font-medium mb-[12px] gap-[12px]">
        {diningOptions.map((option) => (
          <button
            key={option}
            onClick={() => setSelectedDining(option)}
            className={`px-[9px] py-[12px] w-free h-[40px] text-[12px] items-center justify-center rounded border-[1px] ${
              selectedDining === option ? 'border-[#134B84] text-[#134B84] font-bold' : 'border-[#444444] text-[#444444] font-medium'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DiningSelector;
