import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import "./index.css";
import App from "./App";
import { NavigationProvider } from "./app/providers/NavigationProvider";
import { LenisProvider } from "./app/providers/LenisProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <NavigationProvider>
          <LenisProvider>
            <App />
          </LenisProvider>
        </NavigationProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
