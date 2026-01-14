import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-base-100 w-full transition-colors duration-300">
      <div className="flex flex-col items-center gap-8">
        {/* Book Animation Container */}
        <div className="relative w-16 h-12">
          {/* Book Spine / Base - Using primary color from theme */}
          <div className="absolute inset-0 border-2 border-primary rounded-sm opacity-20"></div>

          {/* Animated Pages */}
          <div className="absolute inset-0 flex justify-center">
            <div className="w-1/2 h-full bg-primary/20 border-r border-primary/30 animate-[book-flip_1.2s_infinite_ease-in-out] origin-right"></div>
            <div className="w-1/2 h-full bg-primary/10 border-l border-primary/30"></div>
          </div>

          {/* Decorative Shadow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-primary/10 rounded-full blur-sm"></div>
        </div>

        {/* Animation Style */}
        <style jsx>{`
          @keyframes book-flip {
            0%,
            100% {
              transform: rotateY(0deg);
            }
            50% {
              transform: rotateY(-180deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Loading;
