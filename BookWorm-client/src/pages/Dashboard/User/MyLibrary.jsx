import React, { useState } from 'react';
import { FaBook, FaCheckCircle, FaFire, FaChartLine } from 'react-icons/fa';
import LibraryGrid from '../../../Components/LibraryGrid/LibraryGrid';

const MyLibrary = () => {
  const [activeTab, setActiveTab] = useState('current');

  // Stats Data
  const stats = [
    {
      id: 1,
      label: 'Total Books',
      value: '24',
      icon: <FaBook />,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      id: 2,
      label: 'Pages Read',
      value: '1,240',
      icon: <FaChartLine />,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      id: 3,
      label: 'Daily Streak',
      value: '12 Days',
      icon: <FaFire />,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
  ];

  return (
    <div className="conCls py-10 space-y-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-base-200 pb-8">
        <div>
          <h1 className="text-4xl font-serif font-black text-base-content">
            My <span className="text-primary italic">Library</span>
          </h1>
          <p className="text-base-content/60 font-medium mt-2">
            Manage your shelves and track your reading journey.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="inline-flex bg-base-200 p-1.5 rounded-2xl shadow-inner">
          {['want', 'current', 'read'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'text-base-content/50 hover:text-primary'
              }`}
            >
              {tab === 'want'
                ? 'To Read'
                : tab === 'current'
                ? 'Reading'
                : 'Finished'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map(stat => (
          <div
            key={stat.id}
            className="group bg-base-100 p-6 rounded-[2.5rem] border border-base-200 shadow-sm hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 flex items-center gap-5 relative overflow-hidden"
          >
            <div
              className={`absolute -right-4 -bottom-4 text-7xl opacity-5 transition-transform duration-700 group-hover:-rotate-12 ${stat.color}`}
            >
              {stat.icon}
            </div>
            <div
              className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center text-2xl`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40">
                {stat.label}
              </p>
              <h3 className="text-2xl font-black text-base-content mt-0.5">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Books Grid Area */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-xl font-serif font-black text-base-content capitalize">
            {activeTab === 'current'
              ? 'Currently Reading'
              : activeTab === 'want'
              ? 'Plan to Read'
              : 'Completed Collection'}
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-base-300 to-transparent"></div>
        </div>

        {/* পাসিং activeTab প্রপস to LibraryGrid */}
        <LibraryGrid activeTab={activeTab} />
      </section>
    </div>
  );
};

export default MyLibrary;
