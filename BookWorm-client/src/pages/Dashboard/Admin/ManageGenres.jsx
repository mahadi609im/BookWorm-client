import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Loading/Loading';
import {
  FaPlus,
  FaSearch,
  FaFilter,
  FaTrashAlt,
  FaEdit,
  FaLayerGroup,
  FaTimes,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { HiChevronDown } from 'react-icons/hi2';

const ManageGenres = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState({
    name: '',
    status: 'Active',
    description: '',
  });

  // ১. ডেটা ফেচিং (TanStack Query)
  const { data: genres = [], isLoading } = useQuery({
    queryKey: ['genres'],
    queryFn: async () => {
      const res = await axiosSecure.get('/genres');
      return res.data;
    },
  });

  // ২. মিউটেশনস (Add, Update, Delete)
  const addMutation = useMutation({
    mutationFn: newGenre => axiosSecure.post('/genres', newGenre),
    onSuccess: () => {
      queryClient.invalidateQueries(['genres']);
      Swal.fire({
        icon: 'success',
        title: 'Genre Created!',
        text: 'New category has been added to the library.',
        showConfirmButton: false,
        timer: 1500,
      });
      document.getElementById('genre_modal').close();
    },
  });

  const updateMutation = useMutation({
    mutationFn: updatedGenre =>
      axiosSecure.patch(`/genres/${updatedGenre._id}`, updatedGenre),
    onSuccess: () => {
      queryClient.invalidateQueries(['genres']);
      Swal.fire({
        icon: 'success',
        title: 'Changes Saved!',
        text: 'Genre details have been updated.',
        showConfirmButton: false,
        timer: 1500,
      });
      document.getElementById('genre_modal').close();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: id => axiosSecure.delete(`/genres/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['genres']);
      Swal.fire('Deleted!', 'Genre has been removed.', 'success');
      document.getElementById('delete_genre_modal').close();
    },
  });

  // ৩. ফিল্টারিং লজিক
  const filteredGenres = genres.filter(genre => {
    const matchesSearch = genre.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === 'all' ||
      genre.status?.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  // ৪. হ্যান্ডেলার ফাংশনস
  const handleEditClick = genre => {
    setIsEditMode(true);
    setSelectedGenre(genre);
    document.getElementById('genre_modal').showModal();
  };

  const handleAddClick = () => {
    setIsEditMode(false);
    setSelectedGenre({
      name: '',
      status: 'Active',
      description: '',
    });
    document.getElementById('genre_modal').showModal();
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isEditMode) {
      updateMutation.mutate(selectedGenre);
    } else {
      addMutation.mutate(selectedGenre);
    }
  };

  const confirmDelete = () => {
    deleteMutation.mutate(selectedGenre._id);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 lg:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* --- Elegant Header --- */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 p-8 lg:p-12 rounded-[3rem] border border-base-200 shadow-sm">
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
              Organize books by defining clear and engaging categories.
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
          <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-base-content/20 group-focus-within:text-primary transition-colors z-20" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search genres..."
            className="input w-full h-16 pl-14 rounded-3xl bg-base-100 border-base-200 focus:ring-4 focus:ring-primary/10 transition-all font-medium shadow-sm"
          />
        </div>

        <div className="lg:col-span-4 flex gap-3">
          <div className="dropdown dropdown-end w-full">
            <button
              tabIndex={0}
              className="btn w-full h-16 px-6 rounded-3xl bg-base-100 border border-base-200 hover:bg-base-200 group flex items-center justify-between transition-all shadow-sm"
            >
              <div className="flex items-center gap-3">
                <FaFilter className="text-primary text-sm" />
                <span className="uppercase tracking-widest text-[10px] font-bold">
                  {filterStatus === 'all' ? 'All Status' : filterStatus}
                </span>
              </div>
              <HiChevronDown className="text-base-content/30 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content z-20 menu p-3 shadow-2xl bg-base-100 rounded-3xl w-full mt-2 border border-base-200 space-y-1"
            >
              {['all', 'active', 'archived'].map(status => (
                <li key={status}>
                  <button
                    onClick={() => {
                      setFilterStatus(status);
                      document.activeElement.blur();
                    }}
                    className={`capitalize font-bold text-xs rounded-xl py-3 px-4 flex justify-between items-center ${
                      filterStatus === status
                        ? 'bg-primary text-white'
                        : 'hover:bg-primary/10 hover:text-primary'
                    }`}
                  >
                    {status}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* --- Table Section --- */}
      <div className="bg-base-100 rounded-[2.5rem] border border-base-200 shadow-xl overflow-hidden">
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
                  key={genre._id}
                  className="group transition-all hover:bg-base-200/50"
                >
                  <td className="py-5 pl-10 rounded-l-[2rem]">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                        <FaLayerGroup size={20} />
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-lg text-base-content leading-tight">
                          {genre.name}
                        </div>
                        <p className="text-xs text-base-content/50 truncate w-48 mt-1">
                          {genre.description || 'No description provided.'}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-5">
                    <span className="font-black text-base text-base-content">
                      {genre.bookCount || 0} Books
                    </span>
                  </td>
                  <td className="py-5">
                    <div
                      className={`badge h-7 px-4 rounded-lg font-bold text-[10px] uppercase tracking-widest border-none ${
                        genre.status === 'Active'
                          ? 'bg-success/10 text-success'
                          : 'bg-base-200 text-base-content/40'
                      }`}
                    >
                      {genre.status}
                    </div>
                  </td>
                  <td className="py-5 pr-10 text-right rounded-r-[2rem]">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEditClick(genre)}
                        className="btn btn-square btn-sm btn-ghost rounded-xl hover:bg-primary/10 text-primary"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedGenre(genre);
                          document
                            .getElementById('delete_genre_modal')
                            .showModal();
                        }}
                        className="btn btn-square btn-sm btn-ghost rounded-xl text-error/40 hover:text-error hover:bg-error/10"
                      >
                        <FaTrashAlt size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredGenres.length === 0 && (
            <div className="text-center py-20 opacity-30 font-bold uppercase tracking-widest">
              No Genres Found
            </div>
          )}
        </div>
      </div>

      {/* --- DYNAMIC MODAL (ADD & EDIT) --- */}
      <dialog
        id="genre_modal"
        className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
      >
        <div className="modal-box bg-base-100 rounded-[2.5rem] p-0 max-w-lg overflow-hidden border border-base-300 shadow-2xl flex flex-col max-h-[90vh]">
          {/* Header */}
          <div
            className={`p-8 text-white shrink-0 ${
              isEditMode ? 'bg-secondary' : 'bg-primary'
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold font-serif">
                  {isEditMode ? 'Update Genre' : 'Create Genre'}
                </h3>
                <p className="text-[10px] uppercase tracking-[3px] opacity-70 mt-1 font-bold">
                  BookWorm Architecture
                </p>
              </div>
              {/* ক্লোজ করার জন্য মেথড ডায়ালগ নিশ্চিত করা হয়েছে */}
              <form method="dialog">
                <button className="btn btn-circle btn-sm bg-white/20 border-none text-white hover:bg-white/40 transition-all">
                  <FaTimes />
                </button>
              </form>
            </div>
          </div>

          {/* Form Content */}
          <form
            className="flex flex-col overflow-hidden"
            onSubmit={e => {
              handleSubmit(e);
              // সাবমিট হওয়ার পর পপআপ ক্লোজ করলে ব্লার চলে যাবে
              document.getElementById('genre_modal').close();
            }}
          >
            <div className="px-8 py-6 space-y-5 overflow-y-auto custom-scrollbar">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-[11px] uppercase tracking-wider opacity-60">
                    Genre Name
                  </span>
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Science Fiction"
                  value={selectedGenre.name}
                  onChange={e =>
                    setSelectedGenre({ ...selectedGenre, name: e.target.value })
                  }
                  className={`input w-full h-12 rounded-xl bg-base-200/50 border-none focus:ring-1 outline-0 transition-all font-medium text-sm ${
                    isEditMode ? 'focus:ring-secondary' : 'focus:ring-primary'
                  }`}
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-[11px] uppercase tracking-wider opacity-60">
                    Description
                  </span>
                </label>
                <textarea
                  placeholder="Tell us about this category..."
                  value={selectedGenre.description}
                  onChange={e =>
                    setSelectedGenre({
                      ...selectedGenre,
                      description: e.target.value,
                    })
                  }
                  className={`textarea w-full h-24 p-4 rounded-xl bg-base-200/50 border-none transition-all font-medium text-sm focus:ring-1 outline-0 resize-none ${
                    isEditMode ? 'focus:ring-secondary' : 'focus:ring-primary'
                  }`}
                ></textarea>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-semibold text-[11px] uppercase tracking-wider opacity-60">
                    Status
                  </span>
                </label>
                <div className="flex bg-base-200/50 p-1.5 rounded-xl gap-1">
                  {['Active', 'Archived'].map(status => (
                    <button
                      key={status}
                      type="button"
                      onClick={() =>
                        setSelectedGenre({ ...selectedGenre, status })
                      }
                      className={`flex-1 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all ${
                        selectedGenre.status === status
                          ? isEditMode
                            ? 'bg-secondary text-white shadow-sm'
                            : 'bg-primary text-white shadow-sm'
                          : 'text-base-content/40 hover:bg-base-300/50'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-base-100 border-t border-base-200 shrink-0">
              <button
                type="submit"
                disabled={addMutation.isPending || updateMutation.isPending}
                className={`btn w-full rounded-xl font-bold h-12 border-none shadow-sm uppercase tracking-widest text-[11px] ${
                  isEditMode ? 'btn-secondary' : 'btn-primary'
                }`}
              >
                {addMutation.isPending || updateMutation.isPending ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : isEditMode ? (
                  'Save Changes'
                ) : (
                  'Create Genre'
                )}
              </button>
            </div>
          </form>

          {/* ক্লোজ বাটনের বাইরে ক্লিক করলে যাতে ব্লার সহ বন্ধ হয় */}
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
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
            Remove Genre?
          </h3>
          <p className="py-4 text-base-content/60 font-medium">
            Are you sure you want to delete{' '}
            <span className="text-error font-black">{selectedGenre.name}</span>?
            This action cannot be undone.
          </p>
          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
              className="btn btn-error text-white rounded-2xl h-14 font-bold border-none"
            >
              {deleteMutation.isPending ? 'Removing...' : 'Confirm Deletion'}
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
