import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
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
import {
  HiArrowLongLeft,
  HiOutlineBookOpen,
  HiOutlineUsers,
  HiStar,
} from 'react-icons/hi2';

const BookDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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
          totalPage: parseInt(book.totalPage) || 0,
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
      bookTitle: book.title,
    };

    try {
      const res = await axiosSecure.post('/reviews', reviewData);

      // upsert logic এর কারণে এখানে result চেক করা হচ্ছে
      if (
        res.data.upsertedCount > 0 ||
        res.data.modifiedCount > 0 ||
        res.data.matchedCount > 0
      ) {
        Swal.fire({
          title: 'Success!',
          text: 'Your review has been saved.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        setReviewText('');
        setUserRating(0);
        refetchReviews(); // রিভিউ লিস্ট রিফ্রেশ হবে
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
      'group flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold text-sm uppercase tracking-wider transition-all duration-500 border-2 flex-1 md:flex-none';

    const activeStyles = {
      want: 'bg-primary border-primary text-primary-content shadow-[0_10px_20px_-5px_rgba(var(--p),0.4)] scale-[1.02]',
      reading:
        'bg-secondary border-secondary text-secondary-content shadow-[0_10px_20px_-5px_rgba(var(--s),0.4)] scale-[1.02]',
      read: 'bg-accent border-accent text-accent-content shadow-[0_10px_20px_-5px_rgba(var(--a),0.4)] scale-[1.02]',
    };

    const inactiveStyles =
      'bg-base-100/50 border-base-300 text-base-content/60 hover:border-primary/50 hover:text-primary hover:bg-primary/5';

    return `${baseClass} ${isActive ? activeStyles[type] : inactiveStyles}`;
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
          {/* --- Back Button --- */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm font-bold text-base-content/50 hover:text-primary transition-colors uppercase tracking-widest"
          >
            <HiArrowLongLeft className="text-xl" /> Back
          </button>

          <div>
            <div className="flex flex-wrap gap-6 items-center">
              <div className="flex gap-2 mb-4">
                <span className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase">
                  {book.genre}
                </span>
                <span className="px-4 py-1.5 bg-secondary/10 text-secondary rounded-full text-xs font-bold uppercase">
                  {book.totalReviews || reviews.length} Reviews
                </span>
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase ${
                    book.status === 'In Stock'
                      ? 'bg-success/10 text-success'
                      : 'bg-error/10 text-error'
                  }`}
                >
                  {book.status}
                </span>
              </div>
              <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-500 flex items-center justify-center text-lg">
                    <HiOutlineBookOpen />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-black opacity-40 leading-none mb-1">
                      Total Pages
                    </p>
                    <p className="text-sm font-bold text-base-content leading-none">
                      {book.totalPage}{' '}
                      <span className="text-[10px] font-medium opacity-50">
                        pp
                      </span>
                    </p>
                  </div>
                </div>
                <div className="h-8 w-[1px] bg-base-200"></div>
                <div className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center text-lg">
                    <HiOutlineUsers />
                  </div>
                  <div>
                    <p className="text-[9px] uppercase font-black opacity-40 leading-none mb-1">
                      Shelved By
                    </p>
                    <p className="text-sm font-bold text-base-content leading-none">
                      {book.shelvedCount}{' '}
                      <span className="text-[10px] font-medium opacity-50">
                        users
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-base-content leading-tight">
              {book.title}
            </h1>
            <p className="text-xl text-base-content/60 font-medium mt-2">
              by <span className="text-primary italic">{book.author}</span>
            </p>
            <p className="text-[10px] text-base-content/30 mt-1 uppercase tracking-tighter">
              ID: {book._id}
            </p>
          </div>

          {/* --- Summary Section --- */}
          <div className="bg-base-200/50 p-6 rounded-3xl border border-base-300">
            <h3 className="text-[10px] uppercase font-bold tracking-[2px] text-primary mb-2">
              Summary
            </h3>
            <p className="text-lg leading-relaxed text-base-content/80 font-medium italic">
              "{book.summary}"
            </p>
          </div>

          {/* --- Description --- */}
          <div className="space-y-2">
            <h3 className="text-[10px] uppercase font-bold tracking-[2px] opacity-40">
              Description
            </h3>
            <p className="text-lg leading-relaxed text-base-content/70">
              {book.description}
            </p>
          </div>

          {/* --- Premium Action Buttons --- */}
          <div className="grid grid-cols-1 sm:grid-cols-3 md:flex md:flex-wrap gap-3 pt-6">
            <button
              onClick={() => shelfMutation.mutate('want')}
              className={getButtonStyle('want')}
              disabled={shelfMutation.isPending}
            >
              <FaBookmark
                className={`${
                  currentShelfStatus === 'want'
                    ? 'animate-bounce'
                    : 'group-hover:scale-125 transition-transform'
                }`}
              />
              <span>
                {currentShelfStatus === 'want' ? 'On Wishlist' : 'Want to Read'}
              </span>
            </button>

            <button
              onClick={() => shelfMutation.mutate('reading')}
              className={getButtonStyle('reading')}
              disabled={shelfMutation.isPending}
            >
              <FaRegClock
                className={`${
                  currentShelfStatus === 'reading'
                    ? 'animate-spin-slow'
                    : 'group-hover:rotate-12 transition-transform'
                }`}
              />
              <span>
                {currentShelfStatus === 'reading'
                  ? 'Reading Now'
                  : 'Currently Reading'}
              </span>
            </button>

            <button
              onClick={() => shelfMutation.mutate('read')}
              className={getButtonStyle('read')}
              disabled={shelfMutation.isPending}
            >
              <FaCheck
                className={`${
                  currentShelfStatus === 'read'
                    ? 'scale-125'
                    : 'group-hover:translate-y-[-2px] transition-transform'
                }`}
              />
              <span>
                {currentShelfStatus === 'read' ? 'Finished' : 'Mark Finished'}
              </span>
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
