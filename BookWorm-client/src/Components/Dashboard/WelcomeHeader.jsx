import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

import { Link } from 'react-router';
import { FaArrowRight } from 'react-icons/fa';
import { FaSprayCanSparkles } from 'react-icons/fa6';

const WelcomeHeader = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="relative bg-base-100 py-12 lg:py-24 overflow-hidden border-b border-base-200 transition-colors duration-300">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 rounded-l-full -z-0 hidden lg:block animate-pulse"></div>
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>

      <div className="relative conCls z-10 flex flex-col-reverse lg:flex-row gap-12 items-center justify-between px-4">
        {/* Left Side: Text Content */}
        <div className="w-full lg:w-3/5 text-center lg:text-left space-y-8">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.2em] shadow-sm border border-primary/10">
            <FaSprayCanSparkles className="animate-spin-slow" />
            <span>Search Books Easily</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif font-black text-base-content leading-[1.1] tracking-tight">
            Find Your Next <br />
            <span className="text-primary italic">Great Adventure</span>
          </h1>

          <p className="text-base-content/70 text-base md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
            Welcome back,{' '}
            <span className="font-black text-primary border-b-2 border-primary/20 pb-0.5">
              {user?.displayName?.split(' ')[0] || 'Reader'}
            </span>
            ! Search books using ISBN or Author names and manage your personal
            library with ease.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4">
            <Link
              to="/browse-books"
              className="btn btn-primary btn-lg px-10 rounded-2xl text-white shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 active:scale-95 transition-all border-none font-black text-sm uppercase tracking-widest"
            >
              Explore Now{' '}
              <FaArrowRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>

            <Link
              to="/my-library"
              className="btn btn-ghost btn-lg border-2 border-base-300 hover:border-primary px-10 rounded-2xl transition-all font-black text-sm uppercase tracking-widest"
            >
              My Library
            </Link>
          </div>
        </div>

        {/* Right Side: Image with Responsive Handling */}
        <div className="w-full lg:w-2/5 flex justify-center items-center relative">
          {/* Subtle Glow behind image */}
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-[100px] opacity-30 animate-pulse"></div>

          <div className="relative w-full max-w-[320px] md:max-w-[450px] lg:max-w-full">
            <img
              src="https://i.ibb.co.com/N6SXy8q0/Thesis-pana.png"
              alt="Reading Illustration"
              className="w-full h-auto drop-shadow-[0_20px_50px_rgba(89,86,233,0.3)] animate-float"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;
