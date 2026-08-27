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
  const [device, setDevice] = useState(
    "desktop"
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mobileQuery =
      window.matchMedia(
        "(max-width: 639px)"
      );

    const tabletQuery =
      window.matchMedia(
        "(min-width: 640px) and (max-width: 1024px)"
      );

    const coarseQuery =
      window.matchMedia(
        "(pointer: coarse)"
      );

    const update = () => {
      if (
        mobileQuery.matches
      ) {
        setDevice("mobile");
        return;
      }

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

  const { scrollYProgress } =
    useScroll({
      target: sectionRef,
      offset: [
        "start start",
        "end end",
      ],
    });

  if (!count) {
    return null;
  }

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
        scroll-mt-[150px]
        overflow-hidden
        bg-[#F1F7FB]
        text-[#061725]
        dark:bg-[#07131F]
        dark:text-white
      "
    >
      <ProcessBackground />

      <ProcessHeader count={count} />

      {device === "desktop" ? (
        <DesktopProcess
          items={items}
          count={count}
          progress={scrollYProgress}
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

function ProcessHeader({ count }) {
  return (
    <div
      className="
        relative
        z-20
        mx-auto
        w-[91%]
        max-w-[1500px]
        pt-8
        sm:pt-10
        md:w-[88%]
        md:pt-12
        lg:w-[86%]
        lg:pt-16
      "
    >
      <div
        className="
          flex
          items-end
          justify-between
          gap-7
        "
      >
        <div className="min-w-0">
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
              amount: 0.3,
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
                bg-[#007EAF]
                dark:bg-[#5DDBFF]
                sm:w-9
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

          <motion.h2
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
              amount: 0.3,
            }}
            transition={{
              duration: 0.75,
              delay: 0.04,
              ease: EASE,
            }}
            className="
              mt-3
              max-w-4xl
              font-display
              text-[clamp(2.2rem,5.5vw,5.5rem)]
              font-semibold
              leading-[0.88]
              tracking-[-0.065em]
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
              amount: 0.25,
            }}
            transition={{
              duration: 0.65,
              delay: 0.1,
              ease: EASE,
            }}
            className="
              mt-3
              max-w-2xl
              text-[14px]
              font-medium
              leading-[1.72]
              text-[#36566B]
              dark:text-[#AFC2CF]
              sm:text-[15px]
              md:text-base
              lg:text-lg
            "
          >
            A clear, collaborative process that
            turns complex requirements into
            scalable digital products.
          </motion.p>
        </div>

        <div
          className="
            hidden
            shrink-0
            pt-1
            font-mono
            text-[9px]
            font-semibold
            tracking-[0.2em]
            text-[#006B98]
            dark:text-[#5DDBFF]
            sm:block
            md:text-[10px]
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
============================================================================ */

function DesktopProcess({
  items,
  count,
  progress,
}) {
  const railScale = useTransform(
    progress,
    [0, 1],
    [0, 1]
  );

  return (
    <div
      className="
        relative
        z-10
        mx-auto
        mt-8
        w-[90%]
        max-w-[1500px]
        pb-8
        lg:w-[86%]
      "
    >
      {/* Base rail */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          top-0
          z-[4]
          w-px
          -translate-x-1/2
          bg-[#173A4E]/[0.10]
          dark:bg-white/[0.08]
        "
      />

      {/* Active rail */}
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
          z-[5]
          w-[2px]
          origin-top
          -translate-x-1/2
          bg-gradient-to-b
          from-[#0066B3]
          via-[#00A9E0]
          to-[#00A878]
        "
      />

      <div className="relative">
        {items.map((item, index) => (
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
        ))}
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
  const total = Math.max(
    count - 1,
    1
  );

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

  const local = useTransform(
    progress,
    [
      before,
      center,
      after,
    ],
    [-1, 0, 1]
  );

  const isEven =
    index % 2 === 0;

  const contentX =
    useTransform(
      local,
      [
        -1,
        -0.6,
        -0.25,
        0,
        0.25,
        0.6,
        1,
      ],
      [
        65,
        32,
        9,
        0,
        -9,
        -32,
        -65,
      ]
    );

  const contentY =
    useTransform(
      local,
      [
        -1,
        -0.5,
        0,
        0.5,
        1,
      ],
      [
        28,
        12,
        0,
        -12,
        -28,
      ]
    );

  const contentOpacity =
    useTransform(
      local,
      [
        -1,
        -0.7,
        -0.38,
        -0.12,
        0,
        0.12,
        0.38,
        0.7,
        1,
      ],
      [
        0,
        0.14,
        0.52,
        0.88,
        1,
        0.88,
        0.52,
        0.14,
        0,
      ]
    );

  const contentScale =
    useTransform(
      local,
      [
        -1,
        -0.4,
        0,
        0.4,
        1,
      ],
      [
        0.97,
        0.99,
        1,
        0.99,
        0.97,
      ]
    );

  const visualX =
    useTransform(
      local,
      [
        -1,
        -0.5,
        0,
        0.5,
        1,
      ],
      [
        -25,
        -11,
        0,
        11,
        25,
      ]
    );

  const visualY =
    useTransform(
      local,
      [-1, 0, 1],
      [18, 0, -18]
    );

  const visualScale =
    useTransform(
      local,
      [
        -1,
        -0.4,
        0,
        0.4,
        1,
      ],
      [
        0.9,
        0.96,
        1,
        0.96,
        0.9,
      ]
    );

  const visualOpacity =
    useTransform(
      local,
      [
        -1,
        -0.55,
        -0.2,
        0,
        0.2,
        0.55,
        1,
      ],
      [
        0,
        0.16,
        0.72,
        1,
        0.72,
        0.16,
        0,
      ]
    );

  const nodeScale =
    useTransform(
      local,
      [
        -1,
        -0.4,
        -0.1,
        0,
        0.1,
        0.4,
        1,
      ],
      [
        0.78,
        0.9,
        1,
        1.16,
        1,
        0.9,
        0.78,
      ]
    );

  const nodeOpacity =
    useTransform(
      local,
      [
        -1,
        -0.35,
        0,
        0.35,
        1,
      ],
      [
        0.22,
        0.62,
        1,
        0.62,
        0.22,
      ]
    );

  return (
    <article
      className="
        relative
        min-h-[600px]
        py-10
        lg:grid
        lg:min-h-[640px]
        lg:grid-cols-2
        lg:items-center
        lg:py-12
      "
    >
      {/* Center node */}
      <motion.div
        style={{
          scale: nodeScale,
          opacity: nodeOpacity,
        }}
        className="
          absolute
          left-1/2
          top-1/2
          z-40
          hidden
          h-10
          w-10
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
          shadow-[0_0_24px_rgba(0,143,197,0.14)]
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
      </motion.div>

      {/* Content */}
      <motion.div
        style={{
          x: contentX,
          y: contentY,
          scale: contentScale,
          opacity: contentOpacity,
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
                lg:pr-20
                lg:text-right
              `
              : `
                lg:col-start-2
                lg:row-start-1
                lg:justify-self-start
                lg:pl-20
                lg:text-left
              `
          }
        `}
      >
        <div className="w-full max-w-[620px]">
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
                text-[10px]
                font-bold
                tracking-[0.2em]
                text-[#006B9C]
                dark:text-[#5DDBFF]
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
                w-8
                bg-[#008FC5]/45
                dark:bg-[#5DDBFF]/35
                sm:w-10
              "
            />

            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.28em]
                text-[#176A8A]
                dark:text-[#5DDBFF]
                sm:text-[9px]
              "
            >
              {item.step}
            </span>
          </div>

          <h3
            className="
              mt-5
              font-display
              text-[clamp(2.8rem,4.8vw,6rem)]
              font-semibold
              leading-[0.83]
              tracking-[-0.07em]
              text-[#061725]
              dark:text-white
            "
          >
            {item.title}
          </h3>

          <p
            className={`
              mt-6
              max-w-xl
              text-[17px]
              font-medium
              leading-[1.78]
              text-[#385469]
              dark:text-[#AFC2CF]
              md:text-lg
              lg:text-xl
              ${
                isEven
                  ? "lg:ml-auto"
                  : ""
              }
            `}
          >
            {item.description}
          </p>

          <div
            className={`
              mt-7
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
                h-1.5
                w-1.5
                rounded-full
                bg-[#00A878]
                shadow-[0_0_10px_rgba(0,168,120,0.42)]
              "
            />

            <span
              className="
                text-[8px]
                font-bold
                uppercase
                tracking-[0.24em]
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

      {/* Visual */}
      <motion.div
        style={{
          x: visualX,
          y: visualY,
          scale: visualScale,
          opacity: visualOpacity,
        }}
        className={`
          pointer-events-none
          relative
          hidden
          h-[245px]
          w-[245px]
          self-center
          justify-self-center
          lg:row-start-1
          lg:block

          ${
            isEven
              ? "lg:col-start-2"
              : "lg:col-start-1"
          }
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
   SHARED PROCESS VISUAL
============================================================================ */

function ProcessVisual({
  index,
  step,
}) {
  return (
    <div className="relative h-full w-full">
      {/* Outer ring */}
      <div
        className="
          absolute
          inset-0
          rounded-full
          border
          border-[#007AAE]/28
          bg-[#007AAE]/[0.008]
          dark:border-[#5DDBFF]/14
          dark:bg-transparent
        "
      />

      {/* Middle ring */}
      <div
        className="
          absolute
          inset-6
          rounded-full
          border
          border-dashed
          border-[#007AAE]/30
          dark:border-[#5DDBFF]/16
        "
      />

      {/* Inner ring */}
      <div
        className="
          absolute
          inset-12
          rounded-full
          border
          border-[#007AAE]/22
          bg-[#007AAE]/[0.012]
          dark:border-[#5DDBFF]/10
          dark:bg-[#5DDBFF]/[0.012]
        "
      />

      {/* Horizontal */}
      <div
        className="
          absolute
          left-0
          right-0
          top-1/2
          h-px
          -translate-y-1/2
          bg-[#007AAE]/25
          dark:bg-[#5DDBFF]/18
        "
      />

      {/* Vertical */}
      <div
        className="
          absolute
          bottom-0
          left-1/2
          top-0
          w-px
          -translate-x-1/2
          bg-[#007AAE]/25
          dark:bg-[#5DDBFF]/18
        "
      />

      {/* Center */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          flex
          h-24
          w-24
          -translate-x-1/2
          -translate-y-1/2
          items-center
          justify-center
          rounded-full
          border
          border-[#007AAE]/32
          bg-[#F1F7FB]
          shadow-[0_0_18px_rgba(0,143,197,0.05)]
          dark:border-[#5DDBFF]/20
          dark:bg-[#07131F]
        "
      >
        <div className="text-center">
          <span
            className="
              block
              text-[7px]
              font-bold
              uppercase
              tracking-[0.28em]
              text-[#006B9C]
              dark:text-[#5DDBFF]
            "
          >
            Phase
          </span>

          <span
            className="
              mt-2
              block
              font-mono
              text-3xl
              font-semibold
              leading-none
              tracking-[-0.08em]
              text-[#061725]
              dark:text-white
            "
          >
            {String(index + 1).padStart(
              2,
              "0"
            )}
          </span>

          <span
            className="
              mx-auto
              mt-2
              block
              max-w-[70px]
              truncate
              text-[6px]
              uppercase
              tracking-[0.2em]
              text-[#587184]
              dark:text-[#8198A8]
            "
          >
            {step}
          </span>
        </div>
      </div>

      {/* Top */}
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
          shadow-[0_0_12px_rgba(0,143,197,0.5)]
          dark:bg-[#5DDBFF]
        "
      />

      {/* Bottom */}
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
   TABLET / IPAD

   Dedicated layout:
   - fixed left timeline
   - text occupies the larger area
   - visual has controlled width
   - no excessive phone-like spacing
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
        mt-8
        w-[88%]
        max-w-[1100px]
        pb-8
      "
    >
      {/* Timeline */}
      <div
        aria-hidden="true"
        className="
          absolute
          bottom-5
          left-[19px]
          top-0
          w-px
          bg-[#1B485E]/[0.15]
          dark:bg-white/[0.09]
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          bottom-5
          left-[19px]
          top-0
          z-10
          w-[2px]
          bg-gradient-to-b
          from-[#0066B3]
          via-[#00A9E0]
          to-[#00A878]
        "
      />

      {items.map((item, index) => (
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
      ))}
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
  const stepRef = useRef(null);

  const isInView = useInView(
    stepRef,
    {
      amount: 0.3,
      margin: "-12% 0px -18% 0px",
    }
  );

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      x: 18,
      scale: 0.985,
    },

    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
  };

  const visualVariants = {
    hidden: {
      opacity: 0.18,
      scale: 0.9,
      y: 18,
    },

    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  };

  return (
    <article
      ref={stepRef}
      className="
        relative
        min-h-[365px]
        pb-8
      "
    >
      {/* ======================================================================
          NODE
      ====================================================================== */}

      <motion.div
        initial={{
          scale: 0.78,
          opacity: 0.35,
        }}
        animate={{
          scale: isInView ? 1.12 : 0.84,
          opacity: isInView ? 1 : 0.38,
        }}
        transition={{
          duration: 0.52,
          ease: EASE,
        }}
        className="
          absolute
          left-[19px]
          top-[34px]
          z-40
          flex
          h-9
          w-9
          -translate-x-1/2
          items-center
          justify-center
          rounded-full
          border
          border-[#007AAE]/38
          bg-[#F1F7FB]
          font-mono
          text-[8px]
          font-bold
          text-[#006B9C]
          shadow-[0_0_18px_rgba(0,143,197,0.13)]
          dark:border-[#5DDBFF]/28
          dark:bg-[#07131F]
          dark:text-[#5DDBFF]
        "
      >
        {String(index + 1).padStart(
          2,
          "0"
        )}
      </motion.div>

      {/* ======================================================================
          MAIN CONTENT AREA
      ====================================================================== */}

      <motion.div
        variants={contentVariants}
        initial="hidden"
        animate={
          isInView
            ? "visible"
            : "hidden"
        }
        transition={{
          duration: 0.7,
          ease: EASE,
        }}
        className="
          relative
          z-20
          pl-12
          pr-2
          pt-5
        "
      >
        {/* Meta */}
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
              font-bold
              tracking-[0.18em]
              text-[#006B9C]
              dark:text-[#5DDBFF]
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
              w-9
              bg-[#007AAE]/45
              dark:bg-[#5DDBFF]/32
            "
          />

          <span
            className="
              text-[8px]
              font-bold
              uppercase
              tracking-[0.28em]
              text-[#176A8A]
              dark:text-[#5DDBFF]
            "
          >
            {item.step}
          </span>
        </div>

        {/* ====================================================================
            TABLET CONTENT GRID
        ==================================================================== */}

        <div
          className="
            mt-5
            grid
            grid-cols-[minmax(0,1fr)_150px]
            items-center
            gap-8
            md:grid-cols-[minmax(0,1fr)_170px]
            md:gap-10
          "
        >
          {/* Text */}
          <div className="min-w-0">
            <h3
              className="
                max-w-[720px]
                font-display
                text-[clamp(2.65rem,5.8vw,4.8rem)]
                font-semibold
                leading-[0.85]
                tracking-[-0.07em]
                text-[#061725]
                dark:text-white
              "
            >
              {item.title}
            </h3>

            <p
              className="
                mt-5
                max-w-[700px]
                text-[16px]
                font-medium
                leading-[1.78]
                text-[#334F63]
                dark:text-[#AFC2CF]
                md:text-[17px]
              "
            >
              {item.description}
            </p>

            <div
              className="
                mt-5
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
                  shadow-[0_0_9px_rgba(0,168,120,0.42)]
                "
              />

              <span
                className="
                  text-[7px]
                  font-bold
                  uppercase
                  tracking-[0.24em]
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

          {/* Visual */}
          <motion.div
            variants={visualVariants}
            initial="hidden"
            animate={
              isInView
                ? "visible"
                : "hidden"
            }
            transition={{
              duration: 0.72,
              delay: 0.05,
              ease: EASE,
            }}
            className="
              relative
              h-[145px]
              w-[145px]
              justify-self-center
              md:h-[160px]
              md:w-[160px]
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
        mt-7
        w-[92%]
        max-w-[640px]
        pb-4
      "
    >
      {/* Rail */}
      <div
        aria-hidden="true"
        className="
          absolute
          bottom-5
          left-[14px]
          top-0
          w-px
          bg-[#193E53]/[0.16]
          dark:bg-white/[0.09]
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          bottom-5
          left-[14px]
          top-0
          z-10
          w-[2px]
          bg-gradient-to-b
          from-[#0066B3]
          via-[#00A9E0]
          to-[#00A878]
        "
      />

      {items.map((item, index) => (
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
      ))}
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
  const stepRef = useRef(null);

  const isInView = useInView(
    stepRef,
    {
      amount: 0.28,
      margin: "-14% 0px -18% 0px",
    }
  );

  return (
    <article
      ref={stepRef}
      className="
        relative
        min-h-[315px]
        pb-5
        sm:min-h-[330px]
      "
    >
      {/* Node */}
      <motion.div
        initial={{
          scale: 0.78,
          opacity: 0.3,
        }}
        animate={{
          scale: isInView ? 1.1 : 0.84,
          opacity: isInView ? 1 : 0.38,
        }}
        transition={{
          duration: 0.5,
          ease: EASE,
        }}
        className="
          absolute
          left-[14px]
          top-[30px]
          z-40
          flex
          h-8
          w-8
          -translate-x-1/2
          items-center
          justify-center
          rounded-full
          border
          border-[#007AAE]/40
          bg-[#F1F7FB]
          font-mono
          text-[7px]
          font-bold
          text-[#006B9C]
          shadow-[0_0_16px_rgba(0,143,197,0.13)]
          dark:border-[#5DDBFF]/28
          dark:bg-[#07131F]
          dark:text-[#5DDBFF]
        "
      >
        {String(index + 1).padStart(
          2,
          "0"
        )}
      </motion.div>

      <motion.div
        initial={{
          opacity: 0,
          y: 28,
          x: 12,
          scale: 0.98,
        }}
        animate={{
          opacity: isInView ? 1 : 0.2,
          y: isInView ? 0 : 28,
          x: isInView ? 0 : 12,
          scale: isInView
            ? 1
            : 0.98,
        }}
        transition={{
          duration: 0.68,
          ease: EASE,
        }}
        className="
          relative
          z-20
          pl-10
          pr-1
          pt-5
        "
      >
        {/* Meta */}
        <div className="flex items-center gap-2.5">
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
            {String(index + 1).padStart(
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

        {/* Text */}
        <h3
          className="
            mt-4
            max-w-[300px]
            font-display
            text-[clamp(2.1rem,9vw,3.6rem)]
            font-semibold
            leading-[0.84]
            tracking-[-0.07em]
            text-[#061725]
            dark:text-white
          "
        >
          {item.title}
        </h3>

        <p
          className="
            mt-4
            max-w-[580px]
            text-[14px]
            font-medium
            leading-[1.75]
            text-[#334F63]
            dark:text-[#AFC2CF]
            sm:text-[15px]
          "
        >
          {item.description}
        </p>

        <div
          className="
            mt-5
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
              shadow-[0_0_8px_rgba(0,168,120,0.42)]
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

        {/* Small visual */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.86,
            y: 15,
          }}
          animate={{
            opacity: isInView ? 1 : 0.12,
            scale: isInView ? 1 : 0.86,
            y: isInView ? 0 : 15,
          }}
          transition={{
            duration: 0.65,
            delay: 0.05,
            ease: EASE,
          }}
          className="
            relative
            mt-5
            h-[82px]
            w-[82px]
            sm:hidden
          "
        >
          <ProcessVisual
            index={index}
            small
          />
        </motion.div>

        {/* Larger phone visual */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.86,
            y: 15,
          }}
          animate={{
            opacity: isInView ? 1 : 0.12,
            scale: isInView ? 1 : 0.86,
            y: isInView ? 0 : 15,
          }}
          transition={{
            duration: 0.65,
            delay: 0.05,
            ease: EASE,
          }}
          className="
            relative
            mt-5
            hidden
            h-[105px]
            w-[105px]
            sm:block
          "
        >
          <ProcessVisual
            index={index}
            small
          />
        </motion.div>
      </motion.div>
    </article>
  );
}

/* ============================================================================
   BACKGROUND
============================================================================ */

function ProcessBackground() {
  return (
    <>
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[46%]
          h-[540px]
          w-[540px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-[radial-gradient(circle,rgba(0,169,224,0.035),transparent_68%)]
          blur-[18px]
          dark:bg-[radial-gradient(circle,rgba(0,217,255,0.035),transparent_68%)]
        "
      />

      {/* Grid */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.02]
          [background-image:linear-gradient(#0A759C_1px,transparent_1px),linear-gradient(90deg,#0A759C_1px,transparent_1px)]
          [background-size:64px_64px]
          dark:opacity-[0.028]
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
          from-[#F1F7FB]
          to-transparent
          dark:from-[#07131F]
        "
      />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          right-0
          h-20
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
        py-20
        text-[#061725]
        dark:bg-[#07131F]
        dark:text-white
        md:py-28
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
          <div className="flex items-center gap-3">
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
              mt-4
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
              mt-5
              max-w-2xl
              text-[16px]
              font-medium
              leading-[1.8]
              text-[#385469]
              dark:text-[#AFC2CF]
              md:text-lg
            "
          >
            A clear, collaborative process that
            turns complex requirements into
            scalable digital products.
          </p>
        </ScrollReveal>

        <div className="mt-12">
          {items.map((item, index) => (
            <article
              key={
                item.step ??
                item.title ??
                index
              }
              className="
                border-t
                border-[#14384D]/10
                py-10
                dark:border-white/10
              "
            >
              <div className="flex gap-5">
                <span
                  className="
                    font-mono
                    text-xs
                    font-bold
                    text-[#006B9C]
                    dark:text-[#5DDBFF]
                  "
                >
                  {String(index + 1).padStart(
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
                      mt-3
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
                      mt-5
                      max-w-2xl
                      text-[16px]
                      font-medium
                      leading-[1.8]
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
          ))}
        </div>
      </div>
    </section>
  );
}