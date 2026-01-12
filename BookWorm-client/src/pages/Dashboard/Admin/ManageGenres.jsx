import React, { useState } from 'react';
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaTrashAlt,
  FaEdit,
  FaLayerGroup,
  FaTimes,
  FaExclamationTriangle,
  FaInfoCircle,
} from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi2';

const ManageGenres = () => {
  // ১. স্টেট ম্যানেজমেন্ট
  const [genres, setGenres] = useState([
    {
      id: 'GEN-001',
      name: 'Science Fiction',
      count: 124,
      status: 'Active',
      color: 'primary',
    },
    {
      id: 'GEN-002',
      name: 'Philosophy',
      count: 86,
      status: 'Active',
      color: 'secondary',
    },
    {
      id: 'GEN-003',
      name: 'Mystery & Thriller',
      count: 52,
      status: 'Archived',
      color: 'accent',
    },
  ]);

  const [filterStatus, setFilterStatus] = useState('all');

  // সিলেক্টেড জেনারে স্টেট (এরর সলভ করার জন্য এটি প্রয়োজন ছিল)
  const [selectedGenre, setSelectedGenre] = useState({
    id: '',
    name: '',
    status: 'Active',
  });
  const [isEditMode, setIsEditMode] = useState(false);

  // মোডাল কন্ট্রোল ফাংশন
  const handleEditClick = genre => {
    setIsEditMode(true);
    setSelectedGenre(genre);
    document.getElementById('genre_modal').showModal();
  };

  const handleAddClick = () => {
    setIsEditMode(false);
    setSelectedGenre({
      id: `GEN-00${genres.length + 1}`,
      name: '',
      status: 'Active',
    });
    document.getElementById('genre_modal').showModal();
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* --- Elegant Header --- */}
      <div className="relative overflow-hidden bg-linear-to-br from-primary/20 via-base-100 to-secondary/10 p-8 lg:p-12 rounded-[3rem] border border-base-200 shadow-sm">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-1 bg-primary rounded-full"></div>
              <span className="text-[10px] uppercase tracking-[4px] font-bold text-primary/60">
                Library Architect
              </span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold font-serif tracking-tight text-base-content">
              Manage <span className="text-primary italic">Genres</span>
            </h1>
            <p className="text-base-content/50 font-medium mt-2 max-w-md">
              Define the structural categories of your literary world.
            </p>
          </div>
          <button
            onClick={handleAddClick}
            className="btn btn-primary rounded-2xl px-8 h-16 shadow-2xl shadow-primary/30 font-bold border-none gap-3 hover:scale-105 transition-all group"
          >
            <FaPlus className="group-hover:rotate-90 transition-transform" />
            <span className="uppercase tracking-widest text-xs">
              Add New Category
            </span>
          </button>
        </div>
      </div>

      {/* --- Search & Filter Bar --- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
        <div className="lg:col-span-8 relative group">
          <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-base-content/20 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search by genre name or ID code..."
            className="input w-full h-16 pl-14 rounded-3xl bg-base-200/40 border-none focus:bg-base-100 focus:ring-4 focus:ring-primary/10 transition-all font-medium shadow-inner"
          />
        </div>
        {/* --- Re-designed Status Filter --- */}
        <div className="lg:col-span-4 flex gap-3">
          <div className="dropdown dropdown-end w-full">
            <button
              tabIndex={0}
              className="btn w-full h-16 px-6 rounded-3xl bg-base-100 border border-base-200 hover:bg-base-200 group flex items-center justify-between active:scale-95 transition-all shadow-sm focus:ring-4 focus:ring-primary/5"
            >
              <div className="flex items-center gap-3">
                <FaFilter className="text-primary text-sm group-hover:scale-110 transition-transform" />
                <span className="uppercase tracking-widest text-[10px] font-bold">
                  {filterStatus === 'all'
                    ? 'All Status'
                    : `${filterStatus} Only`}
                </span>
              </div>
              <HiChevronDown className="text-base-content/30 group-hover:translate-y-0.5 transition-transform" />
            </button>

            <ul
              tabIndex={0}
              className="dropdown-content z-20 menu p-3 shadow-2xl bg-base-100 rounded-3xl w-full mt-2 border border-base-200 space-y-1 animate-in slide-in-from-top-2 duration-300"
            >
              <li className="menu-title text-[9px] uppercase tracking-widest font-bold text-base-content/30 pb-2 px-4">
                Select Status
              </li>
              {[
                { label: 'All Status', value: 'all' },
                { label: 'Active Only', value: 'active' },
                { label: 'Archived', value: 'archived' },
              ].map(item => (
                <li key={item.value}>
                  <button
                    onClick={() => {
                      setFilterStatus(item.value); // স্টেট আপডেট হচ্ছে এখানে
                      document.activeElement.blur(); // ক্লিক করলে ড্রপডাউন বন্ধ হবে
                    }}
                    className={`capitalize font-bold text-xs rounded-xl py-3 px-4 flex justify-between items-center transition-all ${
                      filterStatus === item.value
                        ? 'bg-primary text-white shadow-lg shadow-primary/20'
                        : 'hover:bg-primary/10 hover:text-primary text-base-content/60'
                    }`}
                  >
                    {item.label}
                    {filterStatus === item.value && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm"></span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* --- Genres Table --- */}
      <div className="bg-base-100 rounded-[2.5rem] border border-base-200 shadow-xl shadow-base-300/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-2 px-4">
            <thead>
              <tr className="text-base-content/30 uppercase text-[10px] tracking-[3px] font-bold border-none">
                <th className="py-6 pl-10">Category Details</th>
                <th className="py-6">Library Reach</th>
                <th className="py-6">Visibility</th>
                <th className="py-6 pr-10 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {genres.map(genre => (
                <tr
                  key={genre.id}
                  className="group transition-all hover:bg-base-200/30"
                >
                  <td className="py-5 pl-10 rounded-l-4xl">
                    <div className="flex items-center gap-5">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-${genre.color}/10 flex items-center justify-center text-${genre.color} shadow-inner group-hover:scale-110 transition-transform`}
                      >
                        <FaLayerGroup size={22} />
                      </div>
                      <div>
                        <div className="font-bold text-base text-base-content">
                          {genre.name}
                        </div>
                        <div className="text-[10px] text-base-content/40 font-bold tracking-widest uppercase mt-0.5">
                          {genre.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">
                        {genre.count} Books
                      </span>
                      <progress
                        className={`progress progress-${genre.color} w-24 h-1.5 mt-2 opacity-40`}
                        value={(genre.count / 200) * 100}
                        max="100"
                      ></progress>
                    </div>
                  </td>
                  <td className="py-5">
                    <div
                      className={`badge h-7 px-4 rounded-lg font-bold text-[9px] uppercase tracking-tighter ${
                        genre.status === 'Active'
                          ? 'badge-success text-white'
                          : 'badge-ghost opacity-50'
                      }`}
                    >
                      {genre.status}
                    </div>
                  </td>
                  <td className="py-5 pr-10 text-right rounded-r-4xl">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEditClick(genre)}
                        className="btn btn-square btn-ghost rounded-xl hover:bg-primary hover:text-white transition-all"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() =>
                          document
                            .getElementById('delete_genre_modal')
                            .showModal()
                        }
                        className="btn btn-square btn-ghost rounded-xl hover:bg-error hover:text-white transition-all text-error"
                      >
                        <FaTrashAlt size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- DYNAMIC MODAL (ADD & EDIT) --- */}
      <dialog id="genre_modal" className="modal backdrop-blur-md">
        <div className="modal-box bg-base-100 rounded-[2.5rem] p-0 max-w-lg overflow-hidden border border-base-300 shadow-2xl">
          <div
            className={`${
              isEditMode ? 'bg-secondary' : 'bg-primary'
            } p-8 text-white`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold font-serif tracking-tight">
                  {isEditMode ? 'Update Genre' : 'Create Genre'}
                </h3>
                <p className="text-xs text-white/70 font-bold uppercase tracking-[3px] mt-1">
                  {isEditMode
                    ? `ID: ${selectedGenre.id}`
                    : 'Add to library system'}
                </p>
              </div>
              <form method="dialog">
                <button className="btn btn-circle btn-sm bg-white/20 border-none text-white hover:bg-white/40">
                  <FaTimes />
                </button>
              </form>
            </div>
          </div>

          <form className="p-8 space-y-8" onSubmit={e => e.preventDefault()}>
            <div className="space-y-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-[11px] uppercase tracking-widest text-base-content/50">
                    Genre Identity
                  </span>
                </label>
                <div className="relative">
                  <FaLayerGroup
                    className={`absolute left-5 top-1/2 -translate-y-1/2 ${
                      isEditMode ? 'text-secondary/40' : 'text-primary/40'
                    }`}
                  />
                  <input
                    type="text"
                    value={selectedGenre.name}
                    onChange={e =>
                      setSelectedGenre({
                        ...selectedGenre,
                        name: e.target.value,
                      })
                    }
                    placeholder="e.g. Historical Fiction"
                    className="input input-bordered w-full h-16 pl-14 rounded-2xl bg-base-200/30 border-2 border-transparent focus:border-primary/30 focus:bg-white transition-all font-bold text-sm"
                    required
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-[11px] uppercase tracking-widest text-base-content/50">
                    Visibility Status
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedGenre({ ...selectedGenre, status: 'Active' })
                    }
                    className={`btn h-14 rounded-2xl border-2 transition-all font-bold ${
                      selectedGenre.status === 'Active'
                        ? 'btn-primary shadow-md'
                        : 'btn-ghost border-base-200'
                    }`}
                  >
                    Active
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedGenre({ ...selectedGenre, status: 'Archived' })
                    }
                    className={`btn h-14 rounded-2xl border-2 transition-all font-bold ${
                      selectedGenre.status === 'Archived'
                        ? 'btn-primary shadow-md'
                        : 'btn-ghost border-base-200'
                    }`}
                  >
                    Archived
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-3 p-4 bg-primary/5 rounded-2xl border border-primary/10 items-center">
              <FaInfoCircle className="text-primary shrink-0" />
              <p className="text-[11px] font-bold text-primary/70 italic">
                Changes will be reflected across all book categorization.
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <form method="dialog" className="flex-1">
                <button className="btn btn-ghost w-full rounded-2xl font-bold h-14">
                  Cancel
                </button>
              </form>
              <button
                type="submit"
                className={`btn ${
                  isEditMode ? 'btn-secondary' : 'btn-primary'
                } flex-2 rounded-2xl font-bold h-14 border-none shadow-lg text-xs uppercase tracking-widest`}
              >
                {isEditMode ? 'Update Information' : 'Confirm & Create'}
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* --- Delete Confirmation Modal --- */}
      <dialog id="delete_genre_modal" className="modal backdrop-blur-sm">
        <div className="modal-box bg-base-100 rounded-[2.5rem] p-10 text-center max-w-md border-t-8 border-error shadow-2xl">
          <div className="w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-6">
            <FaExclamationTriangle size={36} />
          </div>
          <h3 className="font-bold text-2xl text-base-content">
            Destructive Action
          </h3>
          <p className="py-4 text-base-content/60 font-medium leading-relaxed">
            Deleting this category might result in orphaned book data.
          </p>
          <div className="flex flex-col gap-3 mt-4">
            <button className="btn btn-error text-white rounded-2xl h-14 font-bold border-none shadow-lg shadow-error/20 uppercase tracking-widest text-xs">
              Confirm Deletion
            </button>
            <form method="dialog">
              <button className="btn btn-ghost w-full rounded-2xl font-bold">
                Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageGenres;
