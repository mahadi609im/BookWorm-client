import React, { useState } from 'react';
import {
  FaUserShield,
  FaUserCircle,
  FaSearch,
  FaUserEdit,
  FaUserMinus,
  FaSlidersH,
  FaCircle,
  FaEnvelopeOpenText,
  FaCalendarCheck,
  FaUser,
} from 'react-icons/fa';
import { HiAdjustmentsHorizontal } from 'react-icons/hi2';
import { MdAdminPanelSettings } from 'react-icons/md';
import { RiAdminFill, RiAdminLine } from 'react-icons/ri';

const ManageUsers = () => {
  const [activeTab, setActiveTab] = useState('all');

  const users = [
    {
      name: 'Anisur Rahman',
      email: 'anis@hero.com',
      role: 'admin',
      status: 'Active',
      joined: '12 Oct 2025',
      image: 'https://i.pravatar.cc/150?u=1',
      readingChallenge: {
        annualGoal: 50,
        booksReadThisYear: 38,
        totalPagesRead: 11400,
        readingStreak: 15,
        avgRatingGiven: 4.8,
      },
      genreBreakdown: [
        { genre: 'Mystery', count: 12 },
        { genre: 'Sci-Fi', count: 10 },
        { genre: 'Classic', count: 8 },
      ],
      recentActivity: [
        {
          type: 'shelf',
          detail: 'added "The Great Gatsby" to Read',
          date: '2 hours ago',
        },
      ],
    },
    {
      name: 'Sumaiya Akter',
      email: 'sumaiya@bookworm.com',
      role: 'user',
      status: 'Active',
      joined: '05 Jan 2026',
      image: 'https://i.pravatar.cc/150?u=2',
      readingChallenge: {
        annualGoal: 24,
        booksReadThisYear: 5,
        totalPagesRead: 1500,
        readingStreak: 3,
        avgRatingGiven: 4.2,
      },
      genreBreakdown: [
        { genre: 'Romance', count: 3 },
        { genre: 'Fantasy', count: 2 },
      ],
      recentActivity: [
        {
          type: 'shelf',
          detail: 'added "Circe" to Currently Reading',
          date: '3 hours ago',
        },
      ],
    },
    {
      name: 'Rakib Hasan',
      email: 'rakib@dev.com',
      role: 'user',
      status: 'Blocked',
      joined: '20 Dec 2025',
      image: 'https://i.pravatar.cc/150?u=3',
      readingChallenge: {
        annualGoal: 12,
        booksReadThisYear: 0,
        totalPagesRead: 0,
        readingStreak: 0,
        avgRatingGiven: 0,
      },
      genreBreakdown: [],
      recentActivity: [],
    },
    {
      name: 'Tanvir Ahmed',
      email: 'tanvir@hero.com',
      role: 'admin',
      status: 'Active',
      joined: '15 Nov 2025',
      image: 'https://i.pravatar.cc/150?u=4',
      readingChallenge: {
        annualGoal: 40,
        booksReadThisYear: 32,
        totalPagesRead: 9600,
        readingStreak: 20,
        avgRatingGiven: 4.5,
      },
      genreBreakdown: [
        { genre: 'History', count: 15 },
        { genre: 'Philosophy', count: 10 },
      ],
      recentActivity: [
        { type: 'finish', detail: 'finished "Sapiens"', date: '5 hours ago' },
      ],
    },
    {
      name: 'Nusrat Jahan',
      email: 'nusrat@gmail.com',
      role: 'user',
      status: 'Active',
      joined: '01 Jan 2026',
      image: 'https://i.pravatar.cc/150?u=5',
      readingChallenge: {
        annualGoal: 20,
        booksReadThisYear: 2,
        totalPagesRead: 600,
        readingStreak: 1,
        avgRatingGiven: 5.0,
      },
      genreBreakdown: [{ genre: 'Poetry', count: 2 }],
      recentActivity: [
        {
          type: 'rating',
          detail: 'rated "Milk and Honey" 5 stars',
          date: '10 mins ago',
        },
      ],
    },
    {
      name: 'Ariful Islam',
      email: 'arif@outlook.com',
      role: 'user',
      status: 'Active',
      joined: '10 Dec 2025',
      image: 'https://i.pravatar.cc/150?u=6',
      readingChallenge: {
        annualGoal: 30,
        booksReadThisYear: 18,
        totalPagesRead: 5400,
        readingStreak: 7,
        avgRatingGiven: 4.0,
      },
      genreBreakdown: [
        { genre: 'Business', count: 8 },
        { genre: 'Self-Help', count: 10 },
      ],
      recentActivity: [
        {
          type: 'shelf',
          detail: 'added "Atomic Habits" to Read',
          date: '1 day ago',
        },
      ],
    },
    {
      name: 'Sajid Hossain',
      email: 'sajid@dev.com',
      role: 'user',
      status: 'Active',
      joined: '22 Dec 2025',
      image: 'https://i.pravatar.cc/150?u=7',
      readingChallenge: {
        annualGoal: 15,
        booksReadThisYear: 3,
        totalPagesRead: 900,
        readingStreak: 2,
        avgRatingGiven: 3.8,
      },
      genreBreakdown: [{ genre: 'Thriller', count: 3 }],
      recentActivity: [
        {
          type: 'rating',
          detail: 'rated "Verity" 4 stars',
          date: '2 days ago',
        },
      ],
    },
    {
      name: 'Maliha Islam',
      email: 'maliha@bookworm.com',
      role: 'user',
      status: 'Active',
      joined: '08 Jan 2026',
      image: 'https://i.pravatar.cc/150?u=8',
      readingChallenge: {
        annualGoal: 50,
        booksReadThisYear: 12,
        totalPagesRead: 3600,
        readingStreak: 8,
        avgRatingGiven: 4.7,
      },
      genreBreakdown: [
        { genre: 'Classic', count: 7 },
        { genre: 'Drama', count: 5 },
      ],
      recentActivity: [
        {
          type: 'shelf',
          detail: 'added "Emma" to Want to Read',
          date: '4 hours ago',
        },
      ],
    },
    {
      name: 'Zubayer Alom',
      email: 'zubayer@hero.com',
      role: 'admin',
      status: 'Active',
      joined: '05 Oct 2025',
      image: 'https://i.pravatar.cc/150?u=9',
      readingChallenge: {
        annualGoal: 60,
        booksReadThisYear: 55,
        totalPagesRead: 16500,
        readingStreak: 30,
        avgRatingGiven: 4.9,
      },
      genreBreakdown: [
        { genre: 'Science', count: 20 },
        { genre: 'Tech', count: 35 },
      ],
      recentActivity: [
        { type: 'finish', detail: 'finished "Clean Code"', date: '1 hour ago' },
      ],
    },
    {
      name: 'Farhana Yeasmin',
      email: 'farhana@gmail.com',
      role: 'user',
      status: 'Blocked',
      joined: '18 Nov 2025',
      image: 'https://i.pravatar.cc/150?u=10',
      readingChallenge: {
        annualGoal: 25,
        booksReadThisYear: 4,
        totalPagesRead: 1200,
        readingStreak: 0,
        avgRatingGiven: 4.1,
      },
      genreBreakdown: [{ genre: 'Art', count: 4 }],
      recentActivity: [],
    },
    {
      name: 'Kamrul Hassan',
      email: 'kamrul@dev.com',
      role: 'user',
      status: 'Active',
      joined: '14 Dec 2025',
      image: 'https://i.pravatar.cc/150?u=11',
      readingChallenge: {
        annualGoal: 35,
        booksReadThisYear: 22,
        totalPagesRead: 6600,
        readingStreak: 12,
        avgRatingGiven: 4.3,
      },
      genreBreakdown: [
        { genre: 'History', count: 12 },
        { genre: 'War', count: 10 },
      ],
      recentActivity: [
        { type: 'rating', detail: 'rated "1984" 5 stars', date: '3 days ago' },
      ],
    },
    {
      name: 'Lutfun Nahar',
      email: 'lutfun@outlook.com',
      role: 'user',
      status: 'Active',
      joined: '02 Jan 2026',
      image: 'https://i.pravatar.cc/150?u=12',
      readingChallenge: {
        annualGoal: 10,
        booksReadThisYear: 1,
        totalPagesRead: 300,
        readingStreak: 1,
        avgRatingGiven: 4.0,
      },
      genreBreakdown: [{ genre: 'Cookbooks', count: 1 }],
      recentActivity: [
        {
          type: 'shelf',
          detail: 'added "Salt Fat Acid Heat" to Read',
          date: '5 days ago',
        },
      ],
    },
    {
      name: 'Mahmudul Hasan',
      email: 'mahmud@gmail.com',
      role: 'user',
      status: 'Active',
      joined: '28 Dec 2025',
      image: 'https://i.pravatar.cc/150?u=13',
      readingChallenge: {
        annualGoal: 20,
        booksReadThisYear: 7,
        totalPagesRead: 2100,
        readingStreak: 4,
        avgRatingGiven: 4.4,
      },
      genreBreakdown: [{ genre: 'Adventure', count: 7 }],
      recentActivity: [
        {
          type: 'shelf',
          detail: 'added "The Hobbit" to Currently Reading',
          date: '6 hours ago',
        },
      ],
    },
    {
      name: 'Sadia Afrin',
      email: 'sadia@bookworm.com',
      role: 'user',
      status: 'Active',
      joined: '11 Jan 2026',
      image: 'https://i.pravatar.cc/150?u=14',
      readingChallenge: {
        annualGoal: 30,
        booksReadThisYear: 3,
        totalPagesRead: 900,
        readingStreak: 2,
        avgRatingGiven: 4.6,
      },
      genreBreakdown: [{ genre: 'Psychology', count: 3 }],
      recentActivity: [
        {
          type: 'rating',
          detail: 'rated "Thinking Fast and Slow" 5 stars',
          date: '12 hours ago',
        },
      ],
    },
    {
      name: 'Tahsin Reza',
      email: 'tahsin@hero.com',
      role: 'admin',
      status: 'Active',
      joined: '20 Oct 2025',
      image: 'https://i.pravatar.cc/150?u=15',
      readingChallenge: {
        annualGoal: 75,
        booksReadThisYear: 40,
        totalPagesRead: 12000,
        readingStreak: 18,
        avgRatingGiven: 4.8,
      },
      genreBreakdown: [
        { genre: 'Economy', count: 20 },
        { genre: 'Politics', count: 20 },
      ],
      recentActivity: [
        {
          type: 'shelf',
          detail: 'added "Capital" to Read',
          date: '2 days ago',
        },
      ],
    },
  ];

  return (
    <div className="p-4 lg:p-10 space-y-10 bg-base-200/30 min-h-screen animate-in fade-in duration-1000">
      {/* --- Section 1: Minimalist Summary Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: 'Total Members',
            count: '1,284',
            icon: <FaUserCircle />,
            color: 'primary',
          },
          {
            label: 'Active Admins',
            count: '12',
            icon: <FaUserShield />,
            color: 'secondary',
          },
          {
            label: 'New This Month',
            count: '84',
            icon: <FaCalendarCheck />,
            color: 'accent',
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-base-100 p-6 rounded-[2rem] border border-base-200 shadow-sm flex items-center gap-5 hover:scale-105 transition-transform"
          >
            <div
              className={`w-14 h-14 rounded-2xl bg-${stat.color}/10 text-${stat.color} flex items-center justify-center text-2xl`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest font-bold text-base-content/40">
                {stat.label}
              </p>
              <h2 className="text-3xl font-serif font-bold">{stat.count}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* --- Section 2: Header & Modern Search --- */}
      <div className="flex flex-col lg:flex-row justify-between items-end gap-6">
        <div className="w-full lg:w-auto">
          <h1 className="text-4xl font-serif font-bold tracking-tight italic">
            Community <span className="text-primary opacity-60">Directory</span>
          </h1>
          <p className="text-sm font-medium text-base-content/50 mt-1">
            Manage permissions and oversee user accounts.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-4">
          {/* Enhanced Search Input */}
          <div className="relative group flex-1 sm:w-80">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors z-10" />
            <input
              type="text"
              placeholder="Filter by name or email..."
              className="input w-full h-14 pl-12 rounded-2xl bg-base-100 border-base-200 focus:border-primary focus:ring-0 shadow-sm font-medium"
            />
          </div>

          {/* New Advanced Filter Button */}
          <div className="dropdown dropdown-end w-full sm:w-auto">
            <button
              tabIndex={0}
              className="btn w-full sm:w-auto h-14 px-6 rounded-2xl bg-base-100 border-base-200 hover:bg-base-200 group flex items-center justify-between sm:justify-center gap-3 active:scale-95 transition-all"
            >
              <div className="flex items-center gap-3">
                {/* নতুন ফিল্টার আইকন */}
                <HiAdjustmentsHorizontal className="text-primary text-2xl group-hover:rotate-180 transition-transform duration-500" />
                <span className="uppercase tracking-widest text-[10px] font-bold">
                  {activeTab === 'all' ? 'Sort / Filter' : `Role: ${activeTab}`}
                </span>
              </div>
              {/* মোবাইলে ড্রপডাউন ইন্ডিকেটর */}
              <span className="sm:hidden opacity-30 text-xs">▼</span>
            </button>

            <ul
              tabIndex={0}
              className="dropdown-content z-[20] menu p-3 shadow-2xl bg-base-100 rounded-3xl w-full sm:w-56 mt-2 border border-base-200 space-y-1 animate-in slide-in-from-top-2 duration-300"
            >
              <li className="menu-title text-[9px] uppercase tracking-widest font-bold text-base-content/30 pb-2 px-4">
                Select Status
              </li>
              {['all', 'admin', 'user', 'blocked'].map(tab => (
                <li key={tab}>
                  <button
                    onClick={() => {
                      setActiveTab(tab);
                      document.activeElement.blur(); // ক্লিক করার পর ড্রপডাউন বন্ধ করার জন্য
                    }}
                    className={`capitalize font-bold text-xs rounded-xl py-3 px-4 ${
                      activeTab === tab
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : 'hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {tab}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* --- User Management Table (Admin) --- */}
      <div className="bg-base-100 rounded-[1.5rem] md:rounded-[2rem] border border-base-200 shadow-2xl overflow-hidden">
        {/* Header Section */}
        <div className="p-6 md:p-8 border-b border-base-200 bg-base-200/20">
          <h2 className="text-xl md:text-2xl font-black tracking-tight">
            User Management
          </h2>
          <p className="text-sm md:text-base text-base-content/60 mt-1">
            Control authorization levels and monitor user engagement.
          </p>
        </div>

        {/* Table Container with Horizontal Scroll */}
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-base-200/50 text-base-content/70 uppercase text-xs tracking-[2px] font-bold">
                <th className="py-5 pl-8 min-w-[250px]">User Profile</th>
                <th className="py-5 min-w-[200px]">Authorization</th>
                <th className="py-5 min-w-[180px]">Reading Goal Met</th>
                <th className="py-5 pr-8 text-right min-w-[150px]">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200">
              {users.map((user, idx) => {
                const progress = Math.round(
                  (user.readingChallenge.booksReadThisYear /
                    user.readingChallenge.annualGoal) *
                    100
                );

                return (
                  <tr
                    key={idx}
                    className="hover:bg-primary/[0.02] transition-colors group"
                  >
                    {/* User Identity */}
                    <td className="py-6 pl-8">
                      <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                          <img
                            src={user.image}
                            className="w-12 h-12 md:w-14 md:h-14 rounded-2xl object-cover border-2 border-base-200 shadow-sm"
                            alt={user.name}
                          />
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-base-100 ${
                              user.status === 'Active'
                                ? 'bg-success'
                                : 'bg-error'
                            }`}
                          ></div>
                        </div>
                        <div className="min-w-0">
                          <h4 className="font-bold text-base md:text-lg text-base-content leading-tight group-hover:text-primary transition-colors">
                            {user.name}
                          </h4>
                          <span className="text-xs md:text-sm text-base-content/50 font-medium block mt-1">
                            Joined: {user.joined}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Authorization Info */}
                    <td className="py-6">
                      <div className="flex flex-col gap-1.5">
                        <div
                          className={`flex items-center gap-2 w-fit px-3 py-1 rounded-full border font-bold text-[11px] md:text-xs uppercase tracking-wider ${
                            user.role === 'admin'
                              ? 'bg-primary/10 border-primary/20 text-primary'
                              : 'bg-base-200 border-base-300 text-base-content/60'
                          }`}
                        >
                          {user.role === 'admin' ? (
                            <MdAdminPanelSettings size={16} />
                          ) : (
                            <FaUser size={12} />
                          )}
                          {user.role}
                        </div>
                        <p className="text-xs md:text-sm text-base-content/40 font-medium truncate max-w-[180px]">
                          {user.email}
                        </p>
                      </div>
                    </td>

                    {/* Reading Progress */}
                    <td className="py-6">
                      <div className="flex flex-col w-32 md:w-40">
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-sm font-black text-primary">
                            {progress}%
                          </span>
                          <span className="text-[11px] font-bold opacity-40 uppercase">
                            Target: {user.readingChallenge.annualGoal}
                          </span>
                        </div>
                        <div className="w-full bg-base-200 h-2.5 rounded-full overflow-hidden shadow-inner">
                          <div
                            className="bg-primary h-full transition-all duration-1000 ease-out rounded-full"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    {/* Management Actions */}
                    <td className="py-6 pr-8 text-right">
                      <div className="flex justify-end gap-3">
                        <button
                          title={
                            user.role === 'admin'
                              ? 'Demote to User'
                              : 'Promote to Admin'
                          }
                          className={`btn btn-circle btn-sm md:btn-md border border-base-200 hover:shadow-lg transition-all ${
                            user.role === 'admin'
                              ? 'hover:text-secondary text-secondary/70 hover:scale-110 hover:bg-secondary/20'
                              : 'hover:text-primary text-primary/70 hover:scale-110 hover:bg-primary/20'
                          }`}
                        >
                          {user.role === 'admin' ? (
                            <FaUser size={18} />
                          ) : (
                            <MdAdminPanelSettings size={24} />
                          )}
                        </button>
                        <button
                          title="Delete User"
                          className="btn btn-circle btn-ghost btn-sm md:btn-md border border-base-200 text-error/40 hover:text-error hover:bg-error/5 hover:shadow-lg transition-all"
                        >
                          <FaUserMinus size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Footer Pagination --- */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-4 px-2">
        <p className="text-[10px] font-bold text-base-content/30 uppercase tracking-[2px]">
          Viewing 1-10 of 1,284 Bookworms
        </p>
        <div className="btn-group shadow-xl rounded-2xl overflow-hidden shadow-primary/5">
          <button className="btn btn-md bg-base-100 border-base-200 font-bold px-6 hover:bg-primary hover:text-white transition-colors">
            Prev
          </button>
          <button className="btn btn-md bg-base-100 border-base-200 font-bold px-6 hover:bg-primary hover:text-white transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
