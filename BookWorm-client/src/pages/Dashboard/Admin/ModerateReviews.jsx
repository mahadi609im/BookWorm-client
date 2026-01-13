import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'; // Added for functionality
import Swal from 'sweetalert2'; // For better UX confirmation
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import {
  HiCheckCircle,
  HiTrash,
  HiStar,
  HiAdjustmentsHorizontal,
  HiChatBubbleLeftRight,
  HiShieldCheck,
} from 'react-icons/hi2';
import useAxiosSecure from '../../../hooks/useAxiosSecure'; // Your existing hook
import Loading from '../../../Components/Loading/Loading'; // Your loading component

const ModerateReviews = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // --- ১. ডাটা ফেচিং (Backend থেকে সব রিভিউ আনা) ---
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ['admin-reviews', filterStatus],
    queryFn: async () => {
      // আপনি যদি ব্যাকএন্ডে কুয়েরি প্যারাম সাপোর্ট করেন তবে status পাঠানো ভালো
      const res = await axiosSecure.get('/reviews/admin');
      return res.data;
    },
  });

  // --- ২. এপ্রুভ করার মিউটেশন ---
  const approveMutation = useMutation({
    mutationFn: async id => {
      const res = await axiosSecure.patch(`/reviews/approve/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-reviews']);
      Swal.fire(
        'Approved!',
        'The review is now visible to everyone.',
        'success'
      );
    },
  });

  // --- ৩. ডিলিট করার মিউটেশন ---
  const deleteMutation = useMutation({
    mutationFn: async id => {
      const res = await axiosSecure.delete(`/reviews/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['admin-reviews']);
      Swal.fire('Deleted!', 'Review has been removed.', 'success');
    },
  });

  // Actions
  const handleApprove = id => {
    approveMutation.mutate(id);
  };

  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // Logic: Filter + Search (Frontend filtering on fetched data)
  const filteredReviews = reviews
    .filter(r => (filterStatus === 'all' ? true : r.status === filterStatus))
    .filter(
      r =>
        r.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.bookTitle?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 lg:p-10 space-y-8 bg-base-200/30 min-h-screen animate-in fade-in duration-700">
      {/* --- Top Header Section --- */}
      <div className="flex flex-col xl:flex-row justify-between items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-primary">
            <HiShieldCheck className="text-3xl" />
            <span className="uppercase tracking-[4px] text-[10px] font-bold opacity-60">
              Security Console
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold italic tracking-tight">
            Review <span className="text-primary opacity-40">Moderation</span>
          </h1>
          <p className="text-sm font-medium text-base-content/50 max-w-md">
            Maintain the integrity of the BookWorm community.
          </p>
        </div>

        <div className="flex flex-row items-center gap-4 w-full xl:w-auto">
          <div className="bg-base-100 h-16 px-6 rounded-2xl border border-base-200 shadow-sm flex items-center gap-4 group flex-1 md:flex-none">
            <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center text-lg shrink-0">
              <HiChatBubbleLeftRight />
            </div>
            <div className="flex items-center gap-3">
              <p className="text-[10px] uppercase font-bold text-base-content/40 tracking-[2px]">
                Pending
              </p>
              <div className="w-[1px] h-4 bg-base-200"></div>
              <p className="text-xl font-bold text-base-content">
                {reviews.filter(r => r.status === 'pending').length}
              </p>
            </div>
          </div>

          <div className="dropdown dropdown-end flex-1 md:flex-none">
            <button
              tabIndex={0}
              className="btn w-full h-16 px-6 rounded-2xl bg-primary text-white border-none shadow-lg shadow-primary/20 group flex items-center gap-3"
            >
              <HiAdjustmentsHorizontal className="text-2xl group-hover:rotate-180 transition-transform duration-500" />
              <span className="uppercase tracking-widest text-[10px] font-bold">
                {filterStatus === 'pending' ? 'Pending Only' : 'Show All'}
              </span>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[20] menu p-3 shadow-2xl bg-base-100 rounded-3xl w-60 mt-2 border border-base-200 space-y-1"
            >
              <li className="menu-title text-[9px] uppercase tracking-widest font-bold text-base-content/30 pb-2 px-4">
                Filter By Status
              </li>
              <li>
                <button
                  onClick={() => setFilterStatus('pending')}
                  className={`rounded-xl py-3 font-bold text-xs ${
                    filterStatus === 'pending'
                      ? 'bg-primary/10 text-primary'
                      : ''
                  }`}
                >
                  Pending Moderation
                </button>
              </li>
              <li>
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`rounded-xl py-3 font-bold text-xs ${
                    filterStatus === 'all' ? 'bg-primary/10 text-primary' : ''
                  }`}
                >
                  History (All)
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* --- Search Section --- */}
      <div className="max-w-md mx-auto relative group">
        <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors z-10" />
        <input
          type="text"
          placeholder="Search by username or book title..."
          className="input h-14 w-full pl-14 pr-6 rounded-2xl bg-base-100 border-base-200 focus:border-primary focus:outline-none shadow-sm text-sm font-medium transition-all"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <hr className="border-base-300 border-dashed" />

      {/* --- Reviews Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredReviews.map(review => (
          <div
            key={review._id} // Changed to _id for MongoDB
            className="bg-base-100 rounded-3xl border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
          >
            <div className="p-6 pb-0 flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring-2 ring-primary/10 ring-offset-2 overflow-hidden bg-base-200 flex items-center justify-center">
                    {review.userPhoto || review.userImage ? (
                      <img
                        src={review.userPhoto || review.userImage}
                        alt={review.userName}
                        onError={e => {
                          e.target.src =
                            'https://cdn-icons-png.flaticon.com/512/149/149071.png';
                        }} // ইমেজ লোড না হলে ডিফল্ট ছবি
                      />
                    ) : (
                      <FaUserCircle className="text-primary/40 text-2xl" />
                    )}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-base-content leading-none">
                    {review.userName}
                  </h4>
                  <span className="text-[10px] font-medium text-base-content/40">
                    {new Date(review.createdAt).toLocaleDateString()}{' '}
                    {/* Formatting Date */}
                  </span>
                </div>
              </div>

              <span
                className={`text-[9px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider ${
                  review.status === 'pending'
                    ? 'bg-amber-50 text-amber-600 border border-amber-100'
                    : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                }`}
              >
                {review.status}
              </span>
            </div>

            <div className="px-6 pt-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-bold text-primary uppercase tracking-wider">
                  {review.bookTitle}
                </p>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <HiStar
                      key={i}
                      className={`text-sm ${
                        i < review.rating ? 'text-orange-400' : 'text-base-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="bg-base-200/30 rounded-2xl p-4 mt-2">
                <p className="text-sm text-base-content/80 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>
            </div>

            <div className="p-6 mt-auto flex items-center justify-between gap-3">
              <button
                onClick={() => handleDelete(review._id)}
                disabled={deleteMutation.isPending}
                className="btn btn-ghost btn-sm h-10 w-10 p-0 rounded-xl text-base-content bg-error/10 hover:bg-error/20 hover:text-error transition-all"
                title="Delete Review"
              >
                <HiTrash className="text-lg" />
              </button>

              {review.status === 'pending' && (
                <button
                  onClick={() => handleApprove(review._id)}
                  disabled={approveMutation.isPending}
                  className="btn btn-primary btn-sm px-5 h-10 rounded-xl normal-case font-bold text-xs shadow-md shadow-primary/20 gap-2"
                >
                  Approve Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-base-100 flex items-center justify-center shadow-inner border border-base-200">
            <HiCheckCircle className="text-5xl text-success/30" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-bold italic">
              No Reviews Found
            </h3>
            <p className="text-sm text-base-content/40 font-medium">
              Try adjusting your search or filters.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModerateReviews;
