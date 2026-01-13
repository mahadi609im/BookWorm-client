import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Star,
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Info,
  X,
  BookOpen,
} from 'lucide-react';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../Components/Loading/Loading';

const BrowseBooks = () => {
  const axiosSecure = useAxiosSecure();

  // --- States ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Default');
  const booksPerPage = 6;

  const genres = [
    'Sci-Fi',
    'Mystery',
    'Fantasy',
    'Self-Help',
    'History',
    'Fiction',
    'Thriller',
  ];

  // ১. ডাটা ফেচিং সেকশন
  const { data: allBooks = [], isLoading } = useQuery({
    queryKey: ['browseBooks'],
    queryFn: async () => {
      const res = await axiosSecure.get('/books');
      console.log('API Data:', res.data);
      return Array.isArray(res.data) ? res.data : [];
    },
  });

  const filteredBooks = (Array.isArray(allBooks) ? allBooks : [])
    .filter(book => {
      const matchesSearch =
        book?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book?.author?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre =
        selectedGenres.length === 0 || selectedGenres.includes(book?.genre);
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  // --- Pagination Calculations ---
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const currentBooks = filteredBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const toggleGenre = genre => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
    setCurrentPage(1);
  };

  if (isLoading) return <Loading />;

  return (
    <section className="min-h-screen py-24 px-6 md:px-12 lg:px-20 bg-base-100 relative overflow-hidden transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-0 left-10 w-64 h-64 bg-primary/5 blur-[120px] rounded-full -z-10"></div>

      {/* --- Header --- */}
      <div className="relative z-10 mb-16 text-center lg:text-left animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-black mb-4 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent tracking-tighter">
          Explore <span className="italic font-serif">Collection</span>
        </h1>
        <p className="text-base-content/60 text-lg max-w-2xl font-medium italic">
          Dive into our vast universe of stories. Your next great adventure is
          just a shelf away.
        </p>
      </div>

      {/* --- Search & Filter Bar --- */}
      <div className="flex flex-col lg:flex-row gap-6 mb-12 relative z-10">
        <div className="relative flex-1 group">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors"
            size={20}
          />
          <input
            type="text"
            placeholder="Search by title or author..."
            className="w-full pl-14 pr-12 py-5 bg-base-200 border border-base-300 rounded-3xl focus:outline-none focus:ring-4 focus:ring-primary/5 transition-all font-medium text-base-content shadow-sm"
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-primary"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <div className="flex gap-4">
          <div className="dropdown dropdown-bottom md:dropdown-end group">
            {/* Dropdown Button */}
            <div
              tabIndex={0}
              role="button"
              className="btn h-14 md:h-16 px-8 rounded-4xl bg-base-200 border-none hover:bg-base-300 transition-all flex items-center gap-3 shadow-sm group-active:scale-95"
            >
              <div className="flex flex-col items-start">
                <span className="text-[9px] uppercase tracking-[0.2em] text-base-content/40 font-black leading-none mb-1">
                  Sort Results
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-primary">
                  {sortBy === 'rating' ? 'Highest Rating' : 'Default Sort'}
                </span>
              </div>
              <ChevronLeft
                size={16}
                className="-rotate-90 text-base-content/30 group-hover:translate-y-0.5 transition-transform"
              />
            </div>

            {/* Dropdown Menu */}
            <ul
              tabIndex={0}
              className="dropdown-content z-20 menu p-3 shadow-2xl bg-base-100 rounded-4xl w-64 mt-3 border border-base-200 backdrop-blur-xl animate-fadeIn"
            >
              <li className="menu-title text-[10px] uppercase tracking-widest font-black text-base-content/30 pb-3 px-4">
                Choose Priority
              </li>

              {/* Option: Default */}
              <li>
                <button
                  onClick={() => {
                    setSortBy('Default');
                    document.activeElement.blur(); // অটোমেটিক ড্রপডাউন বন্ধ করবে
                  }}
                  className={`py-4 px-5 rounded-2xl flex justify-between items-center transition-all ${
                    sortBy === 'Default'
                      ? 'bg-primary/10 text-primary font-black'
                      : 'hover:bg-base-200 font-bold text-base-content/60'
                  }`}
                >
                  Default Order
                  {sortBy === 'Default' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </button>
              </li>

              {/* Option: Rating */}
              <li>
                <button
                  onClick={() => {
                    setSortBy('rating');
                    document.activeElement.blur();
                  }}
                  className={`py-4 px-5 rounded-2xl flex justify-between items-center transition-all ${
                    sortBy === 'rating'
                      ? 'bg-primary/10 text-primary font-black'
                      : 'hover:bg-base-200 font-bold text-base-content/60'
                  }`}
                >
                  Highest Rating
                  <Star
                    size={14}
                    className={sortBy === 'rating' ? 'fill-primary' : ''}
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* --- Sidebar: Genres --- */}
        <aside className="lg:sticky lg:top-24 h-fit space-y-6">
          <div className="p-6 bg-base-200/50 rounded-[2.5rem] border border-base-200 shadow-inner">
            <h3 className="text-xs font-black uppercase tracking-widest text-base-content/40 mb-6 flex items-center gap-2">
              <Filter size={14} /> Filter by Genre
            </h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all border flex justify-between items-center ${
                    selectedGenres.includes(genre)
                      ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20'
                      : 'bg-base-100 border-base-300 hover:border-primary/50 text-base-content/70'
                  }`}
                >
                  {genre}
                  {selectedGenres.includes(genre) && <X size={12} />}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* --- Book Grid --- */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="popLayout">
            {currentBooks.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 bg-base-200 rounded-[3rem] border-2 border-dashed border-base-300"
              >
                <BookOpen
                  className="mx-auto text-base-content/20 mb-4"
                  size={48}
                />
                <p className="text-base-content/40 font-bold italic">
                  No books found matching your criteria.
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {currentBooks.map(book => (
                  <motion.div
                    layout
                    key={book._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-base-100 border border-base-300 rounded-[2.5rem] p-4 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full"
                  >
                    {/* Cover Section */}
                    <div className="relative aspect-3/4 rounded-4xl overflow-hidden mb-6 shadow-lg bg-base-200">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-xl flex items-center gap-1 shadow-sm">
                        <Star
                          className="text-yellow-500 fill-yellow-500"
                          size={12}
                        />
                        <span className="text-xs font-black text-black">
                          {book.rating}
                        </span>
                      </div>
                    </div>

                    {/* Info Section */}
                    <div className="px-2 flex-1 flex flex-col">
                      <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2">
                        {book.genre}
                      </span>
                      <h3 className="text-xl font-bold text-base-content mb-1 line-clamp-1 group-hover:text-primary transition-colors italic">
                        {book.title}
                      </h3>
                      <p className="text-sm text-base-content/50 mb-6 font-medium italic">
                        by {book.author}
                      </p>

                      {/* Actions */}
                      <div className="flex gap-3 mt-auto">
                        <button className="flex-1 bg-primary text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                          <PlusCircle size={16} /> Add Shelf
                        </button>
                        <Link
                          to={`/book-details/${book._id}`}
                          className="p-4 bg-base-200 text-base-content/70 rounded-2xl hover:bg-base-content hover:text-base-100 transition-all"
                        >
                          <Info size={18} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* --- Pagination --- */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 mt-16 border-t border-base-200 pt-10">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-4 rounded-2xl border border-base-300 disabled:opacity-20 hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                <ChevronLeft size={20} />
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-12 h-12 rounded-2xl font-black transition-all cursor-pointer ${
                      currentPage === i + 1
                        ? 'bg-primary text-white shadow-xl scale-110'
                        : 'bg-base-200 hover:bg-base-300 text-base-content/70'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-4 rounded-2xl border border-base-300 disabled:opacity-20 hover:bg-primary hover:text-white transition-all cursor-pointer"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BrowseBooks;
