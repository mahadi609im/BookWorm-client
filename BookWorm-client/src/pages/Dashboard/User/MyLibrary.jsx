import React, { useContext, useState } from 'react';
import { FaBook, FaFire, FaChartLine } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../context/AuthContext';
import LibraryGrid from '../../../Components/LibraryGrid/LibraryGrid';
import Loading from '../../../Components/Loading/Loading';

const MyLibrary = () => {
  // ১. activeTab এখন 'reading' হবে (আপনার ডাটাবেস ভ্যালু অনুযায়ী)
  const [activeTab, setActiveTab] = useState('reading');
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  // ২. ডাটা ফেচিং এবং ফরম্যাটিং
  const { data: libraryData = [], isLoading } = useQuery({
    queryKey: ['myLibrary', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-library/${user?.email}`);

      // ব্যাকএন্ড থেকে আসা shelfType সরাসরি ব্যবহার করছি
      const formattedData = res.data.map(book => ({
        ...book,
        shelf: book.shelfType, // "read", "reading", or "want"
        title: book.bookTitle,
      }));

      return formattedData;
    },
  });

  // ৩. স্ট্যাটস ক্যালকুলেশন
  const totalBooks = libraryData.length;
  const totalPagesRead = libraryData.reduce(
    (sum, book) => sum + (book.progress || 0),
    0
  );
  const finishedBooks = libraryData.filter(
    book => book.shelf === 'read'
  ).length;

  const stats = [
    {
      id: 1,
      label: 'Total Books',
      value: totalBooks,
      icon: <FaBook />,
      color: 'text-primary',
      bg: 'bg-primary/10',
    },
    {
      id: 2,
      label: 'Pages Read',
      value: totalPagesRead.toLocaleString(),
      icon: <FaChartLine />,
      color: 'text-success',
      bg: 'bg-success/10',
    },
    {
      id: 3,
      label: 'Completed',
      value: `${finishedBooks} Books`,
      icon: <FaFire />,
      color: 'text-warning',
      bg: 'bg-warning/10',
    },
  ];

  // ৪. ফিল্টারিং লজিক (activeTab এবং shelf সরাসরি ম্যাচ করবে)
  const filteredBooks = libraryData.filter(book => book.shelf === activeTab);

  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-10 space-y-12 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-base-200 pb-8">
        <div>
          <h1 className="text-4xl font-serif font-bold text-base-content">
            My <span className="text-primary italic">Library</span>
          </h1>
          <p className="text-base-content/60 font-medium mt-2">
            Manage your shelves and track your reading journey.
          </p>
        </div>

        {/* Tab Switcher: ভ্যালুগুলো এখন ডাটাবেসের shelfType এর সাথে হুবহু মিলবে */}
        <div className="inline-flex bg-base-200 p-1.5 rounded-2xl shadow-inner">
          {['want', 'reading', 'read'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-primary text-white shadow-lg scale-105'
                  : 'text-base-content/50 hover:text-primary'
              }`}
            >
              {tab === 'want'
                ? 'To Read'
                : tab === 'reading'
                ? 'Reading'
                : 'Finished'}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
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
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-40">
                {stat.label}
              </p>
              <h3 className="text-2xl font-bold text-base-content mt-0.5">
                {stat.value}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Books Grid Area */}
      <section>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-xl font-serif font-bold text-base-content capitalize">
            {activeTab === 'reading'
              ? 'Currently Reading'
              : activeTab === 'want'
              ? 'Plan to Read'
              : 'Completed Collection'}
          </h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-base-300 to-transparent"></div>
        </div>

        {/* ফিল্টার করা বইগুলো লাইব্রেরি গ্রিডে পাস করা হচ্ছে */}
        {filteredBooks.length > 0 ? (
          <LibraryGrid books={filteredBooks} activeTab={activeTab} />
        ) : (
          <div className="text-center py-20 bg-base-200/20 rounded-[3rem] border-2 border-dashed border-base-300">
            <p className="text-base-content/40 italic font-bold">
              Your "{activeTab}" shelf is empty.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default MyLibrary;
