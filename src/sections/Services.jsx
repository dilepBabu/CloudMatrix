import {
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";

import { motion } from "framer-motion";

import ScrollReveal from "../components/ScrollReveal";
import NodeSpine from "../components/NodeSpine";
import TiltCard from "../components/TiltCard";
import ParallaxImageReveal from "../components/Parallaximagereveal";

import { useCursor } from "../context/CursorContext";
import { services } from "../data/content";
import { asserts } from "../assets/asserts.mjs";

/* ============================================================================
   SERVICE IMAGES
============================================================================ */

const images = {
  "web-development": asserts.web,
  "digital-marketing": asserts.dm,
  erp: asserts.erp,
  crm: asserts.crm,
  ecommerce: asserts.ecommerce,
  "app-development": asserts.app,
  "agentic-ai-services": asserts.agentic,
  "web-design": asserts.webdesign,
};

/* ============================================================================
   EASING
============================================================================ */

const smoothEase = [
  0.16,
  1,
  0.3,
  1,
];

/* ============================================================================
   PERFORMANCE MODE
============================================================================ */

function usePerformanceMode() {
  const [mode, setMode] =
    useState("touch");

  useEffect(() => {
    if (
      typeof window ===
      "undefined"
    ) {
      return undefined;
    }

    const getMode = () => {
      const width =
        window.innerWidth;

      const fine =
        window.matchMedia(
          "(pointer: fine)"
        ).matches;

      const coarse =
        window.matchMedia(
          "(pointer: coarse)"
        ).matches;

      const cores =
        navigator.hardwareConcurrency ||
        4;

      const memory =
        navigator.deviceMemory ||
        4;

      if (!fine || coarse) {
        return "touch";
      }

      if (
        width >= 1440 &&
        cores >= 6 &&
        memory >= 6
      ) {
        return "full";
      }

      return "light";
    };

    const update = () => {
      setMode(getMode());
    };

    update();

    window.addEventListener(
      "resize",
      update,
      {
        passive: true,
      }
    );

    const pointerQuery =
      window.matchMedia(
        "(pointer: fine)"
      );

    const coarseQuery =
      window.matchMedia(
        "(pointer: coarse)"
      );

    pointerQuery.addEventListener?.(
      "change",
      update
    );

    coarseQuery.addEventListener?.(
      "change",
      update
    );

    return () => {
      window.removeEventListener(
        "resize",
        update
      );

      pointerQuery.removeEventListener?.(
        "change",
        update
      );

      coarseQuery.removeEventListener?.(
        "change",
        update
      );
    };
  }, []);

  return mode;
}

/* ============================================================================
   SERVICE ROW
============================================================================ */

const ServiceRow = memo(
  function ServiceRow({
    service,
    index,
    performance = "light",
  }) {
    const fromLeft =
      index % 2 === 0;

    const {
      setCursor,
      clearCursor,
    } =
      useCursor() || {};

    const imageSrc =
      images[service.id] ||
      asserts.web;

    /* ==========================================================
       CURSOR
    =========================================================== */

    const handleImageEnter =
      useCallback(() => {
        setCursor?.({
          label: "View",
        });
      }, [setCursor]);

    const handleImageLeave =
      useCallback(() => {
        clearCursor?.();
      }, [clearCursor]);

    /* ==========================================================
       MOBILE / TABLET / LAPTOP
    =========================================================== */

    if (
      performance !== "full"
    ) {
      return (
        <article
          id={service.id}
          className="
            relative
            w-full

            /* MOBILE */

            py-8

            /* SMALL TABLET */

            sm:py-9

            /* TABLET */

            md:py-10

            /* LAPTOP */

            lg:min-h-[430px]
            lg:py-0

            /* LARGE LAPTOP */

            xl:min-h-[460px]

            /* LARGE DESKTOP */

            2xl:min-h-[490px]
          "
        >
          <div
            className="
              container-x

              grid

              w-full

              grid-cols-1

              items-center

              gap-7

              sm:gap-8

              md:gap-9

              lg:grid-cols-2

              lg:gap-10

              xl:gap-12

              2xl:gap-14
            "
          >
            {/* ====================================================
                IMAGE
            ===================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                x: fromLeft
                  ? -20
                  : 20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: false,
                amount: 0.08,
              }}
              transition={{
                x: {
                  type: "spring",
                  stiffness: 120,
                  damping: 24,
                  mass: 0.65,
                },
                opacity: {
                  duration: 0.28,
                  ease: "easeOut",
                },
              }}
              className={`
                relative
                w-full

                ${
                  fromLeft
                    ? "lg:order-1"
                    : "lg:order-2"
                }
              `}
            >
              <div
                className="
                  group

                  relative

                  aspect-[16/10]

                  w-full

                  overflow-hidden

                  rounded-[1.3rem]

                  border

                  border-[#D7E8F1]

                  bg-[#EAF5FA]

                  shadow-[0_15px_40px_rgba(2,132,199,0.07)]

                  sm:rounded-[1.45rem]

                  md:rounded-[1.6rem]

                  dark:border-[#16445E]

                  dark:bg-[#082132]

                  dark:shadow-none
                "
              >
                <img
                  src={imageSrc}
                  alt={service.name}
                  loading={
                    index < 2
                      ? "eager"
                      : "lazy"
                  }
                  decoding="async"
                  draggable="false"
                  className="
                    h-full
                    w-full

                    object-cover
                    object-center

                    grayscale-[8%]

                    transition-[filter,transform]

                    duration-500
                    ease-out

                    group-hover:grayscale-0
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute
                    inset-0

                    bg-gradient-to-t

                    from-[#06263A]/65

                    via-transparent

                    to-transparent

                    dark:from-[#020F1A]/70
                  "
                />

                <span
                  className="
                    pointer-events-none

                    absolute

                    bottom-4
                    left-4

                    z-20

                    font-mono

                    text-[8px]

                    uppercase

                    tracking-[0.22em]

                    text-white/90

                    sm:bottom-5
                    sm:left-5

                    sm:text-[9px]
                  "
                >
                  {service.tags?.[0] ||
                    service.name}
                </span>
              </div>
            </motion.div>

            {/* ====================================================
                TEXT
            ===================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                x: fromLeft
                  ? 20
                  : -20,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: false,
                amount: 0.08,
              }}
              transition={{
                x: {
                  type: "spring",
                  stiffness: 120,
                  damping: 24,
                  mass: 0.65,
                },
                opacity: {
                  duration: 0.28,
                  ease: "easeOut",
                },
              }}
              className={`
                min-w-0

                ${
                  fromLeft
                    ? "lg:order-2"
                    : "lg:order-1"
                }
              `}
            >
              {/* NUMBER */}

              <div
                className="
                  inline-flex

                  items-center
                  gap-3

                  font-mono

                  text-[10px]

                  tracking-[0.15em]

                  text-[#0284C7]

                  dark:text-[#38BDF8]
                "
              >
                <span
                  className="
                    h-px
                    w-7

                    bg-[#0EA5E9]/60

                    dark:bg-[#38BDF8]/50
                  "
                />

                {String(
                  index + 1
                ).padStart(2, "0")}

                <span className="opacity-40">
                  /
                </span>

                {String(
                  services.length
                ).padStart(2, "0")}
              </div>

              {/* TITLE */}

              <h3
                className="
                  mt-3.5

                  max-w-2xl

                  font-display

                  text-[2rem]

                  font-bold

                  leading-[1.01]

                  tracking-[-0.035em]

                  text-[#0B2533]

                  dark:text-[#F4FBFF]

                  sm:text-[2.15rem]

                  md:text-[2.7rem]

                  lg:text-[2.75rem]

                  xl:text-[3.05rem]

                  2xl:text-[3.3rem]
                "
              >
                {service.name}
              </h3>

              {/* UNDERLINE */}

              <div
                className="
                  mt-3

                  h-[2px]

                  w-16

                  rounded-full

                  bg-gradient-to-r

                  from-[#0284C7]

                  via-[#38BDF8]

                  to-transparent

                  dark:from-[#38BDF8]

                  dark:via-[#22D3EE]

                  dark:to-transparent
                "
              />

              {/* DESCRIPTION */}

              <p
                className="
                  mt-4

                  max-w-xl

                  text-[14px]

                  leading-[1.65]

                  text-[#506875]

                  dark:text-[#A9C4D3]

                  sm:text-[15px]

                  md:text-base

                  xl:text-[15px]
                "
              >
                {service.description}
              </p>

              {/* VALUE */}

              <div
                className="
                  relative

                  mt-4

                  max-w-xl

                  overflow-hidden

                  rounded-2xl

                  border

                  border-[#CFE8F4]

                  bg-[#EAF7FD]/90

                  px-4
                  py-2.5

                  dark:border-[#1B5875]

                  dark:bg-[#0A2638]/80
                "
              >
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none

                    absolute
                    inset-0

                    bg-gradient-to-r

                    from-[#38BDF8]/[0.07]

                    via-transparent

                    to-transparent
                  "
                />

                <div
                  className="
                    relative

                    z-10

                    flex

                    items-start

                    gap-3
                  "
                >
                  <span
                    className="
                      mt-0.5

                      text-[#0284C7]

                      dark:text-[#38BDF8]
                    "
                  >
                    ◆
                  </span>

                  <p
                    className="
                      text-[13px]

                      font-medium

                      leading-5

                      text-[#075985]

                      dark:text-[#D7F4FF]

                      sm:text-sm
                    "
                  >
                    {service.value}
                  </p>
                </div>
              </div>

              {/* TAGS */}

              <div
                className="
                  mt-4

                  flex

                  flex-wrap

                  gap-1.5
                "
              >
                {service.tags.map(
                  (
                    tag,
                    tagIndex
                  ) => (
                    <span
                      key={`${tag}-${tagIndex}`}
                      className="
                        rounded-full

                        border

                        border-[#D5E7EF]

                        bg-white/60

                        px-2.5
                        py-1.5

                        font-mono

                        text-[9px]

                        text-[#526B77]

                        sm:text-[10px]

                        dark:border-[#21475D]

                        dark:bg-[#071D2B]/60

                        dark:text-[#AFC7D4]
                      "
                    >
                      {tag}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          </div>
        </article>
      );
    }

    /* ==========================================================================
       FULL DESKTOP
    ========================================================================== */

    return (
      <article
        id={service.id}
        className="
          relative

          w-full

          min-h-[430px]

          xl:min-h-[460px]

          2xl:min-h-[490px]
        "
      >
        {/* ======================================================
            SOFT SIDE GLOW
        ======================================================= */}

        <div
          aria-hidden="true"
          className={`
            pointer-events-none

            absolute

            top-1/2

            hidden

            h-48
            w-48

            -translate-y-1/2

            rounded-full

            bg-[#38BDF8]/[0.028]

            blur-[55px]

            lg:block

            dark:bg-[#22D3EE]/[0.025]

            ${
              fromLeft
                ? "left-[8%]"
                : "right-[8%]"
            }
          `}
        />

        {/* ======================================================
            CONTENT GRID
        ======================================================= */}

        <div
          className="
            container-x

            grid

            min-h-[430px]

            w-full

            items-center

            gap-10

            lg:grid-cols-2

            lg:gap-11

            xl:min-h-[460px]

            xl:gap-12

            2xl:min-h-[490px]

            2xl:gap-14
          "
        >
          {/* ====================================================
              IMAGE
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: fromLeft
                ? -25
                : 25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: false,
              amount: 0.1,
            }}
            transition={{
              duration: 0.58,
              ease: smoothEase,
            }}
            className={`
              relative
              w-full

              ${
                fromLeft
                  ? "lg:order-1"
                  : "lg:order-2"
              }
            `}
          >
            {/* IMAGE GLOW */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none

                absolute

                -inset-3

                rounded-[1.8rem]

                bg-gradient-to-r

                from-[#38BDF8]/[0.045]

                via-[#0EA5E9]/[0.035]

                to-[#2563EB]/[0.045]

                blur-xl
              "
            />

            {/* IMAGE */}

            <TiltCard
              max={4}
              spotlight
              onPointerEnter={
                handleImageEnter
              }
              onPointerLeave={
                handleImageLeave
              }
              className="
                group

                relative

                aspect-[16/10]

                w-full

                overflow-hidden

                rounded-[1.4rem]

                border

                border-[#D7E8F1]

                bg-[#EAF5FA]

                shadow-[0_16px_45px_rgba(2,132,199,0.07)]

                dark:border-[#16445E]

                dark:bg-[#082132]

                dark:shadow-[0_20px_55px_rgba(0,0,0,0.18)]

                xl:rounded-[1.55rem]

                2xl:rounded-[1.7rem]
              "
            >
              {/* FALLBACK */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute

                  inset-0

                  z-0

                  bg-gradient-to-br

                  from-[#EAF7FD]

                  via-[#DDF3FB]

                  to-[#CFEAF6]

                  dark:from-[#082132]

                  dark:via-[#0A2A3D]

                  dark:to-[#061A29]
                "
              />

              {/* IMAGE */}

              <ParallaxImageReveal
                src={imageSrc}
                alt={service.name}
                eager={index < 2}
                imageClassName="
                  h-full
                  w-full

                  object-cover
                  object-center

                  grayscale-[8%]

                  transition-[filter,transform]

                  duration-500

                  ease-out

                  group-hover:grayscale-0
                "
              />

              {/* IMAGE TINT */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute

                  inset-0

                  z-20

                  bg-gradient-to-t

                  from-[#06263A]/65

                  via-[#0EA5E9]/[0.02]

                  to-transparent

                  dark:from-[#020F1A]/70

                  dark:via-[#0EA5E9]/[0.03]

                  dark:to-transparent
                "
              />

              {/* SUBTLE GLOW */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute

                  left-[25%]

                  top-[10%]

                  z-20

                  h-[28%]

                  w-[28%]

                  rounded-full

                  bg-[#38BDF8]/[0.045]

                  blur-3xl
                "
              />

              {/* LIGHT SWEEP */}

              <motion.div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute

                  inset-y-0

                  -left-[35%]

                  z-30

                  w-[24%]

                  skew-x-[-18deg]

                  bg-gradient-to-r

                  from-transparent

                  via-white/[0.08]

                  to-transparent
                "
                animate={{
                  x: [
                    "0%",
                    "470%",
                  ],
                }}
                transition={{
                  duration: 5.5,
                  repeat: Infinity,
                  repeatDelay: 9,
                  ease: "easeInOut",
                }}
              />

              {/* CORNER */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute

                  right-4
                  top-4

                  z-40

                  h-10
                  w-10

                  rounded-tr-xl

                  border-r
                  border-t

                  border-white/30

                  xl:right-5
                  xl:top-5

                  xl:h-11
                  xl:w-11
                "
              />

              {/* TAG */}

              <span
                className="
                  pointer-events-none

                  absolute

                  bottom-4
                  left-4

                  z-40

                  font-mono

                  text-[8px]

                  uppercase

                  tracking-[0.22em]

                  text-white/90

                  xl:bottom-5
                  xl:left-5

                  xl:text-[9px]
                "
              >
                {service.tags?.[0] ||
                  service.name}
              </span>

              {/* VIEW */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute

                  left-1/2
                  top-1/2

                  z-50

                  flex

                  h-12
                  w-12

                  -translate-x-1/2
                  -translate-y-1/2

                  items-center
                  justify-center

                  rounded-full

                  border

                  border-white/35

                  bg-black/15

                  text-[7px]

                  font-semibold

                  uppercase

                  tracking-[0.18em]

                  text-white

                  opacity-0

                  scale-90

                  backdrop-blur-sm

                  transition-all

                  duration-300

                  group-hover:scale-100

                  group-hover:opacity-100

                  xl:h-14
                  xl:w-14

                  xl:text-[8px]
                "
              >
                View
              </div>
            </TiltCard>
          </motion.div>

          {/* ====================================================
              TEXT
          ===================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: fromLeft
                ? 25
                : -25,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{
              once: false,
              amount: 0.1,
            }}
            transition={{
              duration: 0.58,
              delay: 0.03,
              ease: smoothEase,
            }}
            className={`
              min-w-0

              ${
                fromLeft
                  ? "lg:order-2"
                  : "lg:order-1"
              }
            `}
          >
            {/* NUMBER */}

            <div
              className="
                inline-flex

                items-center

                gap-3

                font-mono

                text-[9px]

                tracking-[0.16em]

                text-[#0284C7]

                dark:text-[#38BDF8]
              "
            >
              <span
                className="
                  h-px

                  w-8

                  bg-[#0EA5E9]/60

                  dark:bg-[#38BDF8]/50
                "
              />

              {String(
                index + 1
              ).padStart(2, "0")}

              <span className="opacity-40">
                /
              </span>

              {String(
                services.length
              ).padStart(2, "0")}
            </div>

            {/* TITLE */}

            <motion.h3
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
                amount: 0.1,
              }}
              transition={{
                duration: 0.45,
                ease: smoothEase,
              }}
              className="
                mt-3.5

                max-w-2xl

                font-display

                text-[2.6rem]

                font-bold

                leading-[0.96]

                tracking-[-0.045em]

                text-[#0B2533]

                dark:text-[#F4FBFF]

                xl:text-[3.05rem]

                2xl:text-[3.35rem]
              "
            >
              {service.name}
            </motion.h3>

            {/* UNDERLINE */}

            <motion.div
              initial={{
                scaleX: 0,
              }}
              whileInView={{
                scaleX: 1,
              }}
              viewport={{
                once: false,
                amount: 0.1,
              }}
              transition={{
                duration: 0.4,
                ease: smoothEase,
              }}
              className="
                mt-3

                h-[2px]

                w-20

                origin-left

                rounded-full

                bg-gradient-to-r

                from-[#0284C7]

                via-[#38BDF8]

                to-transparent

                dark:from-[#38BDF8]

                dark:via-[#22D3EE]

                dark:to-transparent
              "
            />

            {/* DESCRIPTION */}

            <motion.p
              initial={{
                opacity: 0,
                y: 8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
                amount: 0.1,
              }}
              transition={{
                duration: 0.45,
                delay: 0.04,
                ease: smoothEase,
              }}
              className="
                mt-4

                max-w-xl

                text-[14px]

                leading-[1.68]

                text-[#506875]

                dark:text-[#A9C4D3]

                xl:text-[15px]
              "
            >
              {service.description}
            </motion.p>

            {/* VALUE */}

            <motion.div
              initial={{
                opacity: 0,
                y: 8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
                amount: 0.1,
              }}
              transition={{
                duration: 0.45,
                delay: 0.07,
                ease: smoothEase,
              }}
              className="
                relative

                mt-4

                max-w-xl

                overflow-hidden

                rounded-2xl

                border

                border-[#CFE8F4]

                bg-[#EAF7FD]/90

                px-4

                py-2.5

                dark:border-[#1B5875]

                dark:bg-[#0A2638]/80
              "
            >
              <div
                aria-hidden="true"
                className="
                  pointer-events-none

                  absolute
                  inset-0

                  bg-gradient-to-r

                  from-[#38BDF8]/[0.07]

                  via-transparent

                  to-transparent
                "
              />

              <div
                className="
                  relative

                  z-10

                  flex

                  items-start

                  gap-3
                "
              >
                <span
                  className="
                    mt-0.5

                    text-[#0284C7]

                    dark:text-[#38BDF8]
                  "
                >
                  ◆
                </span>

                <p
                  className="
                    text-[12px]

                    font-medium

                    leading-5

                    text-[#075985]

                    dark:text-[#D7F4FF]

                    xl:text-[13px]
                  "
                >
                  {service.value}
                </p>
              </div>
            </motion.div>

            {/* TAGS */}

            <motion.div
              initial={{
                opacity: 0,
                y: 6,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
                amount: 0.1,
              }}
              transition={{
                duration: 0.4,
                delay: 0.1,
                ease: smoothEase,
              }}
              className="
                mt-4

                flex

                flex-wrap

                gap-1.5
              "
            >
              {service.tags.map(
                (
                  tag,
                  tagIndex
                ) => (
                  <motion.span
                    key={`${tag}-${tagIndex}`}
                    whileHover={{
                      y: -1,
                    }}
                    transition={{
                      duration: 0.16,
                    }}
                    className="
                      rounded-full

                      border

                      border-[#D5E7EF]

                      bg-white/60

                      px-2.5
                      py-1.5

                      font-mono

                      text-[9px]

                      text-[#526B77]

                      transition-colors

                      duration-200

                      hover:border-[#0EA5E9]

                      hover:text-[#0284C7]

                      dark:border-[#21475D]

                      dark:bg-[#071D2B]/60

                      dark:text-[#AFC7D4]

                      dark:hover:border-[#38BDF8]/50

                      dark:hover:text-[#38BDF8]
                    "
                  >
                    {tag}
                  </motion.span>
                )
              )}
            </motion.div>
          </motion.div>
        </div>
      </article>
    );
  }
);

/* ============================================================================
   SERVICES SECTION
============================================================================ */

export default function Services() {
  const performance =
    usePerformanceMode();

  return (
    <section
      id="services"
      className="
        relative

        overflow-hidden

        bg-[#F5FAFD]

        text-[#0B2533]

        /* =========================================
           SECTION SPACING
        ========================================= */

        py-10

        sm:py-11

        md:py-12

        lg:py-14

        xl:py-16

        dark:bg-[#061B2A]

        dark:text-white
      "
    >
      {/* =========================================================
          STATIC GRID
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none

          absolute

          inset-0

          opacity-[0.012]

          [background-image:linear-gradient(rgba(14,165,233,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.8)_1px,transparent_1px)]

          [background-size:60px_60px]

          dark:opacity-[0.018]
        "
      />

      {/* =========================================================
          WATERMARK
      ========================================================== */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none

          absolute

          left-1/2

          top-3

          z-0

          -translate-x-1/2

          select-none

          whitespace-nowrap

          font-display

          text-[14vw]

          font-bold

          leading-none

          tracking-tight

          text-[#0284C7]/[0.014]

          dark:text-[#38BDF8]/[0.016]
        "
      >
        SERVICES
      </span>

      {/* =========================================================
          HEADER
      ========================================================== */}

      <div
        className="
          container-x

          relative

          z-10

          mb-7

          md:mb-8

          lg:mb-9

          xl:mb-10
        "
      >
        <ScrollReveal
          className="max-w-2xl"
        >
          <p
            className="
              eyebrow

              mb-3

              text-[#0284C7]

              dark:text-[#38BDF8]
            "
          >
            What We Offer
          </p>

          <h2
            className="
              font-display

              text-4xl

              font-bold

              leading-[1.03]

              tracking-[-0.045em]

              text-[#0B2533]

              dark:text-[#F5FBFF]

              sm:text-5xl

              md:text-6xl

              xl:text-7xl
            "
          >
            Our{" "}
            <span
              className="
                relative

                inline-block

                bg-gradient-to-r

                from-[#0369A1]

                via-[#0EA5E9]

                to-[#2563EB]

                bg-clip-text

                text-transparent

                dark:from-[#38BDF8]

                dark:via-[#22D3EE]

                dark:to-[#60A5FA]
              "
            >
              Services

              <motion.span
                initial={{
                  scaleX: 0,
                }}
                whileInView={{
                  scaleX: 1,
                }}
                viewport={{
                  once: false,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.5,
                  ease: smoothEase,
                }}
                className="
                  absolute

                  -bottom-1.5

                  left-0

                  h-[3px]

                  w-full

                  origin-left

                  rounded-full

                  bg-gradient-to-r

                  from-[#0284C7]

                  via-[#38BDF8]

                  to-transparent

                  dark:from-[#38BDF8]

                  dark:via-[#60A5FA]

                  dark:to-transparent
                "
              />
            </span>
          </h2>

          <p
            className="
              mt-4

              max-w-xl

              text-[14px]

              leading-[1.68]

              text-[#536B77]

              dark:text-[#A9C5D5]

              sm:text-[15px]

              md:text-base

              lg:text-lg
            "
          >
            Comprehensive technology solutions
            to help your business thrive in the
            digital world. Scroll through — each
            capability gets the room it deserves.
          </p>
        </ScrollReveal>
      </div>

      {/* =========================================================
          SERVICE LIST + CENTER SPINE

          NodeSpine is restored here.

          It sits behind the service rows and gives the
          sequence a clear visual center without adding
          extra spacing to the content itself.
      ========================================================== */}

      <div
        className="
          relative

          z-10

          w-full

          overflow-hidden
        "
      >
        {/* CENTER NODE SPINE */}

        <div
          aria-hidden="true"
          className="
            pointer-events-none

            absolute

            inset-y-0

            left-1/2

            z-0

            hidden

            -translate-x-1/2

            lg:block
          "
        >
          <NodeSpine
            nodeCount={
              services.length
            }
          />
        </div>

        {/* SERVICE ROWS */}

        <div
          className="
            relative

            z-10
          "
        >
          {services.map(
            (
              service,
              index
            ) => (
              <ServiceRow
                key={service.id}
                service={service}
                index={index}
                performance={
                  performance
                }
              />
            )
          )}
        </div>
      </div>

      {/* =========================================================
          TINY FINAL SPACE

          Prevents the last row from touching the next section
          while keeping the previous large bottom gap removed.
      ========================================================== */}

      <div
        aria-hidden="true"
        className="
          h-3
          w-full
        "
      />
    </section>
  );
}