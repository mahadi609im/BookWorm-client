import React from 'react';
import {
  FaEdit,
  FaExchangeAlt,
  FaTrash,
  FaCheckCircle,
  FaStar,
  FaBookOpen,
} from 'react-icons/fa';

const LibraryGrid = ({ activeTab }) => {
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

  // ফিল্টার করা ডাটা
  const filteredBooks = libraryBooks.filter(book => book.shelf === activeTab);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
      {filteredBooks.map(book => {
        const percentage =
          book.totalPages > 0
            ? Math.round((book.progress / book.totalPages) * 100)
            : 0;

        return (
          <div
            key={book.id}
            className="group relative bg-base-100 rounded-[2rem] border border-base-200 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 flex flex-col h-full"
          >
            {/* Book Cover with Overlay Actions */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Image Overlay */}
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

              {/* Status Badge */}
              <div className="absolute top-4 right-4 bg-base-100/90 backdrop-blur-md px-3 py-1 rounded-full shadow-lg">
                <span className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1">
                  {activeTab === 'read' ? (
                    <FaCheckCircle className="text-success" />
                  ) : null}
                  {activeTab === 'current'
                    ? 'Reading'
                    : activeTab === 'read'
                    ? 'Finished'
                    : 'Waiting'}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-lg font-serif font-black text-base-content leading-tight mb-1 truncate">
                {book.title}
              </h3>
              <p className="text-xs text-base-content/50 font-medium mb-6">
                by {book.author}
              </p>

              <div className="mt-auto space-y-4">
                {/* Progress Tracking (Only for Current Tab) */}
                {activeTab === 'current' && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-end">
                      <p className="text-[10px] font-black text-base-content/40 uppercase tracking-widest">
                        Progress
                      </p>
                      <p className="text-xs font-black text-primary">
                        {percentage}%
                      </p>
                    </div>
                    <div className="w-full h-2 bg-base-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <button className="w-full py-3 bg-primary/5 hover:bg-primary text-primary hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-primary/10">
                      <FaEdit /> Update Pages
                    </button>
                  </div>
                )}

                {/* Review/Rating (Only for Read Tab) */}
                {activeTab === 'read' && (
                  <button className="w-full py-3 bg-yellow-400/10 hover:bg-yellow-400 text-yellow-600 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 border border-yellow-400/20">
                    <FaStar /> Write Review
                  </button>
                )}

                {/* Start Reading (Only for Want to Read Tab) */}
                {activeTab === 'want' && (
                  <button className="w-full py-3 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                    <FaBookOpen /> Start Reading
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LibraryGrid;
