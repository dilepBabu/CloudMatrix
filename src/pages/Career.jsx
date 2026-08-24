import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import ScrollReveal from '../components/ScrollReveal'
import { company, waLink } from '../data/content'

const roles = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Mobile App Developer (Android/iOS)',
  'UI/UX Designer',
  'Digital Marketing Executive',
  'QA / Tester',
  'Other',
]

const experienceLevels = [
  'Fresher',
  '0–1 Years',
  '1–2 Years',
  '2–3 Years',
  '3–5 Years',
  '5+ Years',
]

const availabilityOptions = [
  'Immediately',
  'Within 15 Days',
  'Within 30 Days',
  'Within 60 Days',
  'More than 60 Days',
]

const ease = [0.16, 1, 0.3, 1]

export default function Career() {
  const reduceMotion = useReducedMotion()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    role: roles[0],
    experience: experienceLevels[0],
    yearsOfExperience: '',
    education: '',
    portfolio: '',
    linkedin: '',
    skills: '',
    availability: availabilityOptions[0],
    expectedSalary: '',
    message: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const update = (key) => (e) => {
    setForm((current) => ({
      ...current,
      [key]: e.target.value,
    }))

    setSubmitted(false)
    setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    setError('')
    setSubmitted(false)

    /*
      Extra validation.

      This prevents empty strings and whitespace-only
      values from being submitted.
    */

    const requiredFields = [
      'name',
      'email',
      'phone',
      'location',
      'role',
      'experience',
      'yearsOfExperience',
      'education',
      'portfolio',
      'linkedin',
      'skills',
      'availability',
      'expectedSalary',
      'message',
    ]

    const emptyField = requiredFields.find(
      (field) => !String(form[field]).trim()
    )

    if (emptyField) {
      setError(
        'Please fill in all fields before submitting your application.'
      )
      return
    }

    /*
      Phone validation
    */

    const phoneDigits = form.phone.replace(/\D/g, '')

    if (phoneDigits.length < 10) {
      setError(
        'Please enter a valid phone number.'
      )
      return
    }

    /*
      Email validation
    */

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(form.email.trim())) {
      setError(
        'Please enter a valid email address.'
      )
      return
    }

    /*
      URL validation
    */

    try {
      new URL(form.portfolio.trim())
    } catch {
      setError(
        'Please enter a valid Portfolio / GitHub URL.'
      )
      return
    }

    try {
      new URL(form.linkedin.trim())
    } catch {
      setError(
        'Please enter a valid LinkedIn URL.'
      )
      return
    }

    /*
      Create WhatsApp message
    */

    const message =
      `Job Application — Cloud Matrix Technologies\n\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `PERSONAL DETAILS\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Name: ${form.name.trim()}\n` +
      `Email: ${form.email.trim()}\n` +
      `Phone: ${form.phone.trim()}\n` +
      `Location: ${form.location.trim()}\n\n` +

      `━━━━━━━━━━━━━━━━━━━━\n` +
      `CAREER DETAILS\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Position: ${form.role}\n` +
      `Experience Level: ${form.experience}\n` +
      `Years of Experience: ${form.yearsOfExperience.trim()}\n` +
      `Education: ${form.education.trim()}\n` +
      `Availability: ${form.availability}\n` +
      `Expected Salary: ${form.expectedSalary.trim()}\n\n` +

      `━━━━━━━━━━━━━━━━━━━━\n` +
      `PROFESSIONAL DETAILS\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `Skills: ${form.skills.trim()}\n` +
      `Portfolio / GitHub: ${form.portfolio.trim()}\n` +
      `LinkedIn: ${form.linkedin.trim()}\n\n` +

      `━━━━━━━━━━━━━━━━━━━━\n` +
      `MESSAGE\n` +
      `━━━━━━━━━━━━━━━━━━━━\n` +
      `${form.message.trim()}`

    /*
      Open WhatsApp
    */

    window.open(
      waLink(message),
      '_blank',
      'noreferrer'
    )

    setSubmitted(true)
  }

  return (
    <main
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#F8FCFD]
        text-[#123640]
        dark:bg-[#031722]
        dark:text-white
      "
    >
      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-48
          top-32
          h-[30rem]
          w-[30rem]
          rounded-full
          bg-cyan-400/[0.07]
          blur-3xl
          dark:bg-cyan-400/[0.035]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-48
          top-[35rem]
          h-[32rem]
          w-[32rem]
          rounded-full
          bg-blue-500/[0.055]
          blur-3xl
          dark:bg-blue-500/[0.035]
        "
      />

      {/* SUBTLE GRID */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-[0.025]
          dark:opacity-[0.035]
          [background-image:linear-gradient(rgba(0,120,150,0.7)_1px,transparent_1px),linear-gradient(90deg,rgba(0,120,150,0.7)_1px,transparent_1px)]
          [background-size:70px_70px]
        "
      />

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative px-4 pb-16 pt-32 md:pb-20 md:pt-40">
        <div className="container-x">
          <div className="grid items-end gap-12 lg:grid-cols-[1.3fr_0.7fr]">
            {/* LEFT */}

            <ScrollReveal>
              <div>
                <motion.p
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          x: -20,
                        }
                  }
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          opacity: 1,
                          x: 0,
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
                    text-[#007E98]
                    dark:text-[#52D8EA]
                  "
                >
                  Careers / 2026
                </motion.p>

                <h1
                  className="
                    max-w-4xl
                    font-display
                    text-5xl
                    font-bold
                    leading-[0.95]
                    tracking-[-0.045em]
                    sm:text-6xl
                    md:text-7xl
                    lg:text-[6.3rem]
                  "
                >
                  Build the
                  <br />

                  <span
                    className="
                      bg-gradient-to-r
                      from-[#006FA8]
                      via-[#00A7C4]
                      to-[#00A878]
                      bg-clip-text
                      text-transparent
                    "
                  >
                    next chapter.
                  </span>
                </h1>

                <p
                  className="
                    mt-7
                    max-w-2xl
                    text-base
                    leading-relaxed
                    text-[#657C83]
                    md:text-lg
                    dark:text-[#8EAFB8]
                  "
                >
                  We are always looking for people who care
                  about thoughtful engineering, beautiful
                  products and meaningful client impact.
                </p>
              </div>
            </ScrollReveal>

            {/* RIGHT */}

            <ScrollReveal
              direction="right"
              delay={0.1}
            >
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[1.75rem]
                  border
                  border-[#D6E8ED]
                  bg-white/70
                  p-6
                  backdrop-blur-md
                  dark:border-[#164456]
                  dark:bg-[#061D29]/70
                "
              >
                <div
                  className="
                    absolute
                    left-8
                    top-0
                    h-full
                    w-px
                    bg-gradient-to-b
                    from-transparent
                    via-[#11BBD5]/50
                    to-transparent
                  "
                />

                <div className="relative pl-8">
                  <div
                    className="
                      mb-5
                      flex
                      items-center
                      gap-3
                      font-mono
                      text-[10px]
                      uppercase
                      tracking-[0.18em]
                      text-[#00829D]
                      dark:text-[#55D9EA]
                    "
                  >
                    <span
                      className="
                        h-2
                        w-2
                        rounded-full
                        bg-cyan-400
                        shadow-[0_0_12px_rgba(34,211,238,0.8)]
                      "
                    />

                    Open opportunities
                  </div>

                  <div className="space-y-3">
                    {roles.slice(0, 4).map(
                      (role, index) => (
                        <motion.div
                          key={role}
                          initial={
                            reduceMotion
                              ? false
                              : {
                                  opacity: 0,
                                  x: 15,
                                }
                          }
                          animate={
                            reduceMotion
                              ? undefined
                              : {
                                  opacity: 1,
                                  x: 0,
                                }
                          }
                          transition={{
                            duration: 0.5,
                            delay:
                              0.15 +
                              index * 0.08,
                            ease,
                          }}
                          className="
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            border
                            border-[#DCECEF]
                            bg-[#F8FCFD]
                            px-3
                            py-3
                            text-sm
                            dark:border-[#163F50]
                            dark:bg-[#082432]
                          "
                        >
                          <span
                            className="
                              flex
                              h-7
                              w-7
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              bg-[#DFF7FA]
                              font-mono
                              text-[9px]
                              text-[#007C97]
                              dark:bg-[#0B4050]
                              dark:text-[#5EE7F4]
                            "
                          >
                            {String(
                              index + 1
                            ).padStart(2, '0')}
                          </span>

                          <span className="text-[#36555D] dark:text-[#C7E4E9]">
                            {role}
                          </span>
                        </motion.div>
                      )
                    )}
                  </div>

                  <p
                    className="
                      mt-5
                      text-xs
                      leading-relaxed
                      text-[#789098]
                      dark:text-[#7197A2]
                    "
                  >
                    Don't see your role?
                    Choose "Other" and tell us
                    what you can bring to the team.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* HERO LINE */}

          <motion.div
            initial={
              reduceMotion
                ? false
                : {
                    scaleX: 0,
                  }
            }
            whileInView={
              reduceMotion
                ? undefined
                : {
                    scaleX: 1,
                  }
            }
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1,
              ease,
            }}
            className="
              mt-16
              h-px
              origin-left
              bg-gradient-to-r
              from-[#008EA7]
              via-[#64D4E3]
              to-transparent
              dark:from-[#16C8E1]
              dark:via-[#155B73]
              dark:to-transparent
            "
          />
        </div>
      </section>

      {/* =====================================================
          APPLICATION AREA
      ===================================================== */}

      <section className="relative pb-28 md:pb-36">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-[1.6fr_0.8fr]">
            {/* FORM */}

            <motion.form
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 30,
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
                duration: 0.7,
                ease,
              }}
              onSubmit={handleSubmit}
              className="
                relative
                overflow-hidden
                rounded-[1.75rem]
                border
                border-[#D6E8ED]
                bg-white
                p-6
                shadow-[0_20px_60px_rgba(15,75,95,0.06)]
                sm:p-8
                md:p-10
                dark:border-[#164456]
                dark:bg-[#061D29]
                dark:shadow-[0_20px_60px_rgba(0,0,0,0.2)]
              "
            >
              {/* TOP GLOW */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -top-32
                  right-10
                  h-64
                  w-64
                  rounded-full
                  bg-cyan-400/[0.07]
                  blur-3xl
                  dark:bg-cyan-400/[0.05]
                "
              />

              <div className="relative">
                {/* HEADER */}

                <div className="mb-8">
                  <p
                    className="
                      font-mono
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      text-[#00839D]
                      dark:text-[#52D8EA]
                    "
                  >
                    Application form
                  </p>

                  <h2
                    className="
                      mt-2
                      font-display
                      text-2xl
                      font-semibold
                      text-[#123640]
                      md:text-3xl
                      dark:text-[#E8FBFF]
                    "
                  >
                    Tell us about yourself.
                  </h2>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-relaxed
                      text-[#71878D]
                      dark:text-[#83A8B2]
                    "
                  >
                    All fields are required. Please
                    complete the form before continuing
                    to WhatsApp.
                  </p>
                </div>

                {/* PERSONAL DETAILS */}

                <FormSectionTitle>
                  Personal details
                </FormSectionTitle>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Full Name"
                    required
                  >
                    <input
                      required
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Your full name"
                      className="career-input"
                    />
                  </Field>

                  <Field
                    label="Phone Number"
                    required
                  >
                    <input
                      required
                      type="tel"
                      autoComplete="tel"
                      pattern="[0-9+\-\s()]{10,}"
                      value={form.phone}
                      onChange={update('phone')}
                      placeholder="+91 XXXXX XXXXX"
                      className="career-input"
                    />
                  </Field>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Email"
                    required
                  >
                    <input
                      required
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={update('email')}
                      placeholder="you@email.com"
                      className="career-input"
                    />
                  </Field>

                  <Field
                    label="Current Location"
                    required
                  >
                    <input
                      required
                      type="text"
                      value={form.location}
                      onChange={update('location')}
                      placeholder="City, State"
                      className="career-input"
                    />
                  </Field>
                </div>

                {/* CAREER DETAILS */}

                <FormSectionTitle>
                  Career details
                </FormSectionTitle>

                <Field
                  label="Position Applying For"
                  required
                >
                  <select
                    required
                    value={form.role}
                    onChange={update('role')}
                    className="career-input"
                  >
                    {roles.map((role) => (
                      <option
                        key={role}
                        value={role}
                      >
                        {role}
                      </option>
                    ))}
                  </select>
                </Field>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Experience Level"
                    required
                  >
                    <select
                      required
                      value={form.experience}
                      onChange={update('experience')}
                      className="career-input"
                    >
                      {experienceLevels.map(
                        (level) => (
                          <option
                            key={level}
                            value={level}
                          >
                            {level}
                          </option>
                        )
                      )}
                    </select>
                  </Field>

                  <Field
                    label="Years of Experience"
                    required
                  >
                    <input
                      required
                      type="text"
                      value={form.yearsOfExperience}
                      onChange={update(
                        'yearsOfExperience'
                      )}
                      placeholder="e.g. 0 years"
                      className="career-input"
                    />
                  </Field>
                </div>

                <Field
                  label="Highest Qualification / Education"
                  required
                  className="mt-5"
                >
                  <input
                    required
                    type="text"
                    value={form.education}
                    onChange={update('education')}
                    placeholder="e.g. B.Tech Information Technology"
                    className="career-input"
                  />
                </Field>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Availability to Join"
                    required
                  >
                    <select
                      required
                      value={form.availability}
                      onChange={update(
                        'availability'
                      )}
                      className="career-input"
                    >
                      {availabilityOptions.map(
                        (option) => (
                          <option
                            key={option}
                            value={option}
                          >
                            {option}
                          </option>
                        )
                      )}
                    </select>
                  </Field>

                  <Field
                    label="Expected Salary"
                    required
                  >
                    <input
                      required
                      type="text"
                      value={form.expectedSalary}
                      onChange={update(
                        'expectedSalary'
                      )}
                      placeholder="e.g. ₹4 LPA / Negotiable"
                      className="career-input"
                    />
                  </Field>
                </div>

                {/* PROFESSIONAL DETAILS */}

                <FormSectionTitle>
                  Professional details
                </FormSectionTitle>

                <Field
                  label="Technical / Professional Skills"
                  required
                >
                  <textarea
                    required
                    value={form.skills}
                    onChange={update('skills')}
                    rows={4}
                    placeholder="e.g. React, JavaScript, Node.js, MongoDB, Figma..."
                    className="career-input resize-none"
                  />
                </Field>

                <div className="mt-5 grid gap-5 sm:grid-cols-2">
                  <Field
                    label="Portfolio / GitHub URL"
                    required
                  >
                    <input
                      required
                      type="url"
                      value={form.portfolio}
                      onChange={update('portfolio')}
                      placeholder="https://github.com/..."
                      className="career-input"
                    />
                  </Field>

                  <Field
                    label="LinkedIn Profile URL"
                    required
                  >
                    <input
                      required
                      type="url"
                      value={form.linkedin}
                      onChange={update('linkedin')}
                      placeholder="https://linkedin.com/in/..."
                      className="career-input"
                    />
                  </Field>
                </div>

                {/* ABOUT YOU */}

                <FormSectionTitle>
                  About you
                </FormSectionTitle>

                <Field
                  label="Message"
                  required
                >
                  <textarea
                    required
                    value={form.message}
                    onChange={update('message')}
                    rows={7}
                    placeholder="Tell us about yourself, your experience, projects, achievements, why you want to join us, and what you can bring to the team."
                    className="career-input resize-none"
                  />
                </Field>

                {/* ERROR */}

                {error && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="
                      mt-5
                      rounded-xl
                      border
                      border-red-200
                      bg-red-50
                      px-4
                      py-3
                      text-center
                      text-sm
                      text-red-600
                      dark:border-red-500/20
                      dark:bg-red-500/10
                      dark:text-red-300
                    "
                  >
                    {error}
                  </motion.div>
                )}

                {/* SUBMIT */}

                <motion.button
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -2,
                        }
                  }
                  whileTap={
                    reduceMotion
                      ? undefined
                      : {
                          scale: 0.985,
                        }
                  }
                  transition={{
                    duration: 0.2,
                  }}
                  type="submit"
                  className="
                    group
                    relative
                    mt-6
                    w-full
                    overflow-hidden
                    rounded-full
                    bg-gradient-to-r
                    from-[#007AA0]
                    via-[#00A9C2]
                    to-[#00A878]
                    px-6
                    py-4
                    font-semibold
                    text-white
                    shadow-[0_10px_30px_rgba(0,145,175,0.2)]
                    transition-shadow
                    duration-300
                    hover:shadow-[0_15px_40px_rgba(0,170,200,0.32)]
                  "
                >
                  <span
                    className="
                      absolute
                      inset-0
                      -translate-x-full
                      bg-gradient-to-r
                      from-transparent
                      via-white/20
                      to-transparent
                      transition-transform
                      duration-700
                      group-hover:translate-x-full
                    "
                  />

                  <span className="relative">
                    Submit & Continue on WhatsApp
                    <span className="ml-2">
                      →
                    </span>
                  </span>
                </motion.button>

                {/* SUCCESS */}

                {submitted && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.4,
                      ease,
                    }}
                    className="
                      mt-4
                      rounded-xl
                      border
                      border-emerald-200
                      bg-emerald-50
                      px-4
                      py-3
                      text-center
                      text-sm
                      text-emerald-700
                      dark:border-emerald-500/20
                      dark:bg-emerald-500/10
                      dark:text-emerald-300
                    "
                  >
                    WhatsApp has opened with your
                    complete application details.
                    Review the message and send it.
                  </motion.div>
                )}
              </div>
            </motion.form>

            {/* =================================================
                SIDE INFORMATION
            ================================================= */}

            <div className="space-y-6">
              <ScrollReveal direction="right">
                <motion.div
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -4,
                        }
                  }
                  className="
                    relative
                    overflow-hidden
                    rounded-[1.75rem]
                    bg-gradient-to-br
                    from-[#052A3A]
                    via-[#06364A]
                    to-[#061C2A]
                    p-7
                    text-white
                    shadow-[0_20px_55px_rgba(0,55,80,0.16)]
                    md:p-8
                  "
                >
                  <div
                    aria-hidden="true"
                    className="
                      absolute
                      -right-20
                      -top-20
                      h-48
                      w-48
                      rounded-full
                      bg-cyan-400/15
                      blur-3xl
                    "
                  />

                  <div className="relative">
                    <p
                      className="
                        font-mono
                        text-[10px]
                        uppercase
                        tracking-[0.2em]
                        text-cyan-300
                      "
                    >
                      Why join us
                    </p>

                    <h3
                      className="
                        mt-3
                        font-display
                        text-2xl
                        font-semibold
                      "
                    >
                      Grow with the team.
                    </h3>

                    <div className="mt-7 space-y-5">
                      <Benefit
                        number="01"
                        text="Real projects with real client impact from day one."
                      />

                      <Benefit
                        number="02"
                        text="A collaborative environment where your ideas matter."
                      />

                      <Benefit
                        number="03"
                        text="Opportunities across web, mobile, AI and digital products."
                      />

                      <Benefit
                        number="04"
                        text="Room to learn, experiment and take ownership."
                      />
                    </div>
                  </div>
                </motion.div>
              </ScrollReveal>

              {/* DIRECT CONTACT */}

              <ScrollReveal
                direction="right"
                delay={0.1}
              >
                <div
                  className="
                    rounded-[1.75rem]
                    border
                    border-[#D6E8ED]
                    bg-white
                    p-7
                    dark:border-[#164456]
                    dark:bg-[#061D29]
                    md:p-8
                  "
                >
                  <p
                    className="
                      font-mono
                      text-[10px]
                      uppercase
                      tracking-[0.2em]
                      text-[#00839D]
                      dark:text-[#52D8EA]
                    "
                  >
                    Resume
                  </p>

                  <h3
                    className="
                      mt-3
                      font-display
                      text-xl
                      font-semibold
                      text-[#153A44]
                      dark:text-[#E8FBFF]
                    "
                  >
                    Send your resume
                  </h3>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-relaxed
                      text-[#71878D]
                      dark:text-[#83A8B2]
                    "
                  >
                    Resume upload is not required in
                    this form. After submitting your
                    application, you can send your resume
                    directly to our team by email.
                  </p>

                  <a
                    href={`mailto:${company.email}`}
                    className="
                      mt-5
                      inline-flex
                      items-center
                      gap-2
                      text-sm
                      font-semibold
                      text-[#007D99]
                      transition-colors
                      hover:text-[#00A7C1]
                      dark:text-[#54D9EA]
                    "
                  >
                    {company.email}
                    <span>↗</span>
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

/* ============================================================
   FORM SECTION TITLE
============================================================ */

function FormSectionTitle({ children }) {
  return (
    <div
      className="
        mb-6
        mt-10
        font-mono
        text-[10px]
        uppercase
        tracking-[0.2em]
        text-[#00839D]
        dark:text-[#52D8EA]
      "
    >
      {children}
    </div>
  )
}

/* ============================================================
   FIELD
============================================================ */

function Field({
  label,
  required = false,
  children,
  className = '',
}) {
  return (
    <div className={className}>
      <label
        className="
          mb-2
          block
          text-sm
          font-medium
          text-[#294A53]
          dark:text-[#C8E5EA]
        "
      >
        {label}

        {required && (
          <span className="ml-1 text-cyan-500">
            *
          </span>
        )}
      </label>

      {children}
    </div>
  )
}

/* ============================================================
   BENEFIT
============================================================ */

function Benefit({ number, text }) {
  return (
    <motion.div
      whileHover={{
        x: 4,
      }}
      transition={{
        duration: 0.25,
      }}
      className="flex gap-3"
    >
      <span
        className="
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-lg
          border
          border-cyan-300/20
          bg-cyan-300/10
          font-mono
          text-[9px]
          text-cyan-300
        "
      >
        {number}
      </span>

      <p className="text-sm leading-relaxed text-slate-300">
        {text}
      </p>
    </motion.div>
  )
}