import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { pageOrder } from "../../shared/constants/pageOrder";

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
  const location = useLocation();

  const previousIndex = useRef(pageOrder[location.pathname] ?? 0);

  const [direction, setDirection] = useState("forward");

  useEffect(() => {
    const currentIndex = pageOrder[location.pathname] ?? 0;

    if (currentIndex > previousIndex.current) {
      setDirection("forward");
    } else if (currentIndex < previousIndex.current) {
      setDirection("backward");
    }

    previousIndex.current = currentIndex;
  }, [location.pathname]);

  return (
    <NavigationContext.Provider value={{ direction }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationDirection = () => useContext(NavigationContext);
