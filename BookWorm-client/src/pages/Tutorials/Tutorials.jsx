import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Loading from '../../Components/Loading/Loading';
import { FaPlay, FaYoutube, FaBookOpen, FaGraduationCap } from 'react-icons/fa';

const Tutorials = () => {
  const axiosSecure = useAxiosSecure();
  const [showAll, setShowAll] = useState(false);

  // ১. ডাটা ফেচিং (TanStack Query ব্যবহার করে)
  const {
    data: allVideos = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tutorials'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tutorials');
      return res.data;
    },
  });

  // ২. ডিসপ্লে লজিক (ডিফল্ট ৮টি ভিডিও)
  const visibleVideos = showAll ? allVideos : allVideos.slice(0, 8);

  if (isLoading) return <Loading />;

  if (error)
    return (
      <div className="text-center py-20 text-error font-bold">
        Failed to load tutorials. Please try again later.
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12 min-h-screen">
      {/* --- হেডার সেকশন --- */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="flex justify-center">
          <span className="p-4 bg-primary/10 rounded-2xl text-primary mb-2 block animate-bounce">
            <FaGraduationCap size={35} />
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-base-content">
          Learning <span className="text-primary italic text-5xl">Hub</span>
        </h1>
        <p className="text-base-content/60 font-medium italic">
          Enhance your reading experience with our curated book-related
          tutorials, tips, and reviews.
        </p>
      </div>

      <div className="divider opacity-30"></div>

      {/* --- ভিডিও গ্রিড --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {visibleVideos.map(video => (
          <div
            key={video._id} // MongoDB ID ব্যবহার করা হয়েছে
            className="group bg-base-100 rounded-[2.5rem] border border-base-200 overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 hover:-translate-y-2"
          >
            <div className="relative aspect-video overflow-hidden">
              {/* YouTube Iframe */}
              <iframe
                className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-150"
                src={video.link}
                title={video.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>

              {/* Thumbnail Overlay */}
              <div className="absolute inset-0 z-10 group-hover:translate-y-[-100%] transition-transform duration-500 pointer-events-none group-hover:opacity-0">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center text-white border border-white/40 group-hover:scale-125 transition-all duration-500 shadow-xl">
                    <FaPlay size={20} className="ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 bg-black/80 text-white text-[10px] font-black px-3 py-1 rounded-full backdrop-blur-sm">
                  {video.duration}
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                <FaYoutube className="text-red-500" /> {video.channel}
              </div>
              <h3 className="text-base font-bold text-base-content leading-tight line-clamp-2 min-h-[3rem]">
                {video.title}
              </h3>
              <div className="flex justify-between items-center pt-2 border-t border-base-200">
                <button className="text-[11px] font-bold text-base-content/40 hover:text-primary transition-colors flex items-center gap-2">
                  <FaBookOpen size={12} /> View Related
                </button>
                <div className="badge badge-primary badge-outline text-[9px] font-black px-3 py-3">
                  TUTORIAL
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- লোড মোর বাটন --- */}
      {allVideos.length > 8 && (
        <div className="flex justify-center pt-10">
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="group relative inline-flex items-center justify-center px-12 h-14 font-black tracking-tighter text-white bg-primary rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/30"
            >
              <span className="relative uppercase text-xs tracking-widest">
                Load More Tutorials
              </span>
            </button>
          ) : (
            <div className="space-y-4 text-center w-full">
              <div className="divider opacity-20"></div>
              <p className="text-sm font-bold text-base-content/30 italic tracking-widest">
                — END OF LIBRARY —
              </p>
              <button
                onClick={() => setShowAll(false)}
                className="text-xs font-bold text-primary hover:underline uppercase tracking-widest"
              >
                Show Less
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Tutorials;
