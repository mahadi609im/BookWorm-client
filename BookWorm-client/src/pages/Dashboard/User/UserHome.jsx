import React from 'react';
import QuickStats from '../../../Components/Dashboard/QuickStats';
import ReadingChallenge from '../../../Components/Dashboard/ReadingChallenge';
import CurrentlyReadingShort from '../../../Components/Dashboard/CurrentlyReadingShort';
import Recommendations from '../../../Components/Dashboard/Recommendations';
import ReadingAnalytics from '../../../Components/Dashboard/ReadingAnalytics';
import ActivityFeed from '../../../Components/Dashboard/ActivityFeed';
import WelcomeHeader from '../../../Components/Dashboard/WelcomeHeader';

const UserHome = () => {
  return (
    <div className="space-y-10 pb-16">
      {/* ১. Welcome & Identity: User-কে গ্রিট করা */}
      <section>
        <WelcomeHeader />
      </section>

      {/* ২. Quick Stats: এক নজরে রিডিং ডেটা */}
      <section className="conCls">
        <QuickStats />
      </section>

      <div className="conCls grid grid-cols-1 lg:grid-cols-12 gap-10 py-10">
        {/* --- বাম দিকের বড় অংশ: Recommendations & Activity (8 Columns) --- */}
        <div className="lg:col-span-8 space-y-12">
          {/* ৩. Personalized Recommendations */}
          <section className="relative transition-all duration-300">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-serif font-black text-base-content tracking-tight">
                Recommended <span className="text-primary italic">Reads</span>
              </h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/30 to-transparent"></div>
            </div>
            <Recommendations />
          </section>

          {/* ৪. Activity Feed */}
          <section className="pt-10 border-t border-base-300 dark:border-base-300/30">
            <ActivityFeed />
          </section>
        </div>

        {/* --- ডান দিকের ছোট অংশ: Challenge, Progress & Analytics (4 Columns) --- */}
        {/* Sticky Top ব্যবহার করা হয়েছে যেন বাম পাশের লম্বা ফিড স্ক্রোল করলেও এগুলো স্ক্রিনে থাকে */}
        <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-24 self-start">
          {/* ৫. Reading Challenge */}
          <section className="hover:translate-y-[-4px] transition-transform duration-500">
            <ReadingChallenge />
          </section>

          {/* ৬. Currently Reading */}
          <section className="relative overflow-hidden">
            <CurrentlyReadingShort />
          </section>

          {/* ৭. Reading Analytics */}
          <section className="hover:translate-y-[-4px] transition-transform duration-500">
            <ReadingAnalytics />
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
