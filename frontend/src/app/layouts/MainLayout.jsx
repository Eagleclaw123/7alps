import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Footer from "../../shared/components/footer/Footer";
import useScrollToTop from "../../shared/hooks/useScrollToTop";
import Header from "../../shared/components/navigation/header/Header";

const MainLayout = () => {
  useScrollToTop();

  const location = useLocation();

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <AnimatePresence mode="wait">
          <Outlet key={location.pathname} />
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
