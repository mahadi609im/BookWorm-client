import React, { useState } from 'react';
import {
  FaStar,
  FaPlus,
  FaCheck,
  FaBookmark,
  FaRegClock,
  FaUserCircle,
  FaPaperPlane,
} from 'react-icons/fa';

const BookDetails = () => {
  const [activeShelf, setActiveShelf] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(0);

  // ডামি বুক ডাটা
  const book = {
    id: 1,
    title: 'Dune: Part Two',
    author: 'Frank Herbert',
    genre: 'Sci-Fi',
    rating: 4.8,
    totalPages: 400,
    description:
      "Dune tells the story of young Paul Atreides, whose family accepts the stewardship of the planet Arrakis. While the planet is an inhospitable and sparsely populated desert wasteland, it is the only source of melange, or 'the spice', a drug that extends life and enhances mental abilities.",
    cover:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
    reviews: [
      {
        id: 1,
        user: 'Ariful Islam',
        rating: 5,
        comment: 'An absolute masterpiece of science fiction!',
        date: 'Jan 10, 2026',
      },
      {
        id: 2,
        user: 'Sultana Razia',
        rating: 4,
        comment:
          'The world-building is incredible, though it starts a bit slow.',
        date: 'Jan 08, 2026',
      },
    ],
  };

  return (
    <div className="conCls py-10 space-y-12 animate-fadeIn">
      {/* --- টপ সেকশন: কভার ও মেইন ইনফো --- */}
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* কভার ইমেজ */}
        <div className="w-full lg:w-1/3 max-w-[400px] sticky top-24">
          <div className="relative group rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/20 border-8 border-base-100">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full object-cover aspect-[3/4]"
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 font-black shadow-lg">
              <FaStar className="text-yellow-500" /> {book.rating}
            </div>
          </div>
        </div>

        {/* ইনফরমেশন */}
        <div className="flex-1 space-y-8">
          <div>
            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-widest">
              {book.genre}
            </span>
            <h1 className="text-5xl font-serif font-black text-base-content mt-4 leading-tight">
              {book.title}
            </h1>
            <p className="text-xl text-base-content/60 font-medium">
              by <span className="text-primary italic">{book.author}</span>
            </p>
          </div>

          <p className="text-lg leading-relaxed text-base-content/70 italic">
            "{book.description}"
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveShelf('want')}
              className={`btn btn-lg rounded-2xl flex-1 md:flex-none px-8 ${
                activeShelf === 'want'
                  ? 'btn-primary'
                  : 'btn-outline border-base-300'
              }`}
            >
              <FaBookmark /> Want to Read
            </button>
            <button
              onClick={() => setActiveShelf('reading')}
              className={`btn btn-lg rounded-2xl flex-1 md:flex-none px-8 ${
                activeShelf === 'reading'
                  ? 'btn-primary'
                  : 'btn-outline border-base-300'
              }`}
            >
              <FaRegClock /> Currently Reading
            </button>
            <button
              onClick={() => setActiveShelf('read')}
              className={`btn btn-lg rounded-2xl flex-1 md:flex-none px-8 ${
                activeShelf === 'read'
                  ? 'btn-primary'
                  : 'btn-outline border-base-300'
              }`}
            >
              <FaCheck /> Finished
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-base-200 pt-12">
        {/* --- রিভিউ লিখুন (Hiring Requirement) --- */}
        <div className="space-y-6">
          <h3 className="text-2xl font-serif font-black">
            Write a <span className="text-primary italic">Review</span>
          </h3>
          <div className="bg-base-200/50 p-8 rounded-[2.5rem] border border-base-200 space-y-6">
            {/* স্টার রেটিং */}
            <div className="flex gap-2">
              {[...Array(5)].map((_, index) => {
                index += 1;
                return (
                  <button
                    key={index}
                    className={`text-3xl transition-colors ${
                      index <= (hover || userRating)
                        ? 'text-yellow-500'
                        : 'text-base-300'
                    }`}
                    onClick={() => setUserRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(userRating)}
                  >
                    <FaStar />
                  </button>
                );
              })}
            </div>

            <textarea
              className="textarea textarea-bordered w-full h-32 rounded-2xl bg-base-100 border-none focus:ring-2 focus:ring-primary/20 text-lg p-4"
              placeholder="Share your thoughts on this book..."
            ></textarea>

            <button className="btn btn-primary btn-block h-14 rounded-2xl text-white font-black uppercase tracking-widest shadow-xl shadow-primary/30">
              Submit Review <FaPaperPlane className="ml-2" />
            </button>
            <p className="text-[10px] text-center text-base-content/40 font-bold uppercase tracking-widest">
              Note: Reviews require admin approval before being public.
            </p>
          </div>
        </div>

        {/* --- পাবলিক রিভিউ লিস্ট --- */}
        <div className="space-y-6">
          <h3 className="text-2xl font-serif font-black">
            Community <span className="text-primary italic">Reviews</span>
          </h3>
          <div className="space-y-4">
            {book.reviews.map(rev => (
              <div
                key={rev.id}
                className="p-6 bg-base-100 border border-base-200 rounded-3xl shadow-sm space-y-3"
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-primary/10 text-primary rounded-full w-10">
                        <FaUserCircle size={24} />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-black text-sm">{rev.user}</h4>
                      <p className="text-[10px] text-base-content/40 font-bold">
                        {rev.date}
                      </p>
                    </div>
                  </div>
                  <div className="flex text-yellow-500 text-xs">
                    {[...Array(rev.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>
                <p className="text-base-content/70 text-sm leading-relaxed">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
