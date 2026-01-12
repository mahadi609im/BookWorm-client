import React from 'react';
import { FaPlus } from 'react-icons/fa';

const CurrentlyReadingShort = () => {
  return (
    <div className="bg-base-100 p-6 rounded-[2.5rem] border border-base-300 shadow-xl shadow-primary/5 group">
      <h3 className="text-xs font-bold text-base-content/40 uppercase tracking-[0.2em] mb-5 px-2">
        Currently Reading
      </h3>

      <div className="flex gap-4 p-2">
        <div className="w-20 h-28 rounded-xl overflow-hidden shadow-lg group-hover:-rotate-3 transition-transform duration-500">
          <img
            src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200"
            alt="book"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 py-1">
          <h4 className="font-bold text-base text-base-content leading-tight mb-1">
            Dune: Part Two
          </h4>
          <p className="text-[10px] text-base-content/50 font-medium mb-4">
            by Frank Herbert
          </p>

          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-tighter">
              <span className="text-primary">Page 145/400</span>
              <span className="text-base-content/40">36%</span>
            </div>
            <div className="w-full h-2 bg-base-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-1000"
                style={{ width: '36%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      <button className="mt-4 w-full flex items-center justify-center gap-2 text-[10px] font-bold text-primary hover:underline uppercase tracking-widest">
        <FaPlus /> Update Progress
      </button>
    </div>
  );
};

export default CurrentlyReadingShort;
