import React from 'react';
import {
  FaBookOpen,
  FaLayerGroup,
  FaFire,
  FaCheckCircle,
} from 'react-icons/fa';

const QuickStats = () => {
  // Demo Data (Eti porobortite backend logic ba context theke ashbe)
  const stats = [
    {
      id: 1,
      label: 'Total Books',
      value: '24',
      icon: <FaLayerGroup />,
      color: 'bg-blue-500/10 text-blue-600',
    },
    {
      id: 2,
      label: 'Currently Reading',
      value: '03',
      icon: <FaBookOpen />,
      color: 'bg-primary/10 text-primary',
    },
    {
      id: 3,
      label: 'Books Finished',
      value: '18',
      icon: <FaCheckCircle />,
      color: 'bg-green-500/10 text-green-600',
    },
    {
      id: 4,
      label: 'Reading Streak',
      value: '07 Days',
      icon: <FaFire />,
      color: 'bg-orange-500/10 text-orange-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-[-40px] relative z-20">
      {stats.map(stat => (
        <div
          key={stat.id}
          className="bg-white dark:bg-base-100 p-6 rounded-2xl shadow-xl shadow-base-content/5 border border-base-200 flex items-center gap-5 hover:translate-y-[-5px] transition-all duration-300 group"
        >
          <div
            className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-colors ${stat.color} group-hover:bg-primary group-hover:text-white`}
          >
            {stat.icon}
          </div>
          <div>
            <p className="text-xs font-bold opacity-60 uppercase tracking-widest mb-1">
              {stat.label}
            </p>
            <h3 className="text-2xl font-bold text-base-content">
              {stat.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;
