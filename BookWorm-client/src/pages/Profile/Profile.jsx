import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  FaEdit,
  FaUser,
  FaEnvelope,
  FaBookOpen,
  FaStar,
  FaTrophy,
} from 'react-icons/fa';
import Swal from 'sweetalert2';

const Profile = () => {
  // আপনার AuthContext এ updateUserProfile ফাংশনটি থাকতে হবে
  const { user, updateUserProfile } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async e => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;

    // Fake Async Delay (ব্যাকএন্ডের বদলে চেক করার জন্য)
    setTimeout(async () => {
      try {
        // Firebase আপডেট করার চেষ্টা করবে (যদি কানেক্টেড থাকে)
        if (updateUserProfile) {
          await updateUserProfile(name, user?.photoURL);
        }

        Swal.fire({
          icon: 'success',
          title: 'Profile Updated!',
          text: 'Changes saved successfully (Mock Up)',
          timer: 2000,
          showConfirmButton: false,
          background: 'var(--bg-base-100)',
          color: 'var(--bc)',
        });

        setIsEditing(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 1500); // ১.৫ সেকেন্ড লোডিং দেখাবে
  };

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
        {/* Updated Banner: Header style er moto kora hoyeche */}
        <div className="h-40 relative overflow-hidden bg-linear-to-br from-primary/20 via-secondary/10 to-accent/20 border-b border-base-200">
          {/* Background Shapes for extra detail */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -ml-20 -mb-20"></div>

          {/* Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>

        <div className="px-6 md:px-12 pb-10">
          <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-20">
            {/* Profile Picture */}
            <div className="relative group">
              <div className="w-44 h-44 rounded-full ring-[12px] ring-base-100 overflow-hidden shadow-2xl bg-base-300">
                <img
                  src={
                    user?.photoURL ||
                    'https://ui-avatars.com/api/?name=User&background=random'
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

            {/* User Info */}
            <div className="flex-grow text-center md:text-left mb-4">
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <h2 className="text-4xl font-black text-base-content tracking-tighter">
                  {user?.displayName || 'Reader Name'}
                </h2>
                {user?.email === 'maha609im@gmail.com' && (
                  <span className="badge badge-primary font-bold px-4 py-3">
                    ADMIN
                  </span>
                )}
              </div>
              <p className="text-lg text-base-content/60 font-medium mt-1 flex items-center justify-center md:justify-start gap-2">
                <FaEnvelope className="text-primary" />{' '}
                {user?.email || 'user@example.com'}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
            <div className="bg-base-200/50 p-6 rounded-[2rem] border border-base-300 flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <FaBookOpen size={24} />
              </div>
              <div>
                <p className="text-2xl font-black">24</p>
                <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">
                  Books Read
                </p>
              </div>
            </div>

            <div className="bg-base-200/50 p-6 rounded-[2rem] border border-base-300 flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary">
                <FaStar size={24} />
              </div>
              <div>
                <p className="text-2xl font-black">4.8</p>
                <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">
                  Avg Rating
                </p>
              </div>
            </div>

            <div className="bg-base-200/50 p-6 rounded-[2rem] border border-base-300 flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                <FaTrophy size={24} />
              </div>
              <div>
                <p className="text-2xl font-black">12</p>
                <p className="text-[10px] uppercase font-bold opacity-40 tracking-widest">
                  Challenges
                </p>
              </div>
            </div>
          </div>

          {/* Edit Form */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isEditing
                ? 'max-h-[600px] mt-12 opacity-100'
                : 'max-h-0 opacity-0'
            }`}
          >
            <div className="p-8 bg-base-200 rounded-[2.5rem] border-2 border-dashed border-base-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary rounded-xl text-white">
                  <FaEdit />
                </div>
                <h3 className="text-2xl font-black italic">Update Profile</h3>
              </div>

              <form
                onSubmit={handleUpdate}
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
                      name="name"
                      type="text"
                      className="input input-bordered w-full pl-14 h-14 rounded-2xl bg-base-100 font-bold focus:border-primary transition-all"
                      defaultValue={user?.displayName}
                      required
                    />
                  </div>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-bold text-xs uppercase opacity-50 ml-1">
                      Profile Photo
                    </span>
                  </label>
                  <input
                    name="photo"
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

export default Profile;
