import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "../../app/providers/LenisProvider";

const useScrollToTop = () => {
  const { pathname } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, {
        immediate: true,
      });
    }
  }, [pathname, lenis]);
};

export default useScrollToTop;
