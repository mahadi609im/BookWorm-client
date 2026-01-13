import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../Components/Loading/Loading';
import { motion } from 'framer-motion';
import {
  HiArrowRight,
  HiEnvelope,
  HiLockClosed,
  HiPhoto,
  HiUser,
  HiEye,
} from 'react-icons/hi2';
import { FaEyeSlash } from 'react-icons/fa';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const Register = () => {
  const axiosSecure = useAxiosSecure();
  const {
    registerUser,
    updateUserProfile,
    signInWithGoogle,
    loading,
    setLoading,
  } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegister = async data => {
    setLoading(true);
    try {
      // ১. Firebase Auth
      await registerUser(data.email, data.password);
      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photo,
      });

      // আপনার ডাটাবেস স্ট্রাকচার অনুযায়ী অবজেক্ট
      const newUser = {
        name: data.name,
        email: data.email,
        image: data.photo, // আপনার DB তে ফিল্ডের নাম 'image'
        role: 'user',
        status: 'active',
        joined: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }), // '20 Dec 2025' ফরম্যাট
        readingChallenge: {
          annualGoal: 0,
          booksReadThisYear: 0,
        },
        genreBreakdown: [],
        recentActivity: [],
      };

      const res = await axiosSecure.post('/users', newUser);

      if (res.data.insertedId || res.status === 200) {
        toast.success('Welcome to BookWorm!');
        navigate('/');
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // গুগল সাইন-ইন (বক্সের ভেতরেই ডাটাবেস অপারেশন)
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const result = await signInWithGoogle();
      const user = result.user;

      const googleUser = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL, // DB ফিল্ড 'image'
        role: 'user',
        status: 'active',
        joined: new Date().toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
        }),
        readingChallenge: {
          annualGoal: 0,
          booksReadThisYear: 0,
        },
        genreBreakdown: [],
        recentActivity: [],
      };

      // এখানে fetch এর বদলে axiosSecure ব্যবহার করুন consistency এর জন্য
      const res = await axiosSecure.post('/users', googleUser);

      if (res.data.insertedId || res.status === 200) {
        toast.success('Joined successfully via Google!');
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      toast.error('Google Sign-In failed.');
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-4 transition-colors duration-500 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full space-y-8 bg-base-200/60 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] border border-base-300 shadow-2xl relative z-10 group transition-all"
      >
        {/* Title Section */}
        <div className="text-center relative z-10">
          <h2 className="text-4xl font-serif font-bold italic tracking-tight text-base-content">
            Join <span className="text-primary/50">BookWorm</span>
          </h2>
          <p className="mt-2 text-sm text-base-content/60 font-medium italic">
            "Start your own library with just a few clicks"
          </p>
        </div>

        <form
          onSubmit={handleSubmit(handleRegister)}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-5 relative z-10"
        >
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase font-bold text-base-content/40 ml-1 tracking-widest">
              Full Name
            </label>
            <div className="relative group/input">
              <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 z-20 text-lg group-focus-within/input:text-primary transition-colors" />
              <input
                {...register('name', { required: 'Name is required' })}
                type="text"
                placeholder="John Doe"
                className="input w-full pl-12 h-12 bg-base-100/50 border border-base-300 rounded-2xl focus:ring-2 ring-primary/20 font-bold text-xs text-base-content"
              />
            </div>
            {errors.name && (
              <p className="text-error text-[9px] font-bold ml-1 uppercase">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="text-[9px] uppercase font-bold text-base-content/40 ml-1 tracking-widest">
              Email Address
            </label>
            <div className="relative group/input">
              <HiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 z-20 text-lg group-focus-within/input:text-primary transition-colors" />
              <input
                {...register('email', { required: 'Email is required' })}
                type="email"
                placeholder="example@mail.com"
                className="input w-full pl-12 h-12 bg-base-100/50 border border-base-300 rounded-2xl focus:ring-2 ring-primary/20 font-bold text-xs text-base-content"
              />
            </div>
            {errors.email && (
              <p className="text-error text-[9px] font-bold ml-1 uppercase">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Photo URL */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[9px] uppercase font-bold text-base-content/40 ml-1 tracking-widest">
              Profile Photo URL
            </label>
            <div className="relative group/input">
              <HiPhoto className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 z-20 text-lg group-focus-within/input:text-primary transition-colors" />
              <input
                {...register('photo', { required: 'Photo URL is required' })}
                type="url"
                placeholder="https://image-link.com/photo.jpg"
                className="input w-full pl-12 h-12 bg-base-100/50 border border-base-300 rounded-2xl focus:ring-2 ring-primary/20 font-bold text-xs text-base-content"
              />
            </div>
            {errors.photo && (
              <p className="text-error text-[9px] font-bold ml-1 uppercase">
                {errors.photo.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-1.5 md:col-span-2">
            <label className="text-[9px] uppercase font-bold text-base-content/40 ml-1 tracking-widest">
              Password
            </label>
            <div className="relative group/input">
              <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 z-20 text-lg group-focus-within/input:text-primary transition-colors" />
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Minimum 6 characters' },
                })}
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="input w-full pl-12 pr-12 h-12 bg-base-100/50 border border-base-300 rounded-2xl focus:ring-2 ring-primary/20 font-bold text-xs text-base-content"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-primary/40 hover:text-primary transition-all"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <HiEye size={18} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-error text-[9px] font-bold ml-1 uppercase">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 btn btn-primary w-full h-14 rounded-2xl border-none shadow-lg shadow-primary/30 group relative overflow-hidden active:scale-95 transition-all"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs text-white">
              {loading ? 'Creating Account...' : 'Create Account'}
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </form>

        <div className="relative z-10">
          <div className="divider text-[9px] uppercase font-bold text-base-content/20 tracking-widest">
            Quick Join
          </div>
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="btn btn-ghost w-full h-12 rounded-2xl border border-base-300 bg-base-100/50 hover:bg-base-100 flex items-center justify-center gap-3 transition-all active:scale-95"
          >
            <FcGoogle size={20} />
            <span className="font-bold text-xs text-base-content/70 uppercase tracking-widest">
              Sign up with Google
            </span>
          </button>
        </div>

        <p className="text-center text-[11px] font-bold text-base-content/50 relative z-10">
          Already a BookWorm?{' '}
          <Link
            to="/login"
            className="text-primary hover:text-primary-focus font-bold ml-1 underline underline-offset-4 decoration-primary/20"
          >
            Login here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
