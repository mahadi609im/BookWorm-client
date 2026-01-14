import React, { useContext } from 'react';
import { FaTrophy, FaChevronRight } from 'react-icons/fa';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../context/AuthContext';
import Swal from 'sweetalert2';
import Loading from '../Loading/Loading';

const ReadingChallenge = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ['user-stats', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ২. গোল আপডেট করার জন্য মিউটেশন (Mutation)
  const mutation = useMutation({
    mutationFn: newGoal => {
      return axiosSecure.patch(`/users/goal/${user?.email}`, { goal: newGoal });
    },
    onSuccess: () => {
      // ডাটাবেজ আপডেট হলে গ্রাফ রিফ্রেশ করা
      queryClient.invalidateQueries(['user-stats']);
      Swal.fire(
        'Updated!',
        'Your annual reading goal has been set.',
        'success'
      );
    },
  });

  const handleSetGoal = async () => {
    const { value: goal } = await Swal.fire({
      title: 'Set Annual Reading Goal',
      input: 'number',
      inputLabel: 'How many books do you want to read this year?',
      inputValue: stats.annualGoal || 10,
      showCancelButton: true,
      inputValidator: value => {
        if (!value || value <= 0) {
          return 'Please enter a valid number of books!';
        }
      },
    });

    if (goal) {
      mutation.mutate(goal);
    }
  };

  const goal = stats.annualGoal || 0;
  const completed = stats.booksRead || 0;
  const progress =
    goal > 0 ? Math.min(Math.round((completed / goal) * 100), 100) : 0;

  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  if (isLoading) return Loading;

  return (
    <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-xl shadow-primary/5 group relative overflow-hidden transition-all duration-500 hover:shadow-primary/10 h-full flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-serif font-bold text-base-content leading-tight">
            Reading Challenge
          </h3>
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">
            Goal: {goal > 0 ? `${goal} Books` : 'Not Set'}
          </p>
        </div>
        <div
          className={`p-3 rounded-2xl transition-all duration-500 ${
            progress === 100
              ? 'bg-warning text-white'
              : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white'
          }`}
        >
          <FaTrophy size={18} />
        </div>
      </div>

      {/* Circular Progress */}
      <div className="flex flex-col items-center justify-center py-4 relative">
        <svg className="w-40 h-40 transform -rotate-90 transition-transform duration-1000 group-hover:scale-110">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-base-200"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-primary transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute text-center">
          <span className="text-3xl font-bold text-base-content leading-none">
            {progress}%
          </span>
          <p className="text-[9px] font-bold text-base-content/40 uppercase tracking-tighter">
            {completed} of {goal} Books
          </p>
        </div>
      </div>

      {/* Footer Info & Action */}
      <div className="mt-2 text-center">
        {goal === 0 ? (
          <p className="text-[11px] text-error font-medium italic mb-4">
            Set a goal to track your progress!
          </p>
        ) : (
          <p className="text-[11px] text-base-content/60 font-medium italic mb-4">
            {progress >= 100
              ? 'Goal Achieved! 🎉'
              : `${goal - completed} more books to reach your goal`}
          </p>
        )}

        {/* এই বাটনটি এখন ডায়নামিক গোল সেট করতে সাহায্য করবে */}
        <button
          onClick={handleSetGoal}
          className="w-full py-4 rounded-2xl bg-base-200 hover:bg-primary hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2"
        >
          {goal > 0 ? 'Update Goal' : 'Set Annual Goal'}{' '}
          <FaChevronRight size={10} />
        </button>
      </div>
    </div>
  );
};

export default ReadingChallenge;
