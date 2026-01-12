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
} from 'react-icons/fa';
import { HiAdjustmentsHorizontal } from 'react-icons/hi2';

const ManageUsers = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Sample Data
  const users = [
    {
      id: 'USR-8821',
      name: 'Anisur Rahman',
      email: 'anis@hero.com',
      role: 'Admin',
      status: 'Active',
      joined: '12 Oct 2025',
      image: 'https://i.pravatar.cc/150?u=1',
    },
    {
      id: 'USR-9012',
      name: 'Sumaiya Akter',
      email: 'sumaiya@bookworm.com',
      role: 'User',
      status: 'Active',
      joined: '05 Jan 2026',
      image: 'https://i.pravatar.cc/150?u=2',
    },
    {
      id: 'USR-4432',
      name: 'Rakib Hasan',
      email: 'rakib@dev.com',
      role: 'User',
      status: 'Blocked',
      joined: '20 Dec 2025',
      image: 'https://i.pravatar.cc/150?u=3',
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

      {/* --- Section 4: Modern User Table --- */}
      <div className="bg-base-100 rounded-[2.5rem] border border-base-200 shadow-2xl shadow-base-300/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-none">
            <thead>
              <tr className="bg-base-200/50 text-base-content/40 uppercase text-[9px] tracking-[4px] font-bold">
                <th className="py-6 pl-10">User</th>
                <th className="py-6">Authorization</th>
                <th className="py-6">Status</th>
                <th className="py-6 pr-10 text-right">Settings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200">
              {users.map(user => (
                <tr
                  key={user.id}
                  className="hover:bg-primary/5 transition-colors group"
                >
                  <td className="py-6 pl-10">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={user.image}
                          className="w-14 h-14 rounded-[1.2rem] object-cover"
                          alt=""
                        />
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-4 border-base-100 ${
                            user.status === 'Active' ? 'bg-success' : 'bg-error'
                          }`}
                        ></div>
                      </div>
                      <div>
                        <h4 className="font-bold text-base leading-tight">
                          {user.name}
                        </h4>
                        <span className="text-[10px] text-base-content/40 font-bold uppercase tracking-tighter">
                          {user.id}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="py-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-base-content/70 italic">
                        {user.role}
                      </span>
                      <div className="flex items-center gap-1.5 text-[11px] text-base-content/30 font-bold">
                        <FaEnvelopeOpenText /> {user.email}
                      </div>
                    </div>
                  </td>

                  <td className="py-6">
                    <div
                      className={`badge badge-ghost border-none rounded-lg text-[9px] font-bold uppercase tracking-widest px-3 h-6 ${
                        user.status === 'Active'
                          ? 'bg-success/10 text-success'
                          : 'bg-error/10 text-error'
                      }`}
                    >
                      <FaCircle className="text-[6px] mr-1.5" /> {user.status}
                    </div>
                  </td>

                  <td className="py-6 pr-10 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                      <button className="btn btn-square btn-ghost btn-sm rounded-lg hover:bg-primary hover:text-white border border-base-200">
                        <FaUserEdit size={14} />
                      </button>
                      <button className="btn btn-square btn-ghost btn-sm rounded-lg hover:bg-error hover:text-white border border-base-200 text-error">
                        <FaUserMinus size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
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
