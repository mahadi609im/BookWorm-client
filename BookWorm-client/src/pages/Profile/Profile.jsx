import { useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../../context/AuthContext';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import {
  FaEdit,
  FaUser,
  FaEnvelope,
  FaBookOpen,
  FaStar,
  FaTrophy,
} from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();

  // ১. TanStack Query দিয়ে ডাটাবেজ থেকে ডাটা আনা
  const {
    data: dbUser = {},
    refetch,
    isLoading: isQueryLoading,
  } = useQuery({
    queryKey: ['dbUser', user?.email],
    queryFn: async () => {
      if (!user?.email) return {};
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ২. React Hook Form সেটাপ
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ডাটাবেজ থেকে ডাটা আসলে ফর্মের ডিফল্ট ভ্যালু আপডেট করা
  useEffect(() => {
    if (dbUser?.displayName) {
      reset({
        name: dbUser.displayName,
      });
    }
  }, [dbUser, reset]);

  const onUpdateProfile = async data => {
    setLoading(true);
    const imageFile = document.getElementById('photoInput').files[0];

    // বর্তমান ডাটাবেজের ছবিকেই ডিফল্ট হিসেবে রাখা
    let newPhotoURL = dbUser?.photoURL;

    try {
      // ১. ImgBB-তে ছবি আপলোড (যদি নতুন ফাইল থাকে)
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          formData
        );
        if (res.data.success) {
          newPhotoURL = res.data.data.display_url;
        }
      }

      // ২. Firebase Profile Update (সিঙ্ক্রোনাইজেশন ঠিক রাখার জন্য)
      await updateUserProfile(data.name, newPhotoURL);

      // ৩. MongoDB Update (আপনার নতুন ডাটা স্ট্রাকচার অনুযায়ী)
      const updateData = {
        displayName: data.name,
        photoURL: newPhotoURL,
      };

      const response = await axiosSecure.patch(
        `/users/update/${user?.email}`,
        updateData
      );

      if (response.data.modifiedCount > 0 || response.data.matchedCount > 0) {
        setIsEditing(false);

        // ৪. ডাটাবেজ থেকে ফ্রেশ ডাটা রি-ফেচ করা
        await refetch();

        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Your profile has been updated successfully.',
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error('Update failed:', error);
      Swal.fire('Error', 'Update failed! Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (isQueryLoading) return <Loading></Loading>;

  return (
    <div className="max-w-4xl mx-auto py-6">
      <div className="mb-10">
        <h1 className="text-3xl font-serif font-bold text-base-content">
          My <span className="text-primary italic">Profile</span>
        </h1>
        <p className="text-base-content/60 font-medium italic">
          Manage your personal library identity
        </p>
      </div>

      <div className="bg-base-100 rounded-[2.5rem] shadow-2xl border border-base-300 overflow-hidden transition-all duration-300">
        {/* Banner Section */}
        <div className="h-40 relative overflow-hidden bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/20 border-b border-base-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
        </div>

        <div className="px-6 md:px-12 pb-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-20">
            <div className="relative group">
              <div className="w-44 h-44 rounded-full ring-[12px] ring-base-100 overflow-hidden shadow-2xl bg-base-300">
                <img
                  src={
                    dbUser?.photoURL || 'https://ui-avatars.com/api/?name=User'
                  }
                  alt="Profile"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="absolute bottom-3 right-3 btn btn-circle btn-primary border-4 border-base-100 shadow-xl hover:scale-110 transition-transform"
              >
                <FaEdit size={18} />
              </button>
            </div>

            <div className="flex-grow text-center md:text-left mb-4">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h2 className="text-4xl font-black text-base-content tracking-tighter">
                  {dbUser?.displayName || 'Reader'}
                </h2>
                {dbUser?.role === 'admin' && (
                  <span className="badge badge-primary font-bold px-4 py-3">
                    ADMIN
                  </span>
                )}
              </div>
              <p className="text-lg text-base-content/60 font-medium mt-1 flex items-center justify-center md:justify-start gap-2">
                <FaEnvelope className="text-primary" />{' '}
                {dbUser?.email || user?.email}
              </p>
            </div>
          </div>

          {/* Stats Section - Mapping from readingChallenge object */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <StatCard
              icon={<FaBookOpen />}
              val={dbUser?.readingChallenge?.booksReadThisYear || 0}
              label="Books Read"
              color="primary"
            />
            <StatCard
              icon={<FaStar />}
              val={dbUser?.readingChallenge?.annualGoal || 0}
              label="Annual Goal"
              color="secondary"
            />
            <StatCard
              icon={<FaTrophy />}
              val={dbUser?.readingChallenge?.readingStreak || 0}
              label="Streak (Days)"
              color="accent"
            />
          </div>

          {/* Form Section */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isEditing
                ? 'max-h-[600px] mt-12 opacity-100'
                : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-8 bg-base-200 rounded-[2.5rem] border-2 border-dashed border-base-300">
              <form
                onSubmit={handleSubmit(onUpdateProfile)}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold text-xs uppercase opacity-50 ml-1">
                      Display Name
                    </span>
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 opacity-30 z-20" />
                    <input
                      {...register('name', { required: 'Name is required' })}
                      type="text"
                      className="input input-bordered w-full pl-14 h-14 rounded-2xl bg-base-100 font-bold focus:border-primary"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-error text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold text-xs uppercase opacity-50 ml-1">
                      Profile Photo
                    </span>
                  </label>
                  <input
                    id="photoInput"
                    type="file"
                    className="file-input file-input-bordered file-input-primary w-full h-14 rounded-2xl bg-base-100"
                  />
                </div>

                <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="btn btn-ghost rounded-2xl px-8 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-primary rounded-2xl px-12 font-black shadow-lg shadow-primary/30"
                  >
                    {loading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, val, label, color }) => (
  <div className="bg-base-200/50 p-6 rounded-[2rem] border border-base-300 flex items-center gap-5">
    <div
      className={`w-12 h-12 rounded-2xl bg-${color}/10 flex items-center justify-center text-${color}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-2xl font-black">{val}</p>
      <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">
        {label}
      </p>
    </div>
  </div>
);

export default Profile;
