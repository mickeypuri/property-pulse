import "@/assets/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "Property Pulse | Find the Perfect Rental",
  description: "Find your dream rental property",
  keywords: "rental, find rental, find properties"
}

const MainLayout = ({ children }) => {
  return (
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
  )
};

export default MainLayout;
