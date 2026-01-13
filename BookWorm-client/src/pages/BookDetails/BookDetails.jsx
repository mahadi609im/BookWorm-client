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

  // ১. বইয়ের ডিটেইলস ফেচিং
  const {
    data: book = {},
    isLoading: isBookLoading,
    error,
  } = useQuery({
    queryKey: ['bookDetails', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/books/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // ২. রিভিউ ফেচিং (আলাদাভাবে বইয়ের আইডি দিয়ে রিভিউ আনা হচ্ছে)
  const { data: reviews = [], refetch: refetchReviews } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // ৩. ইউজারের লাইব্রেরি স্ট্যাটাস চেক করা
  const { data: userLibrary = [] } = useQuery({
    queryKey: ['myLibrary', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-library/${user?.email}`);
      return res.data;
    },
  });

  const currentShelfStatus = userLibrary.find(
    item => item.bookId === id
  )?.shelfType;

  // ৪. শেলফ আপডেট মিউটেশন (Updated)
  const shelfMutation = useMutation({
    mutationFn: async shelfType => {
      return await axiosSecure.patch(`/users/shelf`, {
        email: user?.email,
        bookId: id,
        shelfType,
        bookData: {
          title: book.title,
          author: book.author,
          cover: book.cover,
          genre: book.genre,
          // আপনার ডাটাবেসে যদি pages বা totalPages যে নামেই থাকুক, এখানে ম্যাপ হবে
          totalPages: parseInt(book.totalPages) || 0,
          description: book.description,
        },
      });
    },
    onSuccess: () => {
      Swal.fire({
        title: 'Updated!',
        text: `Book moved to ${
          currentShelfStatus === 'reading' ? 'shelf' : 'library'
        }.`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      queryClient.invalidateQueries(['myLibrary', user?.email]);
    },
  });

  // ৫. রিভিউ সাবমিট ফাংশন
  const handleReviewSubmit = async () => {
    if (!user) return Swal.fire('Error', 'Please login to review', 'error');
    if (userRating === 0)
      return Swal.fire('Wait', 'Please select a rating', 'info');
    if (!reviewText.trim())
      return Swal.fire('Wait', 'Please write some comment', 'info');

    const reviewData = {
      bookId: id,
      userName: user?.displayName,
      userEmail: user?.email,
      userImage: user?.photoURL,
      rating: userRating,
      comment: reviewText,
      date: new Date().toLocaleDateString(),
      status: 'approved', // সরাসরি approved দিলাম যাতে সাথে সাথে দেখা যায়, পেন্ডিং হলে এডমিন এপ্রুভ না করা পর্যন্ত আসবে না
      bookTitle: book.title,
    };

    try {
      const res = await axiosSecure.post('/reviews', reviewData);
      if (res.data.insertedId) {
        Swal.fire('Submitted!', 'Your review has been posted.', 'success');
        setReviewText('');
        setUserRating(0);
        refetchReviews(); // রিভিউ লিস্ট রিফ্রেশ করা
      }
    } catch {
      Swal.fire('Error', 'Could not submit review', 'error');
    }
  };

  if (isBookLoading) return <Loading />;
  if (error || !book._id)
    return (
      <div className="text-center py-20 text-error font-bold text-2xl">
        Book not found!
      </div>
    );

  const getButtonStyle = type => {
    const isActive = currentShelfStatus === type;
    const baseClass =
      'btn btn-lg rounded-2xl flex-1 md:flex-none px-8 transition-all duration-300 gap-2';
    return isActive
      ? `${baseClass} btn-primary shadow-lg scale-105`
      : `${baseClass} btn-outline border-base-300`;
  };

  return (
    <div className="conCls py-10 space-y-12 animate-fadeIn">
      {/* --- টপ সেকশন --- */}
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="w-full lg:w-1/3 max-w-[400px]">
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-base-100">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full object-cover aspect-[3/4]"
            />
            <div className="absolute top-4 right-4 backdrop-blur-md bg-white/30 px-4 py-2 rounded-2xl flex items-center gap-2 font-bold shadow-lg">
              <FaStar className="text-yellow-500" />{' '}
              {book.averageRating || book.rating || '0.0'}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-8">
          <div>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase">
                {book.genre}
              </span>
              <span className="px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-xs font-bold uppercase">
                {reviews.length} Reviews
              </span>
            </div>
            <h1 className="text-5xl font-serif font-bold text-base-content leading-tight">
              {book.title}
            </h1>
            <p className="text-xl text-base-content/60 font-medium mt-2">
              by <span className="text-primary italic">{book.author}</span>
            </p>
          </div>

          <p className="text-lg leading-relaxed text-base-content/70 italic bg-base-200/30 p-6 rounded-3xl border-l-4 border-primary">
            "{book.description}"
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => shelfMutation.mutate('want')}
              className={getButtonStyle('want')}
              disabled={shelfMutation.isPending}
            >
              <FaBookmark />{' '}
              {currentShelfStatus === 'want' ? 'On Wishlist' : 'Want to Read'}
            </button>
            <button
              onClick={() => shelfMutation.mutate('reading')}
              className={getButtonStyle('reading')}
              disabled={shelfMutation.isPending}
            >
              <FaRegClock />{' '}
              {currentShelfStatus === 'reading'
                ? 'Reading Now'
                : 'Currently Reading'}
            </button>
            <button
              onClick={() => shelfMutation.mutate('read')}
              className={getButtonStyle('read')}
              disabled={shelfMutation.isPending}
            >
              <FaCheck />{' '}
              {currentShelfStatus === 'read' ? 'Finished' : 'Mark Finished'}
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
                const starValue = index + 1;
                return (
                  <button
                    key={starValue}
                    className={`text-3xl transition-colors ${
                      starValue <= (hover || userRating)
                        ? 'text-yellow-500'
                        : 'text-base-300'
                    }`}
                    onClick={() => setUserRating(starValue)}
                    onMouseEnter={() => setHover(starValue)}
                    onMouseLeave={() => setHover(userRating)}
                  >
                    <FaStar />
                  </button>
                );
              })}
            </div>
            <textarea
              className="textarea textarea-bordered w-full h-32 rounded-2xl bg-base-100 p-4"
              placeholder="Share your thoughts..."
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
            ></textarea>
            <button
              onClick={handleReviewSubmit}
              className="btn btn-primary btn-block h-14 rounded-2xl text-white font-bold uppercase shadow-xl"
            >
              Submit Review <FaPaperPlane className="ml-2" />
            </button>
          </div>
        </div>

        {/* --- রিভিউ লিস্ট --- */}
        <div className="space-y-6">
          <h3 className="text-2xl font-serif font-bold">
            Community <span className="text-primary italic">Reviews</span>
          </h3>
          <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
            {reviews.length > 0 ? (
              reviews.map((rev, i) => (
                <div
                  key={i}
                  className="p-6 bg-base-100 border border-base-200 rounded-3xl shadow-sm space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="w-10 rounded-full bg-primary/10">
                          {rev.userImage ? (
                            <img src={rev.userImage} alt="" />
                          ) : (
                            <FaUserCircle className="w-full h-full p-1" />
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{rev.userName}</h4>
                        <p className="text-[10px] opacity-40 uppercase font-bold">
                          {rev.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex text-yellow-500 text-xs">
                      {[...Array(5)].map((_, idx) => (
                        <FaStar
                          key={idx}
                          className={
                            idx < rev.rating
                              ? 'text-yellow-500'
                              : 'text-base-200'
                          }
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-base-content/70 text-sm">{rev.comment}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-base-200/20 rounded-[2.5rem] border-2 border-dashed border-base-300">
                <p className="text-base-content/30 italic font-bold">
                  No reviews yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
