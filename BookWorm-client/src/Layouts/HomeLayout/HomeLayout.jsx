import { Outlet } from 'react-router'; // react-router থেকে Outlet নিন
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Loading from '../../Components/Loading/Loading';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Toast CSS অবশ্যই ইমপোর্ট করবেন

const HomeLayout = () => {
  // এখানে আপনার AuthContext থেকে loading স্টেটটি আসবে (পরে আপডেট করবেন)
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDFCF0]">
        {' '}
        {/* Cozy Light Background */}
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loading />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    // bg-[#FDFCF0] বা bg-stone-50 দিলে একটি লাইব্রেরি বা বইয়ের পাতার ফিল আসবে
    <div className="flex flex-col min-h-screen transition-all duration-500 bg-[#FDFCF0] font-serif">
      {/* Sticky Header: যাতে স্ক্রল করলে মেনু দেখা যায় */}
      <header className="sticky top-0 z-50 shadow-sm">
        <Navbar />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#3E2723] text-white">
        {' '}
        {/* Dark Brown Footer for Contrast */}
        <Footer />
      </footer>

      {/* Toast Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  );
};

export default HomeLayout;
