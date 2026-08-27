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

import { useRef } from "react";

const EASE = [0.16, 1, 0.3, 1];

/* =========================================================================
   BUSINESS DATA
=========================================================================== */

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
    image:
     `${asserts.startup}`,
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

/* =========================================================================
   FLOATING ORB
=========================================================================== */

function FloatingOrb({
  className = "",
  style,
}) {
  return (
    <motion.div
      aria-hidden
      style={style}
      className={`pointer-events-none absolute rounded-full blur-[90px] ${className}`}
    />
  );
}

/* =========================================================================
   ARROW ICON
=========================================================================== */

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
    >
      <path d="M5 19L19 5" />
      <path d="M8 5h11v11" />
    </svg>
  );
}

/* =========================================================================
   SPLIT WORDS
=========================================================================== */

function SplitWords({ text }) {
  return (
    <span className="inline-flex flex-wrap gap-x-[0.22em]">
      {text.split(" ").map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          initial={{
            opacity: 0,
            y: 25,
            filter: "blur(8px)",
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.8,
          }}
          transition={{
            duration: 0.65,
            delay: index * 0.07,
            ease: EASE,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* =========================================================================
   BUSINESS CARD
=========================================================================== */

function BusinessCard({
  item,
  index,
  reduceMotion,
}) {
  const cardRef = useRef(null);

  const active = useInView(cardRef, {
    amount: 0.55,
    margin: "-10% 0px -10% 0px",
  });

  /* -----------------------------------------------------------------------
     SPOTLIGHT
  ----------------------------------------------------------------------- */

  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);

  const smoothX = useSpring(mouseX, {
    stiffness: 220,
    damping: 28,
    mass: 0.25,
  });

  const smoothY = useSpring(mouseY, {
    stiffness: 220,
    damping: 28,
    mass: 0.25,
  });

  const spotlight = useMotionTemplate`
    radial-gradient(
      220px circle at ${smoothX}% ${smoothY}%,
      rgba(0,169,224,0.16),
      transparent 72%
    )
  `;

  /* -----------------------------------------------------------------------
     HOVER TILT
  ----------------------------------------------------------------------- */

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springRotateX = useSpring(
    rotateX,
    {
      stiffness: 170,
      damping: 18,
      mass: 0.35,
    }
  );

  const springRotateY = useSpring(
    rotateY,
    {
      stiffness: 170,
      damping: 18,
      mass: 0.35,
    }
  );

  const handleMouseMove = (event) => {
    if (reduceMotion) return;

    const rect =
      event.currentTarget.getBoundingClientRect();

    const xPercent =
      (event.clientX - rect.left) /
      rect.width;

    const yPercent =
      (event.clientY - rect.top) /
      rect.height;

    mouseX.set(xPercent * 100);
    mouseY.set(yPercent * 100);

    rotateY.set((xPercent - 0.5) * 5);
    rotateX.set(-(yPercent - 0.5) * 5);
  };

  const handleMouseLeave = () => {
    mouseX.set(50);
    mouseY.set(50);

    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 70,
              scale: 0.94,
              filter: "blur(10px)",
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
            }
      }
      viewport={{
        once: true,
        amount: 0.12,
      }}
      transition={{
        duration: 0.9,
        delay: Math.min(
          index * 0.09,
          0.45
        ),
        ease: EASE,
      }}
      animate={
        reduceMotion
          ? undefined
          : {
              scale: active
                ? 1.01
                : 0.985,
              opacity: active
                ? 1
                : 0.84,
            }
      }
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -10,
              scale: 1.025,
            }
      }
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformPerspective: 1000,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-black/[0.07]
        bg-white
        shadow-[0_18px_70px_rgba(7,24,39,0.06)]
        transition-all
        duration-500
        hover:border-[#00A9E0]/25
        hover:shadow-[0_30px_100px_rgba(0,137,186,0.15)]
        dark:border-white/[0.07]
        dark:bg-[#0A1722]
        dark:shadow-none
        dark:hover:border-[#5DDBFF]/20
        dark:hover:shadow-[0_30px_100px_rgba(0,217,255,0.08)]
      "
    >
      {/* ---------------------------------------------------------------------
          HOVER SPOTLIGHT
      --------------------------------------------------------------------- */}

      <motion.div
        aria-hidden
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

      {/* ---------------------------------------------------------------------
          ACTIVE BORDER
      --------------------------------------------------------------------- */}

      <motion.div
        aria-hidden
        animate={{
          opacity: active ? 1 : 0,
        }}
        transition={{
          duration: 0.35,
        }}
        className="
          pointer-events-none
          absolute
          inset-0
          z-30
          rounded-[30px]
          ring-1
          ring-inset
          ring-[#00A9E0]/30
          dark:ring-[#5DDBFF]/25
        "
      />

      {/* ---------------------------------------------------------------------
          HOVER EDGE GLOW
      --------------------------------------------------------------------- */}

      <motion.div
        aria-hidden
        className="
          pointer-events-none
          absolute
          inset-x-6
          top-0
          z-50
          h-px
          origin-center
          bg-gradient-to-r
          from-transparent
          via-[#00A9E0]
          to-transparent
        "
        initial={{
          scaleX: 0,
          opacity: 0,
        }}
        whileHover={
          reduceMotion
            ? undefined
            : {
                scaleX: 1,
                opacity: 1,
              }
        }
        transition={{
          duration: 0.5,
          ease: EASE,
        }}
      />

      {/* ---------------------------------------------------------------------
          IMAGE
      --------------------------------------------------------------------- */}

      <div className="relative h-[250px] overflow-hidden">
        <motion.div
          initial={{
            scale: 1.16,
            y: 18,
          }}
          whileInView={{
            scale: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 1.15,
            delay: index * 0.06,
            ease: EASE,
          }}
          className="h-full w-full"
        >
          <motion.img
            src={item.image}
            alt={item.eyebrow}
            loading="lazy"
            draggable="false"
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: 1.09,
                  }
            }
            transition={{
              duration: 0.9,
              ease: EASE,
            }}
            className="
              h-full
              w-full
              object-cover
              object-center
            "
          />
        </motion.div>

        {/* Cinematic reveal */}

        <motion.div
          aria-hidden
          initial={{
            clipPath:
              "inset(0 100% 0 0)",
          }}
          whileInView={{
            clipPath:
              "inset(0 0% 0 0)",
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 1,
            delay:
              0.1 + index * 0.05,
            ease: EASE,
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-br
            from-[#00A9E0]/20
            via-transparent
            to-transparent
            mix-blend-screen
          "
        />

        {/* Light sweep */}

        <motion.div
          aria-hidden
          initial={{
            x: "-130%",
          }}
          whileInView={{
            x: "130%",
          }}
          viewport={{
            once: true,
            amount: 0.35,
          }}
          transition={{
            duration: 1.2,
            delay:
              0.15 + index * 0.05,
            ease: EASE,
          }}
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            z-10
            w-1/3
            -skew-x-12
            bg-white/[0.18]
            blur-xl
          "
        />

        {/* Gradient */}

        <div
          className="
            absolute
            inset-0
            z-20
            bg-gradient-to-t
            from-[#071827]
            via-[#071827]/25
            to-transparent
            opacity-90
          "
        />

        {/* Animated color */}

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [
                    0.15,
                    0.4,
                    0.15,
                  ],
                }
          }
          transition={{
            duration: 3.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2,
          }}
          className="
            pointer-events-none
            absolute
            inset-0
            z-20
            bg-gradient-to-br
            from-[#5DDBFF]/20
            via-transparent
            to-[#00A878]/10
            mix-blend-screen
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
            text-white/80
          "
        >
          {item.number}
        </span>

        {/* Floating icon */}

        <motion.div
          animate={
            reduceMotion
              ? undefined
              : {
                  y: [0, -7, 0],
                  rotate: [
                    0,
                    3,
                    -2,
                    0,
                  ],
                  scale: [
                    1,
                    1.05,
                    1,
                  ],
                }
          }
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.18,
          }}
          whileHover={
            reduceMotion
              ? undefined
              : {
                  scale: 1.18,
                  rotate: 45,
                }
          }
          className="
            absolute
            right-6
            top-6
            z-30
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-white/20
            bg-white/10
            text-white
            backdrop-blur-md
            shadow-[0_0_35px_rgba(0,169,224,0.22)]
          "
        >
          <ArrowIcon />
        </motion.div>

        {/* Category */}

        <motion.div
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
              0.3 + index * 0.06,
            ease: EASE,
          }}
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
        </motion.div>
      </div>

      {/* ---------------------------------------------------------------------
          CONTENT
      --------------------------------------------------------------------- */}

      <div className="relative z-10 p-7 md:p-8">
        {/* Title */}

        <motion.h3
          initial={{
            opacity: 0,
            y: 14,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.65,
            delay:
              0.18 + index * 0.06,
            ease: EASE,
          }}
          animate={
            reduceMotion
              ? undefined
              : {
                  x: active ? 2 : 0,
                }
          }
          whileHover={
            reduceMotion
              ? undefined
              : {
                  x: 5,
                }
          }
          className="
            relative
            max-w-[390px]
            font-display
            text-3xl
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
            duration: 0.65,
            delay:
              0.25 + index * 0.06,
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
            relative
            mt-5
            max-w-[430px]
            text-sm
            leading-[1.8]
            text-[#526477]
            dark:text-[#A8BAC8]
          "
        >
          {item.description}
        </motion.p>

        {/* Tags */}

        <div className="relative mt-7 flex flex-wrap gap-2">
          {item.tags.map(
            (tag, tagIndex) => (
              <motion.span
                key={tag}
                initial={{
                  opacity: 0,
                  y: 10,
                  scale: 0.94,
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
                  reduceMotion
                    ? undefined
                    : {
                        y: -4,
                        scale: 1.06,
                      }
                }
                transition={{
                  duration: 0.42,
                  delay:
                    0.32 +
                    index * 0.06 +
                    tagIndex * 0.045,
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
                  text-[#637587]
                  transition-all
                  duration-300
                  group-hover:border-[#00A9E0]/25
                  group-hover:text-[#0089BA]
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
            mt-8
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
              amount: 0.5,
            }}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scaleY: 2,
                  }
            }
            transition={{
              duration: 1,
              delay:
                0.25 + index * 0.07,
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
            "
          />
        </div>

        {/* Hover indicator */}

        <motion.div
          initial={{
            opacity: 0,
            x: -8,
          }}
          whileHover={
            reduceMotion
              ? undefined
              : {
                  opacity: 1,
                  x: 0,
                }
          }
          transition={{
            duration: 0.35,
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
            text-[#0089BA]
            dark:text-[#8BEAFF]
          "
        >
          <span>
            Explore solution
          </span>

          <motion.span
            animate={{
              x: [0, 4, 0],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            →
          </motion.span>
        </motion.div>
      </div>
    </motion.article>
  );
}

/* =========================================================================
   MAGNETIC CTA + SMOOTH SCROLL
=========================================================================== */

function MagneticCTA({
  reduceMotion,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, {
    stiffness: 300,
    damping: 22,
    mass: 0.22,
  });

  const springY = useSpring(y, {
    stiffness: 300,
    damping: 22,
    mass: 0.22,
  });

  const handleMove = (event) => {
    if (reduceMotion) return;

    const rect =
      event.currentTarget.getBoundingClientRect();

    x.set(
      (event.clientX -
        (rect.left +
          rect.width / 2)) *
        0.15
    );

    y.set(
      (event.clientY -
        (rect.top +
          rect.height / 2)) *
        0.15
    );
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const handleClick = (event) => {
    event.preventDefault();

    const contact =
      document.getElementById(
        "contact"
      );

    if (!contact) {
      /*
       * If the contact section does not
       * exist on the current page, keep
       * the hash navigation behavior.
       */

      window.history.pushState(
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

    /*
     * Update the URL without jumping.
     */

    window.history.replaceState(
      null,
      "",
      "#contact"
    );
  };

  return (
    <motion.a
      href="#contact"
      style={{
        x: springX,
        y: springY,
      }}
      onClick={handleClick}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={
        reduceMotion
          ? undefined
          : {
              scale: 1.04,
            }
      }
      whileTap={
        reduceMotion
          ? undefined
          : {
              scale: 0.96,
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
        text-[#0089BA]
        dark:text-[#8BEAFF]
      "
    >
      Talk to our team

      <motion.span
        whileHover={
          reduceMotion
            ? undefined
            : {
                rotate: -45,
                x: 4,
                scale: 1.08,
              }
        }
        animate={
          reduceMotion
            ? undefined
            : {
                rotate: [
                  0,
                  -3,
                  0,
                ],
              }
        }
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-[#00A9E0]/20
          transition-all
          duration-300
          group-hover:border-[#00A9E0]/50
          group-hover:bg-[#00A9E0]/[0.08]
          group-hover:shadow-[0_0_25px_rgba(0,169,224,0.18)]
          dark:border-[#5DDBFF]/20
          dark:group-hover:border-[#5DDBFF]/40
        "
      >
        →
      </motion.span>
    </motion.a>
  );
}

/* =========================================================================
   MAIN SECTION
=========================================================================== */

export default function BusinessSolutionsSection() {
  const sectionRef = useRef(null);

  const reduceMotion =
    useReducedMotion();

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        "start end",
        "end start",
      ],
    });

  /* -----------------------------------------------------------------------
     PARALLAX
  ----------------------------------------------------------------------- */

  const backgroundX =
    useTransform(
      scrollYProgress,
      [0, 1],
      ["-8%", "8%"]
    );

  const backgroundY =
    useTransform(
      scrollYProgress,
      [0, 1],
      ["8%", "-8%"]
    );

  const backgroundScale =
    useTransform(
      scrollYProgress,
      [0, 0.5, 1],
      [0.85, 1.08, 0.9]
    );

  const headingY =
    useTransform(
      scrollYProgress,
      [0, 1],
      [45, -45]
    );

  /* -----------------------------------------------------------------------
     ORB PARALLAX
  ----------------------------------------------------------------------- */

  const orbX = useTransform(
    scrollYProgress,
    [0, 1],
    ["18%", "-18%"]
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
        py-24
        text-[#071827]
        dark:bg-[#07131F]
        dark:text-white
        md:py-32
        lg:py-40
      "
    >
      {/* ===================================================================
          BACKGROUND
      ==================================================================== */}

      <motion.div
        aria-hidden
        style={{
          x: backgroundX,
          y: backgroundY,
          scale: backgroundScale,
        }}
        className="
          pointer-events-none
          absolute
          left-[58%]
          top-[8%]
          z-0
          h-[560px]
          w-[560px]
          -translate-x-1/2
          rounded-full
          bg-[#00A9E0]/[0.055]
          blur-[125px]
          dark:bg-[#00D9FF]/[0.035]
        "
      />

      <FloatingOrb
        style={{
          x: orbX,
        }}
        className="
          bottom-[20%]
          right-[-10%]
          h-[430px]
          w-[430px]
          bg-[#00A878]/[0.035]
          dark:bg-[#00A878]/[0.02]
        "
      />

      <div
        aria-hidden
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          opacity-[0.022]
          [background-image:linear-gradient(#0089BA_1px,transparent_1px),linear-gradient(90deg,#0089BA_1px,transparent_1px)]
          [background-size:48px_48px]
          dark:opacity-[0.03]
        "
      />

      {/* ===================================================================
          CONTENT
      ==================================================================== */}

      <div className="container-x relative z-10 px-5 md:px-0">
        {/* =================================================================
            HEADER
        ================================================================== */}

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
                  y: 40,
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
            duration: 0.85,
            ease: EASE,
          }}
        >
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
                duration: 0.7,
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
                text-[#0089BA]
                dark:text-[#5DDBFF]
                md:text-[10px]
              "
            >
              Who We Build For
            </span>
          </div>

          <div
            className="
              mt-5
              flex
              flex-col
              gap-8
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
                md:text-6xl
                lg:text-[7rem]
              "
            >
              <SplitWords text="Built for" />

              <span
                className="
                  block
                  text-[#0089BA]
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
                x: 30,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.75,
                delay: 0.2,
                ease: EASE,
              }}
              className="
                max-w-xl
                text-sm
                leading-[1.8]
                text-[#526477]
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

        {/* =================================================================
            CARDS
        ================================================================== */}

        <div
          className="
            mt-16
            grid
            gap-5
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
              />
            )
          )}
        </div>

        {/* =================================================================
            CTA
        ================================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
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
            duration: 0.8,
            ease: EASE,
          }}
          className="
            mt-14
            flex
            flex-col
            gap-6
            border-t
            border-black/[0.07]
            pt-7
            dark:border-white/[0.07]
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
                text-[#0089BA]
                dark:text-[#5DDBFF]
              "
            >
              One team. Every digital need.
            </span>

            <p
              className="
                mt-2
                max-w-2xl
                text-sm
                leading-relaxed
                text-[#637587]
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
          />
        </motion.div>
      </div>
    </section>
  );
}