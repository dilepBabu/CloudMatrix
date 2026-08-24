import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { CursorProvider } from "./context/CursorContext.jsx";
import SmoothScroll from "./components/SmoothScroll.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <ThemeProvider>
        <CursorProvider>
          <SmoothScroll>
            <App />
          </SmoothScroll>
        </CursorProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
