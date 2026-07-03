import { useLocation } from "react-router-dom";

export const useIsActive = () => {
  const location = useLocation();

  return (href) =>
    href === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(href);
};
