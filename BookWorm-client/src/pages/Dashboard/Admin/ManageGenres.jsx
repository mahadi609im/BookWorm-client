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
      description: 'Explore the stars and future technology.',
    },
    {
      id: 'GEN-002',
      name: 'Philosophy',
      count: 86,
      status: 'Active',
      color: 'secondary',
      description: 'Deep thoughts and existential questions.',
    },
    {
      id: 'GEN-003',
      name: 'Mystery & Thriller',
      count: 52,
      status: 'Archived',
      color: 'accent',
      description: 'Suspenseful and gripping tales.',
    },
    {
      id: 'GEN-004',
      name: 'Fantasy',
      count: 210,
      status: 'Active',
      color: 'primary',
      description: 'Magic, dragons, and epic quests.',
    },
    {
      id: 'GEN-005',
      name: 'Biography',
      count: 45,
      status: 'Active',
      color: 'secondary',
      description: 'Real stories of remarkable people.',
    },
    {
      id: 'GEN-006',
      name: 'History',
      count: 73,
      status: 'Active',
      color: 'accent',
      description: 'Understanding the past to shape the future.',
    },
    {
      id: 'GEN-007',
      name: 'Self-Help',
      count: 115,
      status: 'Active',
      color: 'primary',
      description: 'Improve your life and mental well-being.',
    },
    {
      id: 'GEN-008',
      name: 'Psychology',
      count: 68,
      status: 'Active',
      color: 'secondary',
      description: 'Insights into the human mind.',
    },
    {
      id: 'GEN-009',
      name: 'Poetry',
      count: 30,
      status: 'Archived',
      color: 'accent',
      description: 'Artistic expression through words.',
    },
    {
      id: 'GEN-010',
      name: 'Technical & Coding',
      count: 95,
      status: 'Active',
      color: 'primary',
      description: 'Guides for the modern developer.',
    },
    {
      id: 'GEN-011',
      name: 'Romance',
      count: 150,
      status: 'Active',
      color: 'secondary',
      description: 'Heartwarming stories of love.',
    },
    {
      id: 'GEN-012',
      name: 'Horror',
      count: 42,
      status: 'Active',
      color: 'accent',
      description: 'Dark and terrifying experiences.',
    },
    {
      id: 'GEN-013',
      name: 'Business',
      count: 89,
      status: 'Active',
      color: 'primary',
      description: 'Strategies for success in industry.',
    },
    {
      id: 'GEN-014',
      name: 'Manga',
      count: 180,
      status: 'Active',
      color: 'secondary',
      description: 'Japanese illustrated storytelling.',
    },
    {
      id: 'GEN-015',
      name: 'Graphic Novels',
      count: 65,
      status: 'Archived',
      color: 'accent',
      description: 'Visual-rich narrative books.',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState({
    id: '',
    name: '',
    status: 'Active',
    count: 0,
  });

  // ২. ফিল্টারিং লজিক (Search + Filter)
  const filteredGenres = genres.filter(genre => {
    const matchesSearch =
      genre.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      genre.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === 'all' ||
      genre.status.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // ৩. হ্যান্ডেলার ফাংশনস
  const handleEditClick = genre => {
    setIsEditMode(true);
    setSelectedGenre(genre);
    document.getElementById('genre_modal').showModal();
  };

  const handleAddClick = () => {
    setIsEditMode(false);
    setSelectedGenre({
      id: `GEN-0${genres.length + 1}`,
      name: '',
      status: 'Active',
      count: 0,
    });
    document.getElementById('genre_modal').showModal();
  };

  const handleDeleteClick = genre => {
    setSelectedGenre(genre);
    document.getElementById('delete_genre_modal').showModal();
  };

  return (
    <div className="p-4 lg:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* --- Elegant Header --- */}
      <div className="relative overflow-hidden bg-linear-to-br from-primary/10 via-base-100 to-secondary/10 p-8 lg:p-12 rounded-[3rem] border border-base-200 shadow-sm">
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
              Define and organize the structural categories of your literary
              world.
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center px-2">
        <div className="lg:col-span-8 relative group">
          <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-base-content/20 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search by genre name or ID code..."
            className="input w-full h-16 pl-14 rounded-3xl bg-base-100 border-base-200 focus:ring-4 focus:ring-primary/10 transition-all font-medium shadow-sm"
          />
        </div>

        <div className="lg:col-span-4 flex gap-3">
          <div className="dropdown dropdown-end w-full">
            <button
              tabIndex={0}
              className="btn w-full h-16 px-6 rounded-3xl bg-base-100 border border-base-200 hover:bg-base-200 group flex items-center justify-between active:scale-95 transition-all shadow-sm"
            >
              <div className="flex items-center gap-3">
                <FaFilter className="text-primary text-sm" />
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
              className="dropdown-content z-20 menu p-3 shadow-2xl bg-base-100 rounded-3xl w-full mt-2 border border-base-200 space-y-1"
            >
              <li className="menu-title text-[9px] uppercase tracking-widest font-bold text-base-content/30 pb-2 px-4">
                Select Status
              </li>
              {['all', 'active', 'archived'].map(status => (
                <li key={status}>
                  <button
                    onClick={() => {
                      setFilterStatus(status);
                      document.activeElement.blur();
                    }}
                    className={`capitalize font-bold text-xs rounded-xl py-3 px-4 flex justify-between items-center ${
                      filterStatus === status
                        ? 'bg-primary text-white shadow-lg'
                        : 'hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {status === 'all' ? 'All Status' : status}
                    {filterStatus === status && (
                      <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* --- Table Section --- */}
      <div className="bg-base-100 rounded-[2.5rem] border border-base-200 shadow-xl shadow-base-300/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-y-3 px-6 min-w-[900px]">
            <thead>
              <tr className="text-base-content/50 uppercase text-[11px] tracking-[3px] font-bold border-none">
                <th className="py-6 pl-10">Category Details</th>
                <th className="py-6">Library Reach</th>
                <th className="py-6">Visibility</th>
                <th className="py-6 pr-10 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredGenres.map(genre => (
                <tr
                  key={genre.id}
                  className="group transition-all hover:bg-base-200/50"
                >
                  <td className="py-5 pl-10 rounded-l-[2rem]">
                    <div className="flex items-center gap-5">
                      <div
                        className={`w-14 h-14 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 ${
                          genre.color === 'primary'
                            ? 'bg-primary/10 text-primary'
                            : genre.color === 'secondary'
                            ? 'bg-secondary/10 text-secondary'
                            : 'bg-accent/10 text-accent'
                        }`}
                      >
                        <FaLayerGroup size={22} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-lg text-base-content leading-tight">
                          {genre.name}
                        </div>
                        <div className="text-[10px] text-base-content/40 font-black tracking-widest uppercase mt-0.5">
                          ID: {genre.id}
                        </div>
                        <p className="text-xs text-base-content/50 truncate w-48 mt-1 font-medium">
                          {genre.description}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="py-5">
                    <div className="flex flex-col">
                      <div className="flex items-end gap-2 mb-1.5">
                        <span className="font-black text-base text-base-content">
                          {genre.count}
                        </span>
                        <span className="text-[10px] font-bold opacity-30 uppercase tracking-tighter mb-0.5">
                          Books
                        </span>
                      </div>
                      <progress
                        className={`progress w-32 h-2 opacity-50 progress-${genre.color}`}
                        value={(genre.count / 250) * 100}
                        max="100"
                      ></progress>
                    </div>
                  </td>

                  <td className="py-5">
                    <div
                      className={`badge h-8 px-5 rounded-xl font-black text-[10px] uppercase tracking-widest border-none ${
                        genre.status === 'Active'
                          ? 'bg-success/10 text-success'
                          : 'bg-base-200 text-base-content/40'
                      }`}
                    >
                      {genre.status}
                    </div>
                  </td>

                  <td className="py-5 pr-10 text-right rounded-r-[2rem]">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                      <button
                        onClick={() => handleEditClick(genre)}
                        className="btn btn-square btn-ghost rounded-2xl hover:bg-primary/10 text-primary border border-transparent hover:border-primary/20 transition-all"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteClick(genre)}
                        className="btn btn-square btn-ghost rounded-2xl text-error/40 hover:text-error hover:bg-error/10 border border-transparent hover:border-error/20 transition-all"
                      >
                        <FaTrashAlt size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredGenres.length === 0 && (
            <div className="py-20 text-center">
              <div className="text-base-content/20 mb-4 flex justify-center">
                <FaSearch size={48} />
              </div>
              <h3 className="text-xl font-bold text-base-content/40 italic">
                No matching genres found...
              </h3>
            </div>
          )}
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
                    Genre Name
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
                    className="input input-bordered w-full h-16 pl-14 rounded-2xl bg-base-200/30 border-none focus:bg-white transition-all font-bold"
                    placeholder="Enter name..."
                  />
                </div>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-[11px] uppercase tracking-widest text-base-content/50">
                    Status
                  </span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {['Active', 'Archived'].map(status => (
                    <button
                      key={status}
                      type="button"
                      onClick={() =>
                        setSelectedGenre({ ...selectedGenre, status })
                      }
                      className={`btn h-14 rounded-2xl border-2 transition-all font-bold ${
                        selectedGenre.status === status
                          ? isEditMode
                            ? 'btn-secondary'
                            : 'btn-primary'
                          : 'btn-ghost border-base-200'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <form method="dialog" className="flex-1">
                <button className="btn btn-ghost w-full rounded-2xl font-bold h-14">
                  Cancel
                </button>
              </form>
              <button
                className={`btn ${
                  isEditMode ? 'btn-secondary' : 'btn-primary'
                } flex-[2] rounded-2xl font-bold h-14 border-none shadow-lg uppercase tracking-widest text-xs`}
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
            You are about to delete{' '}
            <span className="text-error font-black italic">
              {selectedGenre.name}
            </span>
            . This might affect{' '}
            <span className="badge badge-error text-white font-bold">
              {selectedGenre.count}
            </span>{' '}
            linked books.
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
