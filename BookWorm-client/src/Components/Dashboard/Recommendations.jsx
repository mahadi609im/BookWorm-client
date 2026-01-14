import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaStar, FaInfoCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Loading from '../Loading/Loading';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Recommendations = ({ favoriteGenres = [], totalRead = 0 }) => {
  const axiosPublic = useAxiosSecure();
  const navigate = useNavigate();

  // ১. সব বই ফেচ করা (এখান থেকেই আমরা রিকমেন্ডেশন ফিল্টার করবো)
  const { data: allBooks = [], isLoading } = useQuery({
    queryKey: ['all-books-recommendations'],
    queryFn: async () => {
      const res = await axiosPublic.get('/books');
      return res.data;
    },
  });

  const getRecommendations = () => {
    if (totalRead < 3) {
      return [...allBooks].sort((a, b) => b.rating - a.rating).slice(0, 12);
    }

    return allBooks
      .filter(book => favoriteGenres.includes(book.genre))
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 12);
  };

  const recommendedBooks = getRecommendations();

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="bg-white dark:bg-base-100 p-8 rounded-3xl border border-base-200 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <p className="text-sm opacity-60">
            {totalRead < 3
              ? 'Popular picks to get you started'
              : `Based on your interest in ${favoriteGenres
                  .slice(0, 2)
                  .join(', ')}`}
          </p>
        </div>
        <button
          onClick={() => navigate('/browse-books')}
          className="btn btn-ghost btn-sm text-primary font-bold"
        >
          See All
        </button>
      </div>

      {/* রিকমেন্ডেশন গ্রিড */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {recommendedBooks.map(book => (
          <div key={book._id} className="group flex flex-col h-full">
            {/* ইমেজ কন্টেইনার */}
            <div className="relative overflow-hidden rounded-2xl mb-3 aspect-[2/3] shadow-md border border-base-200">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover"
              />

              {/* রেটিং ব্যাজ */}
              <div className="absolute top-2 right-2 badge badge-primary font-bold text-[10px] shadow-lg border-none py-3">
                {book.rating || 'N/A'} <FaStar className="ml-1 text-[8px]" />
              </div>

              {/* কেন এই বই? ছোট ইনফো ট্যাগ (Requirement fulfillment) */}
              <div className="absolute bottom-0 left-0 right-0 bg-base-100/90 backdrop-blur-sm p-2 border-t border-base-200">
                <p className="text-[9px] font-bold text-primary flex items-center gap-1 leading-tight">
                  <FaInfoCircle className="shrink-0" />
                  {totalRead < 3 ? 'Top Rated' : `${book.genre} Special`}
                </p>
              </div>
            </div>

            {/* টেক্সট কন্টেন্ট */}
            <div className="flex-1 space-y-1 px-1">
              <h3
                className="font-bold text-sm truncate text-base-content leading-snug"
                title={book.title}
              >
                {book.title}
              </h3>
              <p className="text-[10px] opacity-60 font-medium italic">
                {book.author}
              </p>
            </div>

            {/* সরাসরি ভিউ ডিটেইলস বাটন (হোভার ছাড়া) */}
            <button
              onClick={() => navigate(`/book-details/${book._id}`)}
              className="btn btn-primary btn-xs mt-3 w-full rounded-xl gap-2 font-bold normal-case shadow-md hover:shadow-primary/20"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* যদি কোনো বই না পাওয়া যায় */}
      {recommendedBooks.length === 0 && (
        <div className="text-center py-10 opacity-40">
          <p>No recommendations found yet. Start browsing!</p>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
