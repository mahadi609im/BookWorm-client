import React from 'react';
import {
  FaBolt,
  FaArrowRight,
  FaQuoteLeft,
  FaStar,
  FaCheckCircle,
  FaPlusCircle,
} from 'react-icons/fa';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      user: 'Arif Ahmed',
      action: 'finished reading',
      book: 'The Alchemist',
      type: 'finish',
      time: '2h ago',
      avatar: 'https://i.pravatar.cc/150?u=1',
    },
    {
      id: 2,
      user: 'Sara Khan',
      action: 'added to Read shelf',
      book: 'Atomic Habits',
      type: 'add',
      time: '5h ago',
      avatar: 'https://i.pravatar.cc/150?u=2',
    },
    {
      id: 3,
      user: 'John Doe',
      action: 'rated 5 stars to',
      book: 'Project Hail Mary',
      type: 'rate',
      time: '1d ago',
      avatar: 'https://i.pravatar.cc/150?u=3',
    },
  ];

  const getStatusConfig = type => {
    if (type === 'finish')
      return {
        style: 'border-success/20 bg-success/5 text-success',
        label: 'Hero',
        icon: <FaCheckCircle size={10} />,
      };
    if (type === 'rate')
      return {
        style: 'border-warning/20 bg-warning/5 text-warning',
        label: 'Critic',
        icon: <FaStar size={10} />,
      };
    return {
      style: 'border-primary/20 bg-primary/5 text-primary',
      label: 'Explorer',
      icon: <FaPlusCircle size={10} />,
    };
  };

  return (
    <div className="space-y-6 transition-all duration-500 ease-in-out">
      {/* Feed Header */}
      <div className="flex items-end justify-between px-4">
        <div>
          <h2 className="text-3xl font-serif font-black text-base-content leading-none tracking-tight">
            Pulse <span className="text-primary italic">Feed</span>
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="flex h-1.5 w-1.5 rounded-full bg-primary animate-pulse"></span>
            <p className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] opacity-80">
              Live Updates
            </p>
          </div>
        </div>

        {/* Active Members Group */}
        <div className="flex -space-x-3">
          {[10, 11, 12].map(i => (
            <div
              key={i}
              className="w-9 h-9 rounded-full border-2 border-base-100 shadow-sm overflow-hidden transition-transform hover:-translate-y-1 cursor-pointer"
            >
              <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" />
            </div>
          ))}
          <div className="w-9 h-9 rounded-full border-2 border-base-100 bg-primary text-primary-content flex items-center justify-center text-[10px] font-bold shadow-md z-10 cursor-help">
            +12
          </div>
        </div>
      </div>

      {/* Activity Cards List */}
      <div className="space-y-5">
        {activities.map(act => {
          const config = getStatusConfig(act.type);
          return (
            <div
              key={act.id}
              className="group relative bg-base-100 dark:bg-base-200/50 p-6 rounded-[2.5rem] border border-base-300 shadow-sm hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
            >
              {/* Background Decorative Icon */}
              <FaQuoteLeft className="absolute -right-4 -top-4 text-primary opacity-[0.03] dark:opacity-[0.05] text-8xl rotate-12 group-hover:rotate-0 transition-transform duration-1000" />

              <div className="flex items-center gap-6 relative z-10">
                {/* Profile Image Section */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl rotate-6 group-hover:rotate-0 transition-all duration-500 overflow-hidden border-2 border-primary/20 p-1 bg-base-200 dark:bg-slate-800">
                    <img
                      src={act.avatar}
                      alt={act.user}
                      className="w-full h-full object-cover rounded-xl grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  {/* Status Badge */}
                  <div
                    className={`absolute -top-2 -left-2 p-1.5 rounded-lg shadow-lg scale-0 group-hover:scale-100 transition-all duration-300 ring-4 ring-base-100 ${config.style
                      .split(' ')[2]
                      .replace('text', 'bg')} text-white`}
                  >
                    {config.icon}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <h4 className="font-black text-sm text-base-content truncate group-hover:text-primary transition-colors cursor-pointer">
                      {act.user}
                    </h4>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase border ${config.style}`}
                    >
                      {config.label}
                    </span>
                  </div>

                  <p className="text-xs text-base-content/60 leading-relaxed italic">
                    {act.action}{' '}
                    <span className="font-bold text-base-content not-italic tracking-tight group-hover:text-primary transition-colors cursor-pointer">
                      "{act.book}"
                    </span>
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-base-200 dark:border-base-300 pt-3">
                    <span className="text-[9px] font-bold text-base-content/40 uppercase tracking-widest flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-base-content/20"></span>{' '}
                      {act.time}
                    </span>
                    <button className="flex items-center gap-1.5 text-[10px] font-black text-primary opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all duration-300 uppercase tracking-tighter">
                      Interact <FaArrowRight size={8} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      <button className="group w-full py-5 rounded-[2rem] border-2 border-dashed border-base-300 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 mt-4 relative overflow-hidden">
        <span className="relative z-10 text-xs font-black text-base-content/40 group-hover:text-primary uppercase tracking-[0.2em] flex items-center justify-center gap-3">
          Explore Community <FaBolt className="text-[10px] animate-bounce" />
        </span>
      </button>
    </div>
  );
};

export default ActivityFeed;
