import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import Loading from '../../../Components/Loading/Loading';
import {
  FaUserShield,
  FaUserCircle,
  FaSearch,
  FaUser,
  FaLock,
  FaUnlock,
} from 'react-icons/fa';
import { HiAdjustmentsHorizontal } from 'react-icons/hi2';
import { MdAdminPanelSettings } from 'react-icons/md';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // সার্চ অপ্টিমাইজেশন (Debounce logic)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // ১. ডেটা ফেচিং
  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', activeTab],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?role=${activeTab}`);
      return res.data;
    },
  });

  // ২. রোল আপডেট মিউটেশন
  const roleMutation = useMutation({
    mutationFn: async ({ id, newRole }) => {
      const res = await axiosSecure.patch(`/users/role/${id}`, {
        role: newRole,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      Swal.fire('Success!', 'User role updated.', 'success');
    },
    onError: () => {
      Swal.fire('Error!', 'Something went wrong.', 'error');
    },
  });

  // ৩. স্ট্যাটাস মিউটেশন
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/users/status/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      Swal.fire('Updated!', 'User access status changed.', 'success');
    },
    onError: () => {
      Swal.fire('Error!', 'Failed to update status.', 'error');
    },
  });

  // হ্যান্ডলার: রোল পরিবর্তন
  const handleRoleToggle = user => {
    if (user.status === 'blocked') {
      return Swal.fire(
        'Action Denied',
        'Unblock the user first to change role.',
        'warning'
      );
    }
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    Swal.fire({
      title: `Change role for ${user.displayName}?`,
      text: `Promoting to ${newRole.toUpperCase()}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Yes, update!',
    }).then(result => {
      if (result.isConfirmed) roleMutation.mutate({ id: user._id, newRole });
    });
  };

  // হ্যান্ডলার: ব্লক/আনব্লক
  const handleStatusToggle = user => {
    const newStatus = user.status === 'blocked' ? 'active' : 'blocked';
    Swal.fire({
      title: `Are you sure?`,
      text: `This user will be ${newStatus.toUpperCase()}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: newStatus === 'blocked' ? '#d33' : '#3085d6',
      confirmButtonText: `Yes, ${newStatus}!`,
    }).then(result => {
      if (result.isConfirmed)
        statusMutation.mutate({ id: user._id, status: newStatus });
    });
  };

  // সার্চ ফিল্টারিং (Client-side with debounced value)
  const filteredUsers = users.filter(
    user =>
      user.displayName?.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
      user.email?.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 lg:p-10 space-y-10 bg-base-200/30 min-h-screen animate-in fade-in duration-700">
      {/* --- Summary Cards (Admin Overview) --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: 'Total Members',
            count: users.length,
            icon: <FaUserCircle />,
            color: 'primary',
          },
          {
            label: 'Admins',
            count: users.filter(u => u.role === 'admin').length,
            icon: <FaUserShield />,
            color: 'secondary',
          },
          {
            label: 'Blocked',
            count: users.filter(u => u.status === 'blocked').length,
            icon: <FaLock />,
            color: 'error',
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-base-100 p-6 rounded-[2rem] border border-base-200 shadow-sm flex items-center gap-5"
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

      {/* --- Header, Search & Filter --- */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
        <div className="flex-shrink-0">
          <h1 className="text-3xl md:text-4xl font-serif font-bold italic tracking-tight text-base-content">
            Manage <span className="text-primary opacity-60">Community</span>
          </h1>
          <p className="text-sm text-base-content/50 font-medium">
            Configure roles and access permissions.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
          <div className="relative group flex-grow md:w-80">
            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary z-10" />
            <input
              type="text"
              placeholder="Search by name or email..."
              className="input w-full h-14 pl-12 rounded-2xl bg-base-100 border-base-200 focus:border-primary shadow-sm focus:outline-none"
              onChange={e => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
          </div>

          <div className="dropdown dropdown-end flex-shrink-0">
            <button
              tabIndex={0}
              className="btn h-14 px-6 rounded-2xl bg-base-100 border-base-200 gap-3 hover:border-primary transition-all"
            >
              <HiAdjustmentsHorizontal className="text-primary text-2xl" />
              <span className="uppercase tracking-widest text-[10px] font-bold">
                Role: {activeTab}
              </span>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[20] menu p-3 shadow-2xl bg-base-100 rounded-3xl w-56 mt-2 border border-base-200"
            >
              {['all', 'admin', 'user'].map(tab => (
                <li key={tab}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`capitalize font-bold text-xs rounded-xl py-3 ${
                      activeTab === tab ? 'bg-primary text-white' : ''
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

      {/* --- Users Table Section --- */}
      <div className="bg-base-100 rounded-[2rem] border border-base-200 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="table w-full border-separate border-spacing-0 min-w-[900px]">
            <thead>
              <tr className="bg-base-200/50 text-base-content/70 uppercase text-xs tracking-[2px] font-bold">
                <th className="py-5 pl-8">Member Info</th>
                <th className="py-5">Access Role</th>
                <th className="py-5">Reading Progress</th>
                <th className="py-5 pr-8 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-200">
              {filteredUsers.map(user => {
                const goal = user.readingChallenge?.annualGoal || 1;
                const read = user.readingChallenge?.booksReadThisYear || 0;
                const progress = Math.min(Math.round((read / goal) * 100), 100);
                const isBlocked = user.status?.toLowerCase() === 'blocked';

                return (
                  <tr
                    key={user._id}
                    className={`hover:bg-primary/[0.01] transition-colors group ${
                      isBlocked ? 'bg-base-200/50' : ''
                    }`}
                  >
                    <td className="py-6 pl-8">
                      <div className="flex items-center gap-4">
                        <div className="relative flex-shrink-0">
                          <img
                            src={
                              user.photoURL ||
                              'https://i.pinimg.com/736x/a2/21/0b/a2210be814fed675ce5cf9bf3b7141e0.jpg'
                            }
                            className={`w-12 h-12 rounded-2xl object-cover border-2 shadow-sm ${
                              isBlocked
                                ? 'border-error grayscale'
                                : 'border-success'
                            }`}
                            alt={user.displayName}
                          />
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-base-100 ${
                              isBlocked
                                ? 'bg-error'
                                : 'bg-success animate-pulse'
                            }`}
                          ></div>
                        </div>
                        <div className="min-w-0">
                          <h4
                            className={`font-bold text-base truncate ${
                              isBlocked
                                ? 'line-through text-base-content/30'
                                : 'group-hover:text-primary'
                            }`}
                          >
                            {user.displayName}
                          </h4>
                          <span className="text-[10px] text-base-content/40 block font-medium uppercase tracking-tighter">
                            Since {user.joined || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="py-6">
                      <div
                        className={`flex items-center gap-2 w-fit px-3 py-1 rounded-full border font-bold text-[10px] uppercase tracking-wider 
                    ${
                      isBlocked
                        ? 'bg-base-300 text-base-content/30'
                        : user.role === 'admin'
                        ? 'bg-primary/10 text-primary border-primary/20'
                        : 'bg-base-200 text-base-content/60'
                    }`}
                      >
                        {user.role === 'admin' ? (
                          <MdAdminPanelSettings size={16} />
                        ) : (
                          <FaUser size={12} />
                        )}
                        {user.role}
                      </div>
                      <p className="text-xs text-base-content/40 mt-1 font-medium truncate max-w-[200px]">
                        {user.email}
                      </p>
                    </td>

                    <td className="py-6">
                      <div className="flex flex-col w-44">
                        <div className="flex justify-between items-end mb-2">
                          <span
                            className={`text-sm font-black ${
                              isBlocked
                                ? 'text-base-content/20'
                                : 'text-primary'
                            }`}
                          >
                            {progress}%
                          </span>
                          <span className="text-[10px] font-bold opacity-40">
                            {read}/{goal} Books
                          </span>
                        </div>
                        <div className="w-full bg-base-200 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full transition-all duration-1000 ${
                              isBlocked ? 'bg-base-300' : 'bg-primary'
                            }`}
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    <td className="py-6 pr-8 text-right">
                      <div className="flex justify-end gap-3">
                        {!isBlocked && (
                          <button
                            onClick={() => handleRoleToggle(user)}
                            className="btn btn-circle btn-sm border-base-200 text-primary hover:bg-primary hover:text-white shadow-sm"
                            title="Toggle Role"
                          >
                            {user.role === 'admin' ? (
                              <FaUser size={14} />
                            ) : (
                              <MdAdminPanelSettings size={18} />
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => handleStatusToggle(user)}
                          className={`btn btn-circle btn-sm border-base-200 shadow-sm ${
                            isBlocked
                              ? 'bg-success text-white'
                              : 'text-error hover:bg-error hover:text-white'
                          }`}
                          title={isBlocked ? 'Unblock' : 'Block'}
                        >
                          {isBlocked ? (
                            <FaUnlock size={14} />
                          ) : (
                            <FaLock size={14} />
                          )}
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
    </div>
  );
};

export default ManageUsers;
