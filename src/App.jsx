import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Career from "./pages/Career";
import TalkToExpert from "./pages/TalkToExpert";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import IndustriesSection from "./sections/Industries";
import Hero from "./sections/Hero";

/* ============================================================
   SCROLL TO TOP
============================================================ */

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    /*
     * Don't interfere with hash navigation.
     * Example:
     * /#services
     * /#why-us
     */
    if (location.hash) {
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname]);

  return null;
}

/* ============================================================
   APP
============================================================ */

export default function App() {
  const location = useLocation();

  /*
   * Keep this state for the preloader.
   * The custom cursor does NOT depend on it.
   */
  const [appReady, setAppReady] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* ========================================================
          PRELOADER
      ======================================================== */}

      <Preloader
        onComplete={() => {
          setAppReady(true);
        }}
      />

      {/* ========================================================
          NAVBAR
      ======================================================== */}

      <Navbar />

      {/* ========================================================
          CUSTOM CURSOR

          IMPORTANT:
          Cursor is always mounted.
          It internally decides whether it should display.
      ======================================================== */}

      <CustomCursor />

      {/* ========================================================
          SCROLL POSITION
      ======================================================== */}

      <ScrollToTop />

      {/* ========================================================
          PAGE ROUTES
      ======================================================== */}

      <main className="flex-1">
        <Routes
          location={location}
          key={location.pathname}
        >
          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />
          <Route
            path="/hero"
            element={<Hero />}
          />

          {/* INDUSTRIES */}
          <Route
            path="/industries"
            element={<IndustriesSection />}
          />

          {/* BLOG */}
          <Route
            path="/blog"
            element={<Blog />}
          />

          {/* CAREER */}
          <Route
            path="/career"
            element={<Career />}
          />

          {/* TALK TO EXPERT */}
          <Route
            path="/talk-to-expert"
            element={<TalkToExpert />}
          />

          {/* PRIVACY */}
          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy />}
          />

          {/* TERMS */}
          <Route
            path="/terms-of-service"
            element={<TermsOfService />}
          />

          {/* 404 */}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Routes>
      </main>

      {/* ========================================================
          FOOTER
      ======================================================== */}

      <Footer />
    </div>
  );
}