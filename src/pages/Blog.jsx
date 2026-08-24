import { motion, useReducedMotion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'

const posts = [
  {
    title: 'Website Development Company in Salem: How to Build a High-Performing Business Website',
    date: 'Web Development • Salem',
    excerpt:
      'Learn how professional website development, responsive design, website speed, security, and SEO can help Salem businesses build a stronger online presence and generate more leads.',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'CRM & ERP Software for Businesses: Streamline Sales, Operations & Growth',
    date: 'CRM & ERP Solutions',
    excerpt:
      'Discover how customized CRM and ERP software can help businesses manage customers, sales, inventory, finance, employees, and daily operations from one connected system.',
    image:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Mobile App Development: Build Scalable Apps for Modern Businesses',
    date: 'Mobile App Development',
    excerpt:
      'Explore how custom Android and iOS mobile app development can improve customer engagement, automate business processes, and create new digital opportunities.',
    image:
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Digital Marketing Strategies for Businesses in 2026',
    date: 'Digital Marketing • SEO',
    excerpt:
      'Explore SEO, social media marketing, content marketing, local SEO, and performance marketing strategies that can help businesses increase online visibility and generate quality leads.',
    image:
      'https://images.unsplash.com/photo-1533750349088-cd871a92f312?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Web Design & UI/UX: Create Websites That Convert Visitors Into Customers',
    date: 'Web Design • UI/UX',
    excerpt:
      'Learn how modern web design, responsive layouts, user experience, visual hierarchy, and conversion-focused UI can improve engagement and business results.',
    image:
      'https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Agentic AI for Business Automation: From AI Assistants to Autonomous Workflows',
    date: 'Agentic AI • Automation',
    excerpt:
      'Discover how Agentic AI can plan tasks, connect with business systems, automate workflows, and help companies improve productivity with intelligent AI-driven automation.',
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
  },
]

const ease = [0.16, 1, 0.3, 1]

function BlogCard({ post, index, reduceMotion }) {
  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 45,
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
        amount: 0.18,
      }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease,
      }}
      className="group relative"
    >
      {/* CARD */}

      <motion.div
        whileHover={
          reduceMotion
            ? undefined
            : {
                y: -8,
              }
        }
        transition={{
          duration: 0.45,
          ease,
        }}
        className="
          relative
          h-full
          overflow-hidden
          rounded-[1.5rem]
          border
          border-[#D8E8EC]
          dark:border-[#153F50]
          bg-[#F9FCFD]
          dark:bg-[#071F2B]
          shadow-[0_10px_35px_rgba(10,65,85,0.06)]
          dark:shadow-[0_15px_45px_rgba(0,0,0,0.22)]
          transition-shadow
          duration-500
          hover:shadow-[0_20px_55px_rgba(0,105,150,0.13)]
          dark:hover:shadow-[0_20px_55px_rgba(0,180,220,0.12)]
        "
      >
        {/* TOP INDEX */}

        <div
          className="
            absolute
            left-5
            top-5
            z-20
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-full
            border
            border-white/30
            bg-black/20
            backdrop-blur-md
            font-mono
            text-[10px]
            tracking-wider
            text-white
          "
        >
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* IMAGE */}

        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.img
            src={post.image}
            alt={post.title}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            fetchPriority={index === 0 ? 'high' : 'auto'}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: 1.07,
                  }
            }
            transition={{
              duration: 0.9,
              ease,
            }}
            className="
              h-full
              w-full
              object-cover
              grayscale-[12%]
              transition-[filter]
              duration-700
              group-hover:grayscale-0
            "
          />

          {/* IMAGE DARK GRADIENT */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-t
              from-[#061A25]/75
              via-[#061A25]/10
              to-transparent
            "
          />

          {/* BLUE COLOR WASH */}

          <div
            className="
              pointer-events-none
              absolute
              inset-0
              bg-gradient-to-br
              from-cyan-400/[0.08]
              via-transparent
              to-blue-600/[0.12]
              opacity-0
              transition-opacity
              duration-700
              group-hover:opacity-100
            "
          />

          {/* LIGHT SWEEP */}

          {!reduceMotion && (
            <motion.div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-y-0
                -left-1/2
                w-1/2
                skew-x-[-18deg]
                bg-gradient-to-r
                from-transparent
                via-white/[0.18]
                to-transparent
              "
              initial={{
                x: '-100%',
              }}
              whileHover={{
                x: '350%',
              }}
              transition={{
                duration: 0.8,
                ease: 'easeOut',
              }}
            />
          )}

          {/* DATE */}

          <div
            className="
              absolute
              bottom-5
              left-5
              z-10
              font-mono
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-white/75
            "
          >
            {post.date}
          </div>

          {/* ARROW */}

          <motion.div
            className="
              absolute
              bottom-4
              right-4
              z-10
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-white/30
              bg-white/10
              text-white
              backdrop-blur-md
            "
            whileHover={
              reduceMotion
                ? undefined
                : {
                    scale: 1.1,
                    rotate: -45,
                  }
            }
            transition={{
              duration: 0.25,
            }}
          >
            ↗
          </motion.div>
        </div>

        {/* CONTENT */}

        <div className="p-6 md:p-7">
          {/* SMALL LINE */}

          <motion.div
            className="
              mb-5
              h-px
              w-10
              origin-left
              bg-gradient-to-r
              from-[#008FA8]
              to-transparent
            "
            initial={{
              scaleX: 1,
            }}
            whileHover={{
              scaleX: 2.5,
            }}
            transition={{
              duration: 0.35,
            }}
          />

          <h2
            className="
              font-display
              text-xl
              font-semibold
              leading-tight
              tracking-tight
              text-[#123640]
              dark:text-[#E9FBFF]
              transition-colors
              duration-300
              group-hover:text-[#007C9A]
              dark:group-hover:text-[#62E4F4]
            "
          >
            {post.title}
          </h2>

          <p
            className="
              mt-3
              text-sm
              leading-relaxed
              text-[#668087]
              dark:text-[#91B5BE]
            "
          >
            {post.excerpt}
          </p>

          {/* READ MORE

          <div
            className="
              mt-6
              flex
              items-center
              gap-2
              font-mono
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-[#007E99]
              dark:text-[#55D8EA]
            "
          >
            <span>Explore story</span>

            <motion.span
              animate={
                reduceMotion
                  ? undefined
                  : {
                      x: [0, 4, 0],
                    }
              }
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              →
            </motion.span>
          </div> */}
        </div>
      </motion.div>
    </motion.article>
  )
}

export default function Blog() {
  const reduceMotion = useReducedMotion()

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#FFFFFF]
        dark:bg-[#041923]
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-12rem]
          top-40
          h-[28rem]
          w-[28rem]
          rounded-full
          bg-cyan-400/[0.055]
          blur-3xl
          dark:bg-cyan-400/[0.035]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[-12rem]
          top-[35rem]
          h-[30rem]
          w-[30rem]
          rounded-full
          bg-blue-500/[0.045]
          blur-3xl
          dark:bg-blue-500/[0.035]
        "
      />

      {/* =====================================================
          SUBTLE GRID
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          dark:opacity-[0.035]
          [background-image:linear-gradient(rgba(0,126,153,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(0,126,153,0.7)_1px,transparent_1px)]
          [background-size:70px_70px]
        "
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative px-4 pb-16 pt-32 md:pb-20 md:pt-40">
        <div className="container-x">
          <ScrollReveal>
            <div className="max-w-4xl">
              {/* EYEBROW */}

              <motion.p
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 12,
                      }
                }
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                transition={{
                  duration: 0.6,
                  ease,
                }}
                className="
                  mb-5
                  font-mono
                  text-xs
                  uppercase
                  tracking-[0.22em]
                  text-[#00859D]
                  dark:text-[#55D9EA]
                "
              >
                Office & Events
              </motion.p>

              {/* HEADING */}

              <h1
                className="
                  text-5xl
                  font-display
                  font-bold
                  leading-[0.98]
                  tracking-[-0.04em]
                  text-[#102F38]
                  sm:text-6xl
                  md:text-7xl
                  lg:text-[6.5rem]
                  dark:text-[#ECFBFF]
                "
              >
                Life at{' '}
                <span
                  className="
                    bg-gradient-to-r
                    from-[#006FA8]
                    via-[#009DB5]
                    to-[#00A878]
                    bg-clip-text
                    text-transparent
                  "
                >
                  Cloud Matrix
                </span>
              </h1>

              {/* DESCRIPTION */}

              <p
                className="
                  mt-7
                  max-w-2xl
                  text-base
                  leading-relaxed
                  text-[#647B82]
                  md:text-lg
                  dark:text-[#91B5BE]
                "
              >
                A look inside our office, team events, milestones and the
                moments that make Cloud Matrix what it is.
              </p>
            </div>
          </ScrollReveal>

          {/* DECORATIVE LINE */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    scaleX: 0,
                    opacity: 0,
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : {
                    scaleX: 1,
                    opacity: 1,
                  }
            }
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
              delay: 0.2,
              ease,
            }}
            className="
              mt-14
              h-px
              w-full
              origin-left
              bg-gradient-to-r
              from-[#008DA6]
              via-[#66C9D7]
              to-transparent
              dark:from-[#1BC9E4]
              dark:via-[#155F78]
              dark:to-transparent
            "
          />

          {/* META */}

          <div
            className="
              mt-5
              flex
              items-center
              justify-between
              font-mono
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-[#799098]
              dark:text-[#668E99]
            "
          >
            <span>Inside Cloud Matrix</span>
            <span>{String(posts.length).padStart(2, '0')} Stories</span>
          </div>
        </div>
      </section>

      {/* =====================================================
          POSTS
      ===================================================== */}

      <section className="relative pb-24 md:pb-32">
        <div
          className="
            container-x
            grid
            gap-7
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {posts.map((post, index) => (
            <BlogCard
              key={post.title}
              post={post}
              index={index}
              reduceMotion={reduceMotion}
            />
          ))}
        </div>
      </section>

      {/* =====================================================
          BOTTOM CTA / NOTE
      ===================================================== */}

      <section className="container-x relative pb-24 md:pb-32">
        <ScrollReveal direction="scale">
          <div
            className="
              relative
              overflow-hidden
              rounded-[1.75rem]
              border
              border-[#D8E8EC]
              bg-[#F4FAFC]
              px-6
              py-10
              text-center
              dark:border-[#174455]
              dark:bg-[#071F2B]
              md:px-10
              md:py-14
            "
          >
            {/* CTA GLOW */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-0
                h-32
                w-64
                -translate-x-1/2
                rounded-full
                bg-cyan-400/[0.08]
                blur-3xl
                dark:bg-cyan-400/[0.07]
              "
            />

            <p
              className="
                relative
                font-mono
                text-[10px]
                uppercase
                tracking-[0.2em]
                text-[#00839C]
                dark:text-[#54D8EA]
              "
            >
              More stories coming soon
            </p>

            <h2
              className="
                relative
                mx-auto
                mt-3
                max-w-xl
                font-display
                text-2xl
                font-semibold
                text-[#123640]
                md:text-3xl
                dark:text-[#E9FBFF]
              "
            >
              Building, learning and growing together.
            </h2>

            <p
              className="
                relative
                mx-auto
                mt-4
                max-w-lg
                text-sm
                leading-relaxed
                text-[#6A8087]
                dark:text-[#8EAFB8]
              "
            >
              Add your real office events, team achievements and company
              milestones here as Cloud Matrix grows.
            </p>

            {/* SMALL DECORATIVE DOTS */}

            <div
              aria-hidden="true"
              className="
                absolute
                left-6
                top-6
                h-2
                w-2
                rounded-full
                bg-cyan-500/50
                dark:bg-cyan-300/50
              "
            />

            <div
              aria-hidden="true"
              className="
                absolute
                bottom-6
                right-6
                h-2
                w-2
                rounded-full
                bg-blue-500/40
                dark:bg-blue-300/40
              "
            />
          </div>
        </ScrollReveal>
      </section>
    </main>
  )
}