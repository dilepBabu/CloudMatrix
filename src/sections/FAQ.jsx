import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import ScrollReveal from "../components/ScrollReveal";
import { faqs } from "../data/content";

function Item({ f, isOpen, onToggle }) {
  return (
    <div
      className="
        group
        border-b
        border-[#DCE8E5]
        dark:border-sky-400/15
      "
    >
      <button
        onClick={onToggle}
        className="
          relative
          w-full
          flex
          items-center
          justify-between
          gap-4
          py-6
          text-left
        "
      >
        {/* Hover background */}
        <motion.div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-x-0
            inset-y-1
            rounded-xl

            bg-[#ECF8F5]

            dark:bg-sky-400/[0.045]
          "
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        />

        {/* Question */}
        <span
          className="
            relative
            z-10

            font-display
            font-medium

            text-base
            md:text-lg

            text-[#17211F]
            dark:text-slate-100

            transition-colors
            duration-300

            group-hover:text-[#0F766E]
            dark:group-hover:text-sky-300
          "
        >
          {f.q}
        </span>

        {/* Plus button */}
        <motion.span
          animate={{
            rotate: isOpen ? 45 : 0,
            scale: isOpen ? 1.05 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 18,
          }}
          className="
            relative
            z-10
            shrink-0

            flex
            h-9
            w-9
            items-center
            justify-center

            rounded-full

            bg-gradient-to-br
            from-[#0F766E]
            via-[#0891B2]
            to-[#0D9488]

            dark:from-[#38BDF8]
            dark:via-[#22D3EE]
            dark:to-[#0EA5E9]

            text-white
            dark:text-[#061426]

            text-lg
            font-bold

            shadow-[0_6px_20px_rgba(15,118,110,0.16)]
            dark:shadow-[0_6px_22px_rgba(34,211,238,0.18)]

            transition-shadow
            duration-300

            group-hover:shadow-[0_8px_25px_rgba(15,118,110,0.28)]
            dark:group-hover:shadow-[0_8px_30px_rgba(34,211,238,0.32)]
          "
        >
          +
        </motion.span>
      </button>

      {/* Answer */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              height: {
                duration: 0.38,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.25,
              },
            }}
            className="overflow-hidden"
          >
            <motion.p
              initial={{
                opacity: 0,
                y: -8,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -5,
              }}
              transition={{
                duration: 0.3,
                delay: 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                max-w-2xl
                pb-6

                text-sm
                md:text-[15px]

                leading-relaxed

                text-[#64736F]
                dark:text-slate-300/75
              "
            >
              {f.a}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section
      className="
        relative
        overflow-hidden

        py-24
        md:py-32

        /* =========================
           LIGHT MODE
        ========================== */

        bg-[#F8FAF9]

        /* =========================
           DARK MODE - BLUE
        ========================== */

        dark:bg-[#071426]

        transition-colors
        duration-500
      "
    >
      {/* =========================================
          DARK BLUE AMBIENT GLOW
      ========================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute

          -top-32
          -right-32

          h-80
          w-80

          rounded-full

          bg-teal-500/[0.045]

          blur-3xl

          dark:bg-sky-400/[0.055]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute

          -bottom-40
          -left-32

          h-96
          w-96

          rounded-full

          bg-cyan-500/[0.035]

          blur-3xl

          dark:bg-blue-500/[0.05]
        "
      />

      {/* =========================================
          CONTENT
      ========================================= */}

      <div
        className="
          container-x
          max-w-3xl
          relative
          z-10
        "
      >
        {/* HEADER */}

        <ScrollReveal className="mb-14">
          <p
            className="
              eyebrow
              mb-4

              text-[#0F766E]

              dark:text-sky-300
            "
          >
            Common Questions
          </p>

          <h2
            className="
              text-3xl
              md:text-4xl

              font-display
              font-semibold

              text-[#17211F]

              dark:text-white
            "
          >
            Frequently asked questions
          </h2>

          {/* Accent line */}

          <motion.div
            initial={{
              scaleX: 0,
              transformOrigin: "left",
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-5
              h-[2px]
              w-20

              rounded-full

              bg-gradient-to-r
              from-[#0F766E]
              via-[#0891B2]
              to-transparent

              dark:from-[#38BDF8]
              dark:via-[#22D3EE]
              dark:to-transparent
            "
          />
        </ScrollReveal>

        {/* FAQ CARD */}

        <ScrollReveal delay={0.1}>
          <div
            className="
              rounded-2xl
              border

              border-[#DCE8E5]

              bg-white

              dark:border-sky-400/10
              dark:bg-[#0A1B31]/75

              backdrop-blur-sm

              px-5
              md:px-7

              shadow-[0_15px_50px_rgba(15,118,110,0.05)]

              dark:shadow-[0_15px_60px_rgba(14,165,233,0.07)]
            "
          >
            {faqs.map((f, i) => (
              <Item
                key={f.q}
                f={f}
                isOpen={open === i}
                onToggle={() =>
                  setOpen(open === i ? -1 : i)
                }
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}