import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import {
  HiCheckCircle,
  HiTrash,
  HiStar,
  HiOutlineClock,
  HiAdjustmentsHorizontal,
  HiChatBubbleLeftRight,
  HiShieldCheck,
  HiMagnifyingGlass,
} from 'react-icons/hi2';

const ModerateReviews = () => {
  const [filterStatus, setFilterStatus] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');

  // স্টেট ম্যানেজমেন্ট যাতে Approve/Delete কাজ করে
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userName: 'Anisur Rahman',
      userImage: 'https://i.pravatar.cc/150?u=1',
      bookTitle: 'The Great Gatsby',
      rating: 5,
      comment:
        'A masterpiece of American literature. The themes of wealth and love are timeless. Highly recommended for everyone.',
      date: '12 Jan 2026',
      status: 'pending',
    },
    {
      id: 2,
      userName: 'Sumaiya Akter',
      userImage: 'https://i.pravatar.cc/150?u=9',
      bookTitle: 'Atomic Habits',
      rating: 4,
      comment:
        'Very practical advice for building long-term habits. Changed my perspective on daily routines.',
      date: '10 Jan 2026',
      status: 'pending',
    },
    {
      id: 3,
      userName: 'Rakib Hasan',
      userImage: 'https://i.pravatar.cc/150?u=3',
      bookTitle: 'The Alchemist',
      rating: 3,
      comment:
        'Good story but felt a bit too idealistic at times. Still, a classic read.',
      date: '08 Jan 2026',
      status: 'pending',
    },
    {
      id: 4,
      userName: 'Mehedi Azad',
      userImage: 'https://i.pravatar.cc/150?u=4',
      bookTitle: 'Project Hail Mary',
      rating: 5,
      comment:
        'Best sci-fi I have read in years! The scientific details are fascinating and the bond between characters is heart-touching.',
      date: '05 Jan 2026',
      status: 'approved',
    },
    {
      id: 5,
      userName: 'Nusrat Jahan',
      userImage: 'https://i.pravatar.cc/150?u=5',
      bookTitle: 'Verity',
      rating: 2,
      comment:
        'Too dark and disturbing for my taste. The plot twist was unexpected but I didn’t enjoy the writing style.',
      date: '02 Jan 2026',
      status: 'pending',
    },
  ]);

  // Actions
  const handleApprove = id => {
    setReviews(
      reviews.map(r => (r.id === id ? { ...r, status: 'approved' } : r))
    );
  };

  const handleDelete = id => {
    if (window.confirm('Delete this review?')) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  // Logic: Filter + Search
  const filteredReviews = reviews
    .filter(r => (filterStatus === 'all' ? true : r.status === filterStatus))
    .filter(
      r =>
        r.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.bookTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="p-4 lg:p-10 space-y-8 bg-base-200/30 min-h-screen animate-in fade-in duration-700">
      {/* --- Top Header Section --- */}
      <div className="flex flex-col xl:flex-row justify-between items-center gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-primary">
            <HiShieldCheck className="text-3xl" />
            <span className="uppercase tracking-[4px] text-[10px] font-black opacity-60">
              Security Console
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-black italic tracking-tight">
            Review <span className="text-primary opacity-40">Moderation</span>
          </h1>
          <p className="text-sm font-medium text-base-content/50 max-w-md">
            Maintain the integrity of the BookWorm community.
          </p>
        </div>

        {/* Header Stats & Filter Dropdown */}
        <div className="flex flex-row items-center gap-4 w-full xl:w-auto">
          <div className="bg-base-100 h-16 px-6 rounded-2xl border border-base-200 shadow-sm flex items-center gap-4 group flex-1 md:flex-none">
            <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center text-lg shrink-0">
              <HiChatBubbleLeftRight />
            </div>
            <div className="flex items-center gap-3">
              <p className="text-[10px] uppercase font-black text-base-content/40 tracking-[2px]">
                Pending
              </p>
              <div className="w-[1px] h-4 bg-base-200"></div>
              <p className="text-xl font-black text-base-content">
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
              <span className="uppercase tracking-widest text-[10px] font-black">
                {filterStatus === 'pending' ? 'Pending Only' : 'Show All'}
              </span>
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-[20] menu p-3 shadow-2xl bg-base-100 rounded-3xl w-60 mt-2 border border-base-200 space-y-1"
            >
              <li className="menu-title text-[9px] uppercase tracking-widest font-black text-base-content/30 pb-2 px-4">
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

      {/* --- Search Section (নিচে রাখা হয়েছে) --- */}
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
            key={review.id}
            className="bg-base-100 rounded-3xl border border-base-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
          >
            {/* Top Section: User Info & Status */}
            <div className="p-6 pb-0 flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring-2 ring-primary/10 ring-offset-2">
                    <img src={review.userImage} alt={review.userName} />
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-sm text-base-content leading-none">
                    {review.userName}
                  </h4>
                  <span className="text-[10px] font-medium text-base-content/40">
                    {review.date}
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

            {/* Middle Section: Book Title & Rating */}
            <div className="px-6 pt-5">
              <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-black text-primary uppercase tracking-wider">
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

              {/* Clean Comment Area */}
              <div className="bg-base-200/30 rounded-2xl p-4 mt-2">
                <p className="text-sm text-base-content/80 leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>
            </div>

            {/* Bottom Section: Actions */}
            <div className="p-6 mt-auto flex items-center justify-between gap-3">
              <button
                onClick={() => handleDelete(review.id)}
                className="btn btn-ghost btn-sm h-10 w-10 p-0 rounded-xl text-base-content bg-error/10 hover:bg-error/20 hover:text-error transition-all"
                title="Delete Review"
              >
                <HiTrash className="text-lg" />
              </button>

              {review.status === 'pending' && (
                <button
                  onClick={() => handleApprove(review.id)}
                  className="btn btn-primary btn-sm px-5 h-10 rounded-xl normal-case font-bold text-xs shadow-md shadow-primary/20 gap-2"
                >
                  Approve Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* --- Empty State --- */}
      {filteredReviews.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-24 h-24 rounded-full bg-base-100 flex items-center justify-center shadow-inner border border-base-200">
            <HiCheckCircle className="text-5xl text-success/30" />
          </div>
          <div>
            <h3 className="text-2xl font-serif font-black italic">
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
