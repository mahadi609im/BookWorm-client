import React, { useContext } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import Loading from '../Loading/Loading';

const CurrentlyReadingShort = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  // ১. ইউজার যে বইটি বর্তমানে পড়ছে সেটি আনা
  const { data: readingBooks = [], isLoading } = useQuery({
    queryKey: ['currently-reading', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-library/${user?.email}`);
      return res.data.filter(book => book.shelfType === 'reading');
    },
    enabled: !!user?.email,
  });

  // ২. প্রগ্রেস আপডেট করার মিউটেশন
  const mutation = useMutation({
    mutationFn: ({ id, newProgress }) => {
      return axiosSecure.patch(`/library/${id}`, { progress: newProgress });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['currently-reading']);
      queryClient.invalidateQueries(['user-stats']); // চ্যালেঞ্জ গ্রাফ আপডেট করার জন্য
      Swal.fire({
        toast: true,
        position: 'top-end',
        icon: 'success',
        title: 'Progress updated!',
        showConfirmButton: false,
        timer: 1500,
      });
    },
  });

  const latestBook = readingBooks[0]; // লেটেস্ট বইটি নিলাম

  const handleUpdateProgress = async () => {
    if (!latestBook) return;

    const { value: pages } = await Swal.fire({
      title: 'Update Progress',
      input: 'number',
      inputLabel: `Which page are you on? (Total: ${latestBook.totalPage})`,
      inputValue: latestBook.progress,
      showCancelButton: true,
      inputValidator: value => {
        if (!value || value < 0 || value > latestBook.totalPage) {
          return 'Please enter a valid page number!';
        }
      },
    });

    if (pages) {
      mutation.mutate({ id: latestBook._id, newProgress: pages });
    }
  };

  if (isLoading) return <Loading></Loading>;

  // যদি কোন বই পড়া অবস্থায় না থাকে
  if (!latestBook) {
    return (
      <div className="bg-base-100 p-6 rounded-[2.5rem] border border-dashed border-base-300 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
        <p className="text-xs font-bold text-base-content/30 uppercase mb-2">
          No active book
        </p>
        <button className="btn btn-ghost btn-sm text-primary">
          Start a new book
        </button>
      </div>
    );
  }

  const progressPercent = Math.round(
    (latestBook.progress / latestBook.totalPage) * 100
  );

  return (
    <div className="bg-base-100 p-6 rounded-[2.5rem] border border-base-300 shadow-xl shadow-primary/5 group h-full flex flex-col justify-between">
      <h3 className="text-xs font-bold text-base-content/40 uppercase tracking-[0.2em] mb-5 px-2">
        Currently Reading
      </h3>

      <div className="flex gap-4 p-2">
        <div className="w-20 h-28 rounded-xl overflow-hidden shadow-lg group-hover:-rotate-3 transition-transform duration-500 bg-base-200">
          <img
            src={
              latestBook.cover ||
              'https://via.placeholder.com/200x300?text=No+Cover'
            }
            alt="book"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 py-1">
          <h4 className="font-bold text-base text-base-content leading-tight mb-1 truncate w-40">
            {latestBook.bookTitle}
          </h4>
          <p className="text-[10px] text-base-content/50 font-medium mb-4">
            by {latestBook.author}
          </p>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
              <span className="text-primary">
                Page {latestBook.progress}/{latestBook.totalPage}
              </span>
              <span className="text-base-content/40">{progressPercent}%</span>
            </div>
            <div className="w-full h-2 bg-base-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleUpdateProgress}
        className="mt-4 w-full flex items-center justify-center gap-2 text-[10px] font-bold text-primary hover:underline uppercase tracking-widest"
      >
        <FaPlus /> Update Progress
      </button>
    </div>
  );
};

export default CurrentlyReadingShort;
