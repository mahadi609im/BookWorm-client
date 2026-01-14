import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // Logic added
import axios from 'axios'; // Logic added
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
import Swal from 'sweetalert2';
import Loading from '../../../Components/Loading/Loading';

const AdminDashboard = () => {
  const queryClient = useQueryClient();

  // --- 1. Fetch Dynamic Stats from Backend ---
  const { data: statsData, isLoading: isStatsLoading } = useQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/admin-stats');
      return res.data;
    },
  });

  // --- 2. Fetch Pending Reviews for the table ---
  const { data: reviews = [], isLoading: isReviewsLoading } = useQuery({
    queryKey: ['admin-reviews'],
    queryFn: async () => {
      const res = await axios.get('http://localhost:5000/reviews/admin');
      return res.data;
    },
  });

  // --- 3. Mutation for Approving Reviews ---
  const approveMutation = useMutation({
    mutationFn: async id => {
      return await axios.patch(`http://localhost:5000/reviews/approve/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-reviews', 'admin-stats']);
      Swal.fire('Approved!', 'Review is now live.', 'success');
    },
  });

  // --- 4. Mutation for Deleting/Rejecting Reviews ---
  const deleteMutation = useMutation({
    mutationFn: async id => {
      return await axios.delete(`http://localhost:5000/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-reviews']);
      Swal.fire('Deleted!', 'Review has been removed.', 'success');
    },
  });
  // Mapping dynamic stats to your existing design structure
  const stats = [
    {
      id: 1,
      title: 'Total Books',
      value: statsData?.totalBooks || 0,
      icon: <FaBook />,
      color: 'bg-blue-500',
      trend: 'Total library collection',
    },
    {
      id: 2,
      title: 'Total Users',
      value: statsData?.totalUsers || 0,
      icon: <FaUsers />,
      color: 'bg-purple-500',
      trend: 'Registered members',
    },
    {
      id: 3,
      title: 'Pending Reviews',
      value: statsData?.pendingReviews || 0,
      icon: <FaStar />,
      color: 'bg-orange-500',
      trend: 'Needs moderation',
    },
    {
      id: 4,
      title: 'Approved Reviews',
      value: statsData?.totalReviews || 0, // Assuming you add this to backend or calc it
      icon: <FaCheckCircle />,
      color: 'bg-green-500',
      trend: 'Published content',
    },
  ];

  // Formatting backend genreStats for the BarChart
  const genreChartData =
    statsData?.genreStats?.map(item => ({
      name: item._id || 'Unknown',
      books: item.count,
    })) || [];

  if (isStatsLoading || isReviewsLoading) {
    return <Loading></Loading>;
  }

  return (
    <div className="space-y-10 pb-10">
      {/* --- Welcome Header & Quick Actions --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-base-content">
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
              <p className="text-base-content/50 text-xs font-bold uppercase tracking-widest">
                {item.title}
              </p>
              <h2 className="text-3xl font-bold text-base-content mt-1">
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
        {/* Bar Chart - NOW DYNAMIC */}
        <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-sm">
          <h3 className="font-bold text-lg mb-8 flex items-center gap-2">
            <span className="w-2 h-6 bg-primary rounded-full"></span> Books by
            Genre
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={genreChartData}>
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

        {/* Area Chart - Keep static for design flow or map to activity data if available */}
        <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-sm">
          <h3 className="font-bold text-lg mb-8 flex items-center gap-2">
            <span className="w-2 h-6 bg-secondary rounded-full"></span> Reader
            Engagement
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={[
                  { month: 'Jan', active: 400 },
                  { month: 'Feb', active: 600 },
                  { month: 'Mar', active: 500 },
                  { month: 'Apr', active: 900 },
                  { month: 'May', active: 1100 },
                ]}
              >
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

      {/* --- Recent Activity Table - NOW DYNAMIC --- */}
      <div className="bg-base-100 rounded-[2.5rem] border border-base-300 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-base-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-bold text-lg">Pending Review Moderation</h3>
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
                <th className="font-bold uppercase text-[10px] pl-8">User</th>
                <th className="font-bold uppercase text-[10px]">Book Title</th>
                <th className="font-bold uppercase text-[10px]">Rating</th>
                <th className="font-bold uppercase text-[10px] text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="font-medium">
              {reviews
                .filter(r => r.status === 'pending')
                .slice(0, 5)
                .map(review => (
                  <tr
                    key={review._id}
                    className="hover:bg-base-200/30 transition-colors"
                  >
                    <td className="pl-8">
                      <div className="flex items-center gap-3">
                        <div className="avatar placeholder">
                          <div className="avatar">
                            <div className="bg-neutral text-neutral-content rounded-full w-8 overflow-hidden">
                              {review.userImage ? (
                                <img
                                  src={review.userImage}
                                  alt={review.userName}
                                  className="w-full h-full object-cover"
                                  onError={e => {
                                    e.target.style.display = 'none';
                                    e.target.parentElement.innerHTML = `<span>${review.userName?.slice(
                                      0,
                                      1
                                    )}</span>`;
                                  }}
                                />
                              ) : (
                                <span>{review.userName?.slice(0, 1)}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <span className="font-bold text-sm">
                          {review.userName}
                        </span>
                      </div>
                    </td>
                    <td className="text-sm font-semibold">
                      {review.bookTitle}
                    </td>
                    <td>
                      <div className="flex text-orange-400 text-xs">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={
                              i < review.rating
                                ? 'text-orange-400'
                                : 'text-base-content/10'
                            }
                          />
                        ))}
                      </div>
                    </td>
                    <td>
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => approveMutation.mutate(review._id)}
                          className="btn btn-square btn-sm btn-success text-white rounded-lg shadow-md shadow-success/20"
                        >
                          <FaCheck size={12} />
                        </button>
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: 'Are you sure?',
                              text: "You won't be able to revert this!",
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#d33',
                              cancelButtonColor: '#3085d6',
                              confirmButtonText: 'Yes, delete it!',
                              // Customizing design slightly to match your theme
                              customClass: {
                                popup: 'rounded-[2rem]',
                                confirmButton: 'rounded-xl',
                                cancelButton: 'rounded-xl',
                              },
                            }).then(result => {
                              if (result.isConfirmed) {
                                deleteMutation.mutate(review._id);
                              }
                            });
                          }}
                          className="btn btn-square btn-sm btn-error text-white rounded-lg shadow-md shadow-error/20"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              {reviews.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-10 opacity-50">
                    No pending reviews found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
