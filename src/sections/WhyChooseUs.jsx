import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  useCallback,
  useEffect,
  useState,
} from "react";
import { whyChooseUs } from "../data/content";

/* ============================================================================
   CONFIG
============================================================================ */

const EASE = [0.22, 1, 0.36, 1];

const AUTOPLAY_DELAY = 6800;
const TRANSITION_DURATION = 1.05;
const SWIPE_DISTANCE = 55;

/* ============================================================================
   MAIN
============================================================================ */

export default function WhyChooseUs() {
  const reduceMotion = useReducedMotion();

  const items = Array.isArray(whyChooseUs)
    ? whyChooseUs
    : [];

  const count = items.length;

  const [activeIndex, setActiveIndex] = useState(0);

  /* --------------------------------------------------------------------------
     GO TO SLIDE
     -------------------------------------------------------------------------- */

  const goTo = useCallback(
    (index) => {
      if (count <= 0) return;

      const normalized =
        ((index % count) + count) % count;

      setActiveIndex(normalized);
    },
    [count]
  );

  /* --------------------------------------------------------------------------
     NEXT
     -------------------------------------------------------------------------- */

  const next = useCallback(() => {
    if (count <= 1) return;

    setActiveIndex((current) => {
      return (current + 1) % count;
    });
  }, [count]);

  /* --------------------------------------------------------------------------
     PREVIOUS
     -------------------------------------------------------------------------- */

  const previous = useCallback(() => {
    if (count <= 1) return;

    setActiveIndex((current) => {
      return (
        (current - 1 + count) % count
      );
    });
  }, [count]);

  /* --------------------------------------------------------------------------
     ALWAYS RUNNING AUTOPLAY

     This does NOT depend on:
     - hover
     - click
     - drag
     - arrow
     - dot

     Therefore autoplay continues normally after manual navigation.
     -------------------------------------------------------------------------- */

  useEffect(() => {
    if (reduceMotion) return undefined;
    if (count <= 1) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => {
        return (current + 1) % count;
      });
    }, AUTOPLAY_DELAY);

    return () => {
      window.clearInterval(timer);
    };
  }, [count, reduceMotion]);

  /* --------------------------------------------------------------------------
     KEYBOARD NAVIGATION
     -------------------------------------------------------------------------- */

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previous();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [next, previous]);

  /* --------------------------------------------------------------------------
     EMPTY DATA
     -------------------------------------------------------------------------- */

  if (!count) {
    return null;
  }

  /* --------------------------------------------------------------------------
     REDUCED MOTION
     -------------------------------------------------------------------------- */

  if (reduceMotion) {
    return (
      <ReducedWhyUs items={items} />
    );
  }

  return (
    <section
      id="why-us"
      className="
        relative
        w-full
        scroll-mt-[150px]
        overflow-hidden
        bg-[#F5FAFD]
        text-[#102A43]
        dark:bg-[#061A2B]
        dark:text-[#EAF7FF]
      "
    >
      <Background />

      {/* ======================================================================
          HEADER
      ====================================================================== */}

      <div
        className="
          relative
          z-20
          mx-auto
          w-[90%]
          max-w-[1500px]
          pt-8
          sm:pt-10
          md:w-[86%]
          md:pt-12
          lg:pt-14
        "
      >
        <div
          className="
            flex
            items-start
            justify-between
            gap-6
          "
        >
          <div className="min-w-0">
            {/* Eyebrow */}
            <motion.div
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
                amount: 0.35,
              }}
              transition={{
                duration: 0.65,
                ease: EASE,
              }}
              className="
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-8
                  shrink-0
                  bg-[#1268B3]
                  dark:bg-[#48D9F2]
                "
              />

              <span
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.3em]
                  text-[#0878B8]
                  dark:text-[#48D9F2]
                  sm:text-[10px]
                "
              >
                Our strengths
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{
                opacity: 0,
                y: 24,
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
                delay: 0.05,
                ease: EASE,
              }}
              className="
                mt-3
                max-w-[900px]
                font-display
                text-[clamp(2.15rem,4.35vw,5rem)]
                font-semibold
                leading-[0.88]
                tracking-[-0.07em]
              "
            >
              Why businesses choose{" "}
              <span
                className="
                  bg-gradient-to-r
                  from-[#1268B3]
                  via-[#1BB7DD]
                  to-[#18A88A]
                  bg-clip-text
                  text-transparent
                "
              >
                Cloud Matrix
              </span>
            </motion.h2>
          </div>

          {/* Desktop counter */}
          <div
            className="
              hidden
              shrink-0
              pt-1
              font-mono
              text-[10px]
              tracking-[0.2em]
              text-[#0878B8]
              dark:text-[#48D9F2]
              sm:block
            "
          >
            {String(activeIndex + 1).padStart(
              2,
              "0"
            )}

            <span className="mx-2 opacity-30">
              /
            </span>

            {String(count).padStart(
              2,
              "0"
            )}
          </div>
        </div>
      </div>

      {/* ======================================================================
          CAROUSEL
      ====================================================================== */}

      <div
        className="
          relative
          z-20
          mt-3
          w-full
          sm:mt-4
          md:mt-5
        "
      >
        <div
          className="
            relative
            h-[405px]
            w-full
            overflow-hidden
            sm:h-[430px]
            md:h-[455px]
            lg:h-[475px]
          "
        >
          {/* Center alignment guide */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-1/2
              top-0
              z-[5]
              h-full
              w-px
              -translate-x-1/2
              bg-gradient-to-b
              from-transparent
              via-[#1268B3]/[0.035]
              to-transparent
              dark:via-[#48D9F2]/[0.045]
            "
          />

          {/* Cards */}
          <CarouselTrack
            items={items}
            activeIndex={activeIndex}
            goTo={goTo}
          />

          {/* Left fade */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-y-0
              left-0
              z-30
              w-[8%]
              bg-gradient-to-r
              from-[#F5FAFD]
              via-[#F5FAFD]/75
              to-transparent
              dark:from-[#061A2B]
              dark:via-[#061A2B]/75
            "
          />

          {/* Right fade */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-y-0
              right-0
              z-30
              w-[8%]
              bg-gradient-to-l
              from-[#F5FAFD]
              via-[#F5FAFD]/75
              to-transparent
              dark:from-[#061A2B]
              dark:via-[#061A2B]/75
            "
          />

          {/* Arrows */}
          {count > 1 && (
            <>
              <CarouselArrow
                direction="previous"
                onClick={previous}
              />

              <CarouselArrow
                direction="next"
                onClick={next}
              />
            </>
          )}
        </div>

        {/* ====================================================================
            BOTTOM CONTROLS
        ==================================================================== */}

        <div
          className="
            relative
            z-40
            mx-auto
            -mt-1
            flex
            w-[90%]
            max-w-[1500px]
            items-center
            justify-between
            gap-6
            md:w-[86%]
          "
        >
          {/* Left information */}
          <div
            className="
              hidden
              items-center
              gap-3
              md:flex
            "
          >
            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#6D8799]
                dark:text-[#8198A8]
              "
            >
              Explore advantages
            </span>

            <span
              className="
                h-px
                w-10
                bg-[#1268B3]/20
                dark:bg-[#48D9F2]/20
              "
            />
          </div>

          {/* Dots */}
          <div
            className="
              flex
              items-center
              gap-1
              sm:gap-2
            "
          >
            {items.map((item, index) => {
              const selected =
                index === activeIndex;

              return (
                <button
                  key={
                    item.title ??
                    `dot-${index}`
                  }
                  type="button"
                  aria-label={`Show advantage ${
                    index + 1
                  }`}
                  aria-current={
                    selected
                      ? "true"
                      : undefined
                  }
                  onClick={() =>
                    goTo(index)
                  }
                  className="
                    flex
                    h-7
                    items-center
                    justify-center
                  "
                >
                  <motion.span
                    animate={{
                      width: selected
                        ? 34
                        : 9,
                      opacity: selected
                        ? 1
                        : 0.28,
                    }}
                    transition={{
                      duration: 0.42,
                      ease: EASE,
                    }}
                    className="
                      h-[2px]
                      rounded-full
                      bg-[#1BB7DD]
                    "
                  />
                </button>
              );
            })}
          </div>

          {/* Counter */}
          <div
            className="
              font-mono
              text-[9px]
              tracking-[0.18em]
              text-[#6D8799]
              dark:text-[#8198A8]
              sm:text-[10px]
            "
          >
            {String(activeIndex + 1).padStart(
              2,
              "0"
            )}

            {" / "}

            {String(count).padStart(
              2,
              "0"
            )}
          </div>
        </div>
      </div>

      {/* Compact bottom spacing */}
      <div className="h-6 sm:h-8 md:h-10" />
    </section>
  );
}

/* ============================================================================
   CAROUSEL TRACK
============================================================================ */

function CarouselTrack({
  items,
  activeIndex,
  goTo,
}) {
  const count = items.length;

  return (
    <div className="absolute inset-0">
      {items.map((item, index) => {
        const relative =
          getRelativeIndex(
            index,
            activeIndex,
            count
          );

        return (
          <CarouselCard
            key={
              item.title ??
              `card-${index}`
            }
            item={item}
            index={index}
            relative={relative}
            goTo={goTo}
          />
        );
      })}
    </div>
  );
}

/* ============================================================================
   CAROUSEL CARD
============================================================================ */

function CarouselCard({
  item,
  index,
  relative,
  goTo,
}) {
  const isActive = relative === 0;

  /*
   * Stable responsive width.
   */
  const cardWidth =
    "min(70vw, 700px)";

  /*
   * Exact positioning.
   *
   * Active card:
   * 50%
   *
   * Previous:
   * 19%
   *
   * Next:
   * 81%
   */
  const position =
    relative === 0
      ? "50%"
      : relative < 0
      ? "19%"
      : "81%";

  /*
   * Active card is dominant.
   */
  const scale =
    relative === 0
      ? 1
      : 0.68;

  /*
   * Side cards are intentionally visible.
   */
  const opacity =
    relative === 0
      ? 1
      : 0.42;

  /*
   * Side cards sit slightly lower.
   */
  const y =
    relative === 0
      ? 0
      : 18;

  /*
   * Small editorial rotation.
   */
  const rotate =
    relative === 0
      ? 0
      : relative < 0
      ? -2.2
      : 2.2;

  /*
   * Only adjacent cards remain visible.
   */
  const visible =
    Math.abs(relative) <= 1;

  return (
    <motion.div
      className="
        absolute
        left-0
        top-1/2
        origin-center
        will-change-transform
      "
      style={{
        width: cardWidth,
      }}
      initial={false}
      animate={{
        left: position,
        x: "-50%",
        y: `calc(-50% + ${y}px)`,
        scale,
        opacity: visible
          ? opacity
          : 0,
        rotate,
        filter: isActive
          ? "blur(0px)"
          : "blur(0.25px)",
        zIndex: isActive
          ? 20
          : 10,
      }}
      transition={{
        duration: TRANSITION_DURATION,
        ease: EASE,
      }}
      drag={isActive ? "x" : false}
      dragConstraints={{
        left: 0,
        right: 0,
      }}
      dragElastic={0.65}
      whileTap={
        isActive
          ? {
              scale: 0.985,
            }
          : undefined
      }
      onDragEnd={(_, info) => {
        if (
          info.offset.x <
          -SWIPE_DISTANCE
        ) {
          goTo(index + 1);
          return;
        }

        if (
          info.offset.x >
          SWIPE_DISTANCE
        ) {
          goTo(index - 1);
        }
      }}
    >
      {/* ======================================================================
          CARD
      ====================================================================== */}

      <motion.div
        whileHover={
          isActive
            ? {
                y: -3,
              }
            : undefined
        }
        className="
          relative
          h-[285px]
          w-full
          overflow-hidden
          rounded-[26px]
          border
          border-[#102A43]/10
          bg-white
          shadow-[0_24px_65px_rgba(18,104,179,0.09)]
          dark:border-white/[0.08]
          dark:bg-[#0A263B]
          dark:shadow-[0_28px_70px_rgba(0,0,0,0.26)]
          sm:h-[305px]
          sm:rounded-[30px]
          md:h-[330px]
          md:rounded-[34px]
          lg:h-[350px]
          lg:rounded-[38px]
        "
      >
        {/* Accent line */}
        <div
          aria-hidden="true"
          className="
            absolute
            left-0
            right-0
            top-0
            z-20
            h-[2px]
            bg-gradient-to-r
            from-[#1268B3]
            via-[#1BB7DD]
            to-[#18A88A]
          "
        />

        {/* Top right glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-52
            w-52
            rounded-full
            bg-[radial-gradient(circle,rgba(27,183,221,0.13),transparent_68%)]
            dark:bg-[radial-gradient(circle,rgba(72,217,242,0.11),transparent_68%)]
          "
        />

        {/* Bottom left glow */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            -bottom-20
            -left-20
            h-48
            w-48
            rounded-full
            bg-[radial-gradient(circle,rgba(24,168,138,0.08),transparent_68%)]
            dark:bg-[radial-gradient(circle,rgba(24,168,138,0.07),transparent_68%)]
          "
        />

        {/* Giant number */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            right-[-0.5rem]
            top-[-1.2rem]
            font-display
            text-[clamp(8rem,20vw,16rem)]
            font-bold
            leading-none
            tracking-[-0.12em]
            text-[#1268B3]/[0.045]
            dark:text-[#48D9F2]/[0.05]
          "
        >
          {String(index + 1).padStart(
            2,
            "0"
          )}
        </div>

        {/* ====================================================================
            CARD CONTENT
        ==================================================================== */}

        <div
          className="
            relative
            z-10
            flex
            h-full
            flex-col
            justify-between
            p-5
            sm:p-6
            md:p-7
            lg:p-8
          "
        >
          {/* Top */}
          <div
            className="
              flex
              items-center
              justify-between
            "
          >
            <div
              className="
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  font-mono
                  text-[10px]
                  font-semibold
                  tracking-[0.2em]
                  text-[#0878B8]
                  dark:text-[#48D9F2]
                  sm:text-xs
                "
              >
                {String(index + 1).padStart(
                  2,
                  "0"
                )}
              </span>

              <span
                className="
                  h-px
                  w-7
                  bg-[#1BB7DD]/35
                  dark:bg-[#48D9F2]/35
                  sm:w-10
                "
              />

              <span
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#6D8799]
                  dark:text-[#8198A8]
                "
              >
                Advantage
              </span>
            </div>

            <span
              className="
                hidden
                font-mono
                text-[8px]
                tracking-[0.2em]
                text-[#6D8799]
                dark:text-[#8198A8]
                sm:block
              "
            >
              CLOUD / MATRIX
            </span>
          </div>

          {/* Main content */}
          <div
            className="
              flex
              flex-1
              flex-col
              justify-center
            "
          >
            <AnimatePresence
              mode="wait"
              initial={false}
            >
              {isActive && (
                <motion.div
                  key={`${index}-content`}
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -14,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: EASE,
                  }}
                >
                  <h3
                    className="
                      max-w-[92%]
                      font-display
                      text-[clamp(2.3rem,5.2vw,5.4rem)]
                      font-semibold
                      leading-[0.83]
                      tracking-[-0.075em]
                      text-[#102A43]
                      dark:text-[#EAF7FF]
                    "
                  >
                    {item.title}
                  </h3>

                  <div
                    className="
                      mt-5
                      h-px
                      w-12
                      bg-[#1BB7DD]/60
                      dark:bg-[#48D9F2]/50
                    "
                  />

                  <p
                    className="
                      mt-4
                      max-w-lg
                      text-[13px]
                      leading-[1.75]
                      text-[#58738A]
                      dark:text-[#9BC0D4]
                      sm:text-sm
                      md:text-base
                    "
                  >
                    {item.description}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom */}
          <div
            className="
              flex
              items-end
              justify-between
              gap-5
            "
          >
            <div>
              <span
                className="
                  text-[8px]
                  font-semibold
                  uppercase
                  tracking-[0.25em]
                  text-[#6D8799]
                  dark:text-[#8198A8]
                "
              >
                Cloud Matrix
              </span>

              <div
                className="
                  mt-1.5
                  text-[9px]
                  text-[#58738A]
                  dark:text-[#9BC0D4]
                  sm:text-[10px]
                "
              >
                Digital systems
                <span className="mx-1.5 opacity-40">
                  /
                </span>
                Built for growth
              </div>
            </div>

            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                border-[#1268B3]/15
                text-sm
                text-[#1268B3]
                dark:border-[#48D9F2]/20
                dark:text-[#48D9F2]
              "
            >
              ↗
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ============================================================================
   IMPORTANT: THIS WAS MISSING IN THE PREVIOUS VERSION
============================================================================ */

function getRelativeIndex(
  index,
  active,
  count
) {
  if (count <= 1) {
    return 0;
  }

  let difference =
    index - active;

  /*
   * Make the carousel circular.
   *
   * Example:
   *
   * active = 0
   * last item = -1
   *
   * instead of:
   *
   * last item = +4
   */
  if (difference > count / 2) {
    difference -= count;
  }

  if (difference < -count / 2) {
    difference += count;
  }

  /*
   * Only the immediate neighbors are needed.
   */
  if (difference < -1) {
    return -2;
  }

  if (difference > 1) {
    return 2;
  }

  return difference;
}

/* ============================================================================
   CAROUSEL ARROW
============================================================================ */

function CarouselArrow({
  direction,
  onClick,
}) {
  const isPrevious =
    direction === "previous";

  return (
    <button
      type="button"
      aria-label={
        isPrevious
          ? "Previous advantage"
          : "Next advantage"
      }
      onClick={onClick}
      className={`
        group
        absolute
        ${
          isPrevious
            ? "left-[3.5%]"
            : "right-[3.5%]"
        }
        top-1/2
        z-50
        hidden
        h-11
        w-11
        -translate-y-1/2
        items-center
        justify-center
        rounded-full
        border
        border-[#102A43]/10
        bg-white/80
        shadow-[0_8px_25px_rgba(18,104,179,0.07)]
        backdrop-blur-md
        transition-all
        duration-300
        hover:scale-105
        hover:border-[#1BB7DD]/40
        hover:bg-white
        dark:border-white/10
        dark:bg-[#0A263B]/80
        dark:hover:bg-[#0E3049]
        lg:flex
      `}
    >
      <span
        className={`
          text-base
          leading-none
          text-[#1268B3]
          transition-transform
          duration-300
          dark:text-[#48D9F2]
          ${
            isPrevious
              ? "group-hover:-translate-x-0.5"
              : "group-hover:translate-x-0.5"
          }
        `}
      >
        {isPrevious ? "←" : "→"}
      </span>
    </button>
  );
}

/* ============================================================================
   BACKGROUND
============================================================================ */

function Background() {
  return (
    <>
      {/* Central ambient glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[54%]
          h-[560px]
          w-[560px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(27,183,221,0.05),transparent_68%)]
          blur-[18px]
          dark:bg-[radial-gradient(circle,rgba(72,217,242,0.05),transparent_68%)]
        "
      />

      {/* Fine grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.018]
          [background-image:linear-gradient(#1268B3_1px,transparent_1px),linear-gradient(90deg,#1268B3_1px,transparent_1px)]
          [background-size:80px_80px]
          dark:opacity-[0.03]
        "
      />

      {/* Top fade */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-24
          bg-gradient-to-b
          from-[#F5FAFD]
          to-transparent
          dark:from-[#061A2B]
        "
      />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          h-20
          bg-gradient-to-t
          from-[#F5FAFD]
          to-transparent
          dark:from-[#061A2B]
        "
      />
    </>
  );
}

/* ============================================================================
   REDUCED MOTION
============================================================================ */

function ReducedWhyUs({
  items,
}) {
  return (
    <section
      id="why-us"
      className="
        relative
        scroll-mt-[150px]
        bg-[#F5FAFD]
        px-5
        py-20
        text-[#102A43]
        dark:bg-[#061A2B]
        dark:text-[#EAF7FF]
        md:py-24
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1380px]
        "
      >
        <div className="flex items-center gap-3">
          <span
            className="
              h-px
              w-8
              bg-[#1268B3]
              dark:bg-[#48D9F2]
            "
          />

          <span
            className="
              text-[9px]
              font-semibold
              uppercase
              tracking-[0.3em]
              text-[#0878B8]
              dark:text-[#48D9F2]
            "
          >
            Our strengths
          </span>
        </div>

        <h2
          className="
            mt-3
            max-w-4xl
            font-display
            text-4xl
            font-semibold
            leading-[0.88]
            tracking-[-0.06em]
            md:text-6xl
          "
        >
          Why businesses choose{" "}
          <span
            className="
              bg-gradient-to-r
              from-[#1268B3]
              via-[#1BB7DD]
              to-[#18A88A]
              bg-clip-text
              text-transparent
            "
          >
            Cloud Matrix
          </span>
        </h2>

        <div
          className="
            mt-10
            grid
            gap-4
            md:grid-cols-2
          "
        >
          {items.map((item, index) => (
            <article
              key={
                item.title ??
                `reduced-${index}`
              }
              className="
                rounded-[24px]
                border
                border-[#D6E7F0]
                bg-white
                p-6
                dark:border-[#163B55]
                dark:bg-[#0A263B]
              "
            >
              <span
                className="
                  font-mono
                  text-xs
                  tracking-[0.18em]
                  text-[#0878B8]
                  dark:text-[#48D9F2]
                "
              >
                {String(index + 1).padStart(
                  2,
                  "0"
                )}
              </span>

              <h3
                className="
                  mt-4
                  font-display
                  text-3xl
                  font-semibold
                  leading-[0.9]
                  tracking-[-0.05em]
                "
              >
                {item.title}
              </h3>

              <p
                className="
                  mt-4
                  max-w-xl
                  text-sm
                  leading-[1.8]
                  text-[#58738A]
                  dark:text-[#9BC0D4]
                "
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}