import React from 'react';
import { FaTrophy, FaChevronRight } from 'react-icons/fa';

const ReadingChallenge = () => {
  const progress = 65; // Dynamic value
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-xl shadow-primary/5 group relative overflow-hidden transition-all duration-500 hover:shadow-primary/10">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-xl font-serif font-bold text-base-content leading-tight">
            Reading
            <br />
            Challenge
          </h3>
          <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">
            Goal: 24 Books
          </p>
        </div>
        <div className="p-3 bg-primary/10 text-primary rounded-2xl group-hover:bg-primary group-hover:text-white transition-all duration-500">
          <FaTrophy size={18} />
        </div>
      </div>

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
            Completed
          </p>
        </div>
      </div>

      <button className="w-full mt-6 py-4 rounded-2xl bg-base-200 hover:bg-primary hover:text-white transition-all duration-300 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2">
        View Progress <FaChevronRight size={10} />
      </button>
    </div>
  );
};

export default ReadingChallenge;
