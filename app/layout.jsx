import "@/assets/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import 'photoswipe/dist/photoswipe.css';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from 'react-toastify';
import { GlobalProvider } from "@/context/GlobalContext";

export const metadata = {
  title: "Property Pulse | Find the Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rental, find properties"
}

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <main>
              <Navbar />
              {children}
            </main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  )
};

export default MainLayout;
