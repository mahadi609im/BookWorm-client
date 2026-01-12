import { Outlet } from 'react-router'; // react-router থেকে Outlet নিন
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import Loading from '../../Components/Loading/Loading';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Toast CSS অবশ্যই ইমপোর্ট করবেন

const HomeLayout = () => {
  const isLoading = false;

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-[#FDFCF0]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loading />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen transition-all duration-500 ">
      <header className="sticky top-0 z-50 shadow-sm mb-20">
        <Navbar />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#3E2723] text-white">
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
