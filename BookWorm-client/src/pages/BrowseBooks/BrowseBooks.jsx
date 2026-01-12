import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const BrowseBooks = () => {
  const [search, setSearch] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');

  // TanStack Query for fetching books
  const { data: books, isLoading } = useQuery({
    queryKey: ['books', search, selectedGenre],
    queryFn: async () => {
      const res = await axios.get(
        `https://your-api.com/books?search=${search}&genre=${selectedGenre}`
      );
      return res.data;
    },
  });

  return (
    <div className="conCls mt-10">
      <h2 className="text-3xl font-serif font-bold mb-6 text-primary">
        Discover Your Next Read
      </h2>

      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by title or author..."
          className="input input-bordered w-full md:max-w-md border-primary/20 focus:border-primary"
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered w-full md:max-w-xs border-primary/20"
          onChange={e => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          <option value="Mystery">Mystery</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Fantasy">Fantasy</option>
          {/* এই লিস্টটি ডাটাবেস থেকে আসা উচিত */}
        </select>
      </div>

      {/* Book Grid */}
      {isLoading ? (
        <div className="flex justify-center mt-20">
          <span className="loading loading-bars loading-lg text-primary"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {books?.map(book => (
            <div
              key={book._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all border border-base-300"
            >
              <figure className="px-4 pt-4">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="rounded-xl h-64 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title font-serif text-lg">{book.title}</h2>
                <p className="text-sm opacity-70">by {book.author}</p>
                <div className="badge badge-outline text-xs">{book.genre}</div>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm">Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseBooks;
