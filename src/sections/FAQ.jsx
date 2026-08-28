import {
  useEffect,
  useState,
} from "react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { faqs } from "../data/content";

/* =========================================================
   FAQ ITEM
========================================================= */

function FAQItem({
  faq,
  index,
  isOpen,
}) {
  const questionId =
    `faq-question-${index}`;

  const answerId =
    `faq-answer-${index}`;

  return (
    <div
      className="
        faq-item
        relative
        border-b
        border-[#DCE8E5]
        last:border-b-0
        dark:border-sky-400/15
      "
    >
      {/* ===================================================
          QUESTION
      =================================================== */}

      <button
        id={questionId}
        type="button"
        data-faq-trigger="true"
        data-faq-index={index}
        aria-expanded={isOpen}
        aria-controls={answerId}
        className="
          faq-question-button
          group
          relative
          z-[10]
          flex
          min-h-[58px]
          w-full
          items-center
          justify-between
          gap-3
          rounded-lg
          py-3.5
          text-left
          outline-none
          select-none
          cursor-pointer
          pointer-events-auto
          touch-manipulation

          sm:min-h-[62px]
          sm:py-4

          md:min-h-[66px]
          md:py-4.5

          focus-visible:ring-2
          focus-visible:ring-[#0F766E]/40

          dark:focus-visible:ring-sky-400/40
        "
      >
        {/* =================================================
            HOVER BACKGROUND
        ================================================= */}

        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-1
            z-0
            rounded-lg
            bg-[#ECF8F5]
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
            dark:bg-sky-400/[0.045]
          "
        />

        {/* =================================================
            QUESTION TEXT
        ================================================= */}

        <span
          className="
            relative
            z-[1]
            flex-1
            pointer-events-none
            pr-2

            font-display
            text-[14px]
            font-medium
            leading-[1.45]

            text-[#17211F]

            transition-colors
            duration-300

            group-hover:text-[#0F766E]

            dark:text-slate-100
            dark:group-hover:text-sky-300

            sm:text-[15px]

            md:text-base
          "
        >
          {faq.q}
        </span>

        {/* =================================================
            PLUS BUTTON
        ================================================= */}

        <motion.span
          aria-hidden="true"
          className="
            relative
            z-[1]
            flex
            h-8
            w-8
            shrink-0
            pointer-events-none
            items-center
            justify-center
            rounded-full

            bg-gradient-to-br
            from-[#0F766E]
            via-[#0891B2]
            to-[#0D9488]

            text-base
            font-bold
            text-white

            shadow-[0_5px_16px_rgba(15,118,110,0.14)]

            dark:from-[#38BDF8]
            dark:via-[#22D3EE]
            dark:to-[#0EA5E9]

            dark:text-[#061426]

            dark:shadow-[0_5px_18px_rgba(34,211,238,0.16)]

            sm:h-9
            sm:w-9
          "
          animate={{
            rotate:
              isOpen ? 45 : 0,

            scale:
              isOpen ? 1.05 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 320,
            damping: 22,
            mass: 0.7,
          }}
        >
          +
        </motion.span>
      </button>

      {/* ===================================================
          ANSWER
      =================================================== */}

      <AnimatePresence
        initial={false}
      >
        {isOpen && (
          <motion.div
            id={answerId}
            key={answerId}
            role="region"
            aria-labelledby={questionId}
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
                duration: 0.32,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              },

              opacity: {
                duration: 0.18,
              },
            }}
            className="
              relative
              z-[5]
              overflow-hidden
            "
          >
            <motion.div
              initial={{
                opacity: 0,
                y: -6,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -4,
              }}
              transition={{
                duration: 0.24,
                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              className="
                pb-4
                pr-10

                sm:pb-5
                sm:pr-12

                md:pb-5
                md:pr-14
              "
            >
              <p
                className="
                  max-w-2xl
                  text-[13px]
                  leading-[1.65]
                  text-[#64736F]

                  sm:text-sm

                  md:text-[15px]

                  dark:text-slate-300/75
                "
              >
                {faq.a}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* =========================================================
   FAQ
========================================================= */

export default function FAQ() {
  const [open, setOpen] =
    useState(
      Array.isArray(faqs) &&
        faqs.length > 0
        ? 0
        : -1
    );

  /* =======================================================
     DOCUMENT POINTER HANDLER

     Keeps the click behavior reliable even if another
     visual layer is above the FAQ.
  ======================================================= */

  useEffect(() => {
    if (
      !Array.isArray(faqs) ||
      faqs.length === 0
    ) {
      return undefined;
    }

    const handleDocumentPointerDown = (
      event
    ) => {
      /* ---------------------------------------------------
         Ignore secondary mouse buttons
      --------------------------------------------------- */

      if (
        event.pointerType === "mouse" &&
        event.button !== 0
      ) {
        return;
      }

      /* ---------------------------------------------------
         Find every element under the pointer
      --------------------------------------------------- */

      const elements =
        document.elementsFromPoint(
          event.clientX,
          event.clientY
        );

      /* ---------------------------------------------------
         Find FAQ trigger
      --------------------------------------------------- */

      const trigger =
        elements.find(
          (element) => {
            return (
              element instanceof
                HTMLElement &&
              element.closest(
                "[data-faq-trigger='true']"
              )
            );
          }
        );

      if (!trigger) {
        return;
      }

      const button =
        trigger.closest(
          "[data-faq-trigger='true']"
        );

      if (!button) {
        return;
      }

      const indexValue =
        button.getAttribute(
          "data-faq-index"
        );

      const index =
        Number(indexValue);

      if (
        Number.isNaN(index) ||
        index < 0 ||
        index >= faqs.length
      ) {
        return;
      }

      /* ---------------------------------------------------
         Toggle selected FAQ
      --------------------------------------------------- */

      setOpen(
        (current) => {
          if (current === index) {
            return -1;
          }

          return index;
        }
      );
    };

    document.addEventListener(
      "pointerdown",
      handleDocumentPointerDown,
      true
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleDocumentPointerDown,
        true
      );
    };
  }, []);

  /* =======================================================
     SAFETY
  ======================================================= */

  if (
    !Array.isArray(faqs) ||
    faqs.length === 0
  ) {
    return null;
  }

  return (
    <section
      className="
        relative
        isolate
        overflow-hidden

        bg-[#F8FAF9]

        /* =================================================
           MOBILE
        ================================================= */

        py-10

        /* =================================================
           SMALL TABLET
        ================================================= */

        sm:py-12

        /* =================================================
           TABLET
        ================================================= */

        md:py-14

        /* =================================================
           DESKTOP
        ================================================= */

        lg:py-16

        /* =================================================
           LARGE DESKTOP
        ================================================= */

        xl:py-20

        dark:bg-[#071426]
      "
    >
      {/* =================================================
          BACKGROUND
      ================================================= */}

      {/* TOP RIGHT */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          z-0

          h-64
          w-64

          rounded-full

          bg-teal-500/[0.04]
          blur-3xl

          sm:h-72
          sm:w-72

          dark:bg-sky-400/[0.05]
        "
      />

      {/* BOTTOM LEFT */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -bottom-32
          -left-24
          z-0

          h-72
          w-72

          rounded-full

          bg-cyan-500/[0.03]
          blur-3xl

          sm:h-80
          sm:w-80

          dark:bg-blue-500/[0.045]
        "
      />

      {/* CENTER */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-0

          h-[420px]
          w-[420px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-teal-400/[0.014]
          blur-3xl

          dark:bg-sky-400/[0.022]
        "
      />

      {/* =================================================
          CONTENT
      ================================================= */}

      <div
        className="
          container-x
          relative
          z-[10]
          mx-auto

          max-w-3xl
        "
      >
        {/* =================================================
            HEADER
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 0.58,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="
            mb-8

            sm:mb-9

            md:mb-10

            lg:mb-11
          "
        >
          {/* EYEBROW */}

          <p
            className="
              eyebrow
              mb-3
              text-[#0F766E]
              dark:text-sky-300
            "
          >
            Common Questions
          </p>

          {/* TITLE */}

          <h2
            className="
              font-display

              text-[1.85rem]
              font-semibold

              leading-[1.05]

              tracking-[-0.035em]

              text-[#17211F]

              dark:text-white

              sm:text-3xl

              md:text-4xl
            "
          >
            Frequently asked questions
          </h2>

          {/* ACCENT */}

          <motion.div
            initial={{
              scaleX: 0,
            }}
            whileInView={{
              scaleX: 1,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.65,
              delay: 0.12,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="
              mt-4
              h-[2px]
              w-16
              origin-left
              rounded-full

              bg-gradient-to-r

              from-[#0F766E]
              via-[#0891B2]
              to-transparent

              dark:from-[#38BDF8]
              dark:via-[#22D3EE]
              dark:to-transparent

              sm:mt-5
              sm:w-20
            "
          />
        </motion.div>

        {/* =================================================
            FAQ CARD
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.08,
          }}
          transition={{
            duration: 0.6,
            delay: 0.08,
            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
          className="
            relative
            z-[20]

            w-full

            overflow-hidden

            rounded-xl

            border
            border-[#DCE8E5]

            bg-white

            px-3.5

            shadow-[0_12px_40px_rgba(15,118,110,0.045)]

            dark:border-sky-400/10
            dark:bg-[#0A1B31]/75
            dark:shadow-[0_12px_45px_rgba(14,165,233,0.055)]

            sm:rounded-2xl
            sm:px-5

            md:px-6

            lg:px-7
          "
        >
          {/* =================================================
              CARD DECORATION
          ================================================= */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-0
              top-0
              z-0

              h-40
              w-40

              rounded-full

              bg-teal-400/[0.02]
              blur-3xl

              dark:bg-sky-400/[0.03]
            "
          />

          {/* =================================================
              FAQ LIST
          ================================================= */}

          <div
            className="
              relative
              z-[50]
              pointer-events-auto
            "
          >
            {faqs.map(
              (faq, index) => (
                <FAQItem
                  key={`${faq.q}-${index}`}
                  faq={faq}
                  index={index}
                  isOpen={
                    open === index
                  }
                />
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}