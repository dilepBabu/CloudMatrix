import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import SmoothScroll from "./components/SmoothScroll";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import ScrollProgress from "./components/ScrollProgress";
import CustomCursor from "./components/CustomCursor";
import RouteTransition from "./components/RouteTransition";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Career from "./pages/Career";
import TalkToExpert from "./pages/TalkToExpert";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";
import IndustriesSection from "./sections/Industries";

/* ============================================================
   SCROLL TO TOP
============================================================ */

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({
        top: 0,
        behavior:
          "instant" in window
            ? "instant"
            : "auto",
      });
    }
  }, [location.pathname]);

  return null;
}

/* ============================================================
   APP
============================================================ */

export default function App() {
  const location = useLocation();
  const [appReady, setAppReady] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Preloader onComplete={() => setAppReady(true)} />

      <SmoothScroll enabled={appReady}>
        <ScrollProgress />

        <CustomCursor />

        <RouteTransition />

        <ScrollToTop />

        <Navbar />

        <main className="flex-1">
          <AnimatePresence mode="wait">
            <Routes
              location={location}
              key={location.pathname}
            >
              <Route
                path="/"
                element={<Home />}
              />
              <Route path="/industries"
              element={<IndustriesSection/>}/>

              <Route
                path="/blog"
                element={<Blog />}
              />

              <Route
                path="/career"
                element={<Career />}
              />

              <Route
                path="/talk-to-expert"
                element={<TalkToExpert />}
              />

              <Route
                path="/privacy-policy"
                element={<PrivacyPolicy />}
              />

              <Route
                path="/terms-of-service"
                element={<TermsOfService />}
              />

              <Route
                path="*"
                element={<NotFound />}
              />
            </Routes>
          </AnimatePresence>
        </main>

        <Footer />
      </SmoothScroll>
    </div>
  );
}