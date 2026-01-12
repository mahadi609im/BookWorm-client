import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router';
import {
  HiEnvelope,
  HiLockClosed,
  HiArrowRight,
  HiUserCircle,
  HiEye,
} from 'react-icons/hi2';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { AuthContext } from '../../context/AuthContext';
import Loading from '../../Components/Loading/Loading';
import { BsEyeSlash } from 'react-icons/bs';

const Login = () => {
  const { loginUser, signInWithGoogle, loading, setLoading } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Demo Login functionality for Instructors
  const handleDemoLogin = () => {
    setValue('email', 'admin@bookworm.com');
    setValue('password', '123456');
    toast.info('Demo credentials applied!', {
      position: 'bottom-center',
      autoClose: 2000,
    });
  };

  const onSubmit = async data => {
    setLoading(true);
    try {
      const result = await loginUser(data.email, data.password);
      const user = result.user;

      toast.success('Welcome Back!');

      // Requirement: Role-based redirection logic
      // backend-এ রোল সেট করা হলে এখানে সেটি চেক করবেন
      if (user.email === 'admin@bookworm.com') {
        navigate('/admin/dashboard', { replace: true });
      } else {
        const from = location.state?.from?.pathname || '/my-library';
        navigate(from, { replace: true });
      }
    } catch (err) {
      toast.error(err.message || 'Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success('Google Login Successful!');
      navigate('/my-library', { replace: true });
    } catch (err) {
      toast.error('Google Sign-In failed.');
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 p-6 transition-all duration-500 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full space-y-8 bg-base-200/60 backdrop-blur-xl p-8 rounded-[2.5rem] border border-base-300 shadow-2xl relative z-10 group"
      >
        <div className="text-center relative z-10">
          <h2 className="text-4xl font-serif font-black italic tracking-tight text-base-content">
            Welcome{' '}
            <span className="text-primary/50 text-shadow-sm">BookWorm</span>
          </h2>
          <p className="mt-2 text-sm text-base-content/60 font-medium italic">
            "Continue your reading journey where you left off"
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-base-content/50 ml-2 tracking-widest">
              Email Address
            </label>
            <div className="relative group/input">
              <HiEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 z-20 text-xl transition-all group-focus-within/input:text-primary" />
              <input
                type="email"
                {...register('email', { required: 'Email is required' })}
                className="input w-full pl-12 h-14 bg-base-100 border border-base-300 rounded-2xl focus:ring-4 ring-primary/10 focus:border-primary font-semibold text-sm transition-all shadow-sm"
                placeholder="hero@programming-hero.com"
              />
            </div>
            {errors.email && (
              <p className="text-error text-[10px] ml-2 font-bold uppercase">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-base-content/50 ml-2 tracking-widest">
              Password
            </label>
            <div className="relative group/input">
              <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/50 z-20 text-xl transition-all group-focus-within/input:text-primary" />
              <input
                type={showPassword ? 'text' : 'password'}
                {...register('password', { required: 'Password is required' })}
                className="input w-full pl-12 pr-12 h-14 bg-base-100 border border-base-300 rounded-2xl focus:ring-4 ring-primary/10 focus:border-primary font-semibold text-sm transition-all shadow-sm"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 text-primary/40 hover:text-primary transition-all"
              >
                {showPassword ? <BsEyeSlash size={20} /> : <HiEye size={20} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-error text-[10px] ml-2 font-bold uppercase">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full h-14 rounded-2xl border-none shadow-lg shadow-primary/20 hover:shadow-primary/40 group relative overflow-hidden transition-all active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 font-black uppercase tracking-widest text-xs text-white">
              {loading ? 'Processing...' : 'Log In'}{' '}
              <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </form>

        <div className="relative">
          <div className="divider text-[10px] uppercase font-black text-base-content/30 tracking-widest">
            Quick Access
          </div>

          <div className="grid grid-cols-1 gap-3">
            {/* Demo Login Button */}
            <button
              onClick={handleDemoLogin}
              type="button"
              className="btn btn-ghost border-base-300 hover:border-primary/30 w-full h-14 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] group hover:bg-primary/5"
            >
              <HiUserCircle
                size={24}
                className="text-primary group-hover:scale-110 transition-transform"
              />
              <span className="font-bold text-xs text-base-content/70 uppercase tracking-widest">
                Auto-fill Demo
              </span>
            </button>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="btn btn-outline border-base-300 hover:bg-base-300 w-full h-14 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98]"
            >
              <FcGoogle size={24} />
              <span className="font-bold text-xs text-base-content/70 uppercase tracking-widest">
                Continue with Google
              </span>
            </button>
          </div>
        </div>

        <p className="text-center text-[11px] font-bold text-base-content/50">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-primary hover:text-primary-focus transition-colors ml-1 underline decoration-primary/20 underline-offset-4"
          >
            Join the community
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;
