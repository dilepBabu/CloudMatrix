import {
  useCallback,
  useEffect,
  useRef,
  useState,
  memo,
} from "react";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import ThemeToggle from "./ThemeToggle";
import MagneticButton from "./MagneticButton";
import logo from "../assets/logo.png";

/* =========================================================
   NAV LINKS
========================================================= */

const navLinks = [
  { label: "Home", to: "/", hash: "" },
  { label: "Services", to: "/", hash: "#services" },
  { label: "Why Us", to: "/", hash: "#why-us" },
  { label: "Industries", to: "/", hash: "#industries" },
  { label: "Blog", to: "/blog", hash: "" },
  { label: "Career", to: "/career", hash: "" },
];

/* =========================================================
   GLOBAL EASING
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
  isTop,
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

  /* =======================================================
     MOUSE MOVE
  ======================================================= */

  const handleMouseMove = useCallback(
    (event) => {
      const el = itemRef.current;

      if (!el) {
        return;
      }

      const rect = el.getBoundingClientRect();

      const px =
        event.clientX -
        (rect.left + rect.width * 0.5);

      const py =
        event.clientY -
        (rect.top + rect.height * 0.5);

      mouseX.set(px * 0.06);
      mouseY.set(py * 0.06);
    },
    [mouseX, mouseY]
  );

  /* =======================================================
     MOUSE ENTER
  ======================================================= */

  const handleMouseEnter = useCallback(() => {
    setHovered(link.label);
  }, [link.label, setHovered]);

  /* =======================================================
     MOUSE LEAVE
  ======================================================= */

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
        h-10
        px-3
        flex
        items-center
        justify-center
        overflow-hidden
        transform-gpu
      "
    >
      {/* ===================================================
          HOVER BACKGROUND
      =================================================== */}

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
              rounded-xl
              pointer-events-none
              transform-gpu
              ${
                isTop
                  ? "bg-white/[0.09]"
                  : "bg-[#00A9E0]/[0.055] dark:bg-[#00A9E0]/[0.08]"
              }
            `}
          />
        )}
      </AnimatePresence>

      {/* ===================================================
          TEXT
      =================================================== */}

      <span
        className={`
          relative
          z-10
          overflow-hidden
          leading-none
          ${
            isTop
              ? "text-white"
              : active
                ? "text-[#0066B3] dark:text-[#00A9E0]"
                : "text-slate-600 dark:text-white/65"
          }
        `}
      >
        {/* Current text */}
        <motion.span
          className="block"
          animate={{
            y: hovered === link.label ? -18 : 0,
          }}
          transition={{
            duration: 0.35,
            ease,
          }}
          style={{
            willChange: "transform",
          }}
        >
          {link.label}
        </motion.span>

        {/* Hover text */}
        <motion.span
          className={`
            absolute
            left-0
            top-[18px]
            block
            ${
              isTop
                ? "text-white"
                : "text-[#0066B3] dark:text-[#00A9E0]"
            }
          `}
          animate={{
            y: hovered === link.label ? -18 : 0,
          }}
          transition={{
            duration: 0.35,
            ease,
          }}
          style={{
            willChange: "transform",
          }}
        >
          {link.label}
        </motion.span>
      </span>

      {/* ===================================================
          ACTIVE LINE
      =================================================== */}

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
          style={{
            willChange: "width",
          }}
        />
      )}
    </motion.button>
  );
});

/* =========================================================
   RESPONSIVE SHINE CTA
========================================================= */

const ShineCTA = memo(function ShineCTA({
  mobile = false,
}) {
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
            : "min-w-[175px] min-h-[42px] px-5 rounded-full"
        }
        bg-gradient-to-r
        from-[#031B2E]
        via-[#0066B3]
        to-[#00A9E0]
        text-white
        text-[13px]
        font-semibold
        border
        border-[#00A9E0]/30
        shadow-[0_8px_25px_rgba(0,102,179,0.22)]
        isolate
        transform-gpu
      `}
    >
      {/* ===================================================
          BASE GLOW
      =================================================== */}

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

      {/* ===================================================
          MAIN SHINE
      =================================================== */}

      <motion.span
        className="
          absolute
          top-[-70%]
          bottom-[-70%]
          left-[-45%]
          w-[24%]
          min-w-[24px]
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
          left: [
            "-45%",
            "-15%",
            "20%",
            "5%",
            "45%",
            "30%",
            "75%",
            "145%",
          ],
          rotate: [
            24,
            -18,
            25,
            -20,
            22,
            -17,
            24,
            20,
          ],
          opacity: [
            0,
            0.8,
            0.5,
            0.9,
            0.6,
            0.9,
            0.5,
            0,
          ],
        }}
        transition={{
          duration: mobile ? 2.8 : 2.4,
          repeat: Infinity,
          repeatDelay: mobile ? 2.5 : 3,
          ease: "easeInOut",
        }}
      />

      {/* ===================================================
          SOFT GLOW
      =================================================== */}

      <motion.span
        className="
          absolute
          top-[-80%]
          bottom-[-80%]
          left-[-55%]
          w-[45%]
          min-w-[55px]
          pointer-events-none
          z-[9]
          rotate-[24deg]
          bg-[#00D9FF]/25
          blur-xl
          transform-gpu
        "
        animate={{
          left: [
            "-55%",
            "-20%",
            "15%",
            "0%",
            "45%",
            "30%",
            "75%",
            "150%",
          ],
          rotate: [
            24,
            -18,
            25,
            -20,
            22,
            -17,
            24,
            20,
          ],
          opacity: [
            0,
            0.6,
            0.3,
            0.6,
            0.3,
            0.6,
            0.3,
            0,
          ],
        }}
        transition={{
          duration: mobile ? 3 : 2.7,
          repeat: Infinity,
          repeatDelay: mobile ? 2.5 : 3,
          ease: "easeInOut",
        }}
      />

      {/* ===================================================
          BORDER
      =================================================== */}

      <motion.span
        className="
          absolute
          inset-0
          rounded-[inherit]
          border
          border-[#00A9E0]/30
          pointer-events-none
          z-[12]
          transform-gpu
        "
        animate={{
          borderColor: [
            "rgba(0,169,224,0.25)",
            "rgba(0,217,255,0.7)",
            "rgba(0,169,224,0.25)",
          ],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* ===================================================
          TEXT
      =================================================== */}

      <span
        className="
          relative
          z-20
          whitespace-nowrap
        "
      >
        Talk to Our Expert
      </span>

      {/* ===================================================
          ARROW
      =================================================== */}

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
   MAIN NAVBAR
========================================================= */

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [scrolled, setScrolled] =
    useState(false);

  const [open, setOpen] = useState(false);

  const [activeSection, setActiveSection] =
    useState("home");

  const [hovered, setHovered] =
    useState(null);

  const navRef = useRef(null);

  /* =======================================================
     TOP OF HOME PAGE
  ======================================================= */

  const isInnerPage =
    location.pathname !== "/";

  const isTopOfHome =
    !isInnerPage && !scrolled;

  /* =======================================================
     CURSOR FOLLOW GLOW
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

      mouseFrame.current =
        requestAnimationFrame(() => {
          const rect =
            navRef.current.getBoundingClientRect();

          mouseX.set(
            event.clientX - rect.left
          );

          mouseY.set(
            event.clientY - rect.top
          );

          mouseFrame.current = null;
        });
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    return () => {
      if (mouseFrame.current) {
        cancelAnimationFrame(
          mouseFrame.current
        );
      }
    };
  }, []);

  /* =======================================================
     SCROLL
  ======================================================= */

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;

      requestAnimationFrame(() => {
        setScrolled(
          window.scrollY > 35
        );

        ticking = false;
      });
    };

    handleScroll();

    window.addEventListener(
      "scroll",
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  /* =======================================================
     CLOSE MOBILE MENU
  ======================================================= */

  useEffect(() => {
    setOpen(false);
  }, [
    location.pathname,
    location.hash,
  ]);

  /* =======================================================
     ACTIVE SECTION
  ======================================================= */

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    const sections = [
      "services",
      "why-us",
      "industries",
    ];

    let ticking = false;

    const detectSection = () => {
      if (ticking) {
        return;
      }

      ticking = true;

      requestAnimationFrame(() => {
        const position =
          window.scrollY + 180;

        let current = "home";

        sections.forEach((id) => {
          const section =
            document.getElementById(id);

          if (!section) {
            return;
          }

          if (
            position >=
            section.offsetTop
          ) {
            current = id;
          }
        });

        setActiveSection(current);

        ticking = false;
      });
    };

    detectSection();

    window.addEventListener(
      "scroll",
      detectSection,
      {
        passive: true,
      }
    );

    return () => {
      window.removeEventListener(
        "scroll",
        detectSection
      );
    };
  }, [location.pathname]);

  /* =======================================================
     HASH ACTIVE
  ======================================================= */

  useEffect(() => {
    if (location.pathname !== "/") {
      return;
    }

    if (!location.hash) {
      setActiveSection("home");
      return;
    }

    setActiveSection(
      location.hash.replace("#", "")
    );
  }, [
    location.pathname,
    location.hash,
  ]);

  /* =======================================================
     ACTIVE CHECK
  ======================================================= */

  const isActive = useCallback(
    (link) => {
      if (link.to === "/blog") {
        return (
          location.pathname === "/blog"
        );
      }

      if (link.to === "/career") {
        return (
          location.pathname === "/career"
        );
      }

      if (link.label === "Home") {
        return (
          location.pathname === "/" &&
          activeSection === "home"
        );
      }

      if (link.hash) {
        return (
          location.pathname === "/" &&
          activeSection ===
            link.hash.replace("#", "")
        );
      }

      return false;
    },
    [
      location.pathname,
      activeSection,
    ]
  );

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const go = useCallback(
    (link) => {
      setOpen(false);

      /* ---------------------------------------------------
         INNER PAGE
      --------------------------------------------------- */

      if (!link.hash) {
        navigate(link.to);
        return;
      }

      /* ---------------------------------------------------
         HOME
      --------------------------------------------------- */

      if (link.label === "Home") {
        setActiveSection("home");

        if (location.pathname !== "/") {
          navigate("/");
          return;
        }

        window.history.replaceState(
          null,
          "",
          "/"
        );

        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });

        return;
      }

      /* ---------------------------------------------------
         SECTION
      --------------------------------------------------- */

      const targetId =
        link.hash.replace("#", "");

      setActiveSection(targetId);

      if (location.pathname !== "/") {
        navigate(`/#${targetId}`);
        return;
      }

      const element =
        document.getElementById(targetId);

      if (!element) {
        return;
      }

      const navbarOffset = 105;

      const targetPosition =
        element.getBoundingClientRect()
          .top +
        window.scrollY -
        navbarOffset;

      window.history.replaceState(
        null,
        "",
        `/#${targetId}`
      );

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    },
    [
      location.pathname,
      navigate,
    ]
  );

  /* =======================================================
     ADAPTIVE PAGE COLORS
  ======================================================= */

  const getPageColors = () => {
    /* ---------------------------------------------------
       BLOG
    --------------------------------------------------- */

    if (location.pathname === "/blog") {
      return {
        bg: "rgba(255,255,255,0.58)",
        darkBg:
          "rgba(15,23,42,0.72)",

        scrolled:
          "rgba(255,255,255,0.88)",
        darkScrolled:
          "rgba(15,23,42,0.92)",

        border:
          "rgba(99,102,241,0.16)",

        shadow:
          "rgba(99,102,241,0.12)",

        glow:
          "rgba(99,102,241,0.10)",
      };
    }

    /* ---------------------------------------------------
       CAREER
    --------------------------------------------------- */

    if (
      location.pathname === "/career"
    ) {
      return {
        bg: "rgba(255,255,255,0.58)",
        darkBg:
          "rgba(3,27,46,0.72)",

        scrolled:
          "rgba(255,255,255,0.88)",
        darkScrolled:
          "rgba(3,27,46,0.92)",

        border:
          "rgba(0,169,224,0.16)",

        shadow:
          "rgba(0,169,224,0.12)",

        glow:
          "rgba(0,169,224,0.10)",
      };
    }

    /* ---------------------------------------------------
       SERVICES
    --------------------------------------------------- */

    if (activeSection === "services") {
      return {
        bg:
          "rgba(235,248,255,0.62)",
        darkBg:
          "rgba(3,35,55,0.74)",

        scrolled:
          "rgba(235,248,255,0.90)",
        darkScrolled:
          "rgba(3,35,55,0.93)",

        border:
          "rgba(0,169,224,0.18)",

        shadow:
          "rgba(0,169,224,0.14)",

        glow:
          "rgba(0,169,224,0.12)",
      };
    }

    /* ---------------------------------------------------
       WHY US
    --------------------------------------------------- */

    if (activeSection === "why-us") {
      return {
        bg:
          "rgba(245,240,255,0.64)",
        darkBg:
          "rgba(30,20,50,0.74)",

        scrolled:
          "rgba(245,240,255,0.90)",
        darkScrolled:
          "rgba(30,20,50,0.93)",

        border:
          "rgba(139,92,246,0.18)",

        shadow:
          "rgba(139,92,246,0.14)",

        glow:
          "rgba(139,92,246,0.12)",
      };
    }

    /* ---------------------------------------------------
       INDUSTRIES
    --------------------------------------------------- */

    if (
      activeSection === "industries"
    ) {
      return {
        bg:
          "rgba(232,245,250,0.64)",
        darkBg:
          "rgba(4,30,42,0.76)",

        scrolled:
          "rgba(232,245,250,0.90)",
        darkScrolled:
          "rgba(4,30,42,0.93)",

        border:
          "rgba(0,128,160,0.18)",

        shadow:
          "rgba(0,128,160,0.14)",

        glow:
          "rgba(0,128,160,0.12)",
      };
    }

    /* ---------------------------------------------------
       HERO / HOME
    --------------------------------------------------- */

    return {
      bg:
        "rgba(255,255,255,0.42)",

      darkBg:
        "rgba(3,27,46,0.40)",

      scrolled:
        "rgba(255,255,255,0.82)",

      darkScrolled:
        "rgba(3,27,46,0.88)",

      border:
        "rgba(0,169,224,0.12)",

      shadow:
        "rgba(0,102,179,0.12)",

      glow:
        "rgba(0,169,224,0.10)",
    };
  };

  const pageColors =
    getPageColors();

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
      {/* ===================================================
          MAIN NAVBAR
      =================================================== */}

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
          w-[calc(100%-24px)]
          md:w-[calc(100%-40px)]
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
            scrolled || isInnerPage
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
          "--nav-bg":
            pageColors.bg,

          "--nav-bg-dark":
            pageColors.darkBg,

          "--nav-bg-scrolled":
            pageColors.scrolled,

          "--nav-bg-scrolled-dark":
            pageColors.darkScrolled,

          "--nav-border":
            pageColors.border,

          "--nav-shadow":
            pageColors.shadow,

          willChange: "transform",
        }}
      >
        {/* =================================================
            CURSOR GLOW
        ================================================= */}

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
            backgroundColor:
              pageColors.glow,
            willChange: "transform",
          }}
        />

        {/* =================================================
            TOP ENERGY LINE
        ================================================= */}

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

        {/* =================================================
            NAV CONTENT
        ================================================= */}

        <nav
          className="
            relative
            z-20
            h-[68px]
            px-4
            md:px-5
            flex
            items-center
            justify-between
          "
        >
          {/* =================================================
              LOGO
          ================================================= */}

          <Link
            to="/"
            onClick={() => {
              setOpen(false);
              setActiveSection("home");
            }}
            className="
              flex
              items-center
              gap-2.5
              shrink-0
            "
          >
            <motion.div
              whileHover={{
                scale: 1.08,
                rotate: -3,
              }}
              whileTap={{
                scale: 0.9,
              }}
              className="
                relative
                h-10
                w-10
                flex
                items-center
                justify-center
                transform-gpu
              "
            >
              {/* Logo glow */}
              <div
                className={`
                  absolute
                  inset-0
                  rounded-full
                  blur-xl
                  pointer-events-none
                  ${
                    isTopOfHome
                      ? "bg-white/15"
                      : "bg-[#00A9E0]/15"
                  }
                `}
              />

              <motion.img
                src={logo}
                alt="Cloud Matrix Technologies"
                className="
                  relative
                  z-10
                  h-9
                  w-9
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
                style={{
                  willChange: "transform",
                }}
              />
            </motion.div>

            {/* =================================================
                LOGO TEXT
            ================================================= */}

            <div className="hidden sm:block">
              <p
                className={`
                  text-[13px]
                  md:text-sm
                  font-semibold
                  tracking-tight
                  transition-colors
                  duration-500

                  ${
                    isTopOfHome
                      ? "text-white"
                      : "text-[#031B2E] dark:text-white"
                  }
                `}
              >
                CLOUD MATRIX
              </p>

              <p
                className={`
                  text-[8px]
                  md:text-[9px]
                  tracking-[0.28em]
                  font-mono
                  transition-colors
                  duration-500

                  ${
                    isTopOfHome
                      ? "text-white/70"
                      : "text-black dark:text-white/45"
                  }
                `}
              >
                TECHNOLOGIES
              </p>
            </div>
          </Link>

          {/* =================================================
              DESKTOP NAV
          ================================================= */}

          <div
            className="
              hidden
              lg:flex
              items-center
              gap-1
              px-1.5
              py-1.5
              rounded-2xl
              bg-black/[0.025]
              dark:bg-white/[0.025]
              border
              border-black/[0.04]
              dark:border-white/[0.05]
            "
          >
            {navLinks.map(
              (link, index) => (
                <NavItem
                  key={link.label}
                  link={link}
                  index={index}
                  active={isActive(link)}
                  hovered={hovered}
                  setHovered={setHovered}
                  onClick={() =>
                    go(link)
                  }
                  isTop={isTopOfHome}
                />
              )
            )}
          </div>

          {/* =================================================
              DESKTOP CTA
          ================================================= */}

          <div
            className="
              hidden
              lg:flex
              items-center
              gap-3
            "
          >
            <ThemeToggle />

            <ShineCTA />
          </div>

          {/* =================================================
              MOBILE CONTROLS
          ================================================= */}

          <div
            className="
              flex
              lg:hidden
              items-center
              gap-2
            "
          >
            <ThemeToggle />

            <motion.button
              type="button"
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={() =>
                setOpen(
                  (value) => !value
                )
              }
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
                transform-gpu
              "
            >
              <motion.span
                animate={{
                  rotate: open ? 45 : 0,
                  y: open ? 5 : 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
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
                  scaleX: open ? 0 : 1,
                }}
                transition={{
                  duration: 0.2,
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
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
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
          MOBILE / TABLET DRAWER
      ===================================================== */}

      <AnimatePresence>
        {open && (
          <>
            {/* =================================================
                BACKDROP
            ================================================= */}

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
              transition={{
                duration: 0.25,
              }}
              className="
                fixed
                inset-0
                top-[90px]
                bg-black/20
                dark:bg-black/50
                backdrop-blur-md
                pointer-events-auto
                lg:hidden
              "
              onClick={() =>
                setOpen(false)
              }
            />

            {/* =================================================
                DRAWER
            ================================================= */}

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
                lg:hidden
                transform-gpu
              "
            >
              {/* Drawer top line */}
              <motion.div
                initial={{
                  scaleX: 0,
                  transformOrigin: "left",
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  duration: 0.6,
                  ease,
                }}
                className="
                  h-[2px]
                  w-full
                  bg-gradient-to-r
                  from-[#0066B3]
                  via-[#00A9E0]
                  to-[#00A878]
                  transform-gpu
                "
              />

              <div className="p-4">
                {/* =================================================
                    MOBILE NAV LINKS
                ================================================= */}

                {navLinks.map(
                  (link, index) => {
                    const active =
                      isActive(link);

                    return (
                      <motion.button
                        key={link.label}
                        type="button"
                        onClick={() =>
                          go(link)
                        }
                        initial={{
                          opacity: 0,
                          x: 25,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay:
                            index * 0.055,
                          duration: 0.4,
                          ease,
                        }}
                        whileHover={{
                          x: 5,
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
                                text-slate-700
                                dark:text-white/70
                                border
                                border-transparent
                              `
                          }
                        `}
                      >
                        <span>
                          {link.label}
                        </span>

                        <motion.span
                          animate={{
                            x: active
                              ? 0
                              : 3,
                            opacity: active
                              ? 1
                              : 0.35,
                          }}
                          className="
                            text-[#00A9E0]
                          "
                        >
                          →
                        </motion.span>
                      </motion.button>
                    );
                  }
                )}

                {/* =================================================
                    MOBILE CTA
                ================================================= */}

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
                  className="
                    pt-3
                    w-full
                    transform-gpu
                  "
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