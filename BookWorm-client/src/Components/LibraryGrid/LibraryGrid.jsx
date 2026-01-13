import React, { useState, useContext } from 'react';
import {
  FaEdit,
  FaExchangeAlt,
  FaTrash,
  FaBookOpen,
  FaTimes,
  FaCheckCircle,
} from 'react-icons/fa';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Swal from 'sweetalert2';
import { Link } from 'react-router';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../context/AuthContext';

const LibraryGrid = ({ books = [], activeTab }) => {
  const queryClient = useQueryClient();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newProgress, setNewProgress] = useState('');

  // ১. প্রগ্রেস আপডেটের জন্য Mutation
  const updateProgressMutation = useMutation({
    mutationFn: async ({ id, progress }) => {
      const res = await axiosSecure.patch(`/library/${id}`, { progress });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myLibrary', user?.email]);
      setSelectedBook(null);
      Swal.fire({
        title: 'Updated!',
        text: 'Your reading progress has been saved.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: () => {
      Swal.fire('Error', 'Failed to update progress.', 'error');
    },
  });

  // ২. ডিলিট বাটন ফাংশন (লজিক অ্যাড করতে পারেন)
  const handleDelete = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        // এখানে আপনার ডিলিট API কল করবেন
        console.log('Deleting book:', id);
      }
    });
  };

  const handleUpdateSubmit = e => {
    e.preventDefault();
    if (parseInt(newProgress) > selectedBook.totalPage) {
      return Swal.fire(
        'Wait!',
        'Progress cannot exceed total pages.',
        'warning'
      );
    }
    updateProgressMutation.mutate({
      id: selectedBook._id,
      progress: parseInt(newProgress),
    });
  };

  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-base-200/30 rounded-[3rem] border-2 border-dashed border-base-300 animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-base-200 rounded-full flex items-center justify-center text-3xl mb-4 opacity-50">
          <FaBookOpen />
        </div>
        <h3 className="text-xl font-bold text-base-content/60">
          No books here yet!
        </h3>
        <p className="text-sm text-base-content/40 mb-6 text-center italic">
          Start adding books to your{' '}
          <span className="capitalize">{activeTab}</span> shelf.
        </p>
        <Link
          to="/browse-books"
          className="btn btn-primary rounded-2xl px-8 shadow-lg shadow-primary/20"
        >
          Discover Books
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-10">
        {books.map(book => {
          const percentage =
            Math.round((book.progress / book.totalPage) * 100) || 0;

          return (
            <div
              key={book._id}
              className="bg-base-100 rounded-[2.5rem] border border-base-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full animate-in fade-in slide-in-from-bottom-4"
            >
              {/* বুক কভার ইমেজ */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
                {/* কভারের উপরে ছোট ব্যাজ (প্রগতি দেখালে ভালো লাগে) */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold">
                  {book.totalPage} Pages
                </div>
              </div>

              {/* কন্টেন্ট সেকশন */}
              <div className="p-6 flex-1 flex flex-col gap-4">
                <div>
                  <h3 className="text-lg font-serif font-bold text-base-content leading-tight truncate">
                    {book.title}
                  </h3>
                  <p className="text-xs text-base-content/50 font-medium mt-1 italic">
                    by {book.author}
                  </p>
                </div>

                {/* প্রগ্রেস বার (শুধুমাত্র readingly Reading ট্যাবে) */}
                {activeTab === 'reading' && (
                  <div className="space-y-2 bg-base-200/30 p-3 rounded-2xl">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold uppercase opacity-50">
                        Progress
                      </span>
                      <span className="text-xs font-bold text-primary">
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-base-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* ফিনিশড ব্যাজ */}
                {activeTab === 'read' && (
                  <div className="flex items-center gap-2 text-success bg-success/5 p-2 rounded-xl justify-center border border-success/10">
                    <FaCheckCircle className="text-sm" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      Completed
                    </span>
                  </div>
                )}

                {activeTab !== 'read' && (
                  <div className="mt-auto space-y-2">
                    <div className="grid grid-cols-4 gap-2">
                      {/* মুভ এবং এডিট বাটন */}
                      <Link
                        to={`/book-details/${book.bookId || book._id}`}
                        className="col-span-3 btn btn-sm bg-base-200 hover:bg-primary hover:text-white border-none rounded-xl text-[10px] font-bold uppercase gap-2"
                        title="Change Shelf"
                      >
                        <FaExchangeAlt /> Move Shelf
                      </Link>

                      <button
                        onClick={() => handleDelete(book._id)}
                        className="btn btn-sm bg-red-50 hover:bg-error hover:text-white text-error border-none rounded-xl"
                        title="Remove from Library"
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>

                    {/* প্রগ্রেস আপডেট বাটন (শুধুমাত্র কারেন্ট ট্যাবে) */}
                    {activeTab === 'reading' && (
                      <button
                        onClick={() => {
                          setSelectedBook(book);
                          setNewProgress(book.progress);
                        }}
                        className="w-full btn btn-sm btn-primary rounded-xl text-[10px] font-bold uppercase tracking-widest"
                      >
                        <FaEdit /> Update Pages
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* PROGRESS UPDATE MODAL */}
      {selectedBook && (
        <dialog className="modal modal-open backdrop-blur-md">
          <div className="modal-box bg-base-100 rounded-[2.5rem] p-0 max-w-md overflow-hidden border border-base-300 shadow-2xl">
            <div className="p-8 bg-primary text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold font-serif">
                  Update Progress
                </h3>
                <p className="text-[10px] uppercase tracking-[2px] opacity-70 font-bold">
                  Log your daily reading
                </p>
              </div>
              <button
                onClick={() => setSelectedBook(null)}
                className="btn btn-circle btn-sm bg-white/20 border-none text-white hover:bg-white/40"
              >
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleUpdateSubmit} className="p-8 space-y-6">
              <div className="flex gap-4 p-4 bg-base-200/50 rounded-2xl border border-base-200">
                <img
                  src={selectedBook.cover}
                  className="w-14 h-20 object-cover rounded-lg shadow-md"
                  alt=""
                />
                <div className="flex flex-col justify-center">
                  <h4 className="font-bold text-base-content line-clamp-1">
                    {selectedBook.title}
                  </h4>
                  <p className="text-xs text-base-content/50 mt-1">
                    Total: {selectedBook.totalPages} Pages
                  </p>
                </div>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-bold text-[11px] uppercase tracking-widest opacity-60">
                    Pages Read So Far
                  </span>
                </label>
                <input
                  type="number"
                  required
                  value={newProgress}
                  onChange={e => setNewProgress(e.target.value)}
                  className="input w-full h-14 rounded-2xl bg-base-300/50 border-none focus:ring-2 focus:ring-primary/20 text-xl font-bold text-primary outline-0 transition-all"
                />
              </div>
              <button
                type="submit"
                disabled={updateProgressMutation.isPending}
                className="btn btn-primary w-full h-14 rounded-2xl text-white font-bold uppercase tracking-widest shadow-lg shadow-primary/20"
              >
                {updateProgressMutation.isPending ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  'Save Progress'
                )}
              </button>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default LibraryGrid;
