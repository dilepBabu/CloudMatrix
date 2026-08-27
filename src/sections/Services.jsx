import {
  memo,
  useCallback,
} from "react";

import { motion } from "framer-motion";

import ScrollReveal from "../components/ScrollReveal";
import NodeSpine from "../components/NodeSpine";
import TiltCard from "../components/TiltCard";
import ParallaxImageReveal from "../components/Parallaximagereveal";

import { useCursor } from "../context/CursorContext";
import { services } from "../data/content";
import { asserts } from "../assets/asserts.mjs";

/* =========================================================================
   SERVICE IMAGES
=========================================================================== */

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

/* =========================================================================
   EASING
=========================================================================== */

const smoothEase = [0.16, 1, 0.3, 1];

/* =========================================================================
   SERVICE ROW
=========================================================================== */

const ServiceRow = memo(function ServiceRow({
  service,
  index,
}) {
  const fromLeft = index % 2 === 0;

  const {
    setCursor,
    clearCursor,
  } = useCursor() || {};

  /* =======================================================================
     CURSOR
  ======================================================================= */

  const handleImageEnter = useCallback(() => {
    setCursor?.({
      label: "View",
    });
  }, [setCursor]);

  const handleImageLeave = useCallback(() => {
    clearCursor?.();
  }, [clearCursor]);

  /* =======================================================================
     TITLE
  ======================================================================= */

  const titleVariants = {
    hidden: {
      opacity: 0,
      y: 22,
    },

    visible: {
      opacity: 1,
      y: 0,

      transition: {
        duration: 0.6,
        ease: smoothEase,
      },
    },
  };

  const imageSrc =
    images[service.id] || asserts.web;

  return (
    <article
      id={service.id}
      className="
        relative
        min-h-[auto]
        border-b
        border-[#D9E8F0]
        dark:border-[#123A52]
        last:border-b-0

        lg:min-h-[92vh]
      "
    >
      {/* ==================================================================
          AMBIENT LIGHT
      =================================================================== */}

      <div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          top-1/2
          hidden
          h-72
          w-72
          -translate-y-1/2
          rounded-full
          bg-[#38BDF8]/[0.07]
          blur-3xl
          dark:bg-[#22D3EE]/[0.055]

          lg:block

          ${
            fromLeft
              ? "left-[5%]"
              : "right-[5%]"
          }
        `}
      />

      {/* ==================================================================
          CONTENT
      =================================================================== */}

      <div
        className="
          container-x
          grid
          min-h-[auto]
          w-full
          items-center
          gap-10
          py-14

          sm:py-16

          md:py-20

          lg:min-h-[92vh]
          lg:grid-cols-2
          lg:gap-16
          lg:py-0
        "
      >
        {/* ================================================================
            IMAGE
        ================================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: fromLeft ? -45 : 45,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: false,
            amount: 0.15,
          }}
          transition={{
            duration: 0.7,
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
          {/* ==============================================================
              OUTER GLOW
          ============================================================== */}

          <motion.div
            aria-hidden="true"
            animate={{
              scale: [1, 1.04, 1],
              opacity: [0.35, 0.55, 0.35],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="
              pointer-events-none
              absolute
              -inset-4
              rounded-[2rem]
              bg-gradient-to-r
              from-[#38BDF8]/10
              via-[#0EA5E9]/10
              to-[#2563EB]/10
              blur-2xl

              dark:from-[#22D3EE]/10
              dark:via-[#0EA5E9]/8
              dark:to-[#2563EB]/10

              sm:-inset-5
              sm:rounded-[2.5rem]
            "
          />

          {/* ==============================================================
              IMAGE CARD
          ============================================================== */}

          <TiltCard
            max={8}
            spotlight
            onPointerEnter={handleImageEnter}
            onPointerLeave={handleImageLeave}
            className="
              group
              relative
              aspect-[4/3]
              w-full
              min-h-[230px]
              overflow-hidden
              rounded-[1.5rem]
              border
              border-[#D7E8F1]
              bg-[#EAF5FA]
              shadow-[0_25px_70px_rgba(2,132,199,0.10)]

              sm:min-h-[260px]
              sm:rounded-[1.75rem]

              md:aspect-[16/10]
              md:min-h-[300px]

              lg:aspect-[4/3]
              lg:min-h-[340px]
              lg:rounded-[2rem]

              dark:border-[#16445E]
              dark:bg-[#082132]
              dark:shadow-[0_30px_90px_rgba(0,0,0,0.28)]
            "
          >
            {/* ============================================================
                FALLBACK BACKGROUND
            ============================================================= */}

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

            {/* ============================================================
                IMAGE
            ============================================================= */}

            <ParallaxImageReveal
              src={imageSrc}
              alt={service.name}
              eager={index < 2}
              imageClassName="
                h-full
                w-full
                object-cover
                object-center
                grayscale-[10%]
                transition-[filter,transform]
                duration-500
                ease-out
                group-hover:grayscale-0
              "
            />

            {/* ============================================================
                IMAGE TINT
            ============================================================= */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-0
                z-20
                bg-gradient-to-t
                from-[#06263A]/65
                via-[#0EA5E9]/[0.025]
                to-transparent

                dark:from-[#020F1A]/72
                dark:via-[#0EA5E9]/[0.04]
                dark:to-transparent
              "
            />

            {/* ============================================================
                BLUE GLOW
            ============================================================= */}

            <motion.div
              aria-hidden="true"
              animate={{
                opacity: [0.1, 0.22, 0.1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                pointer-events-none
                absolute
                left-[25%]
                top-[12%]
                z-20
                h-[35%]
                w-[35%]
                rounded-full
                bg-[#38BDF8]/10
                blur-3xl
              "
            />

            {/* ============================================================
                LIGHT SWEEP
            ============================================================= */}

            <motion.div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-y-0
                -left-[35%]
                z-30
                w-[35%]
                skew-x-[-18deg]
                bg-gradient-to-r
                from-transparent
                via-white/[0.14]
                to-transparent
              "
              animate={{
                x: ["0%", "430%"],
              }}
              transition={{
                duration: 3.8,
                repeat: Infinity,
                repeatDelay: 5,
                ease: "easeInOut",
              }}
            />

            {/* ============================================================
                CORNER
            ============================================================= */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                right-4
                top-4
                z-40
                h-12
                w-12
                rounded-tr-xl
                border-r
                border-t
                border-white/35

                sm:right-5
                sm:top-5
                sm:h-14
                sm:w-14
              "
            />

            {/* ============================================================
                TAG
            ============================================================= */}

            <span
              className="
                pointer-events-none
                absolute
                bottom-4
                left-4
                z-40
                font-mono
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-white/90

                sm:bottom-5
                sm:left-5
                sm:text-[10px]
              "
            >
              {service.tags?.[0] ||
                service.name}
            </span>

            {/* ============================================================
                VIEW INDICATOR
            ============================================================= */}

            <motion.div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                z-50
                flex
                h-14
                w-14
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-white/40
                bg-black/20
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-white
                opacity-0
                scale-90
                backdrop-blur-md
                transition-all
                duration-300

                group-hover:scale-100
                group-hover:opacity-100

                sm:h-16
                sm:w-16
                sm:text-[9px]
              "
            >
              View
            </motion.div>
          </TiltCard>

          {/* ==============================================================
              DECORATIVE CORNER GLOW
          ============================================================== */}

          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -left-5
              -top-5
              -z-10
              h-20
              w-20
              rounded-full
              bg-gradient-to-br
              from-[#38BDF8]/20
              to-[#2563EB]/5
              blur-2xl

              sm:-left-6
              sm:-top-6
              sm:h-24
              sm:w-24

              dark:from-[#22D3EE]/15
              dark:to-[#2563EB]/5
            "
          />
        </motion.div>

        {/* ================================================================
            TEXT
        ================================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            x: fromLeft ? 45 : -45,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: false,
            amount: 0.15,
          }}
          transition={{
            duration: 0.7,
            delay: 0.03,
            ease: smoothEase,
          }}
          className={`
            ${
              fromLeft
                ? "lg:order-2"
                : "lg:order-1"
            }
          `}
        >
          {/* ============================================================
              NUMBER
          ============================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: -8,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: false,
              amount: 0.15,
            }}
            transition={{
              duration: 0.45,
              ease: smoothEase,
            }}
            className="
              inline-flex
              items-center
              gap-3
              font-mono
              text-xs
              tracking-[0.15em]
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

            {String(index + 1).padStart(
              2,
              "0"
            )}

            <span className="opacity-40">
              /
            </span>

            {String(
              services.length
            ).padStart(2, "0")}
          </motion.div>

          {/* ============================================================
              TITLE
          ============================================================= */}

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.15,
            }}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.035,
                },
              },
            }}
            className="mt-4"
          >
            <motion.h3
              variants={titleVariants}
              className="
                max-w-2xl
                font-display
                text-3xl
                font-bold
                leading-[1.02]
                tracking-tight
                text-[#0B2533]
                dark:text-[#F4FBFF]

                sm:text-4xl

                md:text-5xl

                xl:text-6xl
              "
            >
              {service.name}
            </motion.h3>

            {/* UNDERLINE */}

            <motion.div
              initial={{
                scaleX: 0,
                opacity: 0,
              }}
              whileInView={{
                scaleX: 1,
                opacity: 1,
              }}
              viewport={{
                once: false,
                amount: 0.15,
              }}
              transition={{
                duration: 0.55,
                delay: 0.08,
                ease: smoothEase,
              }}
              className="
                mt-4
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
          </motion.div>

          {/* ============================================================
              DESCRIPTION
          ============================================================= */}

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
              once: false,
              amount: 0.15,
            }}
            transition={{
              duration: 0.55,
              delay: 0.1,
              ease: smoothEase,
            }}
            className="
              mt-5
              max-w-xl
              text-[15px]
              leading-[1.8]
              text-[#506875]
              dark:text-[#A9C4D3]

              md:text-base
            "
          >
            {service.description}
          </motion.p>

          {/* ============================================================
              VALUE BOX
          ============================================================= */}

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
              once: false,
              amount: 0.15,
            }}
            transition={{
              duration: 0.55,
              delay: 0.14,
              ease: smoothEase,
            }}
            className="
              relative
              mt-6
              max-w-xl
              overflow-hidden
              rounded-2xl
              border
              border-[#CFE8F4]
              bg-[#EAF7FD]/90
              px-4
              py-3.5
              shadow-[0_10px_30px_rgba(14,165,233,0.05)]

              dark:border-[#1B5875]
              dark:bg-[#0A2638]/80
              dark:shadow-[0_10px_30px_rgba(14,165,233,0.08)]
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
                via-[#0EA5E9]/[0.035]
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
                  text-sm
                  font-medium
                  leading-6
                  text-[#075985]
                  dark:text-[#D7F4FF]
                "
              >
                {service.value}
              </p>
            </div>
          </motion.div>

          {/* ============================================================
              TAGS
          ============================================================= */}

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
              once: false,
              amount: 0.12,
            }}
            transition={{
              duration: 0.5,
              delay: 0.18,
              ease: smoothEase,
            }}
            className="
              mt-6
              flex
              flex-wrap
              gap-2
            "
          >
            {service.tags.map(
              (tag, tagIndex) => (
                <motion.span
                  key={`${tag}-${tagIndex}`}
                  whileHover={{
                    y: -2,
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  transition={{
                    duration: 0.18,
                    ease: smoothEase,
                  }}
                  className="
                    rounded-full
                    border
                    border-[#D5E7EF]
                    bg-white/60
                    px-3
                    py-1.5
                    font-mono
                    text-xs
                    text-[#526B77]
                    transition-colors
                    duration-200

                    hover:border-[#0EA5E9]
                    hover:text-[#0284C7]

                    dark:border-[#21475D]
                    dark:bg-[#071D2B]/60
                    dark:text-[#AFC7D4]
                    dark:hover:border-[#38BDF8]/70
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

      {/* ==================================================================
          PARTICLES
      =================================================================== */}

      {[0, 1, 2].map((particle) => (
        <motion.span
          key={particle}
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            hidden
            h-1
            w-1
            rounded-full
            bg-[#38BDF8]/25
            dark:bg-[#38BDF8]/30

            lg:block
          "
          style={{
            left: `${20 + particle * 25}%`,
            top: `${25 + particle * 20}%`,
          }}
          animate={{
            y: [0, -10, 0],
            opacity: [
              0.15,
              0.4,
              0.15,
            ],
          }}
          transition={{
            duration: 6 + particle,
            repeat: Infinity,
            delay: particle * 0.7,
            ease: "easeInOut",
          }}
        />
      ))}
    </article>
  );
});

/* =========================================================================
   SERVICES SECTION
=========================================================================== */

export default function Services() {
  return (
    <section
      id="services"
      className="
        relative
        overflow-hidden
        bg-[#F5FAFD]
        py-20
        text-[#0B2533]

        sm:py-24

        md:py-28

        dark:bg-[#061B2A]
        dark:text-white
      "
    >
      {/* ==================================================================
          TOP AMBIENT
      =================================================================== */}

      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, 20, 0],
          y: [0, -12, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -left-40
          top-1/4
          h-72
          w-72
          rounded-full
          bg-[#38BDF8]/[0.045]
          blur-3xl

          md:h-96
          md:w-96

          dark:bg-[#0EA5E9]/[0.045]
        "
      />

      {/* ==================================================================
          BOTTOM AMBIENT
      =================================================================== */}

      <motion.div
        aria-hidden="true"
        animate={{
          x: [0, -18, 0],
          y: [0, 18, 0],
          scale: [1, 1.04, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-1/4
          h-96
          w-96
          rounded-full
          bg-[#0EA5E9]/[0.035]
          blur-3xl

          md:h-[30rem]
          md:w-[30rem]

          dark:bg-[#2563EB]/[0.04]
        "
      />

      {/* ==================================================================
          GRID
      =================================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.014]
          [background-image:linear-gradient(rgba(14,165,233,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(14,165,233,0.8)_1px,transparent_1px)]
          [background-size:60px_60px]

          dark:opacity-[0.022]
        "
      />

      {/* ==================================================================
          WATERMARK
      =================================================================== */}

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-6
          z-0
          -translate-x-1/2
          select-none
          whitespace-nowrap
          font-display
          text-[18vw]
          font-bold
          leading-none
          tracking-tight
          text-[#0284C7]/[0.025]

          dark:text-[#38BDF8]/[0.028]
        "
      >
        SERVICES
      </span>

      {/* ==================================================================
          HEADER
      =================================================================== */}

      <div
        className="
          container-x
          relative
          z-10
          mb-14

          md:mb-20
        "
      >
        <ScrollReveal className="max-w-2xl">
          <p
            className="
              eyebrow
              mb-4
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
              leading-[1.05]
              tracking-tight
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
                  amount: 0.4,
                }}
                transition={{
                  duration: 0.65,
                  ease: smoothEase,
                }}
                className="
                  absolute
                  -bottom-2
                  left-0
                  h-[4px]
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

                  md:h-[5px]
                "
              />
            </span>
          </h2>

          <p
            className="
              mt-6
              text-base
              leading-relaxed
              text-[#536B77]
              dark:text-[#A9C5D5]

              md:text-lg
            "
          >
            Comprehensive technology solutions
            to help your business thrive in the
            digital world. Scroll through — each
            capability gets the room it deserves.
          </p>
        </ScrollReveal>
      </div>

      {/* ==================================================================
          SERVICE LIST
      =================================================================== */}

      <div className="relative z-10">
        <NodeSpine
          nodeCount={services.length}
        />

        {services.map(
          (service, index) => (
            <ServiceRow
              key={service.id}
              service={service}
              index={index}
            />
          )
        )}
      </div>
    </section>
  );
}