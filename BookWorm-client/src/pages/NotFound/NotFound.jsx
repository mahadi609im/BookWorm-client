import React from 'react';
import { Link } from 'react-router';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100 w-full px-6 overflow-hidden relative">
      <div className="flex flex-col items-center max-w-2xl relative z-10">
        {/* Optimized Visual Element */}
        <div className="relative w-full h-80 flex justify-center items-center">
          {/* Large Background 404 */}
          <span className="absolute inset-0 flex items-center justify-center text-[12rem] md:text-[16rem] font-serif font-extrabold text-primary opacity-[0.07] select-none tracking-tighter">
            404
          </span>

          {/* Centered Book - Adjusted to sit exactly where the '0' would be */}
          <div className="relative flex flex-col items-center mt-8 md:mt-12">
            {/* The Floating Book - Lowered position */}
            <div className="w-20 h-28 bg-primary rounded-tr-xl rounded-br-sm shadow-2xl animate-bounce flex flex-col justify-between p-3 z-20">
              <div className="w-full h-1 bg-white/30 rounded"></div>
              <div className="w-3/4 h-1 bg-white/20 rounded"></div>
              <div className="mt-auto self-end w-5 h-5 rounded-full border-2 border-white/20 flex items-center justify-center text-[8px] text-white/40">
                ?
              </div>
            </div>

            {/* Shelf Line - Moved slightly lower for better balance */}
            <div className="w-40 h-1 bg-primary/20 rounded-full mt-4"></div>

            {/* Subtle Glow beneath the book */}
            <div className="absolute -bottom-6 w-24 h-8 bg-primary/10 blur-2xl rounded-full -z-10"></div>
          </div>
        </div>
        {/* Message Content */}
        <div className="text-center space-y-4 mt-6">
          {/* font-serif class will use 'Jost' from your config */}
          <h2 className="text-5xl md:text-6xl font-serif text-primary tracking-tight">
            Chapter <span className="italic font-light">Not Found.</span>
          </h2>

          {/* text-base-content/50 for subtle look in both themes */}
          <p className="text-base-content/60 font-sans uppercase tracking-[0.2em] text-[10px] md:text-xs max-w-sm mx-auto leading-loose">
            The page you are looking for has been misplaced or removed from our
            archives.
          </p>
        </div>

        {/* Navigation - Ultra Minimal & Professional */}
        <div className="flex flex-col sm:flex-row gap-6 items-center mt-12">
          <Link
            to="/"
            className="group flex items-center gap-2 text-primary font-serif italic text-xl transition-all"
          >
            <span>Return to Catalog</span>
            {/* Simple clean arrow movement */}
            <span className="text-2xl transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>

          {/* Thin Divider - Using your primary color with low opacity */}
          <div className="hidden sm:block w-[1px] h-5 bg-primary/20"></div>

          <button
            onClick={() => window.history.back()}
            className="text-base-content/40 font-sans uppercase tracking-widest text-[10px] hover:text-primary transition-colors cursor-pointer"
          >
            Go Back
          </button>
        </div>
      </div>

      {/* Modern Background Accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-[120px] -z-10"></div>
    </div>
  );
};

export default NotFound;
