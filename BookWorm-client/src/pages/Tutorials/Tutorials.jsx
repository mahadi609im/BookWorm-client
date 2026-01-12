import React, { useState } from 'react';
import { FaPlay, FaYoutube, FaBookOpen, FaGraduationCap } from 'react-icons/fa';

const Tutorials = () => {
  // ১. ডামি ডাটা - ভিডিও লিস্ট (১২টি ভিডিও)
  const allVideos = [
    {
      id: 1,
      title: 'How to Build a Reading Habit',
      channel: 'BookWorm Guides',
      thumbnail:
        'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=500',
      duration: '10:20',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      id: 2,
      title: 'Top 10 Sci-Fi Books of 2026',
      channel: 'Sci-Fi Central',
      thumbnail:
        'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=500',
      duration: '15:45',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      id: 3,
      title: 'How to Write Better Book Reviews',
      channel: 'Writing Pro',
      thumbnail:
        'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=500',
      duration: '08:12',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      id: 4,
      title: 'Mindfulness and Deep Reading',
      channel: 'Calm Mind',
      thumbnail:
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=500',
      duration: '12:30',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      id: 5,
      title: 'Organizing Your Digital Library',
      channel: 'Tech Librarian',
      thumbnail:
        'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=500',
      duration: '09:55',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      id: 6,
      title: 'Speed Reading Techniques',
      channel: 'Fast Learner',
      thumbnail:
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=500',
      duration: '20:10',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      id: 7,
      title: 'The History of Literature',
      channel: 'History Hub',
      thumbnail:
        'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=500',
      duration: '25:00',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      id: 8,
      title: 'Self-Help Books That Actually Work',
      channel: 'Improve Daily',
      thumbnail:
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
      duration: '14:20',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    // অতিরিক্ত ৪টি ভিডিও (Load More এর জন্য)
    {
      id: 9,
      title: 'Mystery Genre Masterclass',
      channel: 'Author Insights',
      thumbnail:
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=500',
      duration: '18:40',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      id: 10,
      title: 'Why We Read Fiction',
      channel: 'Story Soul',
      thumbnail:
        'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?q=80&w=500',
      duration: '11:15',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      id: 11,
      title: 'Modern Poetry Appreciation',
      channel: 'Poets Corner',
      thumbnail:
        'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=500',
      duration: '07:45',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      id: 12,
      title: 'Creating Your Reading Nook',
      channel: 'Cozy Living',
      thumbnail:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=500',
      duration: '13:00',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
  ];

  // ২. স্টেট ম্যানেজমেন্ট
  const [showAll, setShowAll] = useState(false);
  const visibleVideos = showAll ? allVideos : allVideos.slice(0, 8);

  return (
    <div className="conCls py-10 space-y-12 min-h-screen">
      {/* --- হেডার সেকশন --- */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="flex justify-center">
          <span className="p-3 bg-primary/10 rounded-2xl text-primary mb-4 block">
            <FaGraduationCap size={32} />
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-base-content">
          Learning <span className="text-primary italic">Hub</span>
        </h1>
        <p className="text-base-content/60 font-medium italic">
          Enhance your reading experience with our curated book-related
          tutorials, tips, and reviews.
        </p>
      </div>

      <div className="divider opacity-50"></div>

      {/* --- ভিডিও গ্রিড (Initial: 8, On Load More: All 12) --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {visibleVideos.map(video => (
          <div
            key={video.id}
            className="group bg-base-100 rounded-[2rem] border border-base-200 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500"
          >
            <div className="relative aspect-video overflow-hidden">
              <iframe
                className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-150"
                src={video.link}
                title={video.title}
                frameBorder="0"
                allowFullScreen
              ></iframe>

              <div className="absolute inset-0 z-10 group-hover:translate-y-[-100%] transition-transform duration-500">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                    <FaPlay size={18} className="ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-3 right-3 bg-black/70 text-white text-[9px] font-bold px-2 py-0.5 rounded-md">
                  {video.duration}
                </div>
              </div>
            </div>

            <div className="p-5 space-y-3">
              <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-primary">
                <FaYoutube /> {video.channel}
              </div>
              <h3 className="text-sm font-bold text-base-content leading-tight line-clamp-2 min-h-[2.5rem]">
                {video.title}
              </h3>
              <div className="flex justify-between items-center pt-2">
                <button className="text-[10px] font-bold text-base-content/50 hover:text-primary transition-colors flex items-center gap-1">
                  <FaBookOpen size={10} /> Related
                </button>
                <div className="badge badge-outline border-base-300 text-[8px] font-bold">
                  TUTORIAL
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- লোড মোর বাটন --- */}
      {!showAll && (
        <div className="flex justify-center pt-6">
          <button
            onClick={() => setShowAll(true)}
            className="btn btn-outline border-base-300 rounded-2xl px-12 hover:bg-primary hover:border-primary font-bold uppercase tracking-widest text-xs h-14"
          >
            Load More Tutorials
          </button>
        </div>
      )}

      {showAll && (
        <div className="text-center pt-6">
          <p className="text-sm font-medium text-base-content/30 italic">
            You've reached the end of the library.
          </p>
        </div>
      )}
    </div>
  );
};

export default Tutorials;
