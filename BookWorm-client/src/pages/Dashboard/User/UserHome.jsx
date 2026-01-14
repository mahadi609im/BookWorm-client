import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../context/AuthContext';

import QuickStats from '../../../Components/Dashboard/QuickStats';
import ReadingChallenge from '../../../Components/Dashboard/ReadingChallenge';
import CurrentlyReadingShort from '../../../Components/Dashboard/CurrentlyReadingShort';
import Recommendations from '../../../Components/Dashboard/Recommendations';
import ReadingAnalytics from '../../../Components/Dashboard/ReadingAnalytics';
import ActivityFeed from '../../../Components/Dashboard/ActivityFeed';
import WelcomeHeader from '../../../Components/Dashboard/WelcomeHeader';
import Loading from '../../../Components/Loading/Loading';

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  // ১. ইউজার অ্যানালিটিক্স এবং গোল ডেটা
  const { data: statsData = {}, isLoading: isStatsLoading } = useQuery({
    queryKey: ['user-stats', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats/${user?.email}`);
      return res.data;
    },
  });

  // ২. লাইব্রেরি ডেটা ফেচিং
  const { data: libraryData = [], isLoading: isLibraryLoading } = useQuery({
    queryKey: ['my-library', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-library/${user?.email}`);
      return res.data;
    },
  });

  if (isStatsLoading || isLibraryLoading) {
    return <Loading></Loading>;
  }

  const currentlyReading = libraryData.filter(
    book => book.shelfType === 'reading'
  );
  const finishedBooks = libraryData.filter(book => book.shelfType === 'read');

  // রিকোয়ারমেন্ট অনুযায়ী Personalized Recommendation লজিক
  // ইউজারের পড়া বইয়ের জেনারগুলো Recommendations কম্পোনেন্টে পাঠানো হচ্ছে
  const userFavoriteGenres = [...new Set(finishedBooks.map(b => b.genre))];

  return (
    <div className="space-y-10 pb-16">
      <section>
        <WelcomeHeader user={user} />
      </section>

      <section className="conCls pt-14">
        <QuickStats
          statsData={{
            totalBooks: libraryData.length,
            currentlyReading: currentlyReading.length,
            finishedBooks: finishedBooks.length,
            streak: statsData?.streak || 0, // ব্যাকএন্ডে স্ট্রিক লজিক থাকলে সেটি দেখাবে
          }}
        />
      </section>

      <div className="conCls grid grid-cols-1 lg:grid-cols-12 gap-10 py-10">
        <div className="lg:col-span-8 space-y-12">
          <section className="relative transition-all duration-300">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-serif font-bold text-base-content tracking-tight">
                Recommended <span className="text-primary italic">Reads</span>
              </h2>
              <div className="h-[1px] flex-1 bg-gradient-to-r from-primary/30 to-transparent"></div>
            </div>
            <Recommendations
              favoriteGenres={userFavoriteGenres}
              totalRead={finishedBooks.length}
            />
          </section>

          <section className="pt-10 border-t border-base-200 dark:border-base-300/20">
            <ActivityFeed userEmail={user?.email} />
          </section>
        </div>

        <div className="lg:col-span-4 space-y-10 lg:sticky lg:top-24 self-start">
          <section className="hover:translate-y-[-4px] transition-all duration-500">
            <ReadingChallenge
              goal={statsData?.annualGoal || 0}
              completed={finishedBooks.length} // সরাসরি লাইব্রেরি থেকে ফিল্টার করা ডাটা
            />
          </section>

          <section className="relative overflow-hidden bg-base-200/30 rounded-3xl p-1">
            <CurrentlyReadingShort books={currentlyReading} />
          </section>

          <section className="hover:translate-y-[-4px] transition-all duration-500">
            <ReadingAnalytics genreChartData={statsData?.genreData || []} />
          </section>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
