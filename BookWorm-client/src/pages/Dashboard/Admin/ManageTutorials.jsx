import React, { useState } from 'react';
import {
  HiPlus,
  HiTrash,
  HiPlay,
  HiVideoCamera,
  HiLink,
  HiBookmark,
  HiSparkles,
  HiChevronRight,
} from 'react-icons/hi2';

const ManageTutorials = () => {
  // ... (State and Functions remain the same)
  const [tutorials, setTutorials] = useState([
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
  ]);

  const [newVideo, setNewVideo] = useState({
    title: '',
    link: '',
    category: 'Tips',
  });

  const handleAddVideo = e => {
    e.preventDefault();
    if (newVideo.title && newVideo.link) {
      setTutorials([
        {
          ...newVideo,
          id: Date.now(),
          thumbnail:
            'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=500',
          channel: 'Admin',
        },
        ...tutorials,
      ]);
      setNewVideo({ title: '', link: '', category: 'Tips' });
    }
  };

  const deleteVideo = id => setTutorials(tutorials.filter(t => t.id !== id));

  const openVideo = link => {
    const iframe = document.getElementById('modal-iframe');
    const embedUrl = link.includes('watch?v=')
      ? link.replace('watch?v=', 'embed/')
      : link;
    iframe.src = embedUrl;
    document.getElementById('video_modal').showModal();
  };

  return (
    <div className="p-4 lg:p-10 bg-base-200/30 min-h-screen animate-in fade-in duration-700">
      {/* --- Video Modal --- */}
      <dialog
        id="video_modal"
        className="modal modal-bottom sm:modal-middle backdrop-blur-md z-[100]"
      >
        <div className="modal-box p-0 bg-black max-w-4xl overflow-hidden rounded-2xl border border-white/10 relative">
          <form method="dialog">
            <button
              onClick={() => {
                document.getElementById('modal-iframe').src = '';
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4 z-[110] text-white bg-black/40 hover:bg-white/20"
            >
              ✕
            </button>
          </form>
          <div className="aspect-video w-full">
            <iframe
              id="modal-iframe"
              className="w-full h-full"
              src=""
              title="Video Player"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop bg-black/70">
          <button
            onClick={() => {
              document.getElementById('modal-iframe').src = '';
            }}
          >
            close
          </button>
        </form>
      </dialog>

      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-10 border-b border-base-300 pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-[0.2em] text-[10px]">
            <span className="w-8 h-[1px] bg-primary"></span> Admin Panel
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold italic tracking-tight">
            Video <span className="text-primary opacity-40">Manager</span>
          </h1>
        </div>
      </div>

      {/* --- Main Content Grid --- */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* --- LEFT SIDE: Sticky Form (lg: স্ক্রিন থেকে স্টিকি হবে) --- */}
        <div className="lg:col-span-4 lg:sticky lg:top-10 z-20 order-1 lg:order-1">
          <div className="bg-base-100 rounded-[2rem] border border-base-200 shadow-xl overflow-hidden">
            <div className="bg-primary px-6 py-4 border-b border-base-200 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-white  ">
                <HiPlus className="text-white " /> Add Video
              </h3>
              <HiSparkles className="text-white animate-pulse" />
            </div>

            <form onSubmit={handleAddVideo} className="p-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-base-content/40 ml-1">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="Enter video title..."
                  className="input input-sm w-full h-11 bg-base-200/50 border-none rounded-xl focus:ring-2 ring-primary/20 font-bold text-xs"
                  value={newVideo.title}
                  onChange={e =>
                    setNewVideo({ ...newVideo, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-base-content/40 ml-1">
                  YouTube URL
                </label>
                <div className="relative">
                  <HiLink className="absolute left-3 top-1/2 -translate-y-1/2 text-primary opacity-40" />
                  <input
                    type="url"
                    placeholder="https://youtube.com/..."
                    className="input input-sm w-full h-11 pl-10 bg-base-200/50 border-none rounded-xl focus:ring-2 ring-primary/20 font-bold text-xs"
                    value={newVideo.link}
                    onChange={e =>
                      setNewVideo({ ...newVideo, link: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase font-bold text-base-content/40 ml-1">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Review', 'Tips', 'Guide', 'Vlog'].map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() =>
                        setNewVideo({ ...newVideo, category: cat })
                      }
                      className={`py-2 rounded-lg text-[9px] font-bold uppercase transition-all border ${
                        newVideo.category === cat
                          ? 'bg-primary text-white border-primary shadow-md'
                          : 'bg-base-200/30 text-base-content/30 border-transparent hover:border-primary/20'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <button className="btn btn-primary w-full h-12 rounded-xl border-none shadow-lg shadow-primary/20 group relative overflow-hidden mt-2">
                <span className="relative z-10 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[10px]">
                  Publish Now{' '}
                  <HiChevronRight className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              </button>
            </form>
          </div>

          {/* Pro Tip Card */}
          <div className="mt-4 p-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-start gap-3 hidden lg:flex">
            <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-primary flex-shrink-0 shadow-sm">
              <HiVideoCamera size={16} />
            </div>
            <p className="text-[10px] text-base-content/60 leading-tight">
              <span className="block font-bold text-primary uppercase">
                Pro Tip
              </span>{' '}
              Use high-quality thumbnails for better user engagement.
            </p>
          </div>
        </div>

        {/* --- RIGHT SIDE: Scrollable List (lg:col-span-8) --- */}
        <div className="lg:col-span-8 space-y-6 order-2 lg:order-2">
          <div className="flex items-center gap-4 px-2">
            <h3 className="font-serif text-2xl font-bold italic">
              Active Showcase
            </h3>
            <div className="h-[2px] flex-1 bg-gradient-to-r from-base-300 to-transparent"></div>
            <div className="text-[10px] font-bold opacity-30 uppercase tracking-[0.2em]">
              {tutorials.length} Items
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tutorials.map(video => (
              <div
                key={video.id}
                className="group bg-base-100 rounded-[2rem] border border-base-200 overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 relative"
              >
                <div
                  className="relative aspect-video overflow-hidden cursor-pointer"
                  onClick={() => openVideo(video.link)}
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white text-primary flex items-center justify-center shadow-2xl scale-50 group-hover:scale-100 transition-all duration-500">
                      <HiPlay size={28} />
                    </div>
                  </div>
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/95 backdrop-blur-sm text-primary text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
                      {video.category || 'Tutorial'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="font-bold text-lg leading-tight mb-4 group-hover:text-primary transition-colors line-clamp-1 italic">
                    {video.title}
                  </h4>
                  <div className="flex items-center justify-between pt-4 border-t border-dashed border-base-200">
                    <p className="text-[10px] font-bold text-base-content/40 flex items-center gap-2">
                      <HiBookmark className="text-primary" />{' '}
                      {video.channel || 'Internal'}
                    </p>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        deleteVideo(video.id);
                      }}
                      className="w-8 h-8 rounded-xl bg-error/10 text-error flex items-center justify-center hover:bg-error hover:text-white transition-all"
                    >
                      <HiTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageTutorials;
