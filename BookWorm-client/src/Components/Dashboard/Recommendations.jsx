import React from 'react';
import { FaStar, FaInfoCircle } from 'react-icons/fa';

const Recommendations = () => {
  // Demo Data (Requirements onujayi 12-18 books)
  const recommendedBooks = Array(12).fill({
    title: 'The Midnight Library',
    author: 'Matt Haig',
    genre: 'Fantasy',
    rating: 4.8,
    reason: 'Matches your preference for Fantasy (4 books read)',
    cover:
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
  });

  return (
    <div className="bg-white dark:bg-base-100 p-8 rounded-3xl border border-base-200 shadow-sm">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-serif font-black text-base-content">
            Recommended for You
          </h2>
          <p className="text-sm opacity-60">
            Based on your reading history and ratings
          </p>
        </div>
        <button className="btn btn-ghost btn-sm text-primary font-bold">
          See All
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {recommendedBooks.map((book, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="relative overflow-hidden rounded-2xl mb-3 aspect-[2/3]">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-2 right-2 badge badge-primary font-bold text-[10px] shadow-lg">
                {book.rating} <FaStar className="ml-1 text-[8px]" />
              </div>
              {/* Requirement: Bonus tooltip/explanation */}
              <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center p-4 text-center">
                <FaInfoCircle className="text-white mx-auto mb-2 text-xl" />
                <p className="text-white text-[10px] font-bold leading-tight">
                  {book.reason}
                </p>
                <button className="btn btn-xs mt-3 bg-white text-primary border-none hover:bg-white/90">
                  View Detail
                </button>
              </div>
            </div>
            <h3 className="font-bold text-sm truncate text-base-content">
              {book.title}
            </h3>
            <p className="text-[10px] opacity-60 font-medium">{book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommendations;
