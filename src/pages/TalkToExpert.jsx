import { useState } from 'react'

import { motion } from 'framer-motion'

import ScrollReveal from '../components/ScrollReveal'

import { services, company, waLink } from '../data/content'

const ease = [0.16, 1, 0.3, 1]

export default function TalkToExpert() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: services[0].name,
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const update = (key) => (e) =>
    setForm((f) => ({
      ...f,
      [key]: e.target.value,
    }))

  const handleSubmit = (e) => {
    e.preventDefault()

    const message =
      `New Enquiry — Cloud Matrix Technologies\n` +
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Phone: ${form.phone}\n` +
      `Service needed: ${form.service}\n` +
      `Message: ${form.message}`

    window.open(waLink(message), '_blank', 'noreferrer')

    setSubmitted(true)
  }

  return (
    <div
      className="
        relative
        min-h-screen
        pt-28
        md:pt-32
        pb-24
        overflow-hidden

        bg-[#F7FBFF]
        dark:bg-[#061426]
      "
    >

      {/* =========================================================
          AMBIENT BACKGROUND
      ========================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -top-48
          -left-48
          w-[32rem]
          h-[32rem]
          rounded-full
          bg-[#38BDF8]/10
          dark:bg-[#38BDF8]/8
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          top-[35%]
          -right-48
          w-[30rem]
          h-[30rem]
          rounded-full
          bg-[#2563EB]/8
          dark:bg-[#2563EB]/10
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-0
          left-1/2
          -translate-x-1/2
          w-[40rem]
          h-[16rem]
          rounded-full
          bg-[#0EA5E9]/5
          dark:bg-[#0EA5E9]/5
          blur-3xl
        "
      />

      {/* =========================================================
          DECORATIVE GRID
      ========================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.25]
          dark:opacity-[0.08]

          bg-[linear-gradient(rgba(37,99,235,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.06)_1px,transparent_1px)]
          bg-[size:50px_50px]

          mask-image:linear-gradient(to_bottom,black,transparent_75%)
        "
      />

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="container-x relative z-10 mb-14 md:mb-20">

        <ScrollReveal>

          {/* Small eyebrow */}

          <motion.div
            initial={{
              opacity: 0,
              x: -20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.6,
              ease,
            }}
            className="
              inline-flex
              items-center
              gap-2
              mb-5
              px-3
              py-1.5
              rounded-full
              border

              border-[#BFDBFE]
              bg-[#EFF6FF]

              dark:border-[#1E40AF]/40
              dark:bg-[#0B1F3A]

              text-[#2563EB]
              dark:text-[#60A5FA]

              text-xs
              font-mono
              tracking-wide
            "
          >
            <span
              className="
                w-1.5
                h-1.5
                rounded-full
                bg-[#2563EB]
                dark:bg-[#60A5FA]
                shadow-[0_0_10px_rgba(37,99,235,0.6)]
              "
            />

            TALK TO OUR EXPERT
          </motion.div>

          {/* Heading */}

          <h1
            className="
              text-4xl
              md:text-6xl
              xl:text-7xl
              font-display
              font-bold
              max-w-4xl
              leading-[1.02]
              tracking-tight

              text-[#0F172A]
              dark:text-[#F8FAFC]
            "
          >
            Tell us what you're{' '}

            <span
              className="
                relative
                inline-block
                bg-gradient-to-r
                from-[#2563EB]
                via-[#0EA5E9]
                to-[#06B6D4]
                bg-clip-text
                text-transparent
              "
            >
              building

              <motion.span
                initial={{
                  scaleX: 0,
                }}
                animate={{
                  scaleX: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.35,
                  ease,
                }}
                className="
                  absolute
                  left-0
                  -bottom-2
                  md:-bottom-3
                  w-full
                  h-[3px]
                  origin-left
                  rounded-full

                  bg-gradient-to-r
                  from-[#2563EB]
                  via-[#0EA5E9]
                  to-transparent
                "
              />
            </span>
          </h1>

          <p
            className="
              mt-6
              max-w-2xl
              text-base
              md:text-lg
              leading-relaxed

              text-[#64748B]
              dark:text-[#94A3B8]
            "
          >
            Share a few details about your project and our team
            will continue the conversation on WhatsApp, usually
            within the same day.
          </p>

        </ScrollReveal>

        {/* Decorative status line */}

        <ScrollReveal delay={0.12}>

          <div
            className="
              mt-8
              flex
              items-center
              gap-3
              text-xs
              font-mono

              text-[#64748B]
              dark:text-[#64748B]
            "
          >
            <span
              className="
                w-2
                h-2
                rounded-full
                bg-[#22C55E]
                shadow-[0_0_12px_rgba(34,197,94,0.7)]
              "
            />

            AVAILABLE FOR NEW PROJECTS

            <span
              className="
                h-px
                w-16
                bg-[#CBD5E1]
                dark:bg-[#1E3A5F]
              "
            />

            LET'S BUILD SOMETHING GREAT
          </div>

        </ScrollReveal>

      </section>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <section className="container-x relative z-10 grid lg:grid-cols-5 gap-8 lg:gap-10">

        {/* =======================================================
            FORM
        ======================================================= */}

        <motion.form
          initial={{
            opacity: 0,
            y: 35,
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
            duration: 0.7,
            ease,
          }}
          onSubmit={handleSubmit}
          className="
            lg:col-span-3
            relative
            overflow-hidden

            rounded-[1.75rem]
            border

            border-[#DCE8F5]
            dark:border-[#17345A]

            bg-white/90
            dark:bg-[#091B31]/90

            backdrop-blur-xl

            p-6
            md:p-8

            shadow-[0_20px_70px_rgba(37,99,235,0.07)]
            dark:shadow-[0_20px_70px_rgba(0,0,0,0.25)]

            space-y-5
          "
        >

          {/* Top glow */}

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              top-0
              left-0
              right-0
              h-px

              bg-gradient-to-r
              from-transparent
              via-[#38BDF8]
              to-transparent

              opacity-70
            "
          />

          {/* Form heading */}

          <div className="mb-7">

            <div
              className="
                flex
                items-center
                justify-between
                gap-4
              "
            >

              <div>

                <p
                  className="
                    text-xs
                    font-mono
                    tracking-widest
                    uppercase
                    text-[#2563EB]
                    dark:text-[#60A5FA]
                    mb-2
                  "
                >
                  Project enquiry
                </p>

                <h2
                  className="
                    text-2xl
                    md:text-3xl
                    font-display
                    font-semibold

                    text-[#0F172A]
                    dark:text-white
                  "
                >
                  Start a conversation
                </h2>

              </div>

              <div
                className="
                  hidden
                  sm:flex
                  w-11
                  h-11
                  rounded-xl
                  items-center
                  justify-center

                  border
                  border-[#BFDBFE]
                  dark:border-[#1E40AF]/40

                  bg-[#EFF6FF]
                  dark:bg-[#0B2545]

                  text-[#2563EB]
                  dark:text-[#60A5FA]

                  text-lg
                "
              >
                ↗
              </div>

            </div>

          </div>

          {/* Name + Phone */}

          <div className="grid sm:grid-cols-2 gap-5">

            <div className="group">

              <label
                className="
                  text-sm
                  font-medium
                  mb-1.5
                  block
                  text-[#334155]
                  dark:text-[#CBD5E1]
                "
              >
                Full Name
              </label>

              <input
                required
                value={form.name}
                onChange={update('name')}
                className="
                  w-full
                  rounded-xl

                  border
                  border-[#D7E3EF]
                  dark:border-[#1E3A5F]

                  bg-[#F8FBFF]
                  dark:bg-[#07182B]

                  px-4
                  py-3.5
                  text-sm

                  text-[#0F172A]
                  dark:text-white

                  placeholder:text-[#94A3B8]
                  dark:placeholder:text-[#64748B]

                  outline-none

                  focus:border-[#3B82F6]
                  dark:focus:border-[#38BDF8]

                  focus:ring-4
                  focus:ring-[#3B82F6]/10
                  dark:focus:ring-[#38BDF8]/10

                  transition-all
                  duration-300
                "
                placeholder="Your name"
              />

            </div>

            <div>

              <label
                className="
                  text-sm
                  font-medium
                  mb-1.5
                  block
                  text-[#334155]
                  dark:text-[#CBD5E1]
                "
              >
                Contact Number
              </label>

              <input
                required
                value={form.phone}
                onChange={update('phone')}
                className="
                  w-full
                  rounded-xl

                  border
                  border-[#D7E3EF]
                  dark:border-[#1E3A5F]

                  bg-[#F8FBFF]
                  dark:bg-[#07182B]

                  px-4
                  py-3.5
                  text-sm

                  text-[#0F172A]
                  dark:text-white

                  placeholder:text-[#94A3B8]

                  outline-none

                  focus:border-[#3B82F6]
                  dark:focus:border-[#38BDF8]

                  focus:ring-4
                  focus:ring-[#3B82F6]/10

                  transition-all
                  duration-300
                "
                placeholder="+91 XXXXX XXXXX"
              />

            </div>

          </div>

          {/* Email */}

          <div>

            <label
              className="
                text-sm
                font-medium
                mb-1.5
                block
                text-[#334155]
                dark:text-[#CBD5E1]
              "
            >
              Email
            </label>

            <input
              required
              type="email"
              value={form.email}
              onChange={update('email')}
              className="
                w-full
                rounded-xl

                border
                border-[#D7E3EF]
                dark:border-[#1E3A5F]

                bg-[#F8FBFF]
                dark:bg-[#07182B]

                px-4
                py-3.5
                text-sm

                text-[#0F172A]
                dark:text-white

                placeholder:text-[#94A3B8]

                outline-none

                focus:border-[#3B82F6]
                dark:focus:border-[#38BDF8]

                focus:ring-4
                focus:ring-[#3B82F6]/10

                transition-all
                duration-300
              "
              placeholder="you@email.com"
            />

          </div>

          {/* Service */}

          <div>

            <label
              className="
                text-sm
                font-medium
                mb-1.5
                block
                text-[#334155]
                dark:text-[#CBD5E1]
              "
            >
              Service Needed
            </label>

            <select
              value={form.service}
              onChange={update('service')}
              className="
                w-full
                rounded-xl

                border
                border-[#D7E3EF]
                dark:border-[#1E3A5F]

                bg-[#F8FBFF]
                dark:bg-[#07182B]

                px-4
                py-3.5
                text-sm

                text-[#0F172A]
                dark:text-white

                outline-none

                focus:border-[#3B82F6]
                dark:focus:border-[#38BDF8]

                focus:ring-4
                focus:ring-[#3B82F6]/10

                transition-all
                duration-300
              "
            >
              {services.map((s) => (
                <option
                  key={s.id}
                  value={s.name}
                >
                  {s.name}
                </option>
              ))}
            </select>

          </div>

          {/* Message */}

          <div>

            <div className="flex items-center justify-between mb-1.5">

              <label
                className="
                  text-sm
                  font-medium
                  text-[#334155]
                  dark:text-[#CBD5E1]
                "
              >
                Message
              </label>

              <span
                className="
                  text-[10px]
                  font-mono
                  text-[#94A3B8]
                "
              >
                OPTIONAL
              </span>

            </div>

            <textarea
              value={form.message}
              onChange={update('message')}
              rows={5}
              className="
                w-full
                rounded-xl

                border
                border-[#D7E3EF]
                dark:border-[#1E3A5F]

                bg-[#F8FBFF]
                dark:bg-[#07182B]

                px-4
                py-3.5
                text-sm

                text-[#0F172A]
                dark:text-white

                placeholder:text-[#94A3B8]

                outline-none
                resize-none

                focus:border-[#3B82F6]
                dark:focus:border-[#38BDF8]

                focus:ring-4
                focus:ring-[#3B82F6]/10

                transition-all
                duration-300
              "
              placeholder="Tell us about your project..."
            />

          </div>

          {/* Submit */}

          <motion.button
            whileHover={{
              scale: 1.015,
              y: -2,
            }}
            whileTap={{
              scale: 0.985,
            }}
            type="submit"
            className="
              group
              relative
              overflow-hidden

              w-full
              py-4
              rounded-xl

              bg-gradient-to-r
              from-[#2563EB]
              via-[#0EA5E9]
              to-[#06B6D4]

              text-white
              font-semibold

              shadow-[0_12px_30px_rgba(37,99,235,0.25)]

              transition-shadow
              duration-300

              hover:shadow-[0_16px_40px_rgba(14,165,233,0.32)]
            "
          >

            {/* Shine */}

            <motion.span
              aria-hidden="true"
              className="
                absolute
                inset-y-0
                -left-1/2
                w-1/3
                skew-x-[-20deg]

                bg-white/20
                blur-md
              "
              animate={{
                x: ['0%', '500%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 4,
                ease: 'easeInOut',
              }}
            />

            <span className="relative z-10 flex items-center justify-center gap-2">

              Send via WhatsApp

              <motion.span
                animate={{
                  x: [0, 3, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                →
              </motion.span>

            </span>

          </motion.button>

          {submitted && (
            <motion.div
              initial={{
                opacity: 0,
                y: 8,
                height: 0,
              }}
              animate={{
                opacity: 1,
                y: 0,
                height: 'auto',
              }}
              className="
                rounded-xl
                border
                border-[#BBF7D0]
                dark:border-[#14532D]

                bg-[#F0FDF4]
                dark:bg-[#052E1A]

                px-4
                py-3
                text-sm

                text-[#15803D]
                dark:text-[#86EFAC]

                text-center
              "
            >
              ✓ WhatsApp has opened with your enquiry ready to send.
            </motion.div>
          )}

        </motion.form>

        {/* =======================================================
            RIGHT SIDE
        ======================================================= */}

        <ScrollReveal
          direction="right"
          className="lg:col-span-2 space-y-6"
        >

          {/* Contact Card */}

          <motion.div
            whileHover={{
              y: -4,
            }}
            transition={{
              duration: 0.35,
              ease,
            }}
            className="
              relative
              overflow-hidden

              rounded-[1.75rem]

              bg-gradient-to-br
              from-[#0F2A5F]
              via-[#123B78]
              to-[#075985]

              text-white
              p-7
              md:p-8

              shadow-[0_20px_50px_rgba(15,42,95,0.22)]
            "
          >

            {/* Decorative circle */}

            <motion.div
              aria-hidden="true"
              className="
                absolute
                -right-16
                -top-16
                w-44
                h-44
                rounded-full
                border
                border-white/10
              "
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'linear',
              }}
            />

            <motion.div
              aria-hidden="true"
              className="
                absolute
                -right-6
                -top-6
                w-24
                h-24
                rounded-full
                bg-[#38BDF8]/10
                blur-xl
              "
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <div className="relative z-10">

              <p
                className="
                  text-xs
                  font-mono
                  tracking-widest
                  text-[#7DD3FC]
                  uppercase
                  mb-3
                "
              >
                Direct connection
              </p>

              <h3
                className="
                  font-display
                  font-semibold
                  text-xl
                  mb-5
                "
              >
                Prefer to call or email?
              </h3>

              <div className="space-y-4 text-sm">

                <div>
                  <p className="text-white/45 text-xs mb-1">
                    LOCATION
                  </p>

                  <p className="text-white/85">
                    {company.location}
                  </p>
                </div>

                <div>
                  <p className="text-white/45 text-xs mb-1">
                    PHONE
                  </p>

                  <a
                    href={company.phoneHref}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-white
                      hover:text-[#7DD3FC]
                      transition-colors
                    "
                  >
                    {company.phone}
                    <span>↗</span>
                  </a>
                </div>

                <div>
                  <p className="text-white/45 text-xs mb-1">
                    EMAIL
                  </p>

                  <a
                    href={`mailto:${company.email}`}
                    className="
                      inline-flex
                      items-center
                      gap-2
                      text-white
                      hover:text-[#7DD3FC]
                      transition-colors
                    "
                  >
                    {company.email}
                    <span>↗</span>
                  </a>
                </div>

              </div>

            </div>

          </motion.div>

          {/* Map */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.97,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
            }}
            viewport={{
              once: true,
              amount: 0.2,
            }}
            transition={{
              duration: 0.7,
              ease,
            }}
            className="
              relative
              overflow-hidden

              rounded-[1.75rem]

              border
              border-[#DCE8F5]
              dark:border-[#17345A]

              bg-white
              dark:bg-[#091B31]

              shadow-[0_15px_45px_rgba(15,23,42,0.06)]
              dark:shadow-[0_15px_45px_rgba(0,0,0,0.25)]
            "
          >

            <div
              className="
                absolute
                top-4
                left-4
                z-10

                px-3
                py-1.5
                rounded-full

                bg-white/90
                dark:bg-[#07182B]/90

                backdrop-blur-md

                border
                border-[#DCE8F5]
                dark:border-[#1E3A5F]

                text-[10px]
                font-mono
                tracking-widest
                uppercase

                text-[#2563EB]
                dark:text-[#60A5FA]
              "
            >
              Find us
            </div>

            <iframe
              title="Cloud Matrix Technologies location"
              src={company.mapEmbed}
              className="
                w-full
                h-72
                border-0

                grayscale-[15%]
                dark:grayscale-[40%]

                opacity-90
              "
              loading="lazy"
            />

            {/* Bottom gradient */}

            <div
              aria-hidden="true"
              className="
                absolute
                bottom-0
                left-0
                right-0
                h-16

                bg-gradient-to-t
                from-white/70
                dark:from-[#091B31]/80
                to-transparent

                pointer-events-none
              "
            />

          </motion.div>

          {/* Small info strip */}

          <motion.div
            whileHover={{
              x: 3,
            }}
            className="
              flex
              items-center
              gap-3

              rounded-xl

              border
              border-[#DCE8F5]
              dark:border-[#17345A]

              bg-white/70
              dark:bg-[#091B31]/70

              px-4
              py-3

              text-xs

              text-[#64748B]
              dark:text-[#94A3B8]
            "
          >

            <span
              className="
                flex
                w-7
                h-7
                shrink-0
                items-center
                justify-center
                rounded-full

                bg-[#EFF6FF]
                dark:bg-[#0B2545]

                text-[#2563EB]
                dark:text-[#60A5FA]
              "
            >
              ✓
            </span>

            We usually respond to enquiries within the same business day.

          </motion.div>

        </ScrollReveal>

      </section>

    </div>
  )
}