import {
  motion,
  useReducedMotion,
} from "framer-motion";

import {
  memo,
  useState,
} from "react";

/* ============================================================================
   CONFIG
============================================================================ */

const EASE = [0.16, 1, 0.3, 1];

/* ============================================================================
   INDUSTRIES
============================================================================ */

const industries = [
  {
    id: "startups",
    number: "01",
    name: "Startups",
    short: "STARTUPS",
    type: "rocket",
    accent: "blue",
  },
  {
    id: "smb",
    number: "02",
    name: "Small & Medium Business",
    short: "SMB",
    type: "store",
    accent: "cyan",
  },
  {
    id: "enterprise",
    number: "03",
    name: "Enterprise",
    short: "ENTERPRISE",
    type: "building",
    accent: "violet",
  },
  {
    id: "finance",
    number: "04",
    name: "Finance & Fintech",
    short: "FINTECH",
    type: "finance",
    accent: "green",
  },
  {
    id: "healthcare",
    number: "05",
    name: "Healthcare",
    short: "HEALTHCARE",
    type: "health",
    accent: "red",
  },
  {
    id: "retail",
    number: "06",
    name: "Retail & Commerce",
    short: "RETAIL",
    type: "cart",
    accent: "orange",
  },
  {
    id: "education",
    number: "07",
    name: "Education",
    short: "EDUCATION",
    type: "education",
    accent: "yellow",
  },
  {
    id: "real-estate",
    number: "08",
    name: "Real Estate",
    short: "REAL ESTATE",
    type: "home",
    accent: "teal",
  },
  {
    id: "manufacturing",
    number: "09",
    name: "Manufacturing",
    short: "MANUFACTURING",
    type: "factory",
    accent: "slate",
  },
  {
    id: "logistics",
    number: "10",
    name: "Logistics",
    short: "LOGISTICS",
    type: "truck",
    accent: "indigo",
  },
  {
    id: "hospitality",
    number: "11",
    name: "Hospitality",
    short: "HOSPITALITY",
    type: "hotel",
    accent: "pink",
  },
  {
    id: "legal",
    number: "12",
    name: "Legal",
    short: "LEGAL",
    type: "scale",
    accent: "purple",
  },
  {
    id: "construction",
    number: "13",
    name: "Construction",
    short: "CONSTRUCTION",
    type: "helmet",
    accent: "amber",
  },
  {
    id: "media",
    number: "14",
    name: "Media",
    short: "MEDIA",
    type: "play",
    accent: "rose",
  },
  {
    id: "saas",
    number: "15",
    name: "SaaS & Technology",
    short: "SAAS",
    type: "cloud",
    accent: "sky",
  },
  {
    id: "travel",
    number: "16",
    name: "Travel & Tourism",
    short: "TRAVEL",
    type: "plane",
    accent: "emerald",
  },
  {
    id: "professional",
    number: "17",
    name: "Professional Services",
    short: "PROFESSIONAL",
    type: "briefcase",
    accent: "blue",
  },
  {
    id: "institutions",
    number: "18",
    name: "Institutions",
    short: "INSTITUTIONS",
    type: "heart",
    accent: "cyan",
  },
];

/* ============================================================================
   ACCENTS
============================================================================ */

function getAccent(accent) {
  const map = {
    blue: {
      text: "text-[#2563EB]",
      soft: "bg-[#2563EB]/[0.07]",
      border: "border-[#2563EB]/20",
      dark: "dark:text-[#60A5FA]",
    },

    cyan: {
      text: "text-[#0891B2]",
      soft: "bg-[#0891B2]/[0.07]",
      border: "border-[#0891B2]/20",
      dark: "dark:text-[#67E8F9]",
    },

    violet: {
      text: "text-[#7C3AED]",
      soft: "bg-[#7C3AED]/[0.07]",
      border: "border-[#7C3AED]/20",
      dark: "dark:text-[#A78BFA]",
    },

    green: {
      text: "text-[#059669]",
      soft: "bg-[#059669]/[0.07]",
      border: "border-[#059669]/20",
      dark: "dark:text-[#6EE7B7]",
    },

    red: {
      text: "text-[#DC2626]",
      soft: "bg-[#DC2626]/[0.07]",
      border: "border-[#DC2626]/20",
      dark: "dark:text-[#FCA5A5]",
    },

    orange: {
      text: "text-[#EA580C]",
      soft: "bg-[#EA580C]/[0.07]",
      border: "border-[#EA580C]/20",
      dark: "dark:text-[#FDBA74]",
    },

    yellow: {
      text: "text-[#CA8A04]",
      soft: "bg-[#CA8A04]/[0.07]",
      border: "border-[#CA8A04]/20",
      dark: "dark:text-[#FDE047]",
    },

    teal: {
      text: "text-[#0F766E]",
      soft: "bg-[#0F766E]/[0.07]",
      border: "border-[#0F766E]/20",
      dark: "dark:text-[#5EEAD4]",
    },

    slate: {
      text: "text-[#475569]",
      soft: "bg-[#475569]/[0.07]",
      border: "border-[#64748B]/20",
      dark: "dark:text-[#CBD5E1]",
    },

    indigo: {
      text: "text-[#4F46E5]",
      soft: "bg-[#4F46E5]/[0.07]",
      border: "border-[#4F46E5]/20",
      dark: "dark:text-[#818CF8]",
    },

    pink: {
      text: "text-[#DB2777]",
      soft: "bg-[#DB2777]/[0.07]",
      border: "border-[#DB2777]/20",
      dark: "dark:text-[#F9A8D4]",
    },

    purple: {
      text: "text-[#9333EA]",
      soft: "bg-[#9333EA]/[0.07]",
      border: "border-[#9333EA]/20",
      dark: "dark:text-[#D8B4FE]",
    },

    amber: {
      text: "text-[#D97706]",
      soft: "bg-[#D97706]/[0.07]",
      border: "border-[#D97706]/20",
      dark: "dark:text-[#FCD34D]",
    },

    rose: {
      text: "text-[#E11D48]",
      soft: "bg-[#E11D48]/[0.07]",
      border: "border-[#E11D48]/20",
      dark: "dark:text-[#FDA4AF]",
    },

    sky: {
      text: "text-[#0284C7]",
      soft: "bg-[#0284C7]/[0.07]",
      border: "border-[#0284C7]/20",
      dark: "dark:text-[#7DD3FC]",
    },

    emerald: {
      text: "text-[#047857]",
      soft: "bg-[#047857]/[0.07]",
      border: "border-[#047857]/20",
      dark: "dark:text-[#6EE7B7]",
    },
  };

  return map[accent] || map.blue;
}

/* ============================================================================
   INDUSTRY SVG
============================================================================ */

function IndustryLogo({ type }) {
  const size =
    "h-[54px] w-[54px] sm:h-[62px] sm:w-[62px]";

  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.9,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (type) {
    case "rocket":
      return (
        <svg
          viewBox="0 0 48 48"
          className={size}
        >
          <path
            {...stroke}
            d="M27 6c8 1 13 7 15 15L31 31l-9-4-4-9L27 6Z"
          />
          <path
            {...stroke}
            d="m18 30-8 8"
          />
          <path
            {...stroke}
            d="M12 26c-3 0-5 2-6 5 3 1 6 0 8-2"
          />
          <path
            {...stroke}
            d="M22 36c0 3-2 5-5 6 0-3 0-6 2-8"
          />
          <circle
            cx="31.5"
            cy="16.5"
            r="2.7"
            {...stroke}
          />
        </svg>
      );

    case "store":
      return (
        <svg
          viewBox="0 0 48 48"
          className={size}
        >
          <path
            {...stroke}
            d="M7 17h34l-3-8H10l-3 8Z"
          />
          <path
            {...stroke}
            d="M9 17v23h30V17"
          />
          <path
            {...stroke}
            d="M16 40V28h16v12"
          />
          <path
            {...stroke}
            d="M7 17c0 3 2 5 5 5s5-2 5-5c0 3 2 5 7 5s5-2 5-5c0 3 2 5 7 5s5-2 5-5"
          />
        </svg>
      );

    case "building":
      return (
        <svg
          viewBox="0 0 48 48"
          className={size}
        >
          <path
            {...stroke}
            d="M8 41V12l16-6v35"
          />
          <path
            {...stroke}
            d="M24 41V8l16 6v27"
          />
          <path
            {...stroke}
            d="M5 41h38"
          />
          <path
            {...stroke}
            d="M14 18h5M14 24h5M14 30h5M29 18h5M29 24h5M29 30h5"
          />
        </svg>
      );

    case "finance":
      return (
        <svg
          viewBox="0 0 48 48"
          className={size}
        >
          <circle
            cx="24"
            cy="24"
            r="17"
            {...stroke}
          />
          <path
            {...stroke}
            d="M24 13v22"
          />
          <path
            {...stroke}
            d="M30 17c-1-2-3-3-6-3-3 0-6 2-6 5s3 5 6 5 6 2 6 5-3 5-6 5c-3 0-5-1-6-3"
          />
        </svg>
      );

    case "health":
      return (
        <svg
          viewBox="0 0 48 48"
          className={size}
        >
          <path
            {...stroke}
            d="M24 40S8 30 8 18c0-6 4-9 9-9 3 0 6 2 7 5 1-3 4-5 7-5 5 0 9 3 9 9 0 12-16 22-16 22Z"
          />
          <path
            {...stroke}
            d="M16 23h6l2-6 3 11 3-5h4"
          />
        </svg>
      );

    case "cart":
      return (
        <svg
          viewBox="0 0 48 48"
          className={size}
        >
          <path
            {...stroke}
            d="M7 9h6l4 23h20l4-16H14"
          />
          <circle
            cx="20"
            cy="38"
            r="2.5"
            {...stroke}
          />
          <circle
            cx="35"
            cy="38"
            r="2.5"
            {...stroke}
          />
          <path
            {...stroke}
            d="M18 18h15M24 12v12M30 12v12"
          />
        </svg>
      );

    case "education":
      return (
        <svg
          viewBox="0 0 48 48"
          className={size}
        >
          <path
            {...stroke}
            d="m6 18 18-10 18 10-18 10L6 18Z"
          />
          <path
            {...stroke}
            d="M12 22v10c7 6 17 6 24 0V22"
          />
          <path
            {...stroke}
            d="M42 19v12"
          />
          <circle
            cx="42"
            cy="35"
            r="2"
            fill="currentColor"
          />
        </svg>
      );

    case "home":
      return (
        <svg
          viewBox="0 0 48 48"
          className={size}
        >
          <path
            {...stroke}
            d="m6 22 18-15 18 15"
          />
          <path
            {...stroke}
            d="M10 20v20h28V20"
          />
          <path
            {...stroke}
            d="M18 40V28h12v12"
          />
        </svg>
      );

    case "factory":
      return (
        <svg
          viewBox="0 0 48 48"
          className={size}
        >
          <path
            {...stroke}
            d="M6 41V20l11 6v-8l11 7V15l14 7v19"
          />
          <path
            {...stroke}
            d="M4 41h40"
          />
          <path
            {...stroke}
            d="M12 33h5M22 33h5M32 33h5"
          />
        </svg>
      );

    case "truck":
      return (
        <svg
          viewBox="0 0 48 48"
          className={size}
        >
          <path
            {...stroke}
            d="M5 12h25v22H5z"
          />
          <path
            {...stroke}
            d="M30 21h8l6 7v6H30"
          />
          <circle
            cx="13"
            cy="37"
            r="3"
            {...stroke}
          />
          <circle
            cx="36"
            cy="37"
            r="3"
            {...stroke}
          />
        </svg>
      );

    case "hotel":
      return (
        <svg
          viewBox="0 0 48 48"
          className={size}
        >
          <path
            {...stroke}
            d="M10 40V9h28v31"
          />
          <path
            {...stroke}
            d="M6 40h36"
          />
          <path
            {...stroke}
            d="M16 15h4M28 15h4M16 22h4M28 22h4M16 29h4M28 29h4"
          />
          <path
            {...stroke}
            d="M20 40V33h8v7"
          />
        </svg>
      );

    case "scale":
      return (
        <svg
          viewBox="0 0 48 48"
          className={size}
        >
          <path
            {...stroke}
            d="M24 8v32M12 15h24"
          />
          <path
            {...stroke}
            d="m12 15-5 11h10l-5-11ZM36 15l-5 11h10l-5-11Z"
          />
          <path
            {...stroke}
            d="M17 40h14"
          />
        </svg>
      );

    case "helmet":
      return (
        <svg
          viewBox="0 0 48 48"
          className={size}
        >
          <path
            {...stroke}
            d="M8 28c0-11 7-18 16-18s16 7 16 18"
          />
          <path
            {...stroke}
            d="M5 28h38v7H5z"
          />
          <path
            {...stroke}
            d="M24 10v18"
          />
        </svg>
      );

    case "play":
      return (
        <svg
          viewBox="0 0 48 48"
          className={size}
        >
          <rect
            x="6"
            y="9"
            width="36"
            height="30"
            rx="5"
            {...stroke}
          />
          <path
            d="m20 17 12 7-12 7V17Z"
            fill="currentColor"
          />
        </svg>
      );

    case "cloud":
      return (
        <svg
          viewBox="0 0 48 48"
          className={size}
        >
          <path
            {...stroke}
            d="M14 35h21c5 0 8-3 8-8 0-4-3-8-8-8-1-6-5-9-11-9-5 0-9 3-10 8-5 0-8 3-8 8s3 9 8 9Z"
          />
          <path
            {...stroke}
            d="M18 27h12M24 21v12"
          />
        </svg>
      );

    case "plane":
      return (
        <svg
          viewBox="0 0 48 48"
          className={size}
        >
          <path
            {...stroke}
            d="m5 25 37-8-12 9 8 8-5 2-12-5-9 5-3-2 6-7-10-1Z"
          />
          <path
            {...stroke}
            d="m24 20-2-9"
          />
        </svg>
      );

    case "briefcase":
      return (
        <svg
          viewBox="0 0 48 48"
          className={size}
        >
          <rect
            x="6"
            y="13"
            width="36"
            height="25"
            rx="4"
            {...stroke}
          />
          <path
            {...stroke}
            d="M16 13V9h16v4M6 23h36M20 23v5h8v-5"
          />
        </svg>
      );

    case "heart":
    default:
      return (
        <svg
          viewBox="0 0 48 48"
          className={size}
        >
          <path
            {...stroke}
            d="M24 39S8 29 8 18c0-6 4-9 9-9 3 0 6 2 7 5 1-3 4-5 7-5 5 0 9 3 9 9 0 11-16 21-16 21Z"
          />
          <path
            {...stroke}
            d="M15 24h6l3-7 3 10 2-3h5"
          />
        </svg>
      );
  }
}

/* ============================================================================
   TILE
============================================================================ */

const IndustryTile = memo(
  function IndustryTile({
    item,
    index,
    reduceMotion,
  }) {
    const accent = getAccent(
      item.accent
    );

    return (
      <motion.div
        initial={
          reduceMotion
            ? false
            : {
                opacity: 0,
                y: 12,
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
          amount: 0.15,
        }}
        transition={{
          duration: 0.42,
          delay: Math.min(
            index * 0.02,
            0.12
          ),
          ease: EASE,
        }}
        whileHover={
          reduceMotion
            ? undefined
            : {
                y: -4,
              }
        }
        className="
          group
          min-w-0
        "
      >
        <div
          className={`
            relative
            flex
            min-h-[138px]
            flex-col
            items-center
            justify-center
            overflow-hidden
            rounded-[1.35rem]
            border
            ${accent.border}
            bg-white
            px-3
            py-5
            text-center
            shadow-[0_10px_30px_rgba(7,24,39,0.04)]
            transition-all
            duration-300
            group-hover:shadow-[0_16px_38px_rgba(7,24,39,0.075)]
            dark:bg-[#091725]
            dark:border-white/[0.07]
            dark:shadow-none
          `}
        >
          <div
            aria-hidden="true"
            className={`
              pointer-events-none
              absolute
              -right-10
              -top-10
              h-24
              w-24
              rounded-full
              ${accent.soft}
              blur-2xl
              transition-transform
              duration-500
              group-hover:scale-125
            `}
          />

          {/* LOGO */}

          <div
            className={`
              relative
              z-10
              flex
              h-[70px]
              w-[70px]
              items-center
              justify-center
              rounded-[21px]
              border
              ${accent.border}
              ${accent.soft}
              ${accent.text}
              ${accent.dark}
              transform-gpu
              sm:h-[76px]
              sm:w-[76px]
            `}
          >
            <IndustryLogo
              type={item.type}
            />

            <span
              aria-hidden="true"
              className={`
                pointer-events-none
                absolute
                inset-1.5
                rounded-[17px]
                border
                ${accent.border}
                opacity-50
              `}
            />
          </div>

          {/* LABEL */}

          <span
            className="
              relative
              z-10
              mt-3
              max-w-full
              truncate
              px-1
              text-[7px]
              font-semibold
              uppercase
              tracking-[0.2em]
              text-[#627789]
              dark:text-[#94ACBC]
              sm:text-[8px]
            "
          >
            {item.short}
          </span>

          {/* NUMBER */}

          <span
            className="
              absolute
              bottom-2.5
              right-3
              font-mono
              text-[6px]
              tracking-[0.12em]
              text-[#91A4B1]/60
              dark:text-[#6D8799]/60
            "
          >
            {item.number}
          </span>
        </div>
      </motion.div>
    );
  }
);

/* ============================================================================
   MOBILE FEATURED INDUSTRIES
============================================================================ */

function MobileIndustryShowcase({
  reduceMotion,
}) {
  const [expanded, setExpanded] =
    useState(false);

  const featured =
    industries.slice(0, 6);

  const remaining =
    industries.slice(6);

  return (
    <div className="lg:hidden">
      {/* FEATURED MOBILE ROW */}

      <div
        className="
          -mx-1
          grid
          grid-cols-2
          gap-3
        "
      >
        {featured.map(
          (item, index) => (
            <IndustryTile
              key={item.id}
              item={item}
              index={index}
              reduceMotion={
                reduceMotion
              }
            />
          )
        )}
      </div>

      {/* COMPACT EXPAND */}

      <motion.div
        layout
        className="mt-3"
      >
        <button
          type="button"
          onClick={() =>
            setExpanded(
              (value) => !value
            )
          }
          className="
            group
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-full
            border
            border-[#BFD7E5]
            bg-white/80
            px-5
            py-3
            font-mono
            text-[9px]
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#176A8A]
            transition-all
            duration-300
            hover:border-[#00A9E0]/50
            hover:text-[#007CA8]
            dark:border-[#1B4057]
            dark:bg-[#0A1D2B]/80
            dark:text-[#7DD3FC]
          "
        >
          <span>
            {expanded
              ? "Show less"
              : `View all ${industries.length} industries`}
          </span>

          <motion.span
            animate={{
              rotate: expanded
                ? 180
                : 0,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            ↓
          </motion.span>
        </button>
      </motion.div>

      {/* REMAINING INDUSTRIES */}

      <motion.div
        initial={false}
        animate={{
          height: expanded
            ? "auto"
            : 0,
          opacity: expanded
            ? 1
            : 0,
        }}
        transition={{
          height: {
            duration: 0.4,
            ease: EASE,
          },
          opacity: {
            duration: 0.22,
          },
        }}
        className="
          overflow-hidden
        "
      >
        <div
          className="
            grid
            grid-cols-2
            gap-3
            pt-3
          "
        >
          {remaining.map(
            (item, index) => (
              <IndustryTile
                key={item.id}
                item={item}
                index={
                  index + 6
                }
                reduceMotion={
                  reduceMotion
                }
              />
            )
          )}
        </div>
      </motion.div>
    </div>
  );
}

/* ============================================================================
   DESKTOP INDUSTRIES
============================================================================ */

function DesktopIndustryGrid({
  reduceMotion,
}) {
  return (
    <div
      className="
        hidden
        lg:grid
        lg:grid-cols-3
        lg:gap-4
        xl:grid-cols-4
        xl:gap-5
      "
    >
      {industries.map(
        (item, index) => (
          <IndustryTile
            key={item.id}
            item={item}
            index={index}
            reduceMotion={
              reduceMotion
            }
          />
        )
      )}
    </div>
  );
}

/* ============================================================================
   MAIN
============================================================================ */

export default function Industries() {
  const reduceMotion =
    useReducedMotion();

  return (
    <section
      id="industries"
      className="
        relative
        overflow-hidden
        bg-[#F5F8FB]
        py-10
        text-[#071827]
        sm:py-12
        md:py-16
        lg:py-20
        dark:bg-[#061521]
        dark:text-white
      "
    >
      {/* BACKGROUND GRID */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.016]
          [background-image:linear-gradient(#0A759C_1px,transparent_1px),linear-gradient(90deg,#0A759C_1px,transparent_1px)]
          [background-size:64px_64px]
          dark:opacity-[0.023]
        "
      />

      {/* CENTER GLOW */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/4
          h-[420px]
          w-[420px]
          -translate-x-1/2
          rounded-full
          bg-[#00A9E0]/[0.025]
          blur-[90px]
          dark:bg-[#00D9FF]/[0.018]
        "
      />

      {/* CONTENT */}

      <div
        className="
          container-x
          relative
          z-10
          mx-auto
          px-5
          md:px-0
        "
      >
        {/* HEADER */}

        <motion.div
          initial={
            reduceMotion
              ? false
              : {
                  opacity: 0,
                  y: 16,
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
            amount: 0.2,
          }}
          transition={{
            duration: 0.6,
            ease: EASE,
          }}
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
                h-px
                w-8
                bg-[#00A9E0]
                dark:bg-[#5DDBFF]
              "
            />

            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.28em]
                text-[#007CA8]
                dark:text-[#5DDBFF]
              "
            >
              Who We Build For
            </span>
          </div>

          <div
            className="
              mt-4
              flex
              flex-col
              gap-4
              lg:flex-row
              lg:items-end
              lg:justify-between
              lg:gap-8
            "
          >
            <h2
              className="
                max-w-4xl
                font-display
                text-[2.35rem]
                font-semibold
                leading-[0.92]
                tracking-[-0.065em]
                sm:text-4xl
                md:text-5xl
                lg:text-[5rem]
              "
            >
              Built for{" "}
              <span
                className="
                  text-[#007CA8]
                  dark:text-[#5DDBFF]
                "
              >
                every business.
              </span>
            </h2>

            <p
              className="
                max-w-lg
                text-[13px]
                leading-[1.7]
                text-[#536B7C]
                dark:text-[#A6BDCB]
                md:text-sm
                lg:text-base
              "
            >
              Technology solutions for
              startups, enterprises,
              healthcare, retail, finance,
              education and more.
            </p>
          </div>
        </motion.div>

        {/* MOBILE */}

        <div className="mt-8 sm:mt-10">
          <MobileIndustryShowcase
            reduceMotion={
              reduceMotion
            }
          />
        </div>

        {/* DESKTOP */}

        <div className="mt-10 lg:mt-12">
          <DesktopIndustryGrid
            reduceMotion={
              reduceMotion
            }
          />
        </div>

        {/* FOOTER */}

        <div
          className="
            mt-8
            flex
            flex-col
            gap-3
            border-t
            border-[#D5E2EA]
            pt-5
            sm:flex-row
            sm:items-center
            sm:justify-between
            dark:border-white/[0.07]
          "
        >
          <div>
            <span
              className="
                text-[8px]
                font-semibold
                uppercase
                tracking-[0.26em]
                text-[#007CA8]
                dark:text-[#5DDBFF]
              "
            >
              One technology partner
            </span>

            <p
              className="
                mt-1
                text-[12px]
                leading-[1.6]
                text-[#627789]
                dark:text-[#8299A8]
              "
            >
              From idea to growth,
              we build around your
              business.
            </p>
          </div>

          <div
            className="
              flex
              items-center
              gap-2
              font-mono
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-[#7890A0]
              dark:text-[#6F8A9D]
            "
          >
            <span
              className="
                h-1.5
                w-1.5
                rounded-full
                bg-[#00A878]
                shadow-[0_0_8px_rgba(0,168,120,0.45)]
              "
            />

            18 Industries
          </div>
        </div>
      </div>
    </section>
  );
}