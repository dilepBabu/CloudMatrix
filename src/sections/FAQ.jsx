import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqs } from "../data/content";

/* =========================================================
   FAQ ITEM
========================================================= */
function FAQItem({ faq, index, isOpen }) {
  const questionId = `faq-question-${index}`;
  const answerId = `faq-answer-${index}`;

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
          min-h-[72px]
          w-full
          items-center
          justify-between
          gap-4
          rounded-xl
          py-6
          text-left
          outline-none
          select-none
          cursor-pointer
          pointer-events-auto
          touch-manipulation
          focus-visible:ring-2
          focus-visible:ring-[#0F766E]/40
          dark:focus-visible:ring-sky-400/40
        "
      >
        {/* Hover background */}
        <span
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-1
            z-0
            rounded-xl
            bg-[#ECF8F5]
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
            dark:bg-sky-400/[0.045]
          "
        />

        {/* Question text */}
        <span
          className="
            relative
            z-[1]
            flex-1
            pointer-events-none
            font-display
            text-base
            font-medium
            leading-snug
            text-[#17211F]
            transition-colors
            duration-300
            group-hover:text-[#0F766E]
            dark:text-slate-100
            dark:group-hover:text-sky-300
            md:text-lg
          "
        >
          {faq.q}
        </span>

        {/* Plus */}
        <motion.span
          aria-hidden="true"
          className="
            relative
            z-[1]
            flex
            h-9
            w-9
            shrink-0
            pointer-events-none
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-[#0F766E]
            via-[#0891B2]
            to-[#0D9488]
            text-lg
            font-bold
            text-white
            shadow-[0_6px_20px_rgba(15,118,110,0.16)]
            dark:from-[#38BDF8]
            dark:via-[#22D3EE]
            dark:to-[#0EA5E9]
            dark:text-[#061426]
            dark:shadow-[0_6px_22px_rgba(34,211,238,0.18)]
          "
          animate={{
            rotate: isOpen ? 45 : 0,
            scale: isOpen ? 1.06 : 1,
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
      <AnimatePresence initial={false}>
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
                duration: 0.38,
                ease: [0.22, 1, 0.36, 1],
              },
              opacity: {
                duration: 0.22,
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
                duration: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                pb-6
                pr-12
                md:pr-16
              "
            >
              <p
                className="
                  max-w-2xl
                  text-sm
                  leading-relaxed
                  text-[#64736F]
                  dark:text-slate-300/75
                  md:text-[15px]
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
  const [open, setOpen] = useState(
    Array.isArray(faqs) && faqs.length > 0 ? 0 : -1
  );

  /* =======================================================
     DOCUMENT POINTER HANDLER
     
     This is the important fix.

     Even if another visual layer is sitting above the FAQ,
     elementsFromPoint() gives us the complete stack of
     elements underneath the pointer.

     We locate the FAQ button and open that exact question.
  ======================================================= */
  useEffect(() => {
    if (!Array.isArray(faqs) || faqs.length === 0) {
      return undefined;
    }

    const handleDocumentPointerDown = (event) => {
      /*
       * Only normal primary mouse/touch interactions.
       */
      if (
        event.pointerType === "mouse" &&
        event.button !== 0
      ) {
        return;
      }

      /*
       * Get every element below the pointer.
       */
      const elements = document.elementsFromPoint(
        event.clientX,
        event.clientY
      );

      /*
       * Find our FAQ trigger somewhere in that stack.
       */
      const trigger = elements.find((element) => {
        return (
          element instanceof HTMLElement &&
          element.closest(
            "[data-faq-trigger='true']"
          )
        );
      });

      if (!trigger) {
        return;
      }

      const button = trigger.closest(
        "[data-faq-trigger='true']"
      );

      if (!button) {
        return;
      }

      const indexValue =
        button.getAttribute("data-faq-index");

      const index = Number(indexValue);

      if (
        Number.isNaN(index) ||
        index < 0 ||
        index >= faqs.length
      ) {
        return;
      }

      /*
       * Open selected FAQ.
       * Clicking same FAQ closes it.
       */
      setOpen((current) => {
        if (current === index) {
          return -1;
        }

        return index;
      });
    };

    /*
     * Capture phase makes this very reliable.
     */
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
  if (!Array.isArray(faqs) || faqs.length === 0) {
    return null;
  }

  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        bg-[#F8FAF9]
        py-24
        dark:bg-[#071426]
        md:py-32
      "
    >
      {/* ===================================================
          BACKGROUND
      =================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          -top-32
          z-0
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
          z-0
          h-96
          w-96
          rounded-full
          bg-cyan-500/[0.035]
          blur-3xl
          dark:bg-blue-500/[0.05]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          z-0
          h-[500px]
          w-[500px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-teal-400/[0.018]
          blur-3xl
          dark:bg-sky-400/[0.025]
        "
      />

      {/* ===================================================
          CONTENT
      =================================================== */}
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
            y: 25,
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
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mb-14"
        >
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
              font-display
              text-3xl
              font-semibold
              text-[#17211F]
              dark:text-white
              md:text-4xl
            "
          >
            Frequently asked questions
          </h2>

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
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              mt-5
              h-[2px]
              w-20
              origin-left
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
        </motion.div>

        {/* =================================================
            FAQ CARD
        ================================================= */}
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.1,
          }}
          transition={{
            duration: 0.65,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            z-[20]
            w-full
            overflow-hidden
            rounded-2xl
            border
            border-[#DCE8E5]
            bg-white
            px-5
            shadow-[0_15px_50px_rgba(15,118,110,0.05)]
            dark:border-sky-400/10
            dark:bg-[#0A1B31]/75
            dark:shadow-[0_15px_60px_rgba(14,165,233,0.07)]
            md:px-7
          "
        >
          {/* Card decoration */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              right-0
              top-0
              z-0
              h-48
              w-48
              rounded-full
              bg-teal-400/[0.025]
              blur-3xl
              dark:bg-sky-400/[0.035]
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
            {faqs.map((faq, index) => (
              <FAQItem
                key={`${faq.q}-${index}`}
                faq={faq}
                index={index}
                isOpen={open === index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}