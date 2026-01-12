import React, { useState, useEffect } from 'react';
import {
  FaSearch,
  FaFilter,
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaPlusCircle,
  FaInfoCircle,
  FaSortAmountDown,
} from 'react-icons/fa';
import { Link } from 'react-router';

const BrowseBooks = () => {
  const allBooks = [
    {
      id: 1,
      title: 'Dune: Part Two',
      author: 'Frank Herbert',
      genre: 'Sci-Fi',
      rating: 4.5,
      cover:
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      genre: 'Self-Help',
      rating: 5,
      cover:
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 3,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      genre: 'Sci-Fi',
      rating: 4.9,
      cover:
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 4,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      genre: 'Fantasy',
      rating: 4.2,
      cover:
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 5,
      title: 'Deep Work',
      author: 'Cal Newport',
      genre: 'Self-Help',
      rating: 4.8,
      cover:
        'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 6,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      genre: 'Fiction',
      rating: 4.9,
      cover:
        'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 7,
      title: 'Think and Grow Rich',
      author: 'Napoleon Hill',
      genre: 'Self-Help',
      rating: 4.4,
      cover:
        'https://images.unsplash.com/photo-1592492159418-39f319320569?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 8,
      title: 'Psychology of Money',
      author: 'Morgan Housel',
      genre: 'Self-Help',
      rating: 4.7,
      cover:
        'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 9,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      rating: 4.1,
      cover:
        'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 10,
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      genre: 'History',
      rating: 4.8,
      cover:
        'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 11,
      title: 'Brave New World',
      author: 'Aldous Huxley',
      genre: 'Sci-Fi',
      rating: 4.3,
      cover:
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 12,
      title: 'The 5 AM Club',
      author: 'Robin Sharma',
      genre: 'Self-Help',
      rating: 4.0,
      cover:
        'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 13,
      title: 'The Silent Patient',
      author: 'Alex Michaelides',
      genre: 'Thriller',
      rating: 4.6,
      cover:
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 14,
      title: 'Ikigai',
      author: 'Hector Garcia',
      genre: 'Self-Help',
      rating: 4.5,
      cover:
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    },
    {
      id: 15,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      genre: 'Fantasy',
      rating: 4.9,
      cover:
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
    },
  ];

  const genres = [
    'Sci-Fi',
    'Mystery',
    'Fantasy',
    'Self-Help',
    'History',
    'Fiction',
  ];

  // --- States ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 6; // আপনার রিকোয়ারমেন্ট অনুযায়ী

  // --- Logic: Filtering ---
  const filteredBooks = allBooks.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenres.length === 0 || selectedGenres.includes(book.genre);
    return matchesSearch && matchesGenre;
  });

  // --- Logic: Pagination Calculations ---
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  // পেজ চেঞ্জ হলে টপে যাওয়ার জন্য
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const toggleGenre = genre => {
    setSelectedGenres(prev =>
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
    setCurrentPage(1); // ফিল্টার করলে প্রথম পেজে ফেরত যাবে
  };

  return (
    <div className="conCls py-10 space-y-10 min-h-screen">
      {/* --- হেডার সেকশন --- */}
      <div className="flex flex-col gap-6">
        {/* --- হেডার সেকশন --- */}
        <div className="flex flex-col gap-2">
          {' '}
          {/* গ্যাপ কিছুটা কমানো হয়েছে সুন্দর দেখানোর জন্য */}
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-base-content">
            Explore <span className="text-primary italic">Collection</span>
          </h1>
          <p className="text-base-content/60 text-lg font-medium italic max-w-2xl">
            Dive into our vast universe of stories, from mind-bending sci-fi to
            life-changing habits. Your next great adventure is just a shelf
            away.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1 group">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by title or author..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-base-100 border border-base-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm transition-all"
              onChange={e => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <div className="flex gap-3">
            <select
              className="select select-bordered rounded-2xl bg-base-100 border-base-200 focus:ring-2 focus:ring-primary/20 h-14.5 min-w-37.5"
              defaultValue="Sort By" // এখানে defaultValue ব্যবহার করুন
            >
              <option disabled>Sort By</option>
              <option value="rating">Highest Rating</option>
              <option value="shelved">Most Shelved</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* --- ফিল্টার সাইডবার --- */}
        <aside className="space-y-8 lg:sticky lg:top-24 h-fit">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-base-content/40 mb-4 flex items-center gap-2">
              <FaFilter className="text-xs" /> Filter by Genre
            </h3>
            <div className="flex flex-wrap lg:flex-col gap-2">
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border text-left flex justify-between items-center ${
                    selectedGenres.includes(genre)
                      ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                      : 'bg-base-100 border-base-200 hover:border-primary/50'
                  }`}
                >
                  {genre}
                  {selectedGenres.includes(genre) && (
                    <span className="ml-2 text-[10px]">✕</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* --- বুক গ্রিড (৬টি বই প্রতি পেজে) --- */}
        <div className="lg:col-span-3 space-y-10">
          {currentBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 animate-fadeIn">
              {currentBooks.map(book => (
                <div
                  key={book.id}
                  className="group bg-base-100 rounded-[2.5rem] border border-base-200 p-4 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col"
                >
                  <div className="relative aspect-3/4 rounded-4xl overflow-hidden mb-5">
                    <img
                      src={book.cover}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      alt={book.title}
                    />
                    <div className="absolute top-3 right-3  backdrop-blur-2xl px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                      <FaStar className="text-yellow-500 text-[10px]" />
                      <span className="text-[10px] font-bold">
                        {book.rating}
                      </span>
                    </div>
                  </div>
                  <div className="px-2 pb-2 flex-1 flex flex-col">
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
                      {book.genre}
                    </p>
                    <h3 className="text-lg font-serif font-bold text-base-content leading-tight line-clamp-1">
                      {book.title}
                    </h3>
                    <p className="text-xs text-base-content/50 font-medium mb-4 italic">
                      by {book.author}
                    </p>

                    <div className="flex gap-2 mt-auto">
                      <button className="flex-1 bg-primary text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-primary-focus transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                        <FaPlusCircle /> Add Shelf
                      </button>
                      <Link
                        to="/book-details/2"
                        className="p-3 bg-base-200 text-base-content/70 rounded-xl hover:bg-primary hover:text-white transition-all"
                      >
                        <FaInfoCircle size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center bg-base-200/30 rounded-[3rem] border-2 border-dashed border-base-300">
              <p className="text-base-content/40 font-bold italic">
                No books found matching your criteria.
              </p>
            </div>
          )}

          {/* --- ৪. Pagination (Logic Updated) --- */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 border-t border-base-200 pt-10">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`p-4 rounded-xl border border-base-300 transition-all ${
                  currentPage === 1
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:bg-primary hover:text-white'
                }`}
              >
                <FaChevronLeft />
              </button>

              <div className="flex gap-2">
                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(index + 1)}
                    className={`w-10 h-10 rounded-xl font-bold transition-all ${
                      currentPage === index + 1
                        ? 'bg-primary text-white shadow-lg'
                        : 'hover:bg-base-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() =>
                  setCurrentPage(prev => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className={`p-4 rounded-xl border border-base-300 transition-all ${
                  currentPage === totalPages
                    ? 'opacity-30 cursor-not-allowed'
                    : 'hover:bg-primary hover:text-white'
                }`}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrowseBooks;
