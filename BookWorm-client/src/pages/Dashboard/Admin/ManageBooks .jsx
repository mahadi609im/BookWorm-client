import React from 'react';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaCloudUploadAlt,
  FaTimes,
} from 'react-icons/fa';

const ManageBooks = () => {
  // ডামি ডাটা
  const dummyBooks = [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Classic',
      status: 'In Stock',
      cover:
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 2,
      title: 'Atomic Habits',
      author: 'James Clear',
      genre: 'Self-Help',
      status: 'Trending',
      cover:
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=200',
    },
    {
      id: 3,
      title: 'Dune',
      author: 'Frank Herbert',
      genre: 'Sci-Fi',
      status: 'New Arrival',
      cover:
        'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80&w=200',
    },
  ];

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      {/* --- Glassmorphism Header --- */}
      <div className="relative overflow-hidden bg-primary/10 p-8 rounded-[2.5rem] border border-primary/20">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-black font-serif text-primary tracking-tight">
              Manage Inventory
            </h1>
            <p className="text-base-content/60 font-medium mt-1">
              Curate and maintain your library's digital collection.
            </p>
          </div>
          <button
            onClick={() =>
              document.getElementById('add_book_modal').showModal()
            }
            className="btn btn-primary rounded-2xl px-8 py-4 h-auto shadow-xl shadow-primary/30 hover:scale-105 transition-transform border-none"
          >
            <FaPlus className="text-lg" /> Add New Book
          </button>
        </div>
        <div className="absolute top-[-20%] right-[-5%] w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      </div>

      {/* --- Search & Filter Bar --- */}
      <div className="flex flex-col md:flex-row gap-3 items-center w-full">
        <div className="relative flex-1 w-full group">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search books or authors..."
            className="input w-full h-14 pl-12 rounded-2xl bg-base-200/50 border-none focus:bg-base-100 focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
          />
        </div>

        <div className="flex items-center w-full md:w-64 bg-base-200/50 dark:bg-base-200/30 border border-base-300 dark:border-base-content/10 rounded-xl px-4 hover:border-primary/50 transition-all group relative">
          <FaFilter
            size={12}
            className="text-base-content/40 group-hover:text-primary transition-colors shrink-0"
          />
          <select className="select select-sm w-full bg-transparent border-none focus:outline-none focus:ring-0 text-sm font-bold text-base-content/70 group-hover:text-base-content cursor-pointer appearance-none pl-3 pr-6 h-12">
            <option value="all">All Items</option>
            <option value="new">New Arrivals</option>
            <option value="top">Most Popular</option>
            <option value="archived">Archived</option>
          </select>
          <div className="absolute right-4 pointer-events-none text-base-content/30 group-hover:text-primary/70">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* --- Enhanced Books Table --- */}
      <div className="bg-base-100 rounded-[2.5rem] border border-base-200 shadow-xl shadow-base-300/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-lg w-full">
            <thead>
              <tr className="bg-base-200/30 border-none text-base-content/50 uppercase text-[11px] tracking-[2px] font-black">
                <th className="py-6 pl-10">Book Identity</th>
                <th>Category</th>
                <th>Author Details</th>
                <th className="text-center">Operations</th>
              </tr>
            </thead>
            <tbody className="font-medium">
              {dummyBooks.map(book => (
                <tr
                  key={book.id}
                  className="hover:bg-primary/5 border-b border-base-100 transition-colors group"
                >
                  <td className="pl-10 py-6">
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-14 h-20 object-cover rounded-xl shadow-md group-hover:rotate-2 transition-transform duration-300"
                        />
                        {/* Dynamic Status Color Logic */}
                        <div
                          className={`absolute -bottom-2 -right-2 text-white text-[8px] font-black px-2 py-1 rounded-lg shadow-sm ${
                            book.status === 'In Stock'
                              ? 'bg-success'
                              : book.status === 'Trending'
                              ? 'bg-secondary'
                              : 'bg-info'
                          }`}
                        >
                          {book.status}
                        </div>
                      </div>
                      <div>
                        <div className="font-black text-base text-base-content leading-tight">
                          {book.title}
                        </div>
                        <div className="text-[11px] text-primary font-bold mt-1">
                          Ref ID: BK-00{book.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-outline border-primary/20 text-primary font-bold px-4 py-3 rounded-xl bg-primary/5">
                      {book.genre}
                    </span>
                  </td>
                  <td className="text-sm font-bold text-base-content/70 italic">
                    {book.author}
                  </td>
                  <td className="pr-10">
                    <div className="flex justify-center gap-3">
                      <button className="btn btn-square btn-md rounded-xl bg-primary/10 text-primary border-none hover:bg-primary hover:text-white transition-all shadow-sm">
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() =>
                          document
                            .getElementById('delete_confirm_modal')
                            .showModal()
                        }
                        className="btn btn-square btn-md rounded-xl bg-error/10 text-error border-none hover:bg-error hover:text-white transition-all shadow-sm"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Pagination UI (New) --- */}
        <div className="flex flex-col md:flex-row justify-between items-center py-6 px-10 border-t border-base-100 gap-4 bg-base-200/10">
          <p className="text-sm font-bold text-base-content/50">
            Showing <span className="text-base-content">1</span> to{' '}
            <span className="text-base-content">3</span> of{' '}
            <span className="text-base-content">12</span> entries
          </p>
          <div className="join shadow-sm border border-base-200 overflow-hidden rounded-xl">
            <button className="join-item btn btn-sm bg-base-100 border-none hover:bg-primary hover:text-white transition-colors">
              «
            </button>
            <button className="join-item btn btn-sm bg-primary text-white border-none">
              1
            </button>
            <button className="join-item btn btn-sm bg-base-100 border-none hover:bg-primary hover:text-white transition-colors">
              2
            </button>
            <button className="join-item btn btn-sm bg-base-100 border-none hover:bg-primary hover:text-white transition-colors">
              »
            </button>
          </div>
        </div>
      </div>

      {/* --- Modals Section --- */}
      <div>
        {/* --- Add Book Modal --- */}
        <dialog
          id="add_book_modal"
          className="modal modal-middle backdrop-blur-md"
        >
          <div className="modal-box bg-base-100 rounded-[2.5rem] p-0 max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl border border-base-300 flex flex-col">
            <div className="bg-primary p-6 text-white relative shrink shadow-md">
              <button
                type="button"
                onClick={() =>
                  document.getElementById('add_book_modal').close()
                }
                className="absolute right-6 top-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
              >
                <FaTimes size={18} />
              </button>
              <h3 className="font-bold text-2xl font-serif tracking-tight">
                Add New Collection
              </h3>
              <p className="text-white/70 text-[10px] font-bold mt-1 uppercase tracking-[3px]">
                Metadata Configuration
              </p>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar bg-base-100">
              <form className="p-8 lg:p-12 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="form-control">
                  <label className="label font-black text-[11px] uppercase tracking-widest text-base-content/50">
                    Book Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. The Midnight Library"
                    className="input input-bordered h-14 rounded-2xl bg-base-200/40 border-none focus:ring-4 focus:ring-primary/10 font-bold w-full text-sm"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label font-black text-[11px] uppercase tracking-widest text-base-content/50">
                    Author Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Matt Haig"
                    className="input input-bordered h-14 rounded-2xl bg-base-200/40 border-none focus:ring-4 focus:ring-primary/10 font-bold w-full text-sm"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label font-black text-[11px] uppercase tracking-widest text-base-content/50">
                    Genre / Category
                  </label>
                  <select
                    defaultValue="Select Category"
                    className="select select-bordered h-14 rounded-2xl bg-base-200/40 border-none font-bold w-full text-sm"
                  >
                    <option disabled>Select Category</option>
                    <option>Fiction</option>
                    <option>Science</option>
                    <option>Philosophy</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label font-black text-[11px] uppercase tracking-widest text-base-content/50">
                    Total Pages
                  </label>
                  <input
                    type="number"
                    placeholder="288"
                    className="input input-bordered h-14 rounded-2xl bg-base-200/40 border-none font-bold w-full text-sm"
                  />
                </div>
                <div className="form-control col-span-1 md:col-span-2">
                  <label className="label font-black text-[11px] uppercase tracking-widest text-base-content/50">
                    Book Summary
                  </label>
                  <textarea
                    className="textarea w-full min-h-[140px] rounded-[1.5rem] bg-base-200/40 border-none focus:ring-4 focus:ring-primary/10 font-medium text-sm p-6 leading-relaxed resize-none"
                    placeholder="Provide a compelling overview..."
                  ></textarea>
                </div>
                <div className="form-control col-span-1 md:col-span-2 mb-4">
                  <label className="label font-black text-[11px] uppercase tracking-widest text-base-content/50">
                    Cover Artwork
                  </label>
                  <label className="relative border-2 border-dashed border-base-300 rounded-[2rem] p-12 flex flex-col items-center justify-center bg-base-200/20 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer group overflow-hidden">
                    <input
                      type="file"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <FaCloudUploadAlt className="text-2xl text-primary" />
                    </div>
                    <span className="font-bold text-sm text-base-content/70 mt-4">
                      Drop your cover here or click to browse
                    </span>
                    <span className="text-[10px] text-base-content/40 mt-1 uppercase font-black tracking-[1px]">
                      Recommended: 2:3 ratio, max 5MB
                    </span>
                  </label>
                </div>
              </form>
            </div>

            <div className="p-4 bg-base-200/30 border-t border-base-200 flex flex-col sm:flex-row justify-end gap-4 flex-shrink-0">
              <button
                type="button"
                onClick={() =>
                  document.getElementById('add_book_modal').close()
                }
                className="btn btn-ghost rounded-2xl font-bold px-6 h-12 order-2 sm:order-1"
              >
                Discard Changes
              </button>
              <button
                type="submit"
                className="btn btn-primary rounded-2xl px-6 h-12 shadow-xl shadow-primary/20 font-black border-none order-1 sm:order-2"
              >
                Create New Entry
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop bg-black/60">
            <button>close</button>
          </form>
        </dialog>

        {/* --- Delete Confirmation Modal (New) --- */}
        <dialog
          id="delete_confirm_modal"
          className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
        >
          <div className="modal-box bg-base-100 rounded-[2.5rem] p-8 text-center max-w-sm border border-base-200 shadow-2xl">
            <div className="w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <FaTrash size={30} />
            </div>
            <h3 className="font-black text-2xl text-base-content tracking-tight">
              Are you sure?
            </h3>
            <p className="py-4 text-base-content/60 font-medium leading-relaxed">
              This action cannot be undone. This book will be permanently
              removed from your inventory.
            </p>
            <div className="modal-action flex justify-center gap-3">
              <form method="dialog">
                <button className="btn btn-ghost rounded-2xl px-6 font-bold">
                  Cancel
                </button>
              </form>
              <button className="btn btn-error text-white rounded-2xl px-6 font-black border-none shadow-lg shadow-error/20 hover:scale-105 transition-transform">
                Yes, Delete
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop bg-black/40">
            <button>close</button>
          </form>
        </dialog>

        <style
          dangerouslySetInnerHTML={{
            __html: `
          .custom-scrollbar::-webkit-scrollbar { width: 8px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 20px; border: 2px solid transparent; background-clip: content-box; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; background-clip: content-box; }
        `,
          }}
        />
      </div>
    </div>
  );
};

export default ManageBooks;
