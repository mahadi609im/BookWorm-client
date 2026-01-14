import React from 'react';
import { Link } from 'react-router';
import { ShieldAlert, ArrowLeft, Home } from 'lucide-react';

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-6 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-error/5 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-md w-full text-center">
        {/* Animated Icon Container */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-error/20 blur-2xl rounded-full scale-150 animate-pulse"></div>
          <div className="relative w-24 h-24 bg-base-200 border-2 border-error/20 rounded-[2rem] flex items-center justify-center mx-auto group">
            <ShieldAlert
              size={48}
              className="text-error group-hover:rotate-12 transition-transform duration-300"
            />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-7xl font-black mb-4 tracking-tighter text-base-content italic">
          403
        </h1>
        <h2 className="text-2xl font-bold mb-4 italic uppercase tracking-widest text-error">
          Access Forbidden
        </h2>
        <p className="text-base-content/50 font-medium leading-relaxed mb-10">
          Oops! It looks like you've reached a restricted area. You don't have
          the necessary permissions to view this page.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex-1 px-8 py-4 bg-base-200 hover:bg-base-300 text-base-content rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Go Back
          </button>

          <Link
            to="/"
            className="flex-1 px-8 py-4 bg-primary text-white rounded-2xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            <Home size={18} /> Home
          </Link>
        </div>

        {/* Subtle Footer */}
        <p className="mt-12 text-[10px] font-black uppercase tracking-[0.4em] text-base-content/20 italic">
          Restricted Access Control
        </p>
      </div>
    </div>
  );
};

export default Forbidden;
