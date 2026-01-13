import React, { useContext, useState } from 'react';
import { useParams } from 'react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import Loading from '../../Components/Loading/Loading';
import {
  FaStar,
  FaCheck,
  FaBookmark,
  FaRegClock,
  FaUserCircle,
  FaPaperPlane,
} from 'react-icons/fa';

const BookDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // Rating States
  const [userRating, setUserRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewText, setReviewText] = useState('');

  // ১. ডাটা ফেচিং (TanStack Query)
  const {
    data: book = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ['bookDetails', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // ২. শেলফ আপডেট মিউটেশন (Add to Want/Reading/Finished)
  const shelfMutation = useMutation({
    mutationFn: async shelfType => {
      return await axiosSecure.patch(`/users/shelf`, {
        email: user?.email,
        bookId: id,
        shelfType, // 'want', 'reading', or 'read'
        bookData: book,
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Updated!',
        text: 'Book status updated on your shelf.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(['userShelf', user?.email]);
    },
  });

  // ৩. রিভিউ সাবমিট ফাংশন
  const handleReviewSubmit = async () => {
    if (!user) return Swal.fire('Error', 'Please login to review', 'error');
    if (userRating === 0)
      return Swal.fire('Wait', 'Please select a rating', 'info');

    const reviewData = {
      bookId: id,
      userName: user?.displayName,
      userEmail: user?.email,
      userImage: user?.photoURL,
      rating: userRating,
      comment: reviewText,
      date: new Date().toLocaleDateString(),
      status: 'pending',
      bookTitle: book.title,
    };

    try {
      const res = await axiosSecure.post('/reviews', reviewData);
      if (res.data.insertedId) {
        Swal.fire('Submitted!', 'Review sent for admin approval.', 'success');
        setReviewText('');
        setUserRating(0);
      }
    } catch {
      Swal.fire('Error', 'Could not submit review', 'error');
    }
  };

  if (isLoading) return <Loading />;
  if (error)
    return <div className="text-center py-20 text-error">Book not found!</div>;

  return (
    <div className="conCls py-10 space-y-12 animate-fadeIn">
      {/* --- টপ সেকশন --- */}
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="w-full lg:w-1/3 max-w-[400px] sticky top-24">
          <div className="relative group rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/20 border-8 border-base-100">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full object-cover aspect-[3/4]"
            />
            <div className="absolute top-4 right-4  backdrop-blur-md px-4 py-2 rounded-2xl flex items-center gap-2 font-bold shadow-lg">
              <FaStar className="text-yellow-500" /> {book.rating || 'N/A'}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div>
            <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-widest">
              {book.genre}
            </span>
            <h1 className="text-5xl font-serif font-bold text-base-content mt-4 leading-tight">
              {book.title}
            </h1>
            <p className="text-xl text-base-content/60 font-medium">
              by <span className="text-primary italic">{book.author}</span>
            </p>
          </div>

          <p className="text-lg leading-relaxed text-base-content/70 italic">
            "{book.description}"
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => shelfMutation.mutate('want')}
              className="btn btn-lg rounded-2xl flex-1 md:flex-none px-8 btn-outline border-base-300"
            >
              <FaBookmark /> Want to Read
            </button>
            <button
              onClick={() => shelfMutation.mutate('reading')}
              className="btn btn-lg rounded-2xl flex-1 md:flex-none px-8 btn-outline border-base-300"
            >
              <FaRegClock /> Currently Reading
            </button>
            <button
              onClick={() => shelfMutation.mutate('read')}
              className="btn btn-lg rounded-2xl flex-1 md:flex-none px-8 btn-outline border-base-300"
            >
              <FaCheck /> Finished
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 border-t border-base-200 pt-12">
        {/* --- রিভিউ লিখুন --- */}
        <div className="space-y-6">
          <h3 className="text-2xl font-serif font-bold">
            Write a <span className="text-primary italic">Review</span>
          </h3>
          <div className="bg-base-200/50 p-8 rounded-[2.5rem] border border-base-200 space-y-6">
            <div className="flex gap-2">
              {[...Array(5)].map((_, index) => {
                index += 1;
                return (
                  <button
                    key={index}
                    className={`text-3xl transition-colors ${
                      index <= (hover || userRating)
                        ? 'text-yellow-500'
                        : 'text-base-300'
                    }`}
                    onClick={() => setUserRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(userRating)}
                  >
                    <FaStar />
                  </button>
                );
              })}
            </div>

            <textarea
              className="textarea textarea-bordered w-full h-32 rounded-2xl bg-base-100 border-none focus:ring-2 focus:ring-primary/20 text-lg p-4"
              placeholder="Share your thoughts on this book..."
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
            ></textarea>

            <button
              onClick={handleReviewSubmit}
              className="btn btn-primary btn-block h-14 rounded-2xl text-white font-bold uppercase tracking-widest shadow-xl shadow-primary/30"
            >
              Submit Review <FaPaperPlane className="ml-2" />
            </button>
          </div>
        </div>

        {/* --- পাবলিক রিভিউ লিস্ট --- */}
        <div className="space-y-6">
          <h3 className="text-2xl font-serif font-bold">
            Community <span className="text-primary italic">Reviews</span>
          </h3>
          <div className="space-y-4">
            {book.reviews?.length > 0 ? (
              book.reviews.map((rev, i) => (
                <div
                  key={i}
                  className="p-6 bg-base-100 border border-base-200 rounded-3xl shadow-sm space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="avatar placeholder">
                        <div className="bg-primary/10 text-primary rounded-full w-10">
                          <FaUserCircle size={24} />
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{rev.userName}</h4>
                        <p className="text-[10px] text-base-content/40 font-bold">
                          {rev.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-yellow-500 text-xs">
                      {[...Array(rev.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                  <p className="text-base-content/70 text-sm leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-center text-base-content/30 py-10 italic font-bold">
                No reviews yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
