import React, { useState } from 'react';

const MyLibrary = () => {
  const [activeShelf, setActiveShelf] = useState('Currently Reading');

  return (
    <div className="conCls mt-10">
      <h2 className="text-3xl font-serif font-bold text-primary mb-6">
        My Personal Library
      </h2>

      {/* 1. Shelf Tabs */}
      <div className="tabs tabs-boxed bg-base-200 p-2 mb-8 inline-flex">
        {['Want to Read', 'Currently Reading', 'Read'].map(shelf => (
          <button
            key={shelf}
            className={`tab px-6 font-bold transition-all ${
              activeShelf === shelf ? 'tab-active bg-primary text-white' : ''
            }`}
            onClick={() => setActiveShelf(shelf)}
          >
            {shelf}
          </button>
        ))}
      </div>

      {/* 2. Book Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Example: Currently Reading Book Card */}
        <div className="card card-side bg-base-100 shadow-xl border border-base-300">
          <figure className="w-1/3">
            <img
              src="https://images.unsplash.com/photo-1544947950-fa07a98d237f"
              alt="Book"
              className="h-full object-cover"
            />
          </figure>
          <div className="card-body w-2/3 p-4">
            <h3 className="card-title text-md font-serif">The Great Gatsby</h3>
            <p className="text-xs opacity-70">F. Scott Fitzgerald</p>

            {/* 3. Progress Section (Only for Currently Reading) */}
            {activeShelf === 'Currently Reading' && (
              <div className="mt-4">
                <div className="flex justify-between text-[10px] mb-1 font-bold">
                  <span>Progress</span>
                  <span>65%</span>
                </div>
                <progress
                  className="progress progress-primary w-full h-2"
                  value="65"
                  max="100"
                ></progress>
                <button className="btn btn-xs btn-outline btn-primary mt-2">
                  Update Progress
                </button>
              </div>
            )}

            <div className="card-actions justify-end mt-4">
              <button className="btn btn-ghost btn-xs text-error">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLibrary;
