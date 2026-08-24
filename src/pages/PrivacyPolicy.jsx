import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

import { useRef } from "react";

import { company, legalIntro } from "../data/content";

/* =========================================================================
   DATA
=========================================================================== */

const sections = [
  {
    title: "1. Introduction",
    body: `This Privacy Policy explains how ${company.name} ("we", "us") collects, uses, discloses and protects information when you visit our website, contact us, or use services we build for you. By using this website, you agree to the practices described here.`,
  },

  {
    title: "2. Information We Collect",
    list: [
      "Contact details you share with us, such as name, email address and phone number.",
      "Enquiry and project details submitted through our forms or WhatsApp.",
      "Job application details, including your resume, when you apply through our Careers page.",
      "Basic technical information such as browser type and device, collected automatically for site performance.",
    ],
  },

  {
    title: "3. How We Use Your Information",
    list: [
      "To respond to enquiries and discuss potential projects.",
      "To review job applications and get in touch about open roles.",
      "To provide, maintain and improve the services we deliver to clients.",
      "To send updates related to a project or engagement you have with us.",
    ],
  },

  {
    title: "4. Data Security",
    body: "We take reasonable technical and organisational measures to protect the information you share with us. Access to personal data is limited to people who need it to do their job.",
  },

  {
    title: "5. Data Sharing & Disclosure",
    list: [
      "We do not sell or trade your personal information.",
      "Information may be shared with trusted service providers strictly to deliver a project (for example, hosting or payment providers).",
      "We may disclose information where required by law or a valid legal request.",
    ],
  },

  {
    title: "6. Your Choices",
    body: "You can ask us to update or delete information you have shared with us, or ask what data we hold about you, by contacting us at the details below.",
  },

  {
    title: "7. Cookies",
    body: "This website may use basic cookies or analytics to understand how visitors use the site and to improve performance. You can disable cookies in your browser settings.",
  },

  {
    title: "8. Changes to This Policy",
    body: "We may update this Privacy Policy from time to time. Continued use of this website after changes are posted means you accept the updated policy.",
  },
];

/* =========================================================================
   ANIMATION
=========================================================================== */

const ease = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

/* =========================================================================
   PRIVACY POLICY
=========================================================================== */

export default function PrivacyPolicy() {
  const pageRef = useRef(null);

  const shouldReduceMotion = useReducedMotion();

  /* =========================================================================
     SCROLL PROGRESS
  ========================================================================== */

  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ["start start", "end end"],
  });

  const progressScale = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.2,
  });

  /* =========================================================================
     BACKGROUND PARALLAX
  ========================================================================== */

  const orbY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -140]
  );

  const orbY2 = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 100]
  );

  return (
    <main
      ref={pageRef}
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-slate-50
        text-slate-900
        transition-colors
        duration-500
        dark:bg-[#03131F]
        dark:text-white
      "
    >
      {/* =====================================================================
          SCROLL PROGRESS
      ====================================================================== */}

      <motion.div
        aria-hidden="true"
        style={{
          scaleX: progressScale,
        }}
        className="
          fixed
          left-0
          right-0
          top-0
          z-[9990]
          h-[3px]
          origin-left
          bg-gradient-to-r
          from-[#2563EB]
          via-[#0EA5E9]
          to-[#06B6D4]
        "
      />

      {/* =====================================================================
          BACKGROUND
      ====================================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* Main blue orb */}
        <motion.div
          style={{
            y: shouldReduceMotion ? 0 : orbY,
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, 40, -20, 0],
                  scale: [1, 1.08, 0.98, 1],
                  opacity: [
                    0.18,
                    0.28,
                    0.2,
                    0.18,
                  ],
                }
          }
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -left-[180px]
            -top-[160px]
            h-[620px]
            w-[620px]
            rounded-full
            bg-[#2563EB]/10
            blur-[110px]
            dark:bg-[#2563EB]/15
          "
        />

        {/* Cyan orb */}
        <motion.div
          style={{
            y: shouldReduceMotion
              ? 0
              : orbY2,
          }}
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  x: [0, -30, 20, 0],
                  scale: [1, 0.96, 1.08, 1],
                  opacity: [
                    0.12,
                    0.2,
                    0.15,
                    0.12,
                  ],
                }
          }
          transition={{
            duration: 17,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            -bottom-[220px]
            -right-[140px]
            h-[560px]
            w-[560px]
            rounded-full
            bg-[#06B6D4]/10
            blur-[110px]
            dark:bg-[#06B6D4]/12
          "
        />

        {/* Small center glow */}
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  scale: [0.9, 1.1, 0.9],
                  opacity: [
                    0.06,
                    0.14,
                    0.06,
                  ],
                }
          }
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="
            absolute
            left-1/2
            top-[38%]
            h-[360px]
            w-[360px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#0EA5E9]/8
            blur-[100px]
            dark:bg-[#38BDF8]/8
          "
        />

        {/* Grid */}
        <div
          className="
            absolute
            inset-0
            opacity-[0.035]
            [background-image:linear-gradient(rgba(37,99,235,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.9)_1px,transparent_1px)]
            [background-size:60px_60px]
            dark:opacity-[0.055]
            dark:[background-image:linear-gradient(rgba(56,189,248,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(56,189,248,0.9)_1px,transparent_1px)]
          "
        />

        {/* Vignette */}
        <div
          className="
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_35%,rgba(241,245,249,0.75)_100%)]
            dark:bg-[radial-gradient(circle_at_center,transparent_35%,rgba(3,19,31,0.72)_100%)]
          "
        />
      </div>

      {/* =====================================================================
          HERO
      ====================================================================== */}

      <section
        className="
          relative
          z-10
          px-6
          pb-12
          pt-32
          md:px-10
          md:pt-40
        "
      >
        <div className="container-x">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="mx-auto max-w-4xl"
          >
            {/* Eyebrow */}

            <motion.div
              variants={itemVariants}
              className="
                mb-6
                flex
                items-center
                gap-3
              "
            >
              <span
                className="
                  h-px
                  w-10
                  bg-gradient-to-r
                  from-[#2563EB]
                  to-transparent
                  dark:from-[#38BDF8]
                "
              />

              <span
                className="
                  font-mono
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.28em]
                  text-[#2563EB]
                  dark:text-[#67E8F9]
                "
              >
                Legal
              </span>
            </motion.div>

            {/* Heading */}

            <motion.h1
              variants={itemVariants}
              className="
                max-w-4xl
                font-display
                text-4xl
                font-semibold
                leading-[0.95]
                tracking-[-0.04em]
                text-slate-900
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                dark:text-[#EFFAFF]
              "
            >
              Privacy
              <span
                className="
                  ml-3
                  inline-block
                  bg-gradient-to-r
                  from-[#2563EB]
                  via-[#0EA5E9]
                  to-[#06B6D4]
                  bg-clip-text
                  text-transparent
                "
              >
                Policy
              </span>
            </motion.h1>

            {/* Underline */}

            <motion.div
              variants={itemVariants}
              className="mt-7 flex items-center gap-3"
            >
              <motion.span
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  duration: 1,
                  delay: 0.45,
                  ease,
                }}
                className="
                  h-[3px]
                  w-24
                  origin-left
                  rounded-full
                  bg-gradient-to-r
                  from-[#2563EB]
                  via-[#0EA5E9]
                  to-transparent
                "
              />

              <span
                className="
                  text-xs
                  text-slate-500
                  dark:text-slate-400
                "
              >
                Effective Date: {legalIntro.effectiveDate}
              </span>
            </motion.div>

            {/* Company */}

            <motion.p
              variants={itemVariants}
              className="
                mt-5
                max-w-2xl
                text-sm
                leading-relaxed
                text-slate-500
                md:text-base
                dark:text-slate-400
              "
            >
              {company.name}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* =====================================================================
          CONTENT
      ====================================================================== */}

      <section
        className="
          relative
          z-10
          px-6
          pb-28
          md:px-10
        "
      >
        <div className="container-x">
          <div className="mx-auto max-w-4xl">
            <div className="space-y-6">
              {sections.map(
                (section, index) => (
                  <motion.article
                    key={section.title}
                    initial={{
                      opacity: 0,
                      y: 40,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.18,
                    }}
                    transition={{
                      duration: 0.7,
                      delay:
                        index * 0.04,
                      ease,
                    }}
                    whileHover={
                      shouldReduceMotion
                        ? undefined
                        : {
                            y: -4,
                          }
                    }
                    className="
                      group
                      relative
                      overflow-hidden
                      rounded-[1.5rem]
                      border
                      border-slate-200
                      bg-white/80
                      p-6
                      shadow-[0_15px_45px_rgba(15,23,42,0.05)]
                      backdrop-blur-xl
                      transition-all
                      duration-500
                      hover:border-[#93C5FD]
                      hover:shadow-[0_20px_60px_rgba(37,99,235,0.10)]
                      md:p-8
                      dark:border-[#17384D]
                      dark:bg-[#071D2C]/80
                      dark:shadow-[0_15px_45px_rgba(0,0,0,0.20)]
                      dark:hover:border-[#1E7492]
                      dark:hover:shadow-[0_20px_60px_rgba(14,165,233,0.10)]
                    "
                  >
                    {/* Hover glow */}

                    <div
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        -right-20
                        -top-20
                        h-44
                        w-44
                        rounded-full
                        bg-[#38BDF8]/0
                        blur-3xl
                        transition-colors
                        duration-500
                        group-hover:bg-[#38BDF8]/10
                        dark:group-hover:bg-[#38BDF8]/10
                      "
                    />

                    {/* Left accent */}

                    <motion.div
                      aria-hidden="true"
                      initial={{
                        scaleY: 0,
                      }}
                      whileInView={{
                        scaleY: 1,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.7,
                        delay:
                          index * 0.04 +
                          0.15,
                        ease,
                      }}
                      className="
                        absolute
                        bottom-6
                        left-0
                        top-6
                        w-[3px]
                        origin-center
                        rounded-r-full
                        bg-gradient-to-b
                        from-[#2563EB]
                        via-[#0EA5E9]
                        to-[#06B6D4]
                      "
                    />

                    {/* Number */}

                    <div
                      className="
                        mb-4
                        inline-flex
                        h-8
                        min-w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#BFDBFE]
                        bg-[#EFF6FF]
                        px-2
                        font-mono
                        text-[10px]
                        font-semibold
                        text-[#2563EB]
                        dark:border-[#185A72]
                        dark:bg-[#08283A]
                        dark:text-[#67E8F9]
                      "
                    >
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </div>

                    {/* Title */}

                    <h2
                      className="
                        relative
                        font-display
                        text-xl
                        font-semibold
                        tracking-tight
                        text-slate-900
                        md:text-2xl
                        dark:text-[#EFFAFF]
                      "
                    >
                      {section.title}
                    </h2>

                    {/* Body */}

                    {section.body && (
                      <motion.p
                        initial={{
                          opacity: 0,
                        }}
                        whileInView={{
                          opacity: 1,
                        }}
                        viewport={{
                          once: true,
                        }}
                        transition={{
                          duration: 0.5,
                          delay:
                            0.15 +
                            index *
                              0.04,
                        }}
                        className="
                          relative
                          mt-4
                          text-sm
                          leading-7
                          text-slate-600
                          md:text-base
                          dark:text-slate-300
                        "
                      >
                        {section.body}
                      </motion.p>
                    )}

                    {/* List */}

                    {section.list && (
                      <ul
                        className="
                          relative
                          mt-5
                          space-y-3
                        "
                      >
                        {section.list.map(
                          (
                            item,
                            itemIndex
                          ) => (
                            <motion.li
                              key={item}
                              initial={{
                                opacity: 0,
                                x: -12,
                              }}
                              whileInView={{
                                opacity: 1,
                                x: 0,
                              }}
                              viewport={{
                                once: true,
                              }}
                              transition={{
                                duration:
                                  0.45,
                                delay:
                                  0.12 +
                                  itemIndex *
                                    0.05,
                                ease,
                              }}
                              className="
                                flex
                                items-start
                                gap-3
                                text-sm
                                leading-7
                                text-slate-600
                                md:text-base
                                dark:text-slate-300
                              "
                            >
                              <span
                                className="
                                  mt-[11px]
                                  h-1.5
                                  w-1.5
                                  shrink-0
                                  rounded-full
                                  bg-[#0EA5E9]
                                  shadow-[0_0_10px_rgba(14,165,233,0.35)]
                                "
                              />

                              <span>
                                {item}
                              </span>
                            </motion.li>
                          )
                        )}
                      </ul>
                    )}
                  </motion.article>
                )
              )}
            </div>

            {/* =================================================================
                CONTACT CARD
            ================================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 45,
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
                duration: 0.8,
                ease,
              }}
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : {
                      y: -5,
                    }
              }
              className="
                group
                relative
                mt-8
                overflow-hidden
                rounded-[1.75rem]
                border
                border-[#BFDBFE]
                bg-gradient-to-br
                from-[#EFF6FF]
                via-white
                to-[#ECFEFF]
                p-7
                shadow-[0_20px_60px_rgba(37,99,235,0.08)]
                transition-all
                duration-500
                hover:border-[#7DD3FC]
                hover:shadow-[0_25px_75px_rgba(14,165,233,0.15)]
                md:p-9
                dark:border-[#1C526D]
                dark:from-[#082335]
                dark:via-[#071B2A]
                dark:to-[#062B35]
                dark:hover:border-[#2680A2]
                dark:hover:shadow-[0_25px_75px_rgba(14,165,233,0.12)]
              "
            >
              {/* Animated background */}

              {!shouldReduceMotion && (
                <motion.div
                  aria-hidden="true"
                  animate={{
                    x: [
                      "-20%",
                      "120%",
                    ],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "linear",
                  }}
                  className="
                    pointer-events-none
                    absolute
                    left-0
                    top-0
                    h-full
                    w-24
                    skew-x-[-18deg]
                    bg-gradient-to-r
                    from-transparent
                    via-white/30
                    to-transparent
                    dark:via-[#38BDF8]/10
                  "
                />
              )}

              <div className="relative z-10">
                <div
                  className="
                    mb-4
                    font-mono
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.25em]
                    text-[#2563EB]
                    dark:text-[#67E8F9]
                  "
                >
                  Contact Us
                </div>

                <h2
                  className="
                    font-display
                    text-2xl
                    font-semibold
                    tracking-tight
                    text-slate-900
                    md:text-3xl
                    dark:text-[#EFFAFF]
                  "
                >
                  Questions about your data?
                </h2>

                <p
                  className="
                    mt-3
                    text-sm
                    leading-7
                    text-slate-600
                    dark:text-slate-300
                  "
                >
                  {company.name},{" "}
                  {company.location}
                  <br />
                  Email:{" "}
                  <a
                    href={`mailto:${company.email}`}
                    className="
                      font-medium
                      text-[#2563EB]
                      transition-colors
                      hover:text-[#06B6D4]
                      dark:text-[#67E8F9]
                      dark:hover:text-white
                    "
                  >
                    {company.email}
                  </a>
                  <br />
                  Phone:{" "}
                  <a
                    href={company.phoneHref}
                    className="
                      font-medium
                      text-[#2563EB]
                      transition-colors
                      hover:text-[#06B6D4]
                      dark:text-[#67E8F9]
                      dark:hover:text-white
                    "
                  >
                    {company.phone}
                  </a>
                </p>

                
              </div>
            </motion.div>

            {/* =================================================================
                FOOT NOTE
            ================================================================== */}

            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: 1,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.7,
                delay: 0.2,
              }}
              className="
                mt-10
                flex
                items-center
                justify-center
                gap-3
                text-center
              "
            >
              <span
                className="
                  h-px
                  w-12
                  bg-gradient-to-r
                  from-transparent
                  to-slate-300
                  dark:to-slate-600
                "
              />

              <span
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.25em]
                  text-slate-400
                  dark:text-slate-500
                "
              >
                Your privacy matters
              </span>

              <span
                className="
                  h-px
                  w-12
                  bg-gradient-to-l
                  from-transparent
                  to-slate-300
                  dark:to-slate-600
                "
              />
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}