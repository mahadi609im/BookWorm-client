import React, { useState, useRef } from 'react';
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaSearch,
  FaCloudUploadAlt,
  FaTimes,
} from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../../../Components/Loading/Loading';

const ManageBooks = () => {
  const queryClient = useQueryClient();
  const formRef = useRef(null);

  // States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [uploading, setUploading] = useState(false);

  // --- 1. Fetch Books ---
  const { data: books = [], isLoading } = useQuery({
    queryKey: ['books', searchTerm],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/books?search=${searchTerm}`
      );
      return res.data;
    },
  });

  // --- 2. Image Upload to ImgBB ---
  const uploadToImgBB = async file => {
    if (!file) {
      Swal.fire('Error', 'Please select an image first!', 'error');
      return null;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      setUploading(true);
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (res.data.success) {
        setUploading(false);
        return res.data.data.display_url;
      }

      return null;
    } catch (err) {
      setUploading(false);
      const errorMsg =
        err.response?.data?.error?.message || 'Image upload to ImgBB failed!';
      Swal.fire('Upload Failed', errorMsg, 'error');
      return null;
    }
  };

  // --- 3. Mutations (Add/Update/Delete) ---
  const bookMutation = useMutation({
    mutationFn: async bookData => {
      if (isEditMode) {
        return await axios.patch(
          `http://localhost:5000/books/${selectedBook._id}`,
          bookData
        );
      }
      return await axios.post('http://localhost:5000/books', bookData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      closeModal();
      Swal.fire(
        'Success!',
        `Book ${isEditMode ? 'updated' : 'added'} successfully.`,
        'success'
      );
    },
    onError: error => {
      Swal.fire(
        'Error',
        error.response?.data?.message || 'Something went wrong',
        'error'
      );
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async id => {
      return await axios.delete(`http://localhost:5000/books/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['books']);
      document.getElementById('delete_confirm_modal').close();

      setSelectedBook(null);

      Swal.fire('Deleted!', 'Book removed successfully.', 'success');
    },
    onError: () => {
      Swal.fire('Error', 'Could not delete the book.', 'error');
    },
  });

  // --- Handlers ---
  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const imageFile = form.cover.files[0];

    let coverUrl = isEditMode ? selectedBook.cover : '';

    if (imageFile) {
      const uploadedUrl = await uploadToImgBB(imageFile);
      if (uploadedUrl) {
        coverUrl = uploadedUrl;
      } else {
        return;
      }
    }

    // ডাটা কালেকশন লজিক ফিক্স করা হয়েছে (Input Names matching)
    const bookData = {
      title: form.title.value,
      author: form.author.value,
      genre: form.genre.value,
      rating: parseFloat(form.rating.value) || 0,
      totalPage: parseInt(form.totalPage.value) || 0,
      description: form.description.value,
      summary: form.summary.value,
      cover: coverUrl,
      status: form.status.value,
    };

    bookMutation.mutate(bookData);
  };

  const openModal = (book = null) => {
    if (book) {
      setSelectedBook(book);
      setIsEditMode(true);
    } else {
      setSelectedBook(null);
      setIsEditMode(false);
    }
    document.getElementById('add_book_modal').showModal();
  };

  const closeModal = () => {
    document.getElementById('add_book_modal').close();
    setSelectedBook(null);
    if (formRef.current) formRef.current.reset();
  };

  return (
    <div className="space-y-8 pb-10 animate-in fade-in duration-500">
      {/* --- Header --- */}
      <div className="relative overflow-hidden bg-primary/10 p-8 rounded-[2.5rem] border border-primary/20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <h1 className="text-3xl font-bold font-serif text-primary tracking-tight">
              Manage Inventory
            </h1>
            <p className="text-base-content/60 font-medium mt-1">
              Add, update, or remove books from your digital library.
            </p>
          </div>
          <button
            onClick={() => openModal()}
            className="btn btn-primary rounded-2xl px-8 h-14 shadow-lg shadow-primary/30 border-none hover:scale-105 transition-transform"
          >
            <FaPlus className="mr-2" /> Add New Book
          </button>
        </div>
      </div>

      {/* --- Search Bar --- */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-base-content/30 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search books by title or author..."
            onChange={e => setSearchTerm(e.target.value)}
            className="input w-full h-14 pl-12 rounded-2xl bg-base-300/50 border-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>
      </div>

      {/* --- Inventory Table Section --- */}
      <div className="bg-base-100 rounded-[2.5rem] border border-base-200 shadow-xl overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <table className="table table-lg w-full min-w-[900px]">
            <thead>
              <tr className="bg-base-200/30 text-base-content/50 uppercase text-[11px] tracking-[2px] font-bold">
                <th className="py-6 pl-10">Book Identity</th>
                <th>Category</th>
                <th>Author</th>
                <th className="text-center">Operations</th>
              </tr>
            </thead>

            <tbody className="font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="text-center py-20">
                    <Loading></Loading>
                  </td>
                </tr>
              ) : books.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-20 opacity-50">
                    No books found in inventory.
                  </td>
                </tr>
              ) : (
                books.map(book => (
                  <tr
                    key={book._id}
                    className="hover:bg-primary/5 transition-colors border-b border-base-100 group"
                  >
                    <td className="pl-10 py-5">
                      <div className="flex items-center gap-5">
                        <div className="relative flex-shrink-0">
                          <img
                            src={book.cover}
                            className="w-14 h-20 object-cover rounded-xl shadow-md group-hover:rotate-2 transition-transform duration-300"
                            alt={book.title}
                          />
                          <div
                            className={`absolute -bottom-2 -right-2 text-white text-[8px] font-bold px-2 py-1 rounded-lg shadow-sm ${
                              book.status === 'In Stock'
                                ? 'bg-success'
                                : 'bg-error'
                            }`}
                          >
                            {book.status}
                          </div>
                        </div>
                        <div className="max-w-[300px]">
                          <div className="font-bold text-base text-base-content leading-tight truncate">
                            {book.title}
                          </div>
                          <div className="text-[11px] text-primary font-bold mt-1 uppercase tracking-wider">
                            Ref: BK-{book._id ? book._id.slice(-4) : 'NEW'}
                          </div>
                          <div className="text-[10px] text-base-content/40 mt-1 flex gap-2">
                            <span>{book.totalPage} Pages</span>
                            <span>•</span>
                            <span className="text-orange-500">
                              ★ {book.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-outline border-primary/20 text-primary font-bold px-4 py-3 rounded-xl bg-primary/5 whitespace-nowrap">
                        {book.genre}
                      </span>
                    </td>

                    <td className="text-sm font-bold text-base-content/70 italic whitespace-nowrap">
                      {book.author}
                    </td>

                    <td className="pr-10">
                      <div className="flex justify-center gap-3">
                        <button
                          onClick={() => openModal(book)}
                          className="btn btn-square btn-md rounded-xl bg-primary/10 text-primary border-none hover:bg-primary hover:text-white transition-all shadow-sm"
                          title="Edit Book"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedBook(book);
                            document
                              .getElementById('delete_confirm_modal')
                              .showModal();
                          }}
                          className="btn btn-square btn-md rounded-xl bg-error/10 text-error border-none hover:bg-error hover:text-white transition-all shadow-sm"
                          title="Delete Book"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Add/Edit Modal --- */}
      <dialog
        id="add_book_modal"
        className="modal modal-bottom sm:modal-middle backdrop-blur-md"
      >
        <div className="modal-box bg-base-100 rounded-[2.5rem] p-0 max-w-4xl overflow-hidden border border-base-300 shadow-2xl flex flex-col max-h-[90vh]">
          <div className="p-8 bg-primary text-white shrink-0 relative">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold font-serif tracking-tight">
                  {isEditMode ? 'Update Book Details' : 'Add New Collection'}
                </h3>
                <p className="text-[10px] uppercase tracking-[3px] opacity-70 mt-1 font-bold">
                  BookWorm Architecture
                </p>
              </div>
              <button
                onClick={closeModal}
                className="btn btn-circle btn-sm bg-white/20 border-none text-white hover:bg-white/40 transition-all"
              >
                <FaTimes />
              </button>
            </div>
          </div>

          <form
            ref={formRef}
            className="flex flex-col overflow-hidden"
            onSubmit={handleSubmit}
          >
            <div className="p-8 lg:p-10 space-y-6 overflow-y-auto custom-scrollbar grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-[11px] uppercase tracking-widest opacity-60">
                    Book Title
                  </span>
                </label>
                <input
                  name="title"
                  defaultValue={selectedBook?.title}
                  required
                  type="text"
                  placeholder="e.g. Atomic Habits"
                  className="input w-full h-12 rounded-xl bg-base-300/50 border-none focus:ring-1 focus:ring-primary outline-0 transition-all font-medium text-sm"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-[11px] uppercase tracking-widest opacity-60">
                    Author Name
                  </span>
                </label>
                <input
                  name="author"
                  defaultValue={selectedBook?.author}
                  required
                  type="text"
                  placeholder="e.g. James Clear"
                  className="input w-full h-12 rounded-xl bg-base-300/50 border-none focus:ring-1 focus:ring-primary outline-0 transition-all font-medium text-sm"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-[11px] uppercase tracking-widest opacity-60">
                    Genre
                  </span>
                </label>
                <select
                  name="genre"
                  defaultValue={selectedBook?.genre || 'Fiction'}
                  className="select w-full h-12 rounded-xl bg-base-300/50 border-none focus:ring-1 focus:ring-primary outline-0 transition-all font-medium text-sm"
                >
                  <option>Fiction</option>
                  <option>Science</option>
                  <option>Self-Help</option>
                  <option>History</option>
                  <option>Mystery</option>
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-[11px] uppercase tracking-widest opacity-60">
                    Initial Rating
                  </span>
                </label>
                <input
                  name="rating"
                  defaultValue={selectedBook?.rating || 0}
                  step="0.1"
                  min="0"
                  max="5"
                  type="number"
                  placeholder="4.5"
                  className="input w-full h-12 rounded-xl bg-base-300/50 border-none focus:ring-1 focus:ring-primary outline-0 transition-all font-medium text-sm"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-[11px] uppercase tracking-widest opacity-60">
                    Total Pages
                  </span>
                </label>
                <input
                  name="totalPage"
                  defaultValue={selectedBook?.totalPage}
                  required
                  type="number"
                  placeholder="320"
                  className="input w-full h-12 rounded-xl bg-base-300/50 border-none focus:ring-1 focus:ring-primary outline-0 transition-all font-medium text-sm"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text font-bold text-[11px] uppercase tracking-widest opacity-60">
                    Availability Status
                  </span>
                </label>
                <select
                  name="status"
                  defaultValue={selectedBook?.status || 'In Stock'}
                  className="select w-full h-12 rounded-xl bg-base-300/50 border-none focus:ring-1 focus:ring-primary outline-0 transition-all font-medium text-sm"
                >
                  <option>In Stock</option>
                  <option>Out of Stock</option>
                </select>
              </div>
              <div className="form-control col-span-full">
                <label className="label">
                  <span className="label-text font-bold text-[11px] uppercase tracking-widest opacity-60">
                    Cover Image
                  </span>
                </label>
                <div className="flex flex-col gap-4">
                  {/* --- Current Image Preview --- */}
                  {isEditMode && selectedBook?.cover && (
                    <div className="flex items-center gap-3 bg-primary/5 p-3 rounded-xl border border-primary/20 w-fit">
                      <img
                        src={selectedBook.cover}
                        alt="Current Cover"
                        className="w-16 h-20 object-cover rounded-lg shadow-md"
                      />
                      <div>
                        <p className="text-[10px] font-bold text-primary uppercase">
                          Current Cover
                        </p>
                        <p className="text-[9px] opacity-60">
                          This image is currently saved
                        </p>
                      </div>
                    </div>
                  )}

                  {/* --- File Upload Input --- */}
                  <label className="flex items-center gap-4 bg-base-300/50 p-4 rounded-xl border-2 border-dashed border-base-300 hover:border-primary transition-all group cursor-pointer">
                    <FaCloudUploadAlt
                      size={28}
                      className="text-primary opacity-40 group-hover:scale-110 transition-transform"
                    />
                    <div className="flex-1">
                      <input
                        name="cover"
                        type="file"
                        accept="image/*"
                        className="file-input outline-0 border-0 w-full h-auto font-bold text-xs cursor-pointer"
                      />
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-[9px] opacity-50 italic">
                          Max 2MB (JPG, PNG)
                        </p>
                        {isEditMode && (
                          <span className="text-[9px] text-primary font-bold">
                            Leave empty to keep original
                          </span>
                        )}
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className="form-control col-span-full">
                <label className="label">
                  <span className="label-text font-bold text-[11px] uppercase tracking-widest opacity-60">
                    Long Description
                  </span>
                </label>
                <textarea
                  name="description"
                  defaultValue={selectedBook?.description}
                  placeholder="Detailed book description..."
                  className="textarea w-full h-24 p-4 rounded-xl bg-base-300/50 border-none focus:ring-1 focus:ring-primary outline-0 transition-all font-medium text-sm resize-none"
                />
              </div>

              <div className="form-control col-span-full">
                <label className="label">
                  <span className="label-text font-bold text-[11px] uppercase tracking-widest opacity-60">
                    Short Summary
                  </span>
                </label>
                <textarea
                  name="summary"
                  defaultValue={selectedBook?.summary}
                  placeholder="One sentence highlight..."
                  className="textarea w-full h-16 p-4 rounded-xl bg-base-300/50 border-none focus:ring-1 focus:ring-primary outline-0 transition-all font-medium text-sm resize-none"
                />
              </div>
            </div>

            <div className="px-8 py-6 bg-base-100 border-t border-base-200 shrink-0 flex gap-3">
              <button
                type="button"
                onClick={closeModal}
                className="btn flex-1 rounded-xl font-bold h-12 bg-base-200 border-none hover:bg-base-300 transition-all text-[11px] uppercase tracking-widest"
              >
                Discard
              </button>
              <button
                type="submit"
                disabled={bookMutation?.isPending || uploading}
                className="btn flex-1 btn-primary rounded-xl font-bold h-12 border-none shadow-lg shadow-primary/20 uppercase tracking-widest text-[11px]"
              >
                {uploading || bookMutation?.isPending ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : isEditMode ? (
                  'Save Changes'
                ) : (
                  'Create Entry'
                )}
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* --- Delete Confirmation Modal --- */}
      <dialog
        id="delete_confirm_modal"
        className="modal modal-bottom sm:modal-middle backdrop-blur-sm"
      >
        <div className="modal-box bg-base-100 rounded-[2.5rem] p-10 text-center max-w-sm border border-base-200 shadow-2xl">
          <div className="w-20 h-20 bg-error/10 text-error rounded-full flex items-center justify-center mx-auto mb-6">
            <FaTrash size={30} />
          </div>
          <h3 className="font-bold text-2xl">Confirm Deletion</h3>
          <p className="py-4 text-base-content/60 font-medium">
            Are you sure you want to remove <b>{selectedBook?.title}</b>? This
            action is permanent.
          </p>
          <div className="modal-action flex justify-center gap-4 mt-2">
            <button
              onClick={() =>
                document.getElementById('delete_confirm_modal').close()
              }
              className="btn btn-ghost rounded-xl px-6 font-bold"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (selectedBook?._id) {
                  deleteMutation.mutate(selectedBook._id);
                } else {
                  console.error('No ID found for the selected book');
                }
              }}
              disabled={deleteMutation.isPending}
              className="btn btn-error text-white rounded-xl px-8 font-bold border-none shadow-lg shadow-error/20"
            >
              {deleteMutation.isPending ? 'Deleting...' : 'Yes, Delete'}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default ManageBooks;
