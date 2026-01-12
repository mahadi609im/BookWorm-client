import React from 'react';
import { FaChartBar } from 'react-icons/fa';

const ReadingAnalytics = () => {
  const stats = [
    { day: 'M', height: '40%' },
    { day: 'T', height: '70%' },
    { day: 'W', height: '100%' },
    { day: 'T', height: '60%' },
    { day: 'F', height: '85%' },
    { day: 'S', height: '30%' },
    { day: 'S', height: '50%' },
  ];

  return (
    <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-xl shadow-primary/5 relative overflow-hidden group">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-serif font-bold text-base-content">
            Analytics
          </h3>
          <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest">
            Activity this week
          </p>
        </div>
        <FaChartBar
          className="text-primary opacity-20 group-hover:opacity-100 transition-opacity"
          size={24}
        />
      </div>

      <div className="flex items-end justify-between h-32 gap-2 px-2">
        {stats.map((item, idx) => (
          <div
            key={idx}
            className="flex-1 flex flex-col items-center gap-3 group/bar"
          >
            <div className="relative w-full">
              <div className="w-full bg-primary/10 rounded-t-lg absolute bottom-0 h-32"></div>
              <div
                className="w-full bg-primary rounded-t-lg absolute bottom-0 transition-all duration-700 delay-100 group-hover/bar:bg-secondary cursor-pointer"
                style={{ height: item.height }}
              >
                <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-base-content text-base-100 text-[8px] font-bold py-1 px-2 rounded transition-opacity">
                  {item.height}
                </div>
              </div>
            </div>
            <span className="text-[10px] font-bold text-base-content/30 group-hover/bar:text-primary transition-colors">
              {item.day}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingAnalytics;
