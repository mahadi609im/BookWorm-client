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
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // স্টেট ম্যানেজমেন্ট যাতে Approve/Delete কাজ করে
  const [reviews, setReviews] = useState([
    {
      id: 1,
      userName: 'Anisur Rahman', // User List matching
      userImage: 'https://i.pravatar.cc/150?u=1',
      bookTitle: 'The Great Gatsby',
      rating: 5,
      comment:
        'A masterpiece of American literature. The themes of wealth and love are timeless. Highly recommended!',
      date: '12 Jan 2026',
      status: 'pending',
    },
    {
      id: 2,
      userName: 'Sumaiya Akter',
      userImage: 'https://i.pravatar.cc/150?u=2',
      bookTitle: 'Circe',
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
        'Good story but felt a bit too idealistic at times. Still, a classic read for beginners.',
      date: '08 Jan 2026',
      status: 'pending',
    },
    {
      id: 4,
      userName: 'Tanvir Ahmed',
      userImage: 'https://i.pravatar.cc/150?u=4',
      bookTitle: 'Sapiens',
      rating: 5,
      comment:
        'Fascinating journey through human history. Makes you think differently about our species.',
      date: '05 Jan 2026',
      status: 'approved',
    },
    {
      id: 5,
      userName: 'Nusrat Jahan',
      userImage: 'https://i.pravatar.cc/150?u=5',
      bookTitle: 'Milk and Honey',
      rating: 5,
      comment:
        'Raw, emotional, and beautiful. Every poem speaks to the soul directly.',
      date: '12 Jan 2026',
      status: 'pending',
    },
    {
      id: 6,
      userName: 'Ariful Islam',
      userImage: 'https://i.pravatar.cc/150?u=6',
      bookTitle: 'Atomic Habits',
      rating: 4,
      comment:
        'Small changes truly make a big difference. This book is a manual for life.',
      date: '01 Jan 2026',
      status: 'pending',
    },
    {
      id: 7,
      userName: 'Sajid Hossain',
      userImage: 'https://i.pravatar.cc/150?u=7',
      bookTitle: 'Verity',
      rating: 4,
      comment:
        'The twist at the end left me speechless! A darker side of fiction that works well.',
      date: '10 Jan 2026',
      status: 'approved',
    },
    {
      id: 8,
      userName: 'Maliha Islam',
      userImage: 'https://i.pravatar.cc/150?u=8',
      bookTitle: 'Emma',
      rating: 5,
      comment:
        'Jane Austen at her best. The character development of Emma is just brilliant.',
      date: '12 Jan 2026',
      status: 'pending',
    },
    {
      id: 9,
      userName: 'Zubayer Alom',
      userImage: 'https://i.pravatar.cc/150?u=9',
      bookTitle: 'Clean Code',
      rating: 5,
      comment:
        'Essential reading for every developer. It changed the way I write functions.',
      date: '11 Jan 2026',
      status: 'pending',
    },
    {
      id: 10,
      userName: 'Farhana Yeasmin',
      userImage: 'https://i.pravatar.cc/150?u=10',
      bookTitle: 'The Starry Night',
      rating: 4,
      comment:
        'A visual and narrative treat for art lovers. Beautifully put together.',
      date: '22 Dec 2025',
      status: 'approved',
    },
    {
      id: 11,
      userName: 'Kamrul Hassan',
      userImage: 'https://i.pravatar.cc/150?u=11',
      bookTitle: '1984',
      rating: 5,
      comment:
        'Chillingly relevant. Orwell’s vision of the future is a powerful warning.',
      date: '09 Jan 2026',
      status: 'pending',
    },
    {
      id: 12,
      userName: 'Lutfun Nahar',
      userImage: 'https://i.pravatar.cc/150?u=12',
      bookTitle: 'Salt Fat Acid Heat',
      rating: 4,
      comment:
        'Not just a cookbook, but a guide to understanding the science of cooking.',
      date: '07 Jan 2026',
      status: 'pending',
    },
    {
      id: 13,
      userName: 'Mahmudul Hasan',
      userImage: 'https://i.pravatar.cc/150?u=13',
      bookTitle: 'The Hobbit',
      rating: 5,
      comment:
        'A grand adventure that feels cozy and epic at the same time. Love Bilbo!',
      date: '12 Jan 2026',
      status: 'approved',
    },
    {
      id: 14,
      userName: 'Sadia Afrin',
      userImage: 'https://i.pravatar.cc/150?u=14',
      bookTitle: 'Thinking Fast and Slow',
      rating: 5,
      comment:
        'A deep dive into cognitive biases. It will make you question your own decisions.',
      date: '12 Jan 2026',
      status: 'pending',
    },
    {
      id: 15,
      userName: 'Tahsin Reza',
      userImage: 'https://i.pravatar.cc/150?u=15',
      bookTitle: 'Capital',
      rating: 4,
      comment:
        'A heavy but important read for anyone interested in economics and politics.',
      date: '10 Jan 2026',
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

        {/* Header Stats & Filter Dropdown */}
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
