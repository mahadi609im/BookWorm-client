import React, { useState } from 'react';
import { FaPlay, FaYoutube, FaBookOpen, FaGraduationCap } from 'react-icons/fa';

const Tutorials = () => {
  // ১. আপডেট করা ডাটা - (id বাদ দিয়ে ১৫টি ভিডিও)
  const allVideos = [
    {
      title: 'How to Build a Reading Habit',
      channel: 'BookWorm Guides',
      thumbnail:
        'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=500',
      duration: '10:20',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      title: 'Top 10 Sci-Fi Books of 2026',
      channel: 'Sci-Fi Central',
      thumbnail:
        'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=500',
      duration: '15:45',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      title: 'How to Write Better Book Reviews',
      channel: 'Writing Pro',
      thumbnail:
        'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=500',
      duration: '08:12',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      title: 'Mindfulness and Deep Reading',
      channel: 'Calm Mind',
      thumbnail:
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=500',
      duration: '12:30',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      title: 'Organizing Your Digital Library',
      channel: 'Tech Librarian',
      thumbnail:
        'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=500',
      duration: '09:55',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      title: 'Speed Reading Techniques',
      channel: 'Fast Learner',
      thumbnail:
        'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=500',
      duration: '20:10',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      title: 'The History of Literature',
      channel: 'History Hub',
      thumbnail:
        'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=500',
      duration: '25:00',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      title: 'Self-Help Books That Actually Work',
      channel: 'Improve Daily',
      thumbnail:
        'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
      duration: '14:20',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      title: 'Mystery Genre Masterclass',
      channel: 'Author Insights',
      thumbnail:
        'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=500',
      duration: '18:40',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      title: 'Why We Read Fiction',
      channel: 'Story Soul',
      thumbnail:
        'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?q=80&w=500',
      duration: '11:15',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      title: 'Modern Poetry Appreciation',
      channel: 'Poets Corner',
      thumbnail:
        'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=500',
      duration: '07:45',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      title: 'Creating Your Reading Nook',
      channel: 'Cozy Living',
      thumbnail:
        'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=500',
      duration: '13:00',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      title: 'Classic Novels You Must Read',
      channel: 'Literary Gems',
      thumbnail:
        'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=500',
      duration: '16:25',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      title: 'How to Read Difficult Books',
      channel: 'Intellect Path',
      thumbnail:
        'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=500',
      duration: '19:50',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
    {
      title: 'Understanding Narrative Structure',
      channel: 'Storycraft',
      thumbnail:
        'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=500',
      duration: '22:10',
      link: 'https://www.youtube.com/embed/P6FORpg0KVo',
    },
  ];

  // ২. স্টেট ম্যানেজমেন্ট (৮টি ভিডিও ডিফল্ট থাকবে)
  const [showAll, setShowAll] = useState(false);
  const visibleVideos = showAll ? allVideos : allVideos.slice(0, 8);

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
            key={video.link} // id নেই তাই link ব্যবহার করা হয়েছে
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
          <div className="space-y-4 text-center">
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
    </div>
  );
};

export default Tutorials;
