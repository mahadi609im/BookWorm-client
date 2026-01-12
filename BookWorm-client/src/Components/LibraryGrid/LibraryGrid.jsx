import React, { useState } from 'react';
import {
  FaEdit,
  FaExchangeAlt,
  FaTrash,
  FaCheckCircle,
  FaStar,
  FaBookOpen,
  FaTimes,
} from 'react-icons/fa';
import { Link } from 'react-router';

const LibraryGrid = ({ activeTab }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [newProgress, setNewProgress] = useState('');

  const libraryBooks = [
    // --- Currently Reading (Shelf: current) ---
    {
      id: 1,
      title: 'Dune: Part Two',
      author: 'Frank Herbert',
      cover:
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
      shelf: 'current',
      progress: 145,
      totalPages: 400,
      rating: 4.5,
    },
    {
      id: 4,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      cover:
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
      shelf: 'current',
      progress: 88,
      totalPages: 288,
      rating: 4.2,
    },
    {
      id: 5,
      title: 'Deep Work',
      author: 'Cal Newport',
      cover:
        'https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400',
      shelf: 'current',
      progress: 210,
      totalPages: 300,
      rating: 4.8,
    },

    // --- Finished Reading (Shelf: read) ---
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      cover:
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
      shelf: 'read',
      progress: 320,
      totalPages: 320,
      rating: 5,
    },
    {
      id: 6,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      cover:
        'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=400',
      shelf: 'read',
      progress: 197,
      totalPages: 197,
      rating: 4.9,
    },
    {
      id: 7,
      title: 'Think and Grow Rich',
      author: 'Napoleon Hill',
      cover:
        'https://images.unsplash.com/photo-1592492159418-39f319320569?auto=format&fit=crop&q=80&w=400',
      shelf: 'read',
      progress: 238,
      totalPages: 238,
      rating: 4.4,
    },
    {
      id: 8,
      title: 'Psychology of Money',
      author: 'Morgan Housel',
      cover:
        'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=400',
      shelf: 'read',
      progress: 250,
      totalPages: 250,
      rating: 4.7,
    },

    // --- Want to Read (Shelf: want) ---
    {
      id: 3,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      cover:
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=400',
      shelf: 'want',
      progress: 0,
      totalPages: 480,
      rating: 0,
    },
    {
      id: 9,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      cover:
        'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&q=80&w=400',
      shelf: 'want',
      progress: 0,
      totalPages: 180,
      rating: 0,
    },

    {
      id: 10,
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      cover:
        'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=400',
      shelf: 'want',
      progress: 0,
      totalPages: 443,
      rating: 0,
    },

    {
      id: 11,
      title: 'Brave New World',
      author: 'Aldous Huxley',
      cover:
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=400',
      shelf: 'want',
      progress: 0,
      totalPages: 311,
      rating: 0,
    },
    {
      id: 12,
      title: 'The 5 AM Club',
      author: 'Robin Sharma',
      cover:
        'https://images.unsplash.com/photo-1506466010722-395aa2bef877?auto=format&fit=crop&q=80&w=400',
      shelf: 'want',
      progress: 0,
      totalPages: 336,
      rating: 0,
    },
  ];

  const filteredBooks = libraryBooks.filter(book => book.shelf === activeTab);

  // Modal ওপেন করার ফাংশন
  const handleUpdateClick = book => {
    setSelectedBook(book);
    setNewProgress(book.progress);
  };

  // ১. Empty State Handling (যদি সেলফ খালি থাকে)
  if (filteredBooks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-base-200/30 rounded-[3rem] border-2 border-dashed border-base-300 animate-fadeIn">
        <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center text-3xl mb-4 opacity-50">
          <FaBookOpen />
        </div>
        <h3 className="text-xl font-bold text-base-content/60">
          No books here yet!
        </h3>
        <p className="text-sm text-base-content/40 mb-6">
          Start adding books to your {activeTab} shelf.
        </p>
        <Link
          to="/browse-books"
          className="btn btn-primary btn-md rounded-2xl px-8 shadow-lg shadow-primary/20"
        >
          Discover Books
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
        {filteredBooks.map(book => {
          const percentage = Math.round(
            (book.progress / book.totalPages) * 100
          );

          return (
            <div
              key={book.id}
              className="group relative bg-base-100 rounded-[2rem] border border-base-200 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full animate-fadeIn"
            >
              {/* Cover Image & Overlay (আগের মতোই) */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex gap-2">
                    <button className="flex-1 bg-white/20 backdrop-blur-md text-white py-2 rounded-xl text-xs font-bold hover:bg-primary transition-colors flex items-center justify-center gap-2">
                      <FaExchangeAlt /> Move
                    </button>
                    <button className="p-2 bg-red-500/20 backdrop-blur-md text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-colors">
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-serif font-bold text-base-content leading-tight mb-1 truncate">
                  {book.title}
                </h3>
                <p className="text-xs text-base-content/50 font-medium mb-6">
                  by {book.author}
                </p>

                <div className="mt-auto space-y-4">
                  {activeTab === 'current' && (
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest">
                          Progress
                        </p>
                        <p className="text-xs font-bold text-primary">
                          {percentage}%
                        </p>
                      </div>
                      <div className="w-full h-2 bg-base-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <button
                        onClick={() => handleUpdateClick(book)}
                        className="w-full py-3 bg-primary/5 hover:bg-primary text-primary hover:text-white rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all border border-primary/10"
                      >
                        <FaEdit className="inline mr-2" /> Update Pages
                      </button>
                    </div>
                  )}
                  {/* ... বাকি বাটনগুলো (Read/Want) আগের মতোই থাকবে ... */}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- ২. PROGRESS UPDATE MODAL (Hiring Requirement) --- */}
      {selectedBook && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fadeIn">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedBook(null)}
          ></div>

          <div className="relative bg-base-100 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl border border-base-200 overflow-hidden">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-serif font-bold text-base-content">
                Update <span className="text-primary italic">Progress</span>
              </h3>
              <button
                onClick={() => setSelectedBook(null)}
                className="p-2 hover:bg-base-200 rounded-full transition-colors"
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex gap-4 mb-6 p-4 bg-base-200/50 rounded-2xl border border-base-200">
              <img
                src={selectedBook.cover}
                className="w-16 h-20 object-cover rounded-lg shadow-md"
                alt=""
              />
              <div>
                <h4 className="font-bold text-base-content line-clamp-1">
                  {selectedBook.title}
                </h4>
                <p className="text-xs text-base-content/50 mt-1">
                  Total: {selectedBook.totalPages} Pages
                </p>
              </div>
            </div>

            {/* Progress Input */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-base-content/40 ml-1">
                Pages Read So Far
              </label>
              <input
                type="number"
                value={newProgress}
                onChange={e => setNewProgress(e.target.value)}
                max={selectedBook.totalPages}
                className="w-full bg-base-200 border-none rounded-2xl p-4 text-xl font-bold text-primary focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="Enter page number..."
              />
              <button className="btn btn-primary w-full h-14 rounded-2xl text-white font-bold uppercase tracking-widest shadow-xl shadow-primary/30">
                Save Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryGrid;
