import React, { useContext } from 'react';
import { FaChartBar } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../Loading/Loading';

const ReadingAnalytics = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  // ১. ব্যাকএন্ড থেকে ডাইনামিক ডাটা ফেচ করা
  const { data: statsData = {}, isLoading } = useQuery({
    queryKey: ['user-analytics', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-stats/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const rawData = statsData.genreData || [];

  const displayStats =
    rawData.length > 0
      ? rawData.slice(0, 7).map(item => ({
          label: item._id.substring(0, 1),
          fullLabel: item._id,
          value: item.value,
          height: `${
            (item.value / Math.max(...rawData.map(g => g.value))) * 100
          }%`,
        }))
      : [
          { label: 'M', height: '10%', value: 0 },
          { label: 'T', height: '10%', value: 0 },
          { label: 'W', height: '10%', value: 0 },
          { label: 'T', height: '10%', value: 0 },
          { label: 'F', height: '10%', value: 0 },
          { label: 'S', height: '10%', value: 0 },
          { label: 'S', height: '10%', value: 0 },
        ];

  if (isLoading) return <Loading></Loading>;

  return (
    <div className="bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-xl shadow-primary/5 relative overflow-hidden group">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h3 className="text-xl font-serif font-bold text-base-content">
            Analytics
          </h3>
          <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest">
            Reading Distribution
          </p>
        </div>
        <FaChartBar
          className="text-primary opacity-20 group-hover:opacity-100 transition-opacity"
          size={24}
        />
      </div>

      <div className="flex items-end justify-between h-32 gap-2 px-2">
        {displayStats.map((item, idx) => (
          <div
            key={idx}
            className="flex-1 flex flex-col items-center gap-3 group/bar"
          >
            <div className="relative w-full h-32">
              {/* Background Bar */}
              <div className="w-full bg-primary/10 rounded-t-lg absolute bottom-0 h-32"></div>

              {/* Actual Dynamic Bar */}
              <div
                className="w-full bg-primary rounded-t-lg absolute bottom-0 transition-all duration-700 delay-100 group-hover/bar:bg-secondary cursor-pointer"
                style={{ height: item.height }}
              >
                {/* Tooltip on Hover */}
                <div className="opacity-0 group-hover/bar:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-base-content text-base-100 text-[8px] font-bold py-1 px-2 rounded transition-opacity whitespace-nowrap z-10">
                  {item.fullLabel || 'No Data'}: {item.value}
                </div>
              </div>
            </div>

            {/* Day/Label */}
            <span className="text-[10px] font-bold text-base-content/30 group-hover/bar:text-primary transition-colors">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadingAnalytics;
