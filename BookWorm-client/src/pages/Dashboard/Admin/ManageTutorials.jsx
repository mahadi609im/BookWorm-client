import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import {
  HiPlus,
  HiTrash,
  HiPlay,
  HiLink,
  HiBookmark,
  HiSparkles,
  HiChevronRight,
} from 'react-icons/hi2';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../Components/Loading/Loading';

const ManageTutorials = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [newVideo, setNewVideo] = useState({
    title: '',
    link: '',
    category: 'Tips',
    channel: '',
  });

  // ১. ডাটা ফেচিং
  const { data: tutorials = [], isLoading } = useQuery({
    queryKey: ['tutorials-admin'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tutorials');
      return res.data;
    },
  });

  // ২. ভিডিও অ্যাড করার মিউটেশন
  const addMutation = useMutation({
    mutationFn: async videoData => {
      const res = await axiosSecure.post('/tutorials', videoData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tutorials-admin']);
      Swal.fire('Success', 'Video published successfully!', 'success');
      setNewVideo({ title: '', link: '', category: 'Tips', channel: '' });
    },
    onError: error => {
      Swal.fire(
        'Error',
        error.response?.data?.message || 'Failed to add video',
        'error'
      );
    },
  });

  // ৩. ভিডিও ডিলিট করার মিউটেশন
  const deleteMutation = useMutation({
    mutationFn: async id => {
      const res = await axiosSecure.delete(`/tutorials/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['tutorials-admin']);
      Swal.fire('Deleted!', 'Video has been removed.', 'success');
    },
  });

  const handleAddVideo = e => {
    e.preventDefault();
    const url = newVideo.link;
    let videoId = '';

    // YouTube URL ID extraction
    if (url.includes('v=')) {
      videoId = url.split('v=')[1]?.split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0];
    } else if (url.includes('embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0];
    }

    if (!videoId) {
      return Swal.fire('Error', 'Invalid YouTube URL!', 'error');
    }

    const embedUrl = `https://www.youtube.com/embed/${videoId}`;
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    addMutation.mutate({
      title: newVideo.title,
      link: embedUrl,
      thumbnail: thumbnailUrl,
      channel: newVideo.channel || 'Tech Librarian',
      category: newVideo.category,
      duration: '09:55', // Static or can be dynamic
    });
  };

  const deleteVideo = id => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(result => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  const openVideo = link => {
    const iframe = document.getElementById('modal-iframe');
    if (iframe) {
      iframe.src = link;
      document.getElementById('video_modal').showModal();
    }
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 lg:p-10 bg-base-200/30 min-h-screen animate-in fade-in duration-700">
      {/* Video Modal */}
      <dialog
        id="video_modal"
        className="modal modal-bottom sm:modal-middle backdrop-blur-md z-[100]"
      >
        <div className="modal-box p-0 bg-black max-w-4xl overflow-hidden rounded-2xl border border-white/10 relative">
          <form method="dialog">
            <button
              onClick={() => {
                document.getElementById('modal-iframe').src = 'about:blank';
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
              src="about:blank"
              title="Video Player"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop bg-black/70">
          <button
            onClick={() => {
              document.getElementById('modal-iframe').src = 'about:blank';
            }}
          >
            close
          </button>
        </form>
      </dialog>

      {/* Header */}
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

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT SIDE: Sticky Form */}
        <div className="lg:col-span-4 lg:sticky lg:top-10 z-20">
          <div className="bg-base-100 rounded-[2rem] border border-base-200 shadow-xl overflow-hidden">
            <div className="bg-primary px-6 py-4 border-b border-base-200 flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2 text-white">
                <HiPlus className="text-white" /> Add Video
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
                  Channel Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tech Librarian"
                  className="input input-sm w-full h-11 bg-base-200/50 border-none rounded-xl focus:ring-2 ring-primary/20 font-bold text-xs"
                  value={newVideo.channel}
                  onChange={e =>
                    setNewVideo({ ...newVideo, channel: e.target.value })
                  }
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
                    placeholder="https://youtube.com/watch?v=..."
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

              <button
                type="submit"
                disabled={addMutation.isPending}
                className="btn btn-primary w-full h-12 rounded-xl border-none shadow-lg shadow-primary/20 group relative overflow-hidden mt-2"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-[10px]">
                  {addMutation.isPending ? 'Publishing...' : 'Publish Now'}
                  <HiChevronRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* RIGHT SIDE: List */}
        <div className="lg:col-span-8 space-y-6">
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
                key={video._id}
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
                    <span className="bg-white/95 backdrop-blur-sm text-primary text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
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
                      onClick={() => deleteVideo(video._id)}
                      disabled={deleteMutation.isPending}
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
