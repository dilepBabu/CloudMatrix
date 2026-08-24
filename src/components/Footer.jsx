import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { company, waLink } from "../data/content";
import { useCursor } from "../context/CursorContext";
import logo from "../assets/logo.png";

/* =========================================================================
   SOCIAL
=========================================================================== */

const socialItems = [
  [
    "LinkedIn",
    company.social.linkedin,
    "#0A66C2",
  ],
  [
    "Instagram",
    company.social.instagram,
    "#E1306C",
  ],
  [
    "YouTube",
    "https://www.youtube.com/@cloudmatrixtechnologies",
    "#FF0000",
  ],
];

/* =========================================================================
   QUICK LINKS
=========================================================================== */

const quickLinks = [
  {
    label: "Home",
    type: "route",
    to: "/",
  },
  {
    label: "Services",
    type: "section",
    id: "services",
  },
  {
    label: "Why Choose Us",
    type: "section",
    id: "why-us",
  },
  {
    label: "Blog",
    type: "route",
    to: "/blog",
  },
  {
    label: "Careers",
    type: "route",
    to: "/career",
  },
];

/* =========================================================================
   LEGAL
=========================================================================== */

const legalLinks = [
  {
    label: "Privacy Policy",
    to: "/privacy-policy",
  },
  {
    label: "Terms of Service",
    to: "/terms-of-service",
  },
  {
    label: "Talk to an Expert",
    to: "/talk-to-expert",
  },
];

/* =========================================================================
   SOCIAL ICONS
=========================================================================== */

function SocialIcon({ name }) {
  /* -----------------------------------------------------------------------
     LINKEDIN
  ----------------------------------------------------------------------- */

  if (name === "LinkedIn") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-[22px] w-[22px]"
      >
        <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.98 1.98 0 1 0 5.25 7a1.98 1.98 0 0 0 0-4ZM20.44 13.41c0-3.46-1.84-5.07-4.3-5.07-1.98 0-2.86 1.09-3.35 1.86V8.5H9.41V20h3.38v-5.69c0-1.5.28-2.95 2.14-2.95 1.83 0 1.86 1.71 1.86 3.05V20h3.38l.27-6.59Z" />
      </svg>
    );
  }

  /* -----------------------------------------------------------------------
     INSTAGRAM
  ----------------------------------------------------------------------- */

  if (name === "Instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="h-[22px] w-[22px]"
      >
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        <circle
          cx="12"
          cy="12"
          r="4"
          stroke="currentColor"
          strokeWidth="1.8"
        />

        <circle
          cx="17.4"
          cy="6.6"
          r="1"
          fill="currentColor"
        />
      </svg>
    );
  }

  /* -----------------------------------------------------------------------
     YOUTUBE
  ----------------------------------------------------------------------- */

  if (name === "YouTube") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-[22px] w-[22px]"
      >
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.12C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.4.58A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.12c1.86.58 9.4.58 9.4.58s7.54 0 9.4-.58a3 3 0 0 0 2.1-2.12A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.9V8.1l6.5 3.9-6.5 3.9Z" />
      </svg>
    );
  }

  return null;
}

/* =========================================================================
   FOOTER
=========================================================================== */

export default function Footer() {
  const navigate = useNavigate();

  const { setCursor, clearCursor } = useCursor() || {};

  /* =======================================================================
     SECTION NAVIGATION
  ======================================================================= */

  const handleSectionClick = (id) => {
    const currentPath = window.location.pathname;

    /* -----------------------------------------------------------------------
       HOME
    ----------------------------------------------------------------------- */

    if (currentPath === "/" || currentPath === "") {
      const element = document.getElementById(id);

      if (!element) {
        console.warn(`Section #${id} not found`);
        return;
      }

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      return;
    }

    /* -----------------------------------------------------------------------
       ANOTHER ROUTE
    ----------------------------------------------------------------------- */

    navigate(`/#${id}`);

    window.setTimeout(() => {
      const element = document.getElementById(id);

      if (!element) return;

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 400);
  };

  return (
    <footer
      className="
        relative
        z-40
        w-full
        overflow-hidden
        bg-gradient-to-br
        from-[#071B3A]
        via-[#082B5C]
        to-[#06152F]
        pt-20
        pb-8
        text-white
        dark:from-[#020817]
        dark:via-[#061A38]
        dark:to-[#020B1D]
      "
    >
      {/* ==================================================================
          BACKGROUND
      =================================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0
          overflow-hidden
        "
      >
        {/* ================================================================
            BLUE GLOW
        ================================================================= */}

        <motion.div
          className="
            absolute
            -left-40
            -top-40
            h-[32rem]
            w-[32rem]
            rounded-full
            bg-blue-500/[0.14]
            blur-[110px]
            dark:bg-blue-500/[0.10]
          "
          animate={{
            x: [0, 35, 0],
            y: [0, 25, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ================================================================
            CYAN GLOW
        ================================================================= */}

        <motion.div
          className="
            absolute
            -bottom-48
            -right-40
            h-[34rem]
            w-[34rem]
            rounded-full
            bg-cyan-400/[0.10]
            blur-[120px]
            dark:bg-cyan-400/[0.07]
          "
          animate={{
            x: [0, -30, 0],
            y: [0, -25, 0],
            scale: [1.05, 1, 1.05],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ================================================================
            GRID
        ================================================================= */}

        <motion.div
          className="
            absolute
            inset-0
            opacity-[0.12]
            dark:opacity-[0.08]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(56,189,248,0.16) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(56,189,248,0.16) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "48px 48px",
            maskImage:
              "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent, black 25%, black 75%, transparent)",
          }}
          animate={{
            backgroundPosition: [
              "0px 0px",
              "48px 48px",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* ================================================================
            SCAN LINE
        ================================================================= */}

        <motion.div
          className="
            absolute
            left-0
            right-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-cyan-300/40
            to-transparent
          "
          initial={{
            top: "-5%",
            opacity: 0,
          }}
          animate={{
            top: ["-5%", "105%"],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatDelay: 4,
            ease: "linear",
          }}
        />

        {/* ================================================================
            PARTICLES
        ================================================================= */}

        {[0, 1, 2, 3, 4, 5].map((index) => (
          <motion.span
            key={index}
            className="
              absolute
              h-1
              w-1
              rounded-full
              bg-cyan-300/50
              dark:bg-cyan-300/40
            "
            style={{
              left: `${10 + index * 15}%`,
              top: `${20 + ((index * 17) % 60)}%`,
            }}
            animate={{
              y: [0, -18, 0],
              x: [
                0,
                index % 2 === 0 ? 8 : -8,
                0,
              ],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ==================================================================
          CONTENT
      =================================================================== */}

      <div
        className="
          container-x
          relative
          z-50
          pointer-events-auto
        "
      >
        <div
          className="
            grid
            gap-12
            md:grid-cols-2
            lg:grid-cols-4
          "
        >
          {/* ==============================================================
              BRAND
          =============================================================== */}

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
              duration: 0.6,
            }}
          >
            {/* ==========================================================
                BRAND HEADER
            =========================================================== */}

            <motion.div
              className="
                mb-5
                flex
                items-center
                gap-3
              "
              whileHover={{
                x: 4,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              <motion.div
                whileHover={{
                  rotate: 5,
                  scale: 1.05,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 18,
                }}
                className="
                  relative
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-cyan-300/20
                  bg-white/10
                  shadow-[0_0_30px_rgba(34,211,238,0.12)]
                "
              >
                <img
                  src={logo}
                  alt="Cloud Matrix logo"
                  draggable="false"
                  className="
                    h-9
                    w-9
                    object-contain
                  "
                />
              </motion.div>

              <div>
                <p
                  className="
                    font-display
                    font-semibold
                    tracking-wide
                  "
                >
                  CLOUD MATRIX
                </p>

                <p
                  className="
                    font-mono
                    text-[10px]
                    tracking-[0.3em]
                    text-cyan-300
                  "
                >
                  TECHNOLOGIES
                </p>
              </div>
            </motion.div>

            <p
              className="
                max-w-xs
                text-sm
                leading-relaxed
                text-blue-100/65
                dark:text-slate-300/70
              "
            >
              {company.tagline}
            </p>

            {/* ==========================================================
                SOCIAL ICONS
            =========================================================== */}

            <div className="mt-7 flex items-center gap-3">
              {socialItems.map(
                ([label, href, color]) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    onMouseEnter={() => {
                      setCursor?.({
                        label,
                        variant: "social",
                        color,
                      });
                    }}
                    onMouseLeave={() => {
                      clearCursor?.();
                    }}
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    whileHover={{
                      y: -7,
                      scale: 1.08,
                    }}
                    whileTap={{
                      scale: 0.92,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 0.45,
                      ease: [
                        0.16,
                        1,
                        0.3,
                        1,
                      ],
                    }}
                    className="
                      group
                      relative
                      z-50
                      flex
                      h-12
                      w-12
                      cursor-pointer
                      items-center
                      justify-center
                      overflow-hidden
                      rounded-2xl
                      border
                      border-white/10
                      bg-white/[0.045]
                      text-white/70
                      backdrop-blur-md
                      transition-colors
                      duration-300
                    "
                  >
                    {/* ==================================================
                        GLOW
                    =================================================== */}

                    <span
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        -inset-2
                        rounded-[1.25rem]
                        opacity-0
                        blur-xl
                        transition-all
                        duration-500
                        group-hover:opacity-100
                      "
                      style={{
                        background: `radial-gradient(
                          circle,
                          ${color}66,
                          transparent 70%
                        )`,
                      }}
                    />

                    {/* ==================================================
                        BRAND BACKGROUND
                    =================================================== */}

                    <span
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-0
                        rounded-2xl
                        opacity-0
                        transition-opacity
                        duration-300
                        group-hover:opacity-100
                      "
                      style={{
                        backgroundColor: color,
                      }}
                    />

                    {/* ==================================================
                        ROTATING BORDER
                    =================================================== */}

                    <motion.span
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        inset-[2px]
                        z-10
                        rounded-[14px]
                        border
                        border-transparent
                        opacity-0
                        group-hover:opacity-100
                      "
                      animate={{
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{
                        borderColor: `${color}AA`,
                      }}
                    />

                    {/* ==================================================
                        ICON
                    =================================================== */}

                    <motion.span
                      className="
                        relative
                        z-20
                        flex
                        items-center
                        justify-center
                        transition-colors
                        duration-300
                        group-hover:text-white
                      "
                      whileHover={{
                        rotate: [
                          0,
                          -8,
                          8,
                          0,
                        ],
                      }}
                      transition={{
                        duration: 0.5,
                        ease: "easeOut",
                      }}
                    >
                      <SocialIcon name={label} />
                    </motion.span>

                    {/* ==================================================
                        DOT
                    =================================================== */}

                    <motion.span
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        right-1.5
                        top-1.5
                        z-30
                        h-1.5
                        w-1.5
                        rounded-full
                        opacity-0
                        group-hover:opacity-100
                      "
                      animate={{
                        scale: [
                          1,
                          1.5,
                          1,
                        ],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                      }}
                      style={{
                        backgroundColor: "#FFFFFF",
                        boxShadow: `0 0 10px ${color}`,
                      }}
                    />

                    {/* ==================================================
                        BOTTOM LINE
                    =================================================== */}

                    <span
                      aria-hidden="true"
                      className="
                        pointer-events-none
                        absolute
                        bottom-0
                        left-1/2
                        z-30
                        h-[2px]
                        w-0
                        -translate-x-1/2
                        rounded-full
                        transition-all
                        duration-500
                        group-hover:w-7
                      "
                      style={{
                        backgroundColor: "#FFFFFF",
                      }}
                    />
                  </motion.a>
                )
              )}
            </div>
          </motion.div>

          {/* ==============================================================
              QUICK LINKS
          =============================================================== */}

          <FooterColumn title="Quick Links">
            <ul className="space-y-3 text-sm">
              {quickLinks.map((item) => (
                <li key={item.label}>
                  {item.type === "route" ? (
                    <FooterLink to={item.to}>
                      {item.label}
                    </FooterLink>
                  ) : (
                    <FooterSectionLink
                      onClick={() =>
                        handleSectionClick(item.id)
                      }
                    >
                      {item.label}
                    </FooterSectionLink>
                  )}
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* ==============================================================
              LEGAL
          =============================================================== */}

          <FooterColumn title="Legal & Support">
            <ul className="space-y-3 text-sm">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <FooterLink to={item.to}>
                    {item.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </FooterColumn>

          {/* ==============================================================
              FIND US
          =============================================================== */}

          <FooterColumn title="Find Us">
            <ul className="space-y-4 text-sm">
              <li>
                <FooterExternalLink
                  href={company.mapsUrl}
                >
                  {company.location}
                </FooterExternalLink>
              </li>

              <li>
                <FooterExternalLink
                  href={company.phoneHref}
                >
                  {company.phone}
                </FooterExternalLink>
              </li>

              <li>
                <FooterExternalLink
                  href={`mailto:${company.email}`}
                >
                  {company.email}
                </FooterExternalLink>
              </li>

              <li className="pt-2">
                <motion.a
                  href={waLink(
                    "Hello! I came across your website and I’d like to know more about your services."
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={() =>
                    setCursor?.({
                      label: "Chat",
                    })
                  }
                  onMouseLeave={() =>
                    clearCursor?.()
                  }
                  whileHover={{
                    scale: 1.04,
                    y: -2,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="
                    relative
                    z-50
                    inline-flex
                    cursor-pointer
                    items-center
                    gap-2
                    overflow-hidden
                    rounded-full
                    bg-gradient-to-r
                    from-cyan-300
                    via-sky-400
                    to-blue-500
                    px-5
                    py-2.5
                    text-xs
                    font-semibold
                    text-[#06152F]
                    shadow-[0_8px_30px_rgba(14,165,233,0.25)]
                    transition-shadow
                    duration-300
                    hover:shadow-[0_10px_40px_rgba(34,211,238,0.40)]
                  "
                >
                  <motion.span
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      inset-y-0
                      -left-20
                      w-12
                      skew-x-[-20deg]
                      bg-white/40
                    "
                    animate={{
                      x: [
                        "0%",
                        "500%",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 3,
                      ease: "easeInOut",
                    }}
                  />

                  <span className="relative z-10">
                    Chat on WhatsApp
                  </span>

                  <motion.span
                    className="relative z-10"
                    animate={{
                      x: [0, 3, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                  >
                    →
                  </motion.span>
                </motion.a>
              </li>
            </ul>
          </FooterColumn>
        </div>

        {/* ==================================================================
            BOTTOM
        =================================================================== */}

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
            duration: 0.8,
          }}
          className="
            relative
            mt-16
            flex
            flex-col
            items-center
            justify-between
            gap-3
            border-t
            border-blue-400/15
            pt-8
            text-xs
            text-blue-100/40
            dark:text-slate-400/45
            md:flex-row
          "
        >
          <motion.div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              left-0
              top-[-1px]
              h-px
              w-32
              bg-gradient-to-r
              from-transparent
              via-cyan-300
              to-transparent
            "
            animate={{
              x: [
                "0%",
                "700%",
              ],
              opacity: [
                0,
                1,
                0,
              ],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          <p>
            ©{" "}
            {new Date().getFullYear()}{" "}
            Cloud Matrix Technologies.
            All Rights Reserved.
          </p>

          <p className="font-mono">
            Salem, Tamil Nadu — India
          </p>
        </motion.div>
      </div>
    </footer>
  );
}

/* =========================================================================
   FOOTER COLUMN
=========================================================================== */

function FooterColumn({
  title,
  children,
}) {
  return (
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
        duration: 0.6,
      }}
      className="
        relative
        z-50
        pointer-events-auto
      "
    >
      <div className="mb-5 flex items-center gap-3">
        <span
          className="
            h-px
            w-5
            bg-gradient-to-r
            from-cyan-300
            to-transparent
          "
        />

        <p
          className="
            font-display
            text-sm
            font-semibold
            text-cyan-200
          "
        >
          {title}
        </p>
      </div>

      {children}
    </motion.div>
  );
}

/* =========================================================================
   ROUTE LINK
=========================================================================== */

function FooterLink({
  to,
  children,
}) {
  return (
    <Link
      to={to}
      className="
        group
        relative
        z-50
        inline-flex
        w-fit
        cursor-pointer
        items-center
        gap-2
        py-1
        text-sm
        text-blue-100/70
        transition-colors
        duration-300
        hover:text-cyan-300
        dark:text-slate-300/70
        dark:hover:text-cyan-300
      "
    >
      <span
        aria-hidden="true"
        className="
          inline-block
          w-0
          overflow-hidden
          text-cyan-300
          opacity-0
          transition-all
          duration-300
          group-hover:w-4
          group-hover:opacity-100
        "
      >
        →
      </span>

      <span>
        {children}
      </span>

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-px
          w-full
          origin-left
          scale-x-0
          bg-gradient-to-r
          from-cyan-300
          via-sky-400
          to-transparent
          transition-transform
          duration-300
          group-hover:scale-x-100
        "
      />
    </Link>
  );
}

/* =========================================================================
   SECTION LINK
=========================================================================== */

function FooterSectionLink({
  onClick,
  children,
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{
        scale: 0.97,
      }}
      className="
        group
        relative
        z-50
        inline-flex
        cursor-pointer
        items-center
        gap-2
        border-0
        bg-transparent
        p-1
        text-left
        text-sm
        text-blue-100/70
        outline-none
        transition-colors
        duration-300
        hover:text-cyan-300
        focus-visible:rounded-md
        focus-visible:ring-2
        focus-visible:ring-cyan-300/50
        dark:text-slate-300/70
        dark:hover:text-cyan-300
      "
    >
      <span
        aria-hidden="true"
        className="
          inline-block
          w-0
          overflow-hidden
          text-cyan-300
          opacity-0
          transition-all
          duration-300
          group-hover:w-4
          group-hover:opacity-100
        "
      >
        →
      </span>

      <span>
        {children}
      </span>

      <span
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-px
          w-full
          origin-left
          scale-x-0
          bg-gradient-to-r
          from-cyan-300
          via-sky-400
          to-transparent
          transition-transform
          duration-300
          group-hover:scale-x-100
        "
      />
    </motion.button>
  );
}

/* =========================================================================
   EXTERNAL LINK
=========================================================================== */

function FooterExternalLink({
  href,
  children,
}) {
  const isExternal =
    typeof href === "string" &&
    href.startsWith("http");

  return (
    <motion.a
      href={href}
      target={
        isExternal
          ? "_blank"
          : undefined
      }
      rel={
        isExternal
          ? "noopener noreferrer"
          : undefined
      }
      whileHover={{
        x: 4,
      }}
      className="
        relative
        z-50
        block
        w-fit
        cursor-pointer
        py-1
        text-sm
        text-blue-100/70
        transition-colors
        duration-300
        hover:text-cyan-300
        dark:text-slate-300/70
        dark:hover:text-cyan-300
      "
    >
      {children}
    </motion.a>
  );
}