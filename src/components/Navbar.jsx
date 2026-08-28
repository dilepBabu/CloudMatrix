import { useCallback, useEffect, useRef, useState, memo } from "react";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { Link, useLocation, useNavigate } from "react-router-dom";

import ThemeToggle from "./ThemeToggle";
import MagneticButton from "./MagneticButton";
import logo from "../assets/logo.png";

/* =========================================================
   NAV LINKS
========================================================= */

const navLinks = [
  {
    label: "Home",
    to: "/hero",
    hash: "#home",
  },
 {
    label: "Services",
    to: "/services",
    hash: "#services",
  },
  {
    label: "Why Us",
    to: "/whyUs",
    hash: "#why-us",
  },
  {
    label: "Blog",
    to: "/blog",
    hash: "",
  },
  {
    label: "Career",
    to: "/career",
    hash: "",
  },
];

/* =========================================================
   EASING
========================================================= */

const ease = [0.16, 1, 0.3, 1];

/* =========================================================
   DESKTOP NAV ITEM
========================================================= */

const NavItem = memo(function NavItem({
  link,
  index,
  active,
  hovered,
  setHovered,
  onClick,
  isDark,
}) {
  const itemRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, {
    stiffness: 300,
    damping: 24,
    mass: 0.35,
  });

  const y = useSpring(mouseY, {
    stiffness: 300,
    damping: 24,
    mass: 0.35,
  });

  const handleMouseMove = useCallback(
    (event) => {
      const el = itemRef.current;

      if (!el) return;

      const rect = el.getBoundingClientRect();

      const px = event.clientX - (rect.left + rect.width * 0.5);

      const py = event.clientY - (rect.top + rect.height * 0.5);

      mouseX.set(px * 0.06);
      mouseY.set(py * 0.06);
    },
    [mouseX, mouseY],
  );

  const handleMouseEnter = useCallback(() => {
    setHovered(link.label);
  }, [link.label, setHovered]);

  const handleMouseLeave = useCallback(() => {
    setHovered(null);
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY, setHovered]);

  return (
    <motion.button
      ref={itemRef}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        x,
        y,
        willChange: "transform",
      }}
      initial={{
        opacity: 0,
        y: -15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.15 + index * 0.045,
        duration: 0.65,
        ease,
      }}
      whileTap={{
        scale: 0.92,
      }}
      className="
        relative
        group
        h-9
        px-2
        flex
        min-[900px]:h-8
        min-[900px]:px-1.5
        xl:h-11
        xl:px-3.5
        items-center
        justify-center
        overflow-hidden
        transform-gpu
      "
    >
      <AnimatePresence>
        {hovered === link.label && (
          <motion.span
            layoutId="nav-hover-bg"
            initial={{
              opacity: 0,
              scale: 0.7,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0.7,
            }}
            transition={{
              type: "spring",
              stiffness: 450,
              damping: 30,
            }}
            className={`
              absolute
              inset-0
              rounded-lg
              pointer-events-none
              xl:rounded-xl
              transform-gpu
              ${isDark ? "bg-white/[0.08]" : "bg-[#0066B3]/[0.055]"}
            `}
          />
        )}
      </AnimatePresence>

      <span
        className={`
          relative
          z-10
          overflow-hidden
          leading-none
          text-[11px]
          font-semibold
          min-[900px]:text-[10px]
          xl:text-[14px]
          tracking-[-0.01em]
          ${
            isDark
              ? active
                ? "text-[#58D9FF]"
                : "text-white/90"
              : active
                ? "text-[#005A9C]"
                : "text-[#08263D]"
          }
        `}
      >
        <motion.span
          className="block"
          animate={{
            y: hovered === link.label ? -18 : 0,
          }}
          transition={{
            duration: 0.35,
            ease,
          }}
        >
          {link.label}
        </motion.span>

        <motion.span
          className={`
            absolute
            left-0
            top-[18px]
            block
            ${isDark ? "text-[#58D9FF]" : "text-[#0066B3]"}
          `}
          animate={{
            y: hovered === link.label ? -18 : 0,
          }}
          transition={{
            duration: 0.35,
            ease,
          }}
        >
          {link.label}
        </motion.span>
      </span>

      {active && (
        <motion.span
          layoutId="active-nav-line"
          initial={{
            width: 0,
          }}
          animate={{
            width: 18,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 28,
          }}
          className="
            absolute
            bottom-0
            left-1/2
            -translate-x-1/2
            h-[2px]
            rounded-full
            bg-gradient-to-r
            from-[#0066B3]
            via-[#00A9E0]
            to-[#00A878]
            shadow-[0_0_12px_rgba(0,169,224,0.9)]
            transform-gpu
          "
        />
      )}
    </motion.button>
  );
});

/* =========================================================
   SHINE CTA
========================================================= */

const ShineCTA = memo(function ShineCTA({ mobile = false }) {
  return (
    <MagneticButton
      to="/talk-to-expert"
      cursorLabel="Go"
      strength={mobile ? 0.12 : 0.25}
      className={`
        relative
        group
        overflow-hidden
        flex
        items-center
        justify-center
        ${
          mobile
            ? "w-full min-h-[52px] px-5 rounded-2xl"
            : "min-w-[128px] min-h-[36px] px-3 rounded-full xl:min-w-[175px] xl:min-h-[44px] xl:px-5"
        }
        bg-gradient-to-r
        from-[#031B2E]
        via-[#0066B3]
        to-[#00A9E0]
        text-white
        text-[11px]
        font-semibold
        xl:text-[13px]
        border
        border-[#00A9E0]/30
        shadow-[0_8px_25px_rgba(0,102,179,0.22)]
        isolate
        transform-gpu
      `}
    >
      <motion.span
        className="
          absolute
          inset-0
          rounded-[inherit]
          pointer-events-none
          bg-[#00A9E0]/10
        "
        animate={{
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.span
        className="
          absolute
          top-[-70%]
          bottom-[-70%]
          left-[-45%]
          w-[24%]
          pointer-events-none
          z-10
          rotate-[24deg]
          bg-gradient-to-r
          from-transparent
          via-white/90
          to-transparent
          blur-[1px]
          transform-gpu
        "
        animate={{
          left: ["-45%", "-15%", "20%", "5%", "45%", "30%", "75%", "145%"],
          rotate: [24, -18, 25, -20, 22, -17, 24, 20],
          opacity: [0, 0.8, 0.5, 0.9, 0.6, 0.9, 0.5, 0],
        }}
        transition={{
          duration: mobile ? 2.8 : 2.4,
          repeat: Infinity,
          repeatDelay: mobile ? 2.5 : 3,
          ease: "easeInOut",
        }}
      />

      <span className="relative z-20 whitespace-nowrap">
        Talk to Our Expert
      </span>

      <motion.span
        className="
          relative
          z-20
          ml-2
          text-[#8BEAFF]
        "
        animate={{
          x: [0, 3, 0],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        →
      </motion.span>
    </MagneticButton>
  );
});

/* =========================================================
   NAVBAR
========================================================= */

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);

  const [open, setOpen] = useState(false);

  const [activeSection, setActiveSection] = useState("home");

  const [hovered, setHovered] = useState(null);

  const [isDark, setIsDark] = useState(() => {
    if (typeof document === "undefined") {
      return false;
    }

    return document.documentElement.classList.contains("dark");
  });

  const navRef = useRef(null);

  /* =======================================================
     THEME
  ======================================================= */

  useEffect(() => {
    if (typeof document === "undefined") {
      return undefined;
    }

    const root = document.documentElement;

    const updateTheme = () => {
      setIsDark(root.classList.contains("dark"));
    };

    updateTheme();

    const observer = new MutationObserver(() => {
      updateTheme();
    });

    observer.observe(root, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =======================================================
     PAGE / ROUTE
  ======================================================= */

  const isHome = location.pathname === "/";

  /* =======================================================
     MOUSE GLOW
  ======================================================= */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glowX = useSpring(mouseX, {
    stiffness: 150,
    damping: 30,
    mass: 0.7,
  });

  const glowY = useSpring(mouseY, {
    stiffness: 150,
    damping: 30,
    mass: 0.7,
  });

  const mouseFrame = useRef(null);

  const handleMouseMove = useCallback(
    (event) => {
      if (!navRef.current) {
        return;
      }

      if (mouseFrame.current) {
        return;
      }

      mouseFrame.current = requestAnimationFrame(() => {
        const rect = navRef.current.getBoundingClientRect();

        mouseX.set(event.clientX - rect.left);

        mouseY.set(event.clientY - rect.top);

        mouseFrame.current = null;
      });
    },
    [mouseX, mouseY],
  );

  useEffect(() => {
    return () => {
      if (mouseFrame.current) {
        cancelAnimationFrame(mouseFrame.current);
      }
    };
  }, []);

  /* =======================================================
     SCROLL STATE
  ======================================================= */

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 35);

        ticking = false;
      });
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* =======================================================
     CLOSE MOBILE MENU WHEN ROUTE CHANGES
  ======================================================= */

  useEffect(() => {
    setOpen(false);
    setHovered(null);
  }, [location.pathname, location.hash]);

  /* =======================================================
     ACTIVE SECTION
  ======================================================= */

  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return undefined;
    }

    const sections = ["services", "why-us", "industries"];

    let ticking = false;

    const detectSection = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        const position = window.scrollY + 180;

        let current = "home";

        sections.forEach((id) => {
          const section = document.getElementById(id);

          if (!section) return;

          if (position >= section.offsetTop) {
            current = id;
          }
        });

        /*
         * Hash is given priority when present.
         */
        if (location.hash) {
          current = location.hash.replace("#", "");
        }

        setActiveSection(current);

        ticking = false;
      });
    };

    detectSection();

    window.addEventListener("scroll", detectSection, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", detectSection);
    };
  }, [isHome, location.hash]);

  /* =======================================================
     ACTIVE CHECK
  ======================================================= */

  const isActive = useCallback(
    (link) => {
      if (link.to === "/blog") {
        return location.pathname === "/blog";
      }

      if (link.to === "/career") {
        return location.pathname === "/career";
      }

      if (link.to === "/talk-to-expert") {
        return location.pathname === "/talk-to-expert";
      }

      if (link.to === "/privacy-policy") {
        return location.pathname === "/privacy-policy";
      }

      if (link.to === "/terms-of-service") {
        return location.pathname === "/terms-of-service";
      }

      if (link.label === "Home") {
        return location.pathname === "/" && activeSection === "home";
      }

      if (link.hash) {
        return (
          location.pathname === "/" &&
          activeSection === link.hash.replace("#", "")
        );
      }

      return false;
    },
    [location.pathname, activeSection],
  );

  /* =======================================================
     NAVIGATION

     IMPORTANT:
     - Never use window.history here
     - Never reload the page
     - React Router handles the route
  ======================================================= */

  const go = useCallback(
    (link) => {
      setOpen(false);
      setHovered(null);

      /* ----------------------------------------------------
         REAL PAGE
      ---------------------------------------------------- */

      if (!link.hash) {
        if (location.pathname !== link.to) {
          navigate(link.to);
        }

        return;
      }

      /* ----------------------------------------------------
         HOME
      ---------------------------------------------------- */

      if (link.label === "Home") {
        setActiveSection("home");

        if (location.pathname !== "/") {
          navigate("/");
          return;
        }

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });

        return;
      }

      /* ----------------------------------------------------
         HOME SECTION
      ---------------------------------------------------- */

      const targetId = link.hash.replace("#", "");

      setActiveSection(targetId);

      /*
       * Coming from another page:
       * React Router first goes home with the hash.
       */
      if (location.pathname !== "/") {
        navigate(`/${link.hash}`);

        return;
      }

      const element = document.getElementById(targetId);

      if (!element) {
        return;
      }

      const navbarOffset = 105;

      const targetPosition =
        element.getBoundingClientRect().top + window.scrollY - navbarOffset;

      navigate(`/${link.hash}`, {
        replace: false,
      });

      requestAnimationFrame(() => {
        window.scrollTo({
          top: Math.max(0, targetPosition),
          left: 0,
          behavior: "smooth",
        });
      });
    },
    [location.pathname, navigate],
  );

  /* =======================================================
     PAGE COLORS
  ======================================================= */

  const getPageColors = () => {
    if (location.pathname === "/blog") {
      return {
        bg: "rgba(255,255,255,0.72)",
        darkBg: "rgba(15,23,42,0.78)",
        scrolled: "rgba(255,255,255,0.94)",
        darkScrolled: "rgba(15,23,42,0.95)",
        border: "rgba(99,102,241,0.16)",
        shadow: "rgba(99,102,241,0.12)",
        glow: "rgba(99,102,241,0.10)",
      };
    }

    if (location.pathname === "/career") {
      return {
        bg: "rgba(255,255,255,0.72)",
        darkBg: "rgba(3,27,46,0.78)",
        scrolled: "rgba(255,255,255,0.94)",
        darkScrolled: "rgba(3,27,46,0.95)",
        border: "rgba(0,169,224,0.16)",
        shadow: "rgba(0,169,224,0.12)",
        glow: "rgba(0,169,224,0.10)",
      };
    }

    if (activeSection === "services") {
      return {
        bg: "rgba(235,248,255,0.76)",
        darkBg: "rgba(3,35,55,0.80)",
        scrolled: "rgba(235,248,255,0.94)",
        darkScrolled: "rgba(3,35,55,0.96)",
        border: "rgba(0,169,224,0.18)",
        shadow: "rgba(0,169,224,0.14)",
        glow: "rgba(0,169,224,0.12)",
      };
    }

    if (activeSection === "why-us") {
      return {
        bg: "rgba(245,240,255,0.76)",
        darkBg: "rgba(30,20,50,0.80)",
        scrolled: "rgba(245,240,255,0.94)",
        darkScrolled: "rgba(30,20,50,0.96)",
        border: "rgba(139,92,246,0.18)",
        shadow: "rgba(139,92,246,0.14)",
        glow: "rgba(139,92,246,0.12)",
      };
    }

    if (activeSection === "industries") {
      return {
        bg: "rgba(232,245,250,0.76)",
        darkBg: "rgba(4,30,42,0.82)",
        scrolled: "rgba(232,245,250,0.94)",
        darkScrolled: "rgba(4,30,42,0.96)",
        border: "rgba(0,128,160,0.18)",
        shadow: "rgba(0,128,160,0.14)",
        glow: "rgba(0,128,160,0.12)",
      };
    }

    return {
      bg: "rgba(255,255,255,0.76)",
      darkBg: "rgba(3,27,46,0.78)",
      scrolled: "rgba(255,255,255,0.94)",
      darkScrolled: "rgba(3,27,46,0.96)",
      border: "rgba(0,169,224,0.18)",
      shadow: "rgba(0,102,179,0.14)",
      glow: "rgba(0,169,224,0.10)",
    };
  };

  const pageColors = getPageColors();

  const logoTitleClass = isDark ? "text-white" : "text-[#062B49]";

  const logoSubtitleClass = isDark ? "text-white/70" : "text-[#174B6D]";

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <motion.header
      initial={{
        opacity: 0,
        y: -40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.8,
        ease,
      }}
      className="
        fixed
        top-0
        left-0
        right-0
        z-50
        pointer-events-none
      "
    >
      <motion.div
        ref={navRef}
        onMouseMove={handleMouseMove}
        animate={{
          y: scrolled ? -3 : 0,
          scale: scrolled ? 0.985 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 26,
        }}
        className={`
          pointer-events-auto
          relative
          mx-auto
          mt-4
          md:mt-5
          w-[calc(100%-20px)]
          md:w-[calc(100%-32px)]
          min-[900px]:w-[calc(100%-36px)]
          max-w-6xl
          rounded-[20px]
          border
          overflow-hidden
          transform-gpu
          backdrop-blur-xl
          transition-[background-color,border-color,box-shadow]
          duration-700
          ease-out

          ${
            scrolled || !isHome
              ? `
                bg-[var(--nav-bg-scrolled)]
                dark:bg-[var(--nav-bg-scrolled-dark)]
                border-[var(--nav-border)]
                shadow-[0_18px_55px_var(--nav-shadow)]
              `
              : `
                bg-[var(--nav-bg)]
                dark:bg-[var(--nav-bg-dark)]
                border-[var(--nav-border)]
              `
          }
        `}
        style={{
          "--nav-bg": pageColors.bg,
          "--nav-bg-dark": pageColors.darkBg,
          "--nav-bg-scrolled": pageColors.scrolled,
          "--nav-bg-scrolled-dark": pageColors.darkScrolled,
          "--nav-border": pageColors.border,
          "--nav-shadow": pageColors.shadow,
          willChange: "transform",
        }}
      >
        <motion.div
          className="
            pointer-events-none
            absolute
            h-48
            w-48
            rounded-full
            blur-3xl
            -translate-x-1/2
            -translate-y-1/2
            hidden
            md:block
            transform-gpu
          "
          style={{
            left: glowX,
            top: glowY,
            backgroundColor: pageColors.glow,
          }}
        />

        <motion.div
          className="
            absolute
            top-0
            left-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-[#00A9E0]
            to-transparent
            transform-gpu
          "
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            width: "45%",
            willChange: "transform",
          }}
        />

        <nav
          className="
            relative
            z-20
            h-[62px]
            px-3
            sm:px-4
            md:px-5
            min-[900px]:h-[60px]
            min-[900px]:px-3
            xl:h-[72px]
            xl:px-5
            flex
            items-center
            justify-between
          "
        >
          {/* LOGO */}

          <Link
            to="/"
            onClick={() => {
              setOpen(false);
              setActiveSection("home");
            }}
            className="
              flex
              items-center
              gap-2
              shrink-0
              xl:gap-3
              min-w-0
            "
          >
            <motion.div
              whileHover={{
                scale: 1.06,
                rotate: -2,
              }}
              whileTap={{
                scale: 0.94,
              }}
              className="
                relative
                h-10
                w-10
                sm:h-11
                sm:w-11
                md:h-12
                md:w-12
                min-[900px]:h-10
                min-[900px]:w-10
                xl:h-14
                xl:w-14
                2xl:h-16
                2xl:w-16
                flex
                items-center
                justify-center
                shrink-0
                transform-gpu
              "
            >
              <div
                className={`
                  absolute
                  inset-0
                  rounded-full
                  blur-xl
                  pointer-events-none
                  ${isDark ? "bg-[#00A9E0]/20" : "bg-[#00A9E0]/16"}
                `}
              />

              <motion.img
                src={logo}
                alt="Cloud Matrix Technologies"
                className="
                  relative
                  z-10
                  h-11
                  w-11
                  sm:h-12
                  sm:w-12
                  md:h-14
                  md:w-14
                  min-[900px]:h-11
                  min-[900px]:w-11
                  xl:h-16
                  xl:w-16
                  2xl:h-[76px]
                  2xl:w-[76px]
                  object-contain
                "
                animate={{
                  y: [0, -2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>

            <div className="hidden sm:block min-w-0">
              <p
                className={`
                  text-[15px]
                  sm:text-[17px]
                  md:text-[18px]
                  min-[900px]:text-[15px]
                  xl:text-[20px]
                  2xl:text-[22px]
                  font-extrabold
                  tracking-[-0.025em]
                  leading-none
                  whitespace-nowrap
                  ${logoTitleClass}
                `}
              >
                CLOUD <span className="text-[#00A9E0]">MATRIX</span>
              </p>

              <p
                className={`
                  mt-1
                  text-[7px]
                  sm:text-[8px]
                  md:text-[9px]
                  min-[900px]:text-[7px]
                  xl:text-[9px]
                  2xl:text-[10px]
                  tracking-[0.30em]
                  font-bold
                  font-mono
                  whitespace-nowrap
                  ${logoSubtitleClass}
                `}
              >
                TECHNOLOGIES
              </p>
            </div>
          </Link>

          {/* DESKTOP NAV */}

          <div
            className="
              hidden
              min-[900px]:flex
              items-center
              gap-0.5
              px-1
              py-1
              rounded-xl
              xl:gap-1
              xl:px-1.5
              xl:py-1.5
              xl:rounded-2xl
              bg-black/[0.025]
              dark:bg-white/[0.025]
              border
              border-black/[0.05]
              dark:border-white/[0.05]
            "
          >
            {navLinks.map((link, index) => (
              <NavItem
                key={link.label}
                link={link}
                index={index}
                active={isActive(link)}
                hovered={hovered}
                setHovered={setHovered}
                onClick={() => go(link)}
                isDark={isDark}
              />
            ))}
          </div>

          {/* DESKTOP CTA */}

          <div
            className="
              hidden
              min-[900px]:flex
              items-center
              gap-1.5
              xl:gap-3
            "
          >
            <ThemeToggle />
            <ShineCTA />
          </div>

          {/* MOBILE */}

          <div
            className="
              flex
              min-[900px]:hidden
              items-center
              gap-2
            "
          >
            <ThemeToggle />

            <motion.button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
              whileTap={{
                scale: 0.88,
              }}
              className="
                relative
                h-10
                w-10
                rounded-full
                flex
                flex-col
                items-center
                justify-center
                gap-1.5
                bg-[#031B2E]/[0.04]
                dark:bg-white/[0.06]
                border
                border-black/[0.06]
                dark:border-white/[0.08]
              "
            >
              <motion.span
                animate={{
                  rotate: open ? 45 : 0,
                  y: open ? 5 : 0,
                }}
                className="
                  h-[2px]
                  w-[22px]
                  rounded-full
                  bg-[#031B2E]
                  dark:bg-white
                "
              />

              <motion.span
                animate={{
                  opacity: open ? 0 : 1,
                }}
                className="
                  h-[2px]
                  w-[22px]
                  rounded-full
                  bg-[#031B2E]
                  dark:bg-white
                "
              />

              <motion.span
                animate={{
                  rotate: open ? -45 : 0,
                  y: open ? -5 : 0,
                }}
                className="
                  h-[2px]
                  w-[22px]
                  rounded-full
                  bg-[#031B2E]
                  dark:bg-white
                "
              />
            </motion.button>
          </div>
        </nav>
      </motion.div>

      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="
                fixed
                inset-0
                top-[90px]
                bg-black/20
                dark:bg-black/50
                backdrop-blur-md
                pointer-events-auto
                min-[900px]:hidden
              "
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{
                opacity: 0,
                y: -20,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -15,
                scale: 0.97,
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 28,
              }}
              className="
                fixed
                top-[92px]
                left-3
                right-3
                rounded-[24px]
                overflow-hidden
                bg-white/95
                dark:bg-[#031B2E]/95
                backdrop-blur-2xl
                border
                border-black/[0.06]
                dark:border-white/[0.08]
                shadow-[0_25px_70px_rgba(0,0,0,0.15)]
                pointer-events-auto
                min-[900px]:hidden
              "
            >
              <div
                className="
                  h-[2px]
                  w-full
                  bg-gradient-to-r
                  from-[#0066B3]
                  via-[#00A9E0]
                  to-[#00A878]
                "
              />

              <div className="p-4">
                {navLinks.map((link, index) => {
                  const active = isActive(link);

                  return (
                    <motion.button
                      key={link.label}
                      type="button"
                      onClick={() => go(link)}
                      initial={{
                        opacity: 0,
                        x: 25,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      transition={{
                        delay: index * 0.055,
                        duration: 0.4,
                        ease,
                      }}
                      whileTap={{
                        scale: 0.97,
                      }}
                      className={`
                          relative
                          w-full
                          flex
                          items-center
                          justify-between
                          py-3.5
                          px-3
                          rounded-xl
                          text-left

                          ${
                            active
                              ? `
                                text-[#0066B3]
                                dark:text-[#00A9E0]
                                bg-[#00A9E0]/[0.07]
                                border
                                border-[#00A9E0]/10
                              `
                              : `
                                text-[#18384F]
                                dark:text-white/80
                                border
                                border-transparent
                              `
                          }
                        `}
                    >
                      <span className="font-semibold">{link.label}</span>

                      <span className="text-[#00A9E0]">→</span>
                    </motion.button>
                  );
                })}

                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    delay: 0.38,
                    duration: 0.45,
                    ease,
                  }}
                  className="pt-3 w-full"
                >
                  <ShineCTA mobile />
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
