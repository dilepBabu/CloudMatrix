import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import ScrollReveal from "../components/ScrollReveal";
import { process } from "../data/content";

/* ============================================================================
   CONFIG
============================================================================ */

const EASE = [0.16, 1, 0.3, 1];

/* ============================================================================
   DEVICE DETECTION
============================================================================ */

function useDeviceType() {
  const [device, setDevice] = useState("desktop");

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mobileQuery = window.matchMedia(
      "(max-width: 639px)"
    );

    const tabletQuery = window.matchMedia(
      "(min-width: 640px) and (max-width: 1024px)"
    );

    const coarseQuery = window.matchMedia(
      "(pointer: coarse)"
    );

    const update = () => {
      /*
       * Mobile always wins.
       */
      if (mobileQuery.matches) {
        setDevice("mobile");
        return;
      }

      /*
       * Touch/tablet devices use lighter animation.
       */
      if (
        tabletQuery.matches ||
        coarseQuery.matches
      ) {
        setDevice("tablet");
        return;
      }

      setDevice("desktop");
    };

    update();

    mobileQuery.addEventListener(
      "change",
      update
    );

    tabletQuery.addEventListener(
      "change",
      update
    );

    coarseQuery.addEventListener(
      "change",
      update
    );

    return () => {
      mobileQuery.removeEventListener(
        "change",
        update
      );

      tabletQuery.removeEventListener(
        "change",
        update
      );

      coarseQuery.removeEventListener(
        "change",
        update
      );
    };
  }, []);

  return device;
}

/* ============================================================================
   MAIN PROCESS
============================================================================ */

export default function Process() {
  const sectionRef = useRef(null);

  const reduceMotion =
    useReducedMotion();

  const device =
    useDeviceType();

  const items = Array.isArray(process)
    ? process
    : [];

  const count = items.length;

  /*
   * IMPORTANT PERFORMANCE DECISION
   *
   * We only create the scroll-linked progress
   * on desktop.
   *
   * Mobile and tablet do NOT need continuous
   * scroll calculations.
   */
  const shouldUseScrollAnimation =
    device === "desktop" &&
    !reduceMotion;

  const {
    scrollYProgress,
  } = useScroll({
    target: sectionRef,
    offset: [
      "start start",
      "end end",
    ],
  });

  /*
   * Do NOT use another useSpring here.
   *
   * The old implementation had:
   *
   * scroll progress
   *       ↓
   * useSpring
   *       ↓
   * many useTransform
   *
   * Removing that extra layer significantly
   * reduces continuous work.
   */
  const desktopProgress =
    shouldUseScrollAnimation
      ? scrollYProgress
      : null;

  if (!count) {
    return null;
  }

  /*
   * Reduced motion gets the simplest layout.
   */
  if (reduceMotion) {
    return (
      <ReducedProcess items={items} />
    );
  }

  return (
    <section
      ref={sectionRef}
      id="process"
      className="
        relative
        w-full
        overflow-hidden
        bg-[#F1F7FB]
        text-[#061725]
        dark:bg-[#07131F]
        dark:text-white

        /* Browser rendering hints */
        [contain:layout_style]
      "
    >
      <ProcessBackground />

      <ProcessHeader
        count={count}
      />

      {device === "desktop" ? (
        <DesktopProcess
          items={items}
          count={count}
          progress={desktopProgress}
        />
      ) : device === "tablet" ? (
        <TabletProcess
          items={items}
          count={count}
        />
      ) : (
        <MobileProcess
          items={items}
          count={count}
        />
      )}
    </section>
  );
}

/* ============================================================================
   HEADER
============================================================================ */

function ProcessHeader({
  count,
}) {
  return (
    <div
      className="
        relative
        z-20
        mx-auto
        w-[92%]
        max-w-[1500px]
        pt-7
        sm:pt-8
        md:w-[90%]
        md:pt-10
        lg:w-[86%]
        lg:pt-8
        xl:pt-10
      "
    >
      <div
        className="
          flex
          items-end
          justify-between
          gap-6
        "
      >
        <div className="min-w-0">
          {/* EYEBROW */}

          <motion.div
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
              amount: 0.25,
            }}
            transition={{
              duration: 0.5,
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
                bg-[#007EAF]
                dark:bg-[#5DDBFF]
              "
            />

            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-[#005F8A]
                dark:text-[#5DDBFF]
                sm:text-[9px]
                md:text-[10px]
              "
            >
              How We Work
            </span>
          </motion.div>

          {/* TITLE */}

          <motion.h2
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
              amount: 0.25,
            }}
            transition={{
              duration: 0.58,
              delay: 0.03,
              ease: EASE,
            }}
            className="
              mt-2.5
              max-w-4xl
              font-display
              text-[clamp(2rem,5vw,5rem)]
              font-semibold
              leading-[0.9]
              tracking-[-0.06em]
              text-[#061725]
              dark:text-white
            "
          >
            From idea to{" "}
            <span
              className="
                bg-gradient-to-r
                from-[#0066B3]
                via-[#00A9E0]
                to-[#00A878]
                bg-clip-text
                text-transparent
              "
            >
              reality
            </span>
          </motion.h2>

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
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.5,
              delay: 0.08,
              ease: EASE,
            }}
            className="
              mt-3
              max-w-2xl
              text-[13px]
              font-medium
              leading-[1.65]
              text-[#36566B]
              dark:text-[#AFC2CF]
              sm:text-[14px]
              md:text-[15px]
            "
          >
            A clear, collaborative process
            that turns complex requirements
            into scalable digital products.
          </motion.p>
        </div>

        {/* COUNT */}

        <div
          className="
            hidden
            shrink-0
            font-mono
            text-[9px]
            font-semibold
            tracking-[0.2em]
            text-[#006B98]
            dark:text-[#5DDBFF]
            sm:block
          "
        >
          {String(count).padStart(
            2,
            "0"
          )}
          {" / "}
          STEPS
        </div>
      </div>
    </div>
  );
}

/* ============================================================================
   DESKTOP PROCESS

   PERFORMANCE OPTIMIZED

   Only FOUR scroll-linked transforms per step:
   - translate
   - opacity
   - scale
   - visual movement

   The old version had many independent transform graphs.
============================================================================ */

function DesktopProcess({
  items,
  count,
  progress,
}) {
  /*
   * One simple progress-controlled rail.
   */
  const railScale = progress
    ? useTransform(
        progress,
        [0, 1],
        [0, 1]
      )
    : 1;

  return (
    <div
      className="
        relative
        z-10
        mx-auto
        mt-3
        w-[90%]
        max-w-[1500px]
        pb-1
        lg:w-[86%]
      "
    >
      {/* BASE RAIL */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          top-0
          z-[2]
          w-px
          -translate-x-1/2
          bg-[#173A4E]/[0.10]
          dark:bg-white/[0.08]
        "
      />

      {/* ACTIVE RAIL */}

      <motion.div
        aria-hidden="true"
        style={{
          scaleY: railScale,
        }}
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          top-0
          z-[3]
          w-[2px]
          origin-top
          -translate-x-1/2
          bg-gradient-to-b
          from-[#0066B3]
          via-[#00A9E0]
          to-[#00A878]
          transform-gpu
          will-change-transform
        "
      />

      <div className="relative z-10">
        {items.map(
          (item, index) => (
            <DesktopProcessStep
              key={
                item.step ??
                item.title ??
                index
              }
              item={item}
              index={index}
              count={count}
              progress={progress}
            />
          )
        )}
      </div>
    </div>
  );
}

/* ============================================================================
   DESKTOP STEP
============================================================================ */

function DesktopProcessStep({
  item,
  index,
  count,
  progress,
}) {
  const total =
    Math.max(count - 1, 1);

  const center =
    index / total;

  const before =
    index === 0
      ? 0
      : (index - 1) / total;

  const after =
    index === count - 1
      ? 1
      : (index + 1) / total;

  /*
   * ONE local progress value.
   */
  const local = progress
    ? useTransform(
        progress,
        [
          before,
          center,
          after,
        ],
        [-1, 0, 1]
      )
    : null;

  /*
   * Combined content movement.
   *
   * Smaller movement = less visual jitter
   * and fewer pixels being repainted.
   */
  const contentX = local
    ? useTransform(
        local,
        [-1, 0, 1],
        [24, 0, -24]
      )
    : 0;

  const contentY = local
    ? useTransform(
        local,
        [-1, 0, 1],
        [8, 0, -8]
      )
    : 0;

  /*
   * IMPORTANT:
   *
   * Never fade a process item to zero.
   *
   * This also prevents the "content disappears"
   * problem during fast scroll.
   */
  const contentOpacity = local
    ? useTransform(
        local,
        [-1, -0.55, 0, 0.55, 1],
        [0.48, 0.78, 1, 0.78, 0.48]
      )
    : 1;

  const contentScale = local
    ? useTransform(
        local,
        [-1, 0, 1],
        [0.99, 1, 0.99]
      )
    : 1;

  /*
   * Visual movement uses one small transform.
   */
  const visualX = local
    ? useTransform(
        local,
        [-1, 0, 1],
        [-12, 0, 12]
      )
    : 0;

  const visualY = local
    ? useTransform(
        local,
        [-1, 0, 1],
        [6, 0, -6]
      )
    : 0;

  const visualOpacity = local
    ? useTransform(
        local,
        [-1, -0.45, 0, 0.45, 1],
        [0.52, 0.8, 1, 0.8, 0.52]
      )
    : 1;

  const isEven =
    index % 2 === 0;

  return (
    <article
      className="
        relative
        min-h-[118px]
        py-5
        lg:grid
        lg:grid-cols-2
        lg:items-center
        xl:min-h-[125px]
        xl:py-6

        /* Rendering optimization */
        [contain:layout_style_paint]
      "
    >
      {/* ================================================================
          NODE
      ================================================================= */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          z-40
          hidden
          h-9
          w-9
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-[#008FC5]/35
          bg-[#F1F7FB]
          font-mono
          text-[8px]
          font-bold
          text-[#006B9C]
          shadow-[0_0_20px_rgba(0,143,197,0.10)]
          dark:border-[#5DDBFF]/30
          dark:bg-[#07131F]
          dark:text-[#5DDBFF]
          lg:flex
        "
      >
        {String(index + 1).padStart(
          2,
          "0"
        )}
      </div>

      {/* ================================================================
          CONTENT
      ================================================================= */}

      <motion.div
        style={{
          x: contentX,
          y: contentY,
          scale: contentScale,
          opacity: contentOpacity,
          willChange:
            progress
              ? "transform, opacity"
              : "auto",
        }}
        className={`
          relative
          z-30
          self-center

          ${
            isEven
              ? `
                lg:col-start-1
                lg:row-start-1
                lg:justify-self-end
                lg:pr-14
                lg:text-right
              `
              : `
                lg:col-start-2
                lg:row-start-1
                lg:justify-self-start
                lg:pl-14
                lg:text-left
              `
          }
        `}
      >
        <div
          className="
            w-full
            max-w-[540px]
          "
        >
          {/* META */}

          <div
            className={`
              flex
              items-center
              gap-3

              ${
                isEven
                  ? "lg:justify-end"
                  : "lg:justify-start"
              }
            `}
          >
            <span
              className="
                font-mono
                text-[9px]
                font-bold
                tracking-[0.2em]
                text-[#006B9C]
                dark:text-[#5DDBFF]
              "
            >
              {String(
                index + 1
              ).padStart(
                2,
                "0"
              )}
            </span>

            <span
              className="
                h-px
                w-7
                bg-[#008FC5]/45
                dark:bg-[#5DDBFF]/35
              "
            />

            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.26em]
                text-[#176A8A]
                dark:text-[#5DDBFF]
              "
            >
              {item.step}
            </span>
          </div>

          {/* TITLE */}

          <h3
            className="
              mt-2.5
              font-display
              text-[clamp(2.1rem,3.6vw,4.4rem)]
              font-semibold
              leading-[0.86]
              tracking-[-0.065em]
              text-[#061725]
              dark:text-white
            "
          >
            {item.title}
          </h3>

          {/* DESCRIPTION */}

          <p
            className={`
              mt-3
              max-w-xl
              text-[14px]
              font-medium
              leading-[1.58]
              text-[#385469]
              dark:text-[#AFC2CF]
              xl:text-[15px]

              ${
                isEven
                  ? "lg:ml-auto"
                  : ""
              }
            `}
          >
            {item.description}
          </p>

          {/* STATUS */}

          <div
            className={`
              mt-3.5
              flex
              items-center
              gap-2.5

              ${
                isEven
                  ? "lg:justify-end"
                  : "lg:justify-start"
              }
            `}
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#00A878]
              "
            />

            <span
              className="
                text-[7px]
                font-bold
                uppercase
                tracking-[0.23em]
                text-[#476274]
                dark:text-[#8198A8]
              "
            >
              {index === count - 1
                ? "Ready to launch"
                : "Next phase"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* ================================================================
          VISUAL
      ================================================================= */}

      <motion.div
        style={{
          x: visualX,
          y: visualY,
          opacity: visualOpacity,
          willChange:
            progress
              ? "transform, opacity"
              : "auto",
        }}
        className={`
          pointer-events-none
          relative
          hidden
          h-[195px]
          w-[195px]
          self-center
          justify-self-center
          lg:row-start-1
          lg:block

          ${
            isEven
              ? "lg:col-start-2"
              : "lg:col-start-1"
          }

          xl:h-[205px]
          xl:w-[205px]
        `}
      >
        <ProcessVisual
          index={index}
          step={item.step}
        />
      </motion.div>
    </article>
  );
}

/* ============================================================================
   LIGHTWEIGHT PROCESS VISUAL

   Much fewer elements than the previous version.
============================================================================ */

function ProcessVisual({
  index,
  step,
}) {
  return (
    <div
      className="
        relative
        h-full
        w-full
        transform-gpu
      "
    >
      {/* OUTER */}

      <div
        className="
          absolute
          inset-0
          rounded-full
          border
          border-[#007AAE]/20
          dark:border-[#5DDBFF]/12
        "
      />

      {/* MIDDLE */}

      <div
        className="
          absolute
          inset-7
          rounded-full
          border
          border-dashed
          border-[#007AAE]/24
          dark:border-[#5DDBFF]/14
        "
      />

      {/* INNER */}

      <div
        className="
          absolute
          inset-[25%]
          rounded-full
          border
          border-[#007AAE]/18
          dark:border-[#5DDBFF]/9
        "
      />

      {/* CROSS */}

      <div
        className="
          absolute
          left-0
          right-0
          top-1/2
          h-px
          -translate-y-1/2
          bg-[#007AAE]/18
          dark:bg-[#5DDBFF]/13
        "
      />

      <div
        className="
          absolute
          bottom-0
          left-1/2
          top-0
          w-px
          -translate-x-1/2
          bg-[#007AAE]/18
          dark:bg-[#5DDBFF]/13
        "
      />

      {/* CENTER */}

      <div
        className="
          absolute
          left-1/2
          top-1/2
          flex
          h-[82px]
          w-[82px]
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-[#007AAE]/25
          bg-[#F1F7FB]
          dark:border-[#5DDBFF]/17
          dark:bg-[#07131F]
        "
      >
        <div className="text-center">
          <span
            className="
              block
              text-[6px]
              font-bold
              uppercase
              tracking-[0.24em]
              text-[#006B9C]
              dark:text-[#5DDBFF]
            "
          >
            Phase
          </span>

          <span
            className="
              mt-1.5
              block
              font-mono
              text-2xl
              font-semibold
              leading-none
              tracking-[-0.08em]
              text-[#061725]
              dark:text-white
            "
          >
            {String(
              index + 1
            ).padStart(
              2,
              "0"
            )}
          </span>

          <span
            className="
              mx-auto
              mt-1.5
              block
              max-w-[62px]
              truncate
              text-[5px]
              uppercase
              tracking-[0.18em]
              text-[#587184]
              dark:text-[#8198A8]
            "
          >
            {step}
          </span>
        </div>
      </div>

      {/* TOP DOT */}

      <span
        className="
          absolute
          left-1/2
          top-0
          h-2
          w-2
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[#008FC5]
          dark:bg-[#5DDBFF]
        "
      />

      {/* BOTTOM DOT */}

      <span
        className="
          absolute
          bottom-0
          left-1/2
          h-1.5
          w-1.5
          -translate-x-1/2
          translate-y-1/2
          rounded-full
          bg-[#00A878]
        "
      />
    </div>
  );
}

/* ============================================================================
   TABLET
============================================================================ */

function TabletProcess({
  items,
  count,
}) {
  return (
    <div
      className="
        relative
        z-10
        mx-auto
        mt-6
        w-[90%]
        max-w-[1100px]
        pb-5
      "
    >
      {/* TIMELINE */}

      <div
        aria-hidden="true"
        className="
          absolute
          bottom-4
          left-[18px]
          top-0
          w-px
          bg-[#1B485E]/[0.13]
          dark:bg-white/[0.08]
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          bottom-4
          left-[18px]
          top-0
          z-10
          w-[2px]
          bg-gradient-to-b
          from-[#0066B3]
          via-[#00A9E0]
          to-[#00A878]
        "
      />

      {items.map(
        (item, index) => (
          <TabletProcessStep
            key={
              item.step ??
              item.title ??
              index
            }
            item={item}
            index={index}
            count={count}
          />
        )
      )}
    </div>
  );
}

/* ============================================================================
   TABLET STEP
============================================================================ */

function TabletProcessStep({
  item,
  index,
  count,
}) {
  const stepRef =
    useRef(null);

  const isInView =
    useInView(stepRef, {
      amount: 0.2,
      margin:
        "-10% 0px -15% 0px",
    });

  return (
    <article
      ref={stepRef}
      className="
        relative
        min-h-[235px]
        pb-5

        /* Rendering optimization */
        [contain:layout_style_paint]
      "
    >
      {/* NODE */}

      <motion.div
        initial={{
          scale: 0.86,
          opacity: 0.4,
        }}
        animate={{
          scale: isInView
            ? 1
            : 0.86,
          opacity: isInView
            ? 1
            : 0.4,
        }}
        transition={{
          duration: 0.35,
          ease: EASE,
        }}
        className="
          absolute
          left-[18px]
          top-[28px]
          z-40
          flex
          h-8
          w-8
          -translate-x-1/2
          items-center
          justify-center
          rounded-full
          border
          border-[#007AAE]/35
          bg-[#F1F7FB]
          font-mono
          text-[7px]
          font-bold
          text-[#006B9C]
          dark:border-[#5DDBFF]/28
          dark:bg-[#07131F]
          dark:text-[#5DDBFF]
          transform-gpu
        "
      >
        {String(
          index + 1
        ).padStart(
          2,
          "0"
        )}
      </motion.div>

      {/* CONTENT */}

      <motion.div
        initial={{
          opacity: 0,
          y: 18,
        }}
        animate={{
          opacity: isInView
            ? 1
            : 0.35,
          y: isInView
            ? 0
            : 18,
        }}
        transition={{
          duration: 0.5,
          ease: EASE,
        }}
        className="
          relative
          z-20
          pl-10
          pr-1
          pt-4
        "
      >
        {/* META */}

        <div
          className="
            flex
            items-center
            gap-2.5
          "
        >
          <span
            className="
              font-mono
              text-[8px]
              font-bold
              tracking-[0.18em]
              text-[#006B9C]
              dark:text-[#5DDBFF]
            "
          >
            {String(
              index + 1
            ).padStart(
              2,
              "0"
            )}
          </span>

          <span
            className="
              h-px
              w-7
              bg-[#007AAE]/45
              dark:bg-[#5DDBFF]/32
            "
          />

          <span
            className="
              text-[7px]
              font-bold
              uppercase
              tracking-[0.24em]
              text-[#176A8A]
              dark:text-[#5DDBFF]
            "
          >
            {item.step}
          </span>
        </div>

        {/* GRID */}

        <div
          className="
            mt-4
            grid
            grid-cols-[minmax(0,1fr)_120px]
            items-center
            gap-5
            md:grid-cols-[minmax(0,1fr)_140px]
            md:gap-7
          "
        >
          {/* TEXT */}

          <div className="min-w-0">
            <h3
              className="
                font-display
                text-[clamp(2.15rem,5vw,4.2rem)]
                font-semibold
                leading-[0.86]
                tracking-[-0.065em]
                text-[#061725]
                dark:text-white
              "
            >
              {item.title}
            </h3>

            <p
              className="
                mt-3.5
                max-w-[690px]
                text-[14px]
                leading-[1.65]
                text-[#334F63]
                dark:text-[#AFC2CF]
                md:text-[15px]
              "
            >
              {item.description}
            </p>

            <div
              className="
                mt-3.5
                flex
                items-center
                gap-2.5
              "
            >
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-[#00A878]
                "
              />

              <span
                className="
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-[#476274]
                  dark:text-[#8198A8]
                "
              >
                {index === count - 1
                  ? "Ready to launch"
                  : "Next phase"}
              </span>
            </div>
          </div>

          {/* VISUAL */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
            }}
            animate={{
              opacity: isInView
                ? 1
                : 0.3,
              scale: isInView
                ? 1
                : 0.92,
            }}
            transition={{
              duration: 0.5,
              delay: 0.02,
              ease: EASE,
            }}
            className="
              relative
              h-[120px]
              w-[120px]
              justify-self-center
              md:h-[138px]
              md:w-[138px]
              transform-gpu
            "
          >
            <ProcessVisual
              index={index}
              step={item.step}
            />
          </motion.div>
        </div>
      </motion.div>
    </article>
  );
}

/* ============================================================================
   MOBILE
============================================================================ */

function MobileProcess({
  items,
  count,
}) {
  return (
    <div
      className="
        relative
        z-10
        mx-auto
        mt-5
        w-[92%]
        max-w-[640px]
        pb-2
      "
    >
      {/* RAIL */}

      <div
        aria-hidden="true"
        className="
          absolute
          bottom-3
          left-[13px]
          top-0
          w-px
          bg-[#193E53]/[0.13]
          dark:bg-white/[0.08]
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          bottom-3
          left-[13px]
          top-0
          z-10
          w-[2px]
          bg-gradient-to-b
          from-[#0066B3]
          via-[#00A9E0]
          to-[#00A878]
        "
      />

      {items.map(
        (item, index) => (
          <MobileProcessStep
            key={
              item.step ??
              item.title ??
              index
            }
            item={item}
            index={index}
            count={count}
          />
        )
      )}
    </div>
  );
}

/* ============================================================================
   MOBILE STEP
============================================================================ */

function MobileProcessStep({
  item,
  index,
  count,
}) {
  const stepRef =
    useRef(null);

  const isInView =
    useInView(stepRef, {
      amount: 0.18,
      margin:
        "-12% 0px -18% 0px",
    });

  return (
    <article
      ref={stepRef}
      className="
        relative
        min-h-[285px]
        pb-3

        /* Rendering optimization */
        [contain:layout_style_paint]
      "
    >
      {/* NODE */}

      <motion.div
        initial={{
          scale: 0.84,
          opacity: 0.35,
        }}
        animate={{
          scale: isInView
            ? 1
            : 0.84,
          opacity: isInView
            ? 1
            : 0.38,
        }}
        transition={{
          duration: 0.35,
          ease: EASE,
        }}
        className="
          absolute
          left-[13px]
          top-[25px]
          z-40
          flex
          h-8
          w-8
          -translate-x-1/2
          items-center
          justify-center
          rounded-full
          border
          border-[#007AAE]/38
          bg-[#F1F7FB]
          font-mono
          text-[7px]
          font-bold
          text-[#006B9C]
          dark:border-[#5DDBFF]/28
          dark:bg-[#07131F]
          dark:text-[#5DDBFF]
          transform-gpu
        "
      >
        {String(
          index + 1
        ).padStart(
          2,
          "0"
        )}
      </motion.div>

      {/* CONTENT */}

      <motion.div
        initial={{
          opacity: 0,
          y: 18,
        }}
        animate={{
          opacity: isInView
            ? 1
            : 0.28,
          y: isInView
            ? 0
            : 18,
        }}
        transition={{
          duration: 0.5,
          ease: EASE,
        }}
        className="
          relative
          z-20
          pl-9
          pr-1
          pt-3.5
        "
      >
        {/* META */}

        <div
          className="
            flex
            items-center
            gap-2.5
          "
        >
          <span
            className="
              font-mono
              text-[8px]
              font-bold
              tracking-[0.18em]
              text-[#006B9C]
              dark:text-[#5DDBFF]
            "
          >
            {String(
              index + 1
            ).padStart(
              2,
              "0"
            )}
          </span>

          <span
            className="
              h-px
              w-7
              bg-[#007AAE]/45
              dark:bg-[#5DDBFF]/32
            "
          />

          <span
            className="
              text-[7px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[#176A8A]
              dark:text-[#5DDBFF]
            "
          >
            {item.step}
          </span>
        </div>

        {/* TITLE */}

        <h3
          className="
            mt-3
            max-w-[300px]
            font-display
            text-[clamp(2rem,8.2vw,3.4rem)]
            font-semibold
            leading-[0.85]
            tracking-[-0.065em]
            text-[#061725]
            dark:text-white
          "
        >
          {item.title}
        </h3>

        {/* DESCRIPTION */}

        <p
          className="
            mt-3.5
            max-w-[570px]
            text-[13px]
            font-medium
            leading-[1.65]
            text-[#334F63]
            dark:text-[#AFC2CF]
            sm:text-[14px]
          "
        >
          {item.description}
        </p>

        {/* STATUS */}

        <div
          className="
            mt-3.5
            flex
            items-center
            gap-2.5
          "
        >
          <span
            className="
              h-1.5
              w-1.5
              rounded-full
              bg-[#00A878]
            "
          />

          <span
            className="
              text-[7px]
              font-bold
              uppercase
              tracking-[0.22em]
              text-[#476274]
              dark:text-[#8198A8]
            "
          >
            {index === count - 1
              ? "Ready to launch"
              : "Next phase"}
          </span>
        </div>

        {/* MOBILE VISUAL */}

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: isInView
              ? 1
              : 0.18,
            scale: isInView
              ? 1
              : 0.9,
          }}
          transition={{
            duration: 0.5,
            delay: 0.03,
            ease: EASE,
          }}
          className="
            relative
            mt-4
            h-[78px]
            w-[78px]
            sm:h-[92px]
            sm:w-[92px]
            transform-gpu
          "
        >
          <ProcessVisual
            index={index}
            step={item.step}
          />
        </motion.div>
      </motion.div>
    </article>
  );
}

/* ============================================================================
   BACKGROUND

   Intentionally static.
   No continuously animated blur layers.
============================================================================ */

function ProcessBackground() {
  return (
    <>
      {/* AMBIENT */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[40%]
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(0,169,224,0.025),transparent_68%)]
          blur-[16px]
          dark:bg-[radial-gradient(circle,rgba(0,217,255,0.025),transparent_68%)]
        "
      />

      {/* GRID */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.016]
          [background-image:linear-gradient(#0A759C_1px,transparent_1px),linear-gradient(90deg,#0A759C_1px,transparent_1px)]
          [background-size:64px_64px]
          dark:opacity-[0.022]
        "
      />

      {/* TOP FADE */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-16
          bg-gradient-to-b
          from-[#F1F7FB]
          to-transparent
          dark:from-[#07131F]
        "
      />

      {/* BOTTOM FADE */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-10
          bg-gradient-to-t
          from-[#F1F7FB]
          to-transparent
          dark:from-[#07131F]
        "
      />
    </>
  );
}

/* ============================================================================
   REDUCED MOTION
============================================================================ */

function ReducedProcess({
  items,
}) {
  return (
    <section
      id="process"
      className="
        bg-[#F1F7FB]
        px-5
        py-12
        text-[#061725]
        dark:bg-[#07131F]
        dark:text-white
        md:py-16
      "
    >
      <div
        className="
          mx-auto
          w-full
          max-w-[1380px]
        "
      >
        <ScrollReveal>
          {/* HEADER */}

          <div
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
                bg-[#007CB5]
                dark:bg-[#5DDBFF]
              "
            />

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-[#006A98]
                dark:text-[#5DDBFF]
              "
            >
              How We Work
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
              text-[#061725]
              dark:text-white
              md:text-6xl
            "
          >
            From idea to{" "}
            <span
              className="
                bg-gradient-to-r
                from-[#0066B3]
                via-[#00A9E0]
                to-[#00A878]
                bg-clip-text
                text-transparent
              "
            >
              reality
            </span>
          </h2>

          <p
            className="
              mt-4
              max-w-2xl
              text-[15px]
              font-medium
              leading-[1.7]
              text-[#385469]
              dark:text-[#AFC2CF]
              md:text-lg
            "
          >
            A clear, collaborative process
            that turns complex requirements
            into scalable digital products.
          </p>
        </ScrollReveal>

        {/* LIST */}

        <div className="mt-8">
          {items.map(
            (item, index) => (
              <article
                key={
                  item.step ??
                  item.title ??
                  index
                }
                className="
                  border-t
                  border-[#14384D]/10
                  py-7
                  dark:border-white/10
                "
              >
                <div
                  className="
                    flex
                    gap-5
                  "
                >
                  <span
                    className="
                      font-mono
                      text-xs
                      font-bold
                      text-[#006B9C]
                      dark:text-[#5DDBFF]
                    "
                  >
                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <div>
                    <span
                      className="
                        text-[8px]
                        font-bold
                        uppercase
                        tracking-[0.25em]
                        text-[#176A8A]
                        dark:text-[#5DDBFF]
                      "
                    >
                      {item.step}
                    </span>

                    <h3
                      className="
                        mt-2.5
                        font-display
                        text-4xl
                        font-semibold
                        leading-[0.9]
                        tracking-[-0.05em]
                        text-[#061725]
                        dark:text-white
                        md:text-6xl
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-4
                        max-w-2xl
                        text-[15px]
                        font-medium
                        leading-[1.7]
                        text-[#385469]
                        dark:text-[#AFC2CF]
                        md:text-lg
                      "
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}