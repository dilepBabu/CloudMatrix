// ============================================================================
// CLOUD MATRIX TECHNOLOGIES
// CONTENT DATA
// ============================================================================

/*
  Company facts are based on the existing Cloud Matrix Technologies website.

  Expanded descriptive copy is generic explanatory content consistent with
  the services represented by the site.
*/

// ============================================================================
// COMPANY
// ============================================================================

export const company = {
  name: "Cloud Matrix Technologies",

  shortName: "Cloud Matrix",

  tagline: "Your Digital Transformation Partner",

  location: "Salem, Tamil Nadu, India",

  phone: "+91 9994555400",

  phoneHref: "tel:+919994555400",

  email: "support@cmatrix.in",

  whatsappNumber: "919500966480",

  /* IMPORTANT:
     These must be plain URLs.
     Do NOT wrap them in Markdown [text](url) syntax.
  */

  mapsUrl:
    "https://maps.app.goo.gl/1LPLUTsnnxEsNHto8",

  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3907.4789589337224!2d78.18507387487065!3d11.660429588547272!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3babf197ba51a33d%3A0xde3c4007c32243e4!2sCloud%20Matrix%20Technologies!5e0!3m2!1sen!2sin!4v1757063596694!5m2!1sen!2sin",

  social: {
    facebook:
      "https://www.facebook.com/profile.php?id=61583160751530",

    instagram:
      "https://www.instagram.com/cloudmatrix.tech",

    linkedin:
      "https://www.linkedin.com/company/cloud-matrix-technologies/",
  },
};

// ============================================================================
// WHATSAPP LINK
// ============================================================================

export function waLink(message = "") {
  return `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;
}

// ============================================================================
// HERO STATS
// ============================================================================

export const heroStats = [
  {
    label: " Happy Clients",
    value: "100+",
    description: "Trusted By Growing Business",
  },

  {
    label: "Software Development",
    value: "Custom",
    description: "Improve Your Search Visibility",
  },

  {
    label: "Technical Support",
    value: "24/7",
    description: "Always Here To Support You",
  },
];

// ============================================================================
// VISION
// ============================================================================

export const vision =
  "We help businesses build a stronger digital presence with modern websites, mobile applications, AI-powered solutions, and digital marketing. Our goal is simple — create scalable, secure, and high-performance digital solutions that help businesses reach more customers, improve efficiency, and grow online.";

// ============================================================================
// MISSION
// ============================================================================

export const missionPoints = [
  "Our goal is simple — create scalable, secure, and high-performance digital solutions that help businesses reach more customers, improve efficiency, and grow online.",

  "Mobile App Development — User-friendly mobile applications built for modern businesses.",

  "AI-Powered Solutions — Smart AI integration and automation to simplify business operations.",

  "Digital Marketing — Build online visibility and connect your brand with the right audience. Continuously innovate, upgrade our skills, and maintain a passionate team committed to meaningful digital transformation.",

  "Custom Business Solutions — Technology solutions tailored to your specific business needs.",
];

// ============================================================================
// SERVICES
// ============================================================================

export const services = [
  {
    id: "web-development",

    name: "Web Development",

    description:
      "We create fast, responsive and SEO-friendly websites that help your business improve Google visibility, attract more customers and generate quality enquiries.",

    value:
      "A fast website that ranks better, reaches more customers, and drives enquiries.",

    tags: [
      "Responsive UI",
      "SEO Optimized",
      "Responsive Design",
      "Fast Performance",
    ],
  },

  {
    id: "digital-marketing",

    name: "Digital Marketing",

    description:
      "We help businesses reach the right audience through SEO, Social Media Marketing and Performance Marketing — turning online visibility into leads, sales and business growth.",

    value:
      "Reach the right audience, generate quality leads, and grow your business online.",

    tags: [
      "SEO Growth",
      "Meta Ads",
      "Lead Generation",
    ],
  },

  {
    id: "erp",

    name: "Enterprise Resource Planning",

    description:
      "Manage your inventory, sales, purchases, billing and business operations in one place. Get real-time insights, reduce manual work and make faster business decisions.",

    value:
      "Less Manual Work. Better Control. Smarter Business Decisions.",

    tags: [
      "Inventory Management",
      "Business Automation",
      "Real-Time Reports",
    ],
  },

  {
    id: "crm",

    name: "Customer Relationship Management",

    description:
      "Manage customer data, leads, follow-ups and sales activities in one place. Track every customer interaction, improve your sales process and turn more leads into loyal customers.",

    value:
      "Better Customer Management. Faster Follow-Ups. More Sales.",

    tags: [
      "Lead Management",
      "Customer Tracking",
      "Sales Follow-Up",
    ],
  },

  {
    id: "ecommerce",

    name: "Ecommerce App Development",

    description:
      "Create a fast, secure and mobile-friendly ecommerce app with product management, secure online payments and a smooth checkout experience. Designed to attract customers and increase online sales.",

    value:
      "Turn online visitors into customers with a seamless shopping experience.",

    tags: [
      "Ecommerce App",
      "Online Shopping",
      "Secure Payments",
    ],
  },

  {
    id: "app-development",

    name: "App Development",

    description:
      "We develop fast, secure and user-friendly mobile and web applications designed around your business needs. From idea to launch, we build scalable apps that improve customer experience and simplify daily operations.",

    value:
      "Turn your ideas into powerful apps that help your business grow.",

    tags: [
      "Custom Apps",
      "Android & iOS",
      "Web Applications",
    ],
  },

  {
    id: "agentic-ai-services",

    name: "Agentic AI",

    description:
      "Build intelligent AI agents that can understand tasks, make decisions and take actions with minimal human intervention. Automate repetitive workflows and help your business work faster and smarter.",

    value:
      "AI that doesn’t just respond — it takes action.",

    tags: [
      "AI Agents",
      "AI Automation",
      "Smart Workflows",
    ],
  },

  {
    id: "web-design",

    name: "Web Design",

    description:
      "We create responsive, user-friendly and SEO-friendly website designs that look great on every device. Our UI/UX design focuses on easy navigation, better user experience and more business enquiries.",

    value:
      "Beautiful design. Better user experience. More conversions.",

    tags: [
      "UI/UX Design",
      "Responsive Design",
      "SEO-Friendly",
    ],
  },
];

// ============================================================================
// WHY CHOOSE US
// ============================================================================

export const whyChooseUs = [
  {
    title: "Lifetime Support",

    description:
      "We're committed to your success forever. Enjoy continuous updates, maintenance, and dedicated support throughout your journey with us.",
  },

  {
    title: "On Time Delivery",

    description:
      "Rapid project turnaround without compromising quality. We understand the value of time and deliver solutions efficiently to meet your deadlines.",
  },

  {
    title: "100% Customised",

    description:
      "No cookie-cutter templates. Every project is crafted to align perfectly with your specific requirements, vision, and goals.",
  },

  {
    title: "Secure & Reliable",

    description:
      "Enterprise-grade security and robust infrastructure ensure your data and applications are protected, with reliability built into every layer.",
  },

  {
    title: "Competitive Pricing",

    description:
      "Premium quality at affordable rates, with transparent pricing that makes professional technology solutions accessible to businesses of every size.",
  },
];

// ============================================================================
// INDUSTRIES
// ============================================================================

export const industries = [
  {
    title: "Startups & SMEs",

    description:
      "Scalable tech solutions to launch and grow your business with confidence and agility.",
  },

  {
    title: "Enterprises",

    description:
      "Custom software and digital transformation solutions built for large-scale operations.",
  },

  {
    title: "Retail & Hospitality",

    description:
      "Point-of-sale systems, online ordering, and management solutions for modern businesses.",
  },
];

// ============================================================================
// PROBLEMS
// ============================================================================

export const problems = [
  {
    title: "Outdated or slow-loading websites",

    description:
      "A dated site quietly turns visitors away before they read a word about your business.",
  },

  {
    title: "Manual, disconnected operations",

    description:
      "Spreadsheets, paper logs and separate tools make it hard to see what’s actually happening.",
  },

  {
    title: "Software that doesn’t fit the business",

    description:
      "Generic tools force you to change how you work instead of supporting how you already work.",
  },

  {
    title: "No clear digital presence",

    description:
      "Without a considered web and marketing strategy, even great businesses stay invisible online.",
  },
];

// ============================================================================
// PROCESS
// ============================================================================

export const process = [
  {
    step: "Discover",

    title: "Understand the goal",

    description:
      "We start by listening: your business, your customers, and the outcome you actually need.",
  },

  {
    step: "Design",

    title: "Plan the experience",

    description:
      "Wireframes and architecture decisions come before code, so the build has clear direction.",
  },

  {
    step: "Build",

    title: "Develop & iterate",

    description:
      "Agile development with regular check-ins, so you see real progress and can steer early.",
  },

  {
    step: "Launch",

    title: "Test & deploy",

    description:
      "Thorough testing across devices before going live, so launch day is uneventful in the best way.",
  },

  {
    step: "Support",

    title: "Support for life",

    description:
      "Lifetime support means we stay involved after launch, not just at the handover.",
  },
];

// ============================================================================
// TECH CAPABILITIES
// ============================================================================

export const techCapabilities = [
  {
    title: "Frontend Engineering",

    description:
      "Modern, component-driven interfaces built for speed and clarity.",
  },

  {
    title: "Backend & APIs",

    description:
      "Reliable server-side systems and integrations that scale with demand.",
  },

  {
    title: "Cloud Infrastructure",

    description:
      "Cloud-hosted applications built for uptime, security and easy scaling.",
  },

  {
    title: "Mobile Engineering",

    description:
      "Native and cross-platform mobile apps for Android and iOS.",
  },

  {
    title: "Data & Reporting",

    description:
      "Dashboards and reporting tools that turn raw data into decisions.",
  },

  {
    title: "Integrations",

    description:
      "Payment gateways, third-party APIs and internal systems connected cleanly.",
  },
];

// ============================================================================
// TESTIMONIALS
// ============================================================================

export const testimonials = [
  {
    quote:
      "Cloud Matrix Technologies gave us a user-friendly billing platform with many features in one place. It is genuinely easy to use.",

    name: "dlipbabu",

    role: "Cafe Owner, Salem",
  },

  {
    quote:
      "Cloud Matrix Technologies understood our requirements clearly and delivered a modern website that perfectly represents our business. The entire development process was smooth and professional.",

    name: "Arun Kumar",

    role: "Business Owner, Salem",
  },

  {
    quote:
      "We needed a customized software solution for our daily operations, and Cloud Matrix Technologies built exactly what our business required. The solution has made our workflow much more organized.",

    name: "harivignesh",

    role: "Managing Director, Salem",
  },

  {
    quote:
      "The digital marketing team understood our target audience and created a clear strategy for our business. We have seen a noticeable improvement in our online presence and enquiries.",

    name: "Karthikeyan",

    role: "Business Owner, Tamil Nadu",
  },

  {
    quote:
      "Our e-commerce website is now much easier for customers to navigate. Cloud Matrix Technologies handled the design and development professionally and delivered a smooth overall experience.",

    name: "Vignesh",

    role: "E-commerce Business Owner, Salem",
  },

  {
    quote:
      "What impressed us most was their ability to understand our business before suggesting a technology solution. Their approach was practical, transparent, and focused on our actual requirements.",

    name: "Ramesh",

    role: "Director, Salem",
  },

  {
    quote:
      "Cloud Matrix Technologies helped us build a professional digital presence from the ground up. The website looks modern, communicates our services clearly, and gives our customers more confidence in our brand.",

    name: "Dinesh",

    role: "Business Owner, Coimbatore",
  },

  {
    quote:
      "We were looking for a reliable technology partner rather than just a development company. Cloud Matrix Technologies provided excellent communication, technical guidance, and a solution that fits our business.",

    name: "Suresh",

    role: "Founder, Tamil Nadu",
  },

  {
    quote:
      "The team was very responsive throughout the project. They listened to our feedback, made the necessary improvements, and ensured the final product matched our expectations.",

    name: "Manoj",

    role: "Business Owner, Salem",
  },

  {
    quote:
      "Cloud Matrix Technologies helped us move several manual processes into a more organized digital system. Their customized approach has made our day-to-day operations much more efficient.",

    name: "Rajesh",

    role: "Operations Manager, Salem",
  },

  {
    quote:
      "From the initial discussion to the final delivery, the team maintained a professional workflow. Their attention to detail and willingness to understand our requirements made the project much easier.",

    name: "Sathish",

    role: "Business Owner, Erode",
  },

  {
    quote:
      "We appreciated the combination of technical expertise and business understanding from Cloud Matrix Technologies. They did not simply build what we asked for; they suggested better ways to achieve our objectives.",

    name: "Mohan",

    role: "Managing Director, Tamil Nadu",
  },
];

// ============================================================================
// FAQ
// ============================================================================

export const faqs = [
  {
    q: "What kind of projects does Cloud Matrix take on?",

    a:
      'We build websites, mobile apps, ecommerce platforms, web applications, inventory tools, Windows desktop software and custom software, along with digital marketing support for businesses of any size.',
  },

  {
    q: "How long does a typical project take?",

    a:
      "Timelines depend on scope. A focused website may take a few weeks, while a full custom application takes longer. We agree on a timeline together before work begins, and keep you updated throughout.",
  },

  {
    q: "Do you offer support after the project is delivered?",

    a:
      "Yes. Lifetime support is core to how we work, covering updates, maintenance and help whenever you need it after launch.",
  },

  {
    q: "Can you work with our existing systems?",

    a:
      "Yes, we regularly integrate new builds with existing tools, payment gateways and third-party services rather than starting from zero.",
  },

  {
    q: "How do I get a quote?",

    a:
      'Reach out through the "Talk to Our Expert" form or WhatsApp with a short description of what you need, and we’ll get back to you with next steps.',
  },
];

// ============================================================================
// LEGAL
// ============================================================================

export const legalIntro = {
  effectiveDate: "January 2026",
};