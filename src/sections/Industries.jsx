import {
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

import { asserts } from "../assets/asserts.mjs";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

/* ============================================================================
   CONFIG
============================================================================ */

const EASE = [0.16, 1, 0.3, 1];

/* ============================================================================
   BUSINESS DATA
============================================================================ */

const businessSolutions = [
  {
    number: "01",
    eyebrow: "STARTUPS",
    title: "Launch with confidence.",
    description:
      "From idea validation to a polished digital product, we help startups move faster with scalable technology and focused digital execution.",
    tags: [
      "Websites",
      "Mobile Apps",
      "MVP",
      "Branding",
    ],
    image: `${asserts.startup}`,
  },

  {
    number: "02",
    eyebrow: "SMALL & MEDIUM BUSINESSES",
    title: "Turn operations into growth.",
    description:
      "Simplify everyday business workflows with websites, CRM, ERP, automation and digital marketing built around the way your team works.",
    tags: [
      "CRM",
      "ERP",
      "Automation",
      "Marketing",
    ],
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=85",
  },

  {
    number: "03",
    eyebrow: "GROWING ENTERPRISES",
    title: "Scale without the complexity.",
    description:
      "Build connected digital systems that support larger teams, more customers and smarter decision-making across the business.",
    tags: [
      "Custom Software",
      "ERP",
      "AI",
      "Integrations",
    ],
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=85",
  },

  {
    number: "04",
    eyebrow: "PROFESSIONAL SERVICES",
    title: "Look sharper. Work smarter.",
    description:
      "Create a stronger online presence while streamlining leads, customer management, communication and internal workflows.",
    tags: [
      "Web Design",
      "Lead Gen",
      "CRM",
      "SEO",
    ],
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=85",
  },

  {
    number: "05",
    eyebrow: "RETAIL & COMMERCE",
    title: "Make every customer interaction count.",
    description:
      "Connect digital storefronts, customer journeys and marketing campaigns into a system designed for visibility and conversion.",
    tags: [
      "E-Commerce",
      "Mobile",
      "Marketing",
      "Analytics",
    ],
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85",
  },

  {
    number: "06",
    eyebrow: "EDUCATION & INSTITUTIONS",
    title: "Bring every experience online.",
    description:
      "Design accessible platforms and management solutions that make information, communication and day-to-day operations easier.",
    tags: [
      "Portals",
      "Apps",
      "Management",
      "Automation",
    ],
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=85",
  },
];

/* ============================================================================
   FINE POINTER DETECTION

   No require().
   Uses normal React ES module import.
============================================================================ */

function useHasFinePointer() {
  const [isFine, setIsFine] = useState(false);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return undefined;
    }

    const query = window.matchMedia(
      "(pointer: fine)"
    );

    const update = () => {
      setIsFine(query.matches);
    };

    update();

    query.addEventListener(
      "change",
      update
    );

    return () => {
      query.removeEventListener(
        "change",
        update
      );
    };
  }, []);

  return isFine;
}

/* ============================================================================
   FLOATING ORB
============================================================================ */

function FloatingOrb({
  className = "",
  style,
}) {
  return (
    <motion.div
      aria-hidden="true"
      style={style}
      className={`
        pointer-events-none
        absolute
        rounded-full
        blur-[90px]
        ${className}
      `}
    />
  );
}

/* ============================================================================
   ARROW ICON
============================================================================ */

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M5 19L19 5" />
      <path d="M8 5h11v11" />
    </svg>
  );
}

/* ============================================================================
   SPLIT WORDS
============================================================================ */

function SplitWords({ text }) {
  const words = text.split(" ");

  return (
    <span className="inline-flex flex-wrap gap-x-[0.22em]">
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{
            opacity: 0,
            y: 18,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.8,
          }}
          transition={{
            duration: 0.55,
            delay: index * 0.055,
            ease: EASE,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ============================================================================
   BUSINESS CARD
============================================================================ */

function BusinessCard({
  item,
  index,
  reduceMotion,
  enablePointer,
}) {
  const cardRef = useRef(null);

  const active = useInView(cardRef, {
    amount: 0.32,
    margin: "-8% 0px -8% 0px",
  });

  /* ==========================================================================
     SPOTLIGHT
  ========================================================================== */

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const smoothX = useSpring(mouseX, {
    stiffness: 170,
    damping: 28,
    mass: 0.2,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 170,
    damping: 28,
    mass: 0.2,
  });

  const spotlight = useMotionTemplate`
    radial-gradient(
      190px circle at ${smoothX}% ${smoothY}%,
      rgba(0,169,224,0.13),
      transparent 72%
    )
  `;

  /* ==========================================================================
     TILT
  ========================================================================== */

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRotateX = useSpring(
    rotateX,
    {
      stiffness: 145,
      damping: 24,
      mass: 0.22,
    }
  );

  const springRotateY = useSpring(
    rotateY,
    {
      stiffness: 145,
      damping: 24,
      mass: 0.22,
    }
  );

  /* ==========================================================================
     POINTER RAF THROTTLE
  ========================================================================== */

  const rafRef = useRef(null);

  const pointerValuesRef = useRef({
    x: 50,
    y: 50,
    rx: 0,
    ry: 0,
  });

  const flushPointer = useCallback(() => {
    rafRef.current = null;

    const values =
      pointerValuesRef.current;

    mouseX.set(values.x);
    mouseY.set(values.y);
    rotateX.set(values.rx);
    rotateY.set(values.ry);
  }, [
    mouseX,
    mouseY,
    rotateX,
    rotateY,
  ]);

  const handlePointerMove = useCallback(
    (event) => {
      if (
        reduceMotion ||
        !enablePointer
      ) {
        return;
      }

      const element =
        event.currentTarget;

      const rect =
        element.getBoundingClientRect();

      if (
        rect.width <= 0 ||
        rect.height <= 0
      ) {
        return;
      }

      const px = Math.max(
        0,
        Math.min(
          1,
          (event.clientX - rect.left) /
            rect.width
        )
      );

      const py = Math.max(
        0,
        Math.min(
          1,
          (event.clientY - rect.top) /
            rect.height
        )
      );

      pointerValuesRef.current.x =
        px * 100;

      pointerValuesRef.current.y =
        py * 100;

      pointerValuesRef.current.ry =
        (px - 0.5) * 3.5;

      pointerValuesRef.current.rx =
        -(py - 0.5) * 3.5;

      if (
        rafRef.current === null
      ) {
        rafRef.current =
          requestAnimationFrame(
            flushPointer
          );
      }
    },
    [
      enablePointer,
      reduceMotion,
      flushPointer,
    ]
  );

  const handlePointerLeave =
    useCallback(() => {
      if (!enablePointer) {
        return;
      }

      pointerValuesRef.current = {
        x: 50,
        y: 50,
        rx: 0,
        ry: 0,
      };

      if (
        rafRef.current === null
      ) {
        rafRef.current =
          requestAnimationFrame(
            flushPointer
          );
      }
    }, [
      enablePointer,
      flushPointer,
    ]);

  useEffect(() => {
    return () => {
      if (
        rafRef.current !== null
      ) {
        cancelAnimationFrame(
          rafRef.current
        );
      }
    };
  }, []);

  return (
    <motion.article
      ref={cardRef}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 42,
              scale: 0.975,
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              scale: 1,
            }
      }
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.7,
        delay: Math.min(
          index * 0.065,
          0.3
        ),
        ease: EASE,
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: active
                ? 1.008
                : 1,
              opacity: active
                ? 1
                : 0.94,
            }
      }
      onPointerMove={
        enablePointer
          ? handlePointerMove
          : undefined
      }
      onPointerLeave={
        enablePointer
          ? handlePointerLeave
          : undefined
      }
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 900,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-black/[0.07]
        bg-white
        shadow-[0_18px_60px_rgba(7,24,39,0.055)]
        will-change-transform
        hover:border-[#00A9E0]/25
        dark:border-white/[0.07]
        dark:bg-[#0A1722]
        dark:shadow-none
        dark:hover:border-[#5DDBFF]/20
      "
    >
      {/* ======================================================================
          POINTER SPOTLIGHT
      ====================================================================== */}

      {enablePointer && (
        <motion.div
          aria-hidden="true"
          style={{
            background: spotlight,
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            z-40
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />
      )}

      {/* ======================================================================
          ACTIVE BORDER
      ====================================================================== */}

      <motion.div
        aria-hidden="true"
        animate={{
          opacity: active ? 1 : 0,
        }}
        transition={{
          duration: 0.28,
        }}
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
          rounded-[30px]
          ring-1
          ring-inset
          ring-[#00A9E0]/25
          dark:ring-[#5DDBFF]/20
        "
      />

      {/* ======================================================================
          TOP EDGE
      ====================================================================== */}

      {enablePointer && (
        <motion.div
          aria-hidden="true"
          initial={{
            scaleX: 0,
            opacity: 0,
          }}
          whileHover={{
            scaleX: 1,
            opacity: 1,
          }}
          transition={{
            duration: 0.42,
            ease: EASE,
          }}
          className="
            pointer-events-none
            absolute
            inset-x-7
            top-0
            z-50
            h-px
            origin-center
            bg-gradient-to-r
            from-transparent
            via-[#00A9E0]
            to-transparent
          "
        />
      )}

      {/* ======================================================================
          IMAGE
      ====================================================================== */}

      <div
        className="
          relative
          h-[235px]
          overflow-hidden
          sm:h-[245px]
          md:h-[250px]
        "
      >
        <motion.div
          initial={{
            scale: 1.08,
          }}
          whileInView={{
            scale: 1,
          }}
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.9,
            delay: index * 0.05,
            ease: EASE,
          }}
          className="
            h-full
            w-full
            will-change-transform
          "
        >
          <motion.img
            src={item.image}
            alt={item.eyebrow}
            loading={
              index < 2
                ? "eager"
                : "lazy"
            }
            decoding="async"
            draggable="false"
            whileHover={
              reduceMotion ||
              !enablePointer
                ? undefined
                : {
                    scale: 1.045,
                  }
            }
            transition={{
              duration: 0.65,
              ease: EASE,
            }}
            className="
              h-full
              w-full
              object-cover
              object-center
              will-change-transform
            "
          />
        </motion.div>

        {/* Image color wash */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            bg-gradient-to-br
            from-[#00A9E0]/10
            via-transparent
            to-transparent
          "
        />

        {/* Bottom gradient */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            bg-gradient-to-t
            from-[#071827]/95
            via-[#071827]/25
            to-transparent
          "
        />

        {/* Number */}
        <span
          className="
            absolute
            left-6
            top-6
            z-30
            font-mono
            text-[10px]
            font-semibold
            tracking-[0.2em]
            text-white/85
          "
        >
          {item.number}
        </span>

        {/* Arrow */}
        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -4, 0],
                }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.18,
          }}
          className="
            absolute
            right-6
            top-6
            z-30
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-white/10
            text-white
            backdrop-blur-sm
            will-change-transform
          "
        >
          <ArrowIcon />
        </motion.div>

        {/* Category */}
        <div
          className="
            absolute
            bottom-6
            left-6
            right-6
            z-30
          "
        >
          <span
            className="
              text-[8px]
              font-semibold
              uppercase
              tracking-[0.28em]
              text-[#8BEAFF]
            "
          >
            {item.eyebrow}
          </span>
        </div>
      </div>

      {/* ======================================================================
          CARD CONTENT
      ====================================================================== */}

      <div
        className="
          relative
          z-10
          p-6
          sm:p-7
          md:p-8
        "
      >
        {/* Title */}
        <motion.h3
          initial={{
            opacity: 0,
            y: 12,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.55,
            delay:
              0.12 +
              index * 0.045,
            ease: EASE,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: active ? 1.5 : 0,
                }
          }
          whileHover={
            reduceMotion ||
            !enablePointer
              ? undefined
              : {
                  x: 3,
                }
          }
          className="
            max-w-[410px]
            font-display
            text-2xl
            font-semibold
            leading-[0.98]
            tracking-[-0.045em]
            text-[#071827]
            dark:text-white
            md:text-[2.15rem]
          "
        >
          {item.title}
        </motion.h3>

        {/* Description */}
        <motion.p
          initial={{
            opacity: 0,
            y: 10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.55,
            delay:
              0.18 +
              index * 0.045,
            ease: EASE,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: active ? 1 : 0,
                }
          }
          className="
            mt-4
            max-w-[450px]
            text-[14px]
            leading-[1.78]
            text-[#4B6275]
            dark:text-[#A8BAC8]
          "
        >
          {item.description}
        </motion.p>

        {/* Tags */}
        <div
          className="
            relative
            mt-6
            flex
            flex-wrap
            gap-2
          "
        >
          {item.tags.map(
            (tag, tagIndex) => (
              <motion.span
                key={tag}
                initial={{
                  opacity: 0,
                  y: 8,
                  scale: 0.96,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                viewport={{
                  once: true,
                }}
                whileHover={
                  reduceMotion ||
                  !enablePointer
                    ? undefined
                    : {
                        y: -2,
                        scale: 1.04,
                      }
                }
                transition={{
                  duration: 0.35,
                  delay:
                    0.24 +
                    index * 0.04 +
                    tagIndex * 0.035,
                  ease: EASE,
                }}
                className="
                  rounded-full
                  border
                  border-black/[0.07]
                  px-3
                  py-1.5
                  text-[8px]
                  font-medium
                  uppercase
                  tracking-[0.15em]
                  text-[#5C7182]
                  transition-colors
                  duration-300
                  group-hover:border-[#00A9E0]/25
                  group-hover:text-[#007BA8]
                  dark:border-white/[0.08]
                  dark:text-[#8198A8]
                  dark:group-hover:border-[#5DDBFF]/25
                  dark:group-hover:text-[#8BEAFF]
                "
              >
                {tag}
              </motion.span>
            )
          )}
        </div>

        {/* Progress */}
        <div
          className="
            relative
            mt-7
            h-[2px]
            w-full
            overflow-hidden
            rounded-full
            bg-black/[0.06]
            dark:bg-white/[0.06]
          "
        >
          <motion.div
            initial={{
              x: "-105%",
            }}
            whileInView={{
              x: "0%",
            }}
            viewport={{
              once: true,
              amount: 0.4,
            }}
            transition={{
              duration: 0.8,
              delay:
                0.2 +
                index * 0.055,
              ease: EASE,
            }}
            className="
              h-full
              w-full
              origin-left
              rounded-full
              bg-gradient-to-r
              from-[#0066B3]
              via-[#00A9E0]
              to-[#00A878]
              will-change-transform
            "
          />
        </div>

        {/* Explore */}
        <motion.div
          initial={{
            opacity: 0,
            x: -5,
          }}
          whileInView={{
            opacity: 0.9,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.4,
            delay:
              0.28 +
              index * 0.045,
            ease: EASE,
          }}
          className="
            mt-4
            flex
            items-center
            gap-2
            text-[8px]
            font-semibold
            uppercase
            tracking-[0.22em]
            text-[#007CA8]
            dark:text-[#8BEAFF]
          "
        >
          <span>
            Explore solution
          </span>

          <motion.span
            animate={
              reduceMotion
                ? undefined
                : {
                    x: [0, 3, 0],
                  }
            }
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1.5,
            }}
          >
            →
          </motion.span>
        </motion.div>
      </div>
    </motion.article>
  );
}

/* ============================================================================
   MAGNETIC CTA
============================================================================ */

function MagneticCTA({
  reduceMotion,
  enablePointer,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 270,
    damping: 24,
    mass: 0.2,
  });

  const springY = useSpring(y, {
    stiffness: 270,
    damping: 24,
    mass: 0.2,
  });

  const handleMove = useCallback(
    (event) => {
      if (
        reduceMotion ||
        !enablePointer
      ) {
        return;
      }

      const rect =
        event.currentTarget.getBoundingClientRect();

      x.set(
        (event.clientX -
          (rect.left +
            rect.width / 2)) *
          0.1
      );

      y.set(
        (event.clientY -
          (rect.top +
            rect.height / 2)) *
          0.1
      );
    },
    [
      reduceMotion,
      enablePointer,
      x,
      y,
    ]
  );

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleClick = useCallback(
    (event) => {
      event.preventDefault();

      const contact =
        document.getElementById(
          "contact"
        );

      if (!contact) {
        window.history.replaceState(
          null,
          "",
          "#contact"
        );
        return;
      }

      const navbarOffset = 105;

      const targetPosition =
        contact.getBoundingClientRect()
          .top +
        window.scrollY -
        navbarOffset;

      window.scrollTo({
        top: Math.max(
          0,
          targetPosition
        ),
        behavior: "smooth",
      });

      window.history.replaceState(
        null,
        "",
        "#contact"
      );
    },
    []
  );

  return (
    <motion.a
      href="#contact"
      style={{
        x: springX,
        y: springY,
      }}
      onClick={handleClick}
      onPointerMove={
        enablePointer
          ? handleMove
          : undefined
      }
      onPointerLeave={
        enablePointer
          ? reset
          : undefined
      }
      whileHover={
        reduceMotion ||
        !enablePointer
          ? undefined
          : {
              scale: 1.03,
            }
      }
      whileTap={
        reduceMotion
          ? undefined
          : {
              scale: 0.97,
            }
      }
      className="
        group
        inline-flex
        items-center
        gap-3
        text-[9px]
        font-semibold
        uppercase
        tracking-[0.22em]
        text-[#007CA8]
        dark:text-[#8BEAFF]
        will-change-transform
      "
    >
      Talk to our team

      <motion.span
        whileHover={
          reduceMotion ||
          !enablePointer
            ? undefined
            : {
                rotate: -35,
                x: 3,
              }
        }
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-[#00A9E0]/20
          transition-colors
          duration-300
          group-hover:border-[#00A9E0]/50
          group-hover:bg-[#00A9E0]/[0.08]
          dark:border-[#5DDBFF]/20
          dark:group-hover:border-[#5DDBFF]/40
        "
      >
        →
      </motion.span>
    </motion.a>
  );
}

/* ============================================================================
   MAIN SECTION
============================================================================ */

export default function BusinessSolutionsSection() {
  const sectionRef = useRef(null);

  const reduceMotion =
    useReducedMotion();

  const enablePointer =
    useHasFinePointer();

  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,
    offset: [
      "start end",
      "end start",
    ],
  });

  /* ==========================================================================
     BACKGROUND PARALLAX
  ========================================================================== */

  const backgroundX =
    useTransform(
      scrollYProgress,
      [0, 1],
      ["-3%", "3%"]
    );

  const backgroundY =
    useTransform(
      scrollYProgress,
      [0, 1],
      ["4%", "-4%"]
    );

  const backgroundScale =
    useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      [0.95, 1.035, 0.97]
    );

  const headingY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [20, -20]
    );

  const orbX =
    useTransform(
      scrollYProgress,
      [0, 1],
      ["7%", "-7%"]
    );

  return (
    <section
      ref={sectionRef}
      id="industries"
      className="
        relative
        w-full
        overflow-hidden
        scroll-mt-[110px]
        bg-[#F5F7FA]
        py-20
        text-[#071827]
        dark:bg-[#07131F]
        dark:text-white
        sm:py-24
        md:py-32
        lg:py-36
      "
    >
      {/* ======================================================================
          BACKGROUND
      ====================================================================== */}

      <motion.div
        aria-hidden="true"
        style={{
          x: backgroundX,
          y: backgroundY,
          scale: backgroundScale,
        }}
        className="
          pointer-events-none
          absolute
          left-[58%]
          top-[10%]
          z-0
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          bg-[#00A9E0]/[0.04]
          blur-[100px]
          will-change-transform
          dark:bg-[#00D9FF]/[0.028]
        "
      />

      <FloatingOrb
        style={{
          x: orbX,
        }}
        className="
          bottom-[18%]
          right-[-10%]
          h-[360px]
          w-[360px]
          bg-[#00A878]/[0.025]
          dark:bg-[#00A878]/[0.018]
        "
      />

      {/* Grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          opacity-[0.018]
          [background-image:linear-gradient(#0089BA_1px,transparent_1px),linear-gradient(90deg,#0089BA_1px,transparent_1px)]
          [background-size:64px_64px]
          dark:opacity-[0.026]
        "
      />

      {/* ======================================================================
          CONTENT
      ====================================================================== */}

      <div
        className="
          container-x
          relative
          z-10
          px-5
          md:px-0
        "
      >
        {/* ====================================================================
            HEADER
        ==================================================================== */}

        <motion.div
          style={{
            y: reduceMotion
              ? 0
              : headingY,
          }}
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 28,
                }
          }
          whileInView={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  y: 0,
                }
          }
          viewport={{
            once: true,
            amount: 0.25,
          }}
          transition={{
            duration: 0.75,
            ease: EASE,
          }}
        >
          {/* Label */}
          <div className="flex items-center gap-3">
            <motion.span
              initial={{
                width: 0,
              }}
              whileInView={{
                width: 32,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.55,
                ease: EASE,
              }}
              className="
                h-px
                bg-[#00A9E0]
                dark:bg-[#5DDBFF]
              "
            />

            <span
              className="
                text-[9px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#007CA8]
                dark:text-[#5DDBFF]
                md:text-[10px]
              "
            >
              Who We Build For
            </span>
          </div>

          {/* Heading + supporting copy */}
          <div
            className="
              mt-5
              flex
              flex-col
              gap-7
              lg:flex-row
              lg:items-end
              lg:justify-between
            "
          >
            <h2
              className="
                max-w-5xl
                font-display
                text-4xl
                font-semibold
                leading-[0.9]
                tracking-[-0.065em]
                text-[#071827]
                dark:text-white
                md:text-6xl
                lg:text-[6.5rem]
              "
            >
              <SplitWords text="Built for" />

              <span
                className="
                  block
                  text-[#007CA8]
                  dark:text-[#5DDBFF]
                "
              >
                <SplitWords
                  text="every business."
                />
              </span>
            </h2>

            <motion.p
              initial={{
                opacity: 0,
                x: 20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.65,
                delay: 0.12,
                ease: EASE,
              }}
              className="
                max-w-xl
                text-[15px]
                leading-[1.75]
                text-[#4B6275]
                dark:text-[#A8BAC8]
                md:text-base
                lg:pb-2
                lg:text-lg
              "
            >
              One technology partner for software,
              web, mobile, CRM, ERP, AI and digital
              growth.
            </motion.p>
          </div>
        </motion.div>

        {/* ====================================================================
            BUSINESS CARDS
        ==================================================================== */}

        <div
          className="
            mt-14
            grid
            gap-5
            sm:mt-16
            md:mt-20
            md:grid-cols-2
            xl:grid-cols-3
          "
        >
          {businessSolutions.map(
            (item, index) => (
              <BusinessCard
                key={item.number}
                item={item}
                index={index}
                reduceMotion={
                  reduceMotion
                }
                enablePointer={
                  enablePointer
                }
              />
            )
          )}
        </div>

        {/* ====================================================================
            CTA
        ==================================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 22,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.3,
          }}
          transition={{
            duration: 0.7,
            ease: EASE,
          }}
          className="
            mt-12
            flex
            flex-col
            gap-5
            border-t
            border-black/[0.07]
            pt-6
            dark:border-white/[0.07]
            sm:mt-14
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#007CA8]
                dark:text-[#5DDBFF]
              "
            >
              One team. Every digital need.
            </span>

            <p
              className="
                mt-2
                max-w-2xl
                text-[14px]
                leading-[1.75]
                text-[#5B7082]
                dark:text-[#8198A8]
              "
            >
              From your first idea to the next stage
              of growth, we build technology around
              your business.
            </p>
          </div>

          <MagneticCTA
            reduceMotion={reduceMotion}
            enablePointer={
              enablePointer
            }
          />
        </motion.div>
      </div>
    </section>
  );
}