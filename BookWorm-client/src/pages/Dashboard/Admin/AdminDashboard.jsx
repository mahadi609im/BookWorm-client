import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import {
  FaBook,
  FaUsers,
  FaStar,
  FaCheckCircle,
  FaChartLine,
  FaPlus,
  FaArrowRight,
  FaTrash,
  FaCheck,
} from 'react-icons/fa';
import { Link } from 'react-router';

const AdminDashboard = () => {
  // ১. স্ট্যাটস কার্ড ডাটা
  const stats = [
    {
      id: 1,
      title: 'Total Books',
      value: '1,240',
      icon: <FaBook />,
      color: 'bg-blue-500',
      trend: '+12% this month',
    },
    {
      id: 2,
      title: 'Total Users',
      value: '850',
      icon: <FaUsers />,
      color: 'bg-purple-500',
      trend: '+5% this week',
    },
    {
      id: 3,
      title: 'Pending Reviews',
      value: '42',
      icon: <FaStar />,
      color: 'bg-orange-500',
      trend: 'Needs attention',
    },
    {
      id: 4,
      title: 'Approved Reviews',
      value: '3,120',
      icon: <FaCheckCircle />,
      color: 'bg-green-500',
      trend: '98% approval rate',
    },
  ];

  // ২. চার্ট ডাটা
  const genreData = [
    { name: 'Fiction', books: 400 },
    { name: 'Sci-Fi', books: 300 },
    { name: 'Mystery', books: 200 },
    { name: 'History', books: 278 },
    { name: 'Self-Help', books: 189 },
  ];

  const activityData = [
    { month: 'Jan', active: 400 },
    { month: 'Feb', active: 600 },
    { month: 'Mar', active: 500 },
    { month: 'Apr', active: 900 },
    { month: 'May', active: 1100 },
  ];

  return (
    <div className="space-y-10 pb-10">
      {/* --- Welcome Header & Quick Actions --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-black text-base-content">
            Dashboard <span className="text-primary italic">Overview</span>
          </h1>
          <p className="text-base-content/60 font-medium italic">
            Welcome back! Here is your library's performance.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin-dashboard/manage-books"
            className="btn btn-primary rounded-2xl shadow-lg shadow-primary/20"
          >
            <FaPlus /> Add New Book
          </Link>
          <Link
            to="/admin-dashboard/manage-users"
            className="btn btn-outline border-base-300 rounded-2xl"
          >
            View Users
          </Link>
        </div>
      </div>

      {/* --- Stats Cards Grid --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(item => (
          <div
            key={item.id}
            className="bg-base-100 p-6 rounded-[2rem] border border-base-200 shadow-sm hover:translate-y-[-5px] transition-all duration-300 group"
          >
            <div className="flex justify-between items-start">
              <div
                className={`p-4 rounded-2xl text-white ${item.color} shadow-lg shadow-current/20`}
              >
                {item.icon}
              </div>
              <div className="badge badge-ghost font-bold opacity-50 uppercase text-[10px] tracking-widest">
                Live
              </div>
            </div>
            <div className="mt-5">
              <p className="text-base-content/50 text-xs font-black uppercase tracking-widest">
                {item.title}
              </p>
              <h2 className="text-3xl font-black text-base-content mt-1">
                {item.value}
              </h2>
              <p className="text-[10px] font-bold text-success mt-2 flex items-center gap-1">
                <FaChartLine size={10} /> {item.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- Charts Section --- */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-sm">
          <h3 className="font-black text-lg mb-8 flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-full"></span> Books by
            Genre
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={genreData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7eb"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{
                    borderRadius: '16px',
                    border: 'none',
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
                  }}
                />
                <Bar
                  dataKey="books"
                  fill="#5956e9"
                  radius={[10, 10, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Area Chart */}
        <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-sm">
          <h3 className="font-black text-lg mb-8 flex items-center gap-2">
            <span className="w-2 h-6 bg-secondary rounded-full"></span> Reader
            Engagement
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b89f1" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8b89f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fontWeight: 600 }}
                />
                <YAxis hide />
                <Tooltip
                  contentStyle={{ borderRadius: '16px', border: 'none' }}
                />
                <Area
                  type="monotone"
                  dataKey="active"
                  stroke="#8b89f1"
                  strokeWidth={4}
                  fillOpacity={1}
                  fill="url(#colorActive)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* --- Recent Activity Table --- */}
      <div className="bg-base-100 rounded-[2.5rem] border border-base-300 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-base-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-black text-lg">Pending Review Moderation</h3>
            <p className="text-xs text-base-content/50 font-medium">
              Verify user reviews before they go public.
            </p>
          </div>
          <Link
            to="/admin-dashboard/moderate-reviews"
            className="btn btn-ghost btn-sm text-primary font-bold"
          >
            Moderate All <FaArrowRight />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-base-200/50">
                <th className="font-black uppercase text-[10px] pl-8">User</th>
                <th className="font-black uppercase text-[10px]">Book Title</th>
                <th className="font-black uppercase text-[10px]">Rating</th>
                <th className="font-black uppercase text-[10px] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="font-medium">
              {[1, 2, 3].map((_, i) => (
                <tr key={i} className="hover:bg-base-200/30 transition-colors">
                  <td className="pl-8">
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-neutral text-neutral-content rounded-full w-8">
                          <span>U{i}</span>
                        </div>
                      </div>
                      <span className="font-bold text-sm">User_{i + 100}</span>
                    </div>
                  </td>
                  <td className="text-sm font-semibold">
                    The Great Gatsby (Edition {i + 1})
                  </td>
                  <td>
                    <div className="flex text-orange-400 text-xs">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar className="text-base-content/10" />
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center gap-2">
                      <button className="btn btn-square btn-sm btn-success text-white rounded-lg shadow-md shadow-success/20">
                        <FaCheck size={12} />
                      </button>
                      <button className="btn btn-square btn-sm btn-error text-white rounded-lg shadow-md shadow-error/20">
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
