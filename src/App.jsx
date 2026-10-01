import { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Career from "./pages/Career";
import TalkToExpert from "./pages/TalkToExpert";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import NotFound from "./pages/NotFound";

import IndustriesSection from "./sections/Industries";
import Hero from "./sections/Hero";

/* ============================================================
   SCROLL TO TOP
============================================================ */

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      return;
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  }, [location.pathname]);

  return null;
}

/* ============================================================
   SEO PAGE DATA
============================================================ */

const seoPages = {
  "/web-development-company-salem": {
    title:
      "Web Development Company in Salem | Cloud Matrix Technologies",
    description:
      "Cloud Matrix Technologies is a web development company in Salem offering responsive business websites, corporate websites, landing pages and custom web solutions.",
    heading:
      "Web Development Company in Salem",
    intro:
      "Cloud Matrix Technologies provides professional website development solutions for businesses, startups and organizations in Salem.",
    services: [
      "Business Website Development",
      "Corporate Website Development",
      "Responsive Website Development",
      "Landing Page Development",
      "Custom Web Application Development",
      "Website Maintenance and Support",
    ],
  },

  "/digital-marketing-agency-salem": {
    title:
      "Digital Marketing Agency in Salem | Cloud Matrix Technologies",
    description:
      "Cloud Matrix Technologies provides digital marketing services in Salem including social media marketing, Meta Ads, SEO, content marketing and lead generation.",
    heading:
      "Digital Marketing Agency in Salem",
    intro:
      "Grow your business online with digital marketing strategies designed for businesses in Salem and Tamil Nadu.",
    services: [
      "Social Media Marketing",
      "Meta Ads Management",
      "Google Ads",
      "Search Engine Optimization",
      "Content Marketing",
      "Lead Generation",
    ],
  },

  "/erp-software-salem": {
    title:
      "ERP Software Company in Salem | Cloud Matrix Technologies",
    description:
      "Cloud Matrix Technologies offers ERP software solutions in Salem to manage sales, purchase, inventory, accounts, HR, payroll and business operations.",
    heading:
      "ERP Software Company in Salem",
    intro:
      "Manage your business operations from one connected ERP system with centralized data, reports and real-time visibility.",
    services: [
      "Sales Management",
      "Purchase Management",
      "Inventory Management",
      "Accounts Management",
      "HR and Payroll",
      "Business Reports and Dashboard",
    ],
  },

  "/crm-software-salem": {
    title:
      "CRM Software Company in Salem | Cloud Matrix Technologies",
    description:
      "Cloud Matrix Technologies provides CRM software solutions in Salem to manage leads, customers, sales pipelines, follow-ups and customer relationships.",
    heading:
      "CRM Software Company in Salem",
    intro:
      "Organize customer relationships, leads and sales activities with a centralized CRM platform.",
    services: [
      "Lead Management",
      "Customer Management",
      "Sales Pipeline",
      "Follow-up Management",
      "Customer Communication",
      "Reports and Analytics",
    ],
  },

  "/app-development-company-salem": {
    title:
      "App Development Company in Salem | Cloud Matrix Technologies",
    description:
      "Cloud Matrix Technologies develops modern mobile and business applications for startups, companies and organizations in Salem.",
    heading:
      "App Development Company in Salem",
    intro:
      "Build modern and scalable mobile applications designed around your business requirements and customer needs.",
    services: [
      "Business Mobile Apps",
      "Android App Development",
      "iOS App Development",
      "Custom Application Development",
      "API Integration",
      "App Maintenance and Support",
    ],
  },

  "/ecommerce-development-salem": {
    title:
      "E-Commerce Development Company in Salem | Cloud Matrix Technologies",
    description:
      "Cloud Matrix Technologies provides e-commerce website development services in Salem for businesses looking to sell products online.",
    heading:
      "E-Commerce Development Company in Salem",
    intro:
      "Launch a professional online store with a responsive shopping experience and business-focused e-commerce features.",
    services: [
      "E-Commerce Website Development",
      "Product Management",
      "Shopping Cart",
      "Order Management",
      "Customer Management",
      "Online Store Optimization",
    ],
  },

  "/ui-ux-design-salem": {
    title:
      "UI UX Design Company in Salem | Cloud Matrix Technologies",
    description:
      "Cloud Matrix Technologies provides UI UX design services in Salem for websites, mobile applications and digital products.",
    heading:
      "UI UX Design Company in Salem",
    intro:
      "Create simple, modern and user-focused digital experiences with professional UI and UX design.",
    services: [
      "Website UI Design",
      "Mobile App UI Design",
      "UX Research",
      "Wireframing",
      "Prototype Design",
      "Design Systems",
    ],
  },

  "/ai-development-company-salem": {
    title:
      "AI Development Company in Salem | Cloud Matrix Technologies",
    description:
      "Cloud Matrix Technologies provides AI development and AI integration solutions for businesses looking to automate workflows and improve productivity.",
    heading:
      "AI Development Company in Salem",
    intro:
      "Explore practical AI solutions that can automate repetitive business tasks and improve digital workflows.",
    services: [
      "AI Application Development",
      "AI Chatbots",
      "AI Automation",
      "AI API Integration",
      "Business AI Solutions",
      "Agentic AI Solutions",
    ],
  },

  "/seo-company-salem": {
    title:
      "SEO Company in Salem | Cloud Matrix Technologies",
    description:
      "Cloud Matrix Technologies provides SEO services in Salem including on-page SEO, technical SEO, local SEO, content optimization and off-page SEO.",
    heading:
      "SEO Company in Salem",
    intro:
      "Improve your website's search visibility with technical, on-page, local and off-page SEO strategies.",
    services: [
      "On-Page SEO",
      "Technical SEO",
      "Local SEO",
      "Google Business Profile Optimization",
      "Content SEO",
      "Off-Page SEO",
    ],
  },
};

/* ============================================================
   SEO PAGE COMPONENT
============================================================ */

function SEOPage({ data }) {
  useEffect(() => {
    document.title = data.title;

    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    );

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute(
        "name",
        "description"
      );
      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute(
      "content",
      data.description
    );

    return () => {
      document.title =
        "Cloud Matrix Technologies | Software & Digital Solutions";
    };
  }, [data]);

  return (
    <div className="w-full">

      {/* ======================================================
          HERO
      ====================================================== */}

      <section className="min-h-[70vh] flex items-center px-6 py-24">
        <div className="max-w-6xl mx-auto w-full">

          <p className="text-sm uppercase tracking-[0.2em] opacity-70 mb-5">
            Cloud Matrix Technologies
          </p>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            {data.heading}
          </h1>

          <p className="text-lg md:text-xl leading-8 opacity-80 max-w-3xl mb-10">
            {data.intro}
          </p>

          <div className="flex flex-wrap gap-4">

            <Link
              to="/talk-to-expert"
              className="px-7 py-4 rounded-xl bg-black text-white hover:opacity-80 transition"
            >
              Talk to an Expert
            </Link>

            <Link
              to="/contact"
              className="px-7 py-4 rounded-xl border border-current hover:opacity-70 transition"
            >
              Contact Us
            </Link>

          </div>

        </div>
      </section>

      {/* ======================================================
          SERVICES
      ====================================================== */}

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">

          <div className="mb-12">

            <p className="text-sm uppercase tracking-[0.2em] opacity-60 mb-3">
              Our Services
            </p>

            <h2 className="text-3xl md:text-4xl font-bold">
              Solutions for Your Business
            </h2>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {data.services.map((service, index) => (
              <div
                key={index}
                className="rounded-2xl border p-7 hover:-translate-y-1 transition"
              >

                <div className="text-sm opacity-50 mb-4">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="text-xl font-semibold mb-3">
                  {service}
                </h3>

                <p className="opacity-70 leading-7">
                  Professional{" "}
                  {service.toLowerCase()} solutions
                  designed around your business
                  requirements and growth goals.
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* ======================================================
          ABOUT THE SERVICE
      ====================================================== */}

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">

          <div className="max-w-4xl">

            <p className="text-sm uppercase tracking-[0.2em] opacity-60 mb-3">
              Cloud Matrix Technologies
            </p>

            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Technology Solutions Built Around Your Business
            </h2>

            <p className="leading-8 opacity-75 mb-5">
              Cloud Matrix Technologies helps businesses
              build and improve their digital presence with
              practical technology solutions.
            </p>

            <p className="leading-8 opacity-75">
              Our services cover software development,
              digital marketing, ERP, CRM, e-commerce,
              UI/UX design, artificial intelligence and
              search engine optimization.
            </p>

          </div>

        </div>
      </section>

      {/* ======================================================
          INTERNAL LINKS
      ====================================================== */}

      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-3xl font-bold mb-8">
            Explore Our Services
          </h2>

          <div className="flex flex-wrap gap-4">

            <Link
              to="/web-development-company-salem"
              className="underline"
            >
              Web Development
            </Link>

            <Link
              to="/digital-marketing-agency-salem"
              className="underline"
            >
              Digital Marketing
            </Link>

            <Link
              to="/erp-software-salem"
              className="underline"
            >
              ERP Software
            </Link>

            <Link
              to="/crm-software-salem"
              className="underline"
            >
              CRM Software
            </Link>

            <Link
              to="/app-development-company-salem"
              className="underline"
            >
              App Development
            </Link>

            <Link
              to="/ecommerce-development-salem"
              className="underline"
            >
              E-Commerce
            </Link>

            <Link
              to="/ui-ux-design-salem"
              className="underline"
            >
              UI UX Design
            </Link>

            <Link
              to="/ai-development-company-salem"
              className="underline"
            >
              AI Development
            </Link>

            <Link
              to="/seo-company-salem"
              className="underline"
            >
              SEO Services
            </Link>

          </div>

        </div>
      </section>

      {/* ======================================================
          FAQ
      ====================================================== */}

      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto">

          <p className="text-sm uppercase tracking-[0.2em] opacity-60 mb-3">
            FAQ
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-10">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">

            <details className="border rounded-xl p-6">

              <summary className="font-semibold cursor-pointer">
                What services does Cloud Matrix Technologies provide?
              </summary>

              <p className="mt-4 leading-7 opacity-70">
                Cloud Matrix Technologies provides website
                development, digital marketing, ERP, CRM,
                e-commerce, UI/UX, AI and SEO solutions.
              </p>

            </details>

            <details className="border rounded-xl p-6">

              <summary className="font-semibold cursor-pointer">
                Do you provide services for businesses in Salem?
              </summary>

              <p className="mt-4 leading-7 opacity-70">
                Yes. We provide technology and digital
                solutions for businesses in Salem and can
                also work with clients in other locations.
              </p>

            </details>

            <details className="border rounded-xl p-6">

              <summary className="font-semibold cursor-pointer">
                How can I contact Cloud Matrix Technologies?
              </summary>

              <p className="mt-4 leading-7 opacity-70">
                You can contact our team through the Contact
                page or use the Talk to Expert option.
              </p>

            </details>

          </div>

        </div>
      </section>

      {/* ======================================================
          CTA
      ====================================================== */}

      <section className="px-6 py-24">
        <div className="max-w-6xl mx-auto">

          <div className="rounded-3xl border p-10 md:p-16 text-center">

            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Let's Build Something Great
            </h2>

            <p className="max-w-2xl mx-auto opacity-70 leading-7 mb-8">
              Have a project or business requirement?
              Talk to Cloud Matrix Technologies and explore
              the right technology solution for your business.
            </p>

            <Link
              to="/talk-to-expert"
              className="inline-block px-8 py-4 rounded-xl bg-black text-white hover:opacity-80 transition"
            >
              Talk to an Expert
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}

/* ============================================================
   SIMPLE PAGE COMPONENT
============================================================ */

function SimplePage({
  title,
  description,
  children,
}) {
  useEffect(() => {
    document.title = title;

    let descriptionTag = document.querySelector(
      'meta[name="description"]'
    );

    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");

      descriptionTag.setAttribute(
        "name",
        "description"
      );

      document.head.appendChild(descriptionTag);
    }

    descriptionTag.setAttribute(
      "content",
      description
    );

  }, [title, description]);

  return (
    <section className="px-6 py-24">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          {title}
        </h1>

        <p className="text-lg leading-8 opacity-75 max-w-3xl">
          {description}
        </p>

        <div className="mt-10">
          {children}
        </div>

      </div>

    </section>
  );
}

/* ============================================================
   APP
============================================================ */

export default function App() {

  const location = useLocation();

  const [appReady, setAppReady] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">

      {/* ======================================================
          PRELOADER
      ====================================================== */}

      <Preloader
        onComplete={() => {
          setAppReady(true);
        }}
      />

      {/* ======================================================
          NAVBAR
      ====================================================== */}

      <Navbar />

      {/* ======================================================
          CUSTOM CURSOR
      ====================================================== */}

      <CustomCursor />

      {/* ======================================================
          SCROLL TO TOP
      ====================================================== */}

      <ScrollToTop />

      {/* ======================================================
          PAGE ROUTES
      ====================================================== */}

      <main className="flex-1">

        <Routes
          location={location}
          key={location.pathname}
        >

          {/* ==================================================
              HOME
          ================================================== */}

          <Route
            path="/"
            element={<Home />}
          />

          {/* ==================================================
              HERO
          ================================================== */}

          <Route
            path="/hero"
            element={<Hero />}
          />

          {/* ==================================================
              INDUSTRIES
          ================================================== */}

          <Route
            path="/industries"
            element={<IndustriesSection />}
          />

          {/* ==================================================
              SEO SERVICE PAGES
          ================================================== */}

          <Route
            path="/web-development-company-salem"
            element={
              <SEOPage
                data={
                  seoPages[
                    "/web-development-company-salem"
                  ]
                }
              />
            }
          />

          <Route
            path="/digital-marketing-agency-salem"
            element={
              <SEOPage
                data={
                  seoPages[
                    "/digital-marketing-agency-salem"
                  ]
                }
              />
            }
          />

          <Route
            path="/erp-software-salem"
            element={
              <SEOPage
                data={
                  seoPages[
                    "/erp-software-salem"
                  ]
                }
              />
            }
          />

          <Route
            path="/crm-software-salem"
            element={
              <SEOPage
                data={
                  seoPages[
                    "/crm-software-salem"
                  ]
                }
              />
            }
          />

          <Route
            path="/app-development-company-salem"
            element={
              <SEOPage
                data={
                  seoPages[
                    "/app-development-company-salem"
                  ]
                }
              />
            }
          />

          <Route
            path="/ecommerce-development-salem"
            element={
              <SEOPage
                data={
                  seoPages[
                    "/ecommerce-development-salem"
                  ]
                }
              />
            }
          />

          <Route
            path="/ui-ux-design-salem"
            element={
              <SEOPage
                data={
                  seoPages[
                    "/ui-ux-design-salem"
                  ]
                }
              />
            }
          />

          <Route
            path="/ai-development-company-salem"
            element={
              <SEOPage
                data={
                  seoPages[
                    "/ai-development-company-salem"
                  ]
                }
              />
            }
          />

          <Route
            path="/seo-company-salem"
            element={
              <SEOPage
                data={
                  seoPages[
                    "/seo-company-salem"
                  ]
                }
              />
            }
          />

          {/* ==================================================
              ABOUT
          ================================================== */}

          <Route
            path="/about"
            element={
              <SimplePage
                title="About Cloud Matrix Technologies"
                description="Cloud Matrix Technologies provides software development and digital solutions for businesses."
              >

                <p className="leading-8 opacity-75 max-w-3xl">
                  Cloud Matrix Technologies provides
                  technology and digital solutions for
                  businesses, startups and organizations.
                  Our services include website development,
                  digital marketing, ERP, CRM, e-commerce,
                  UI/UX, AI and SEO.
                </p>

              </SimplePage>
            }
          />

          {/* ==================================================
              CONTACT
          ================================================== */}

          <Route
            path="/contact"
            element={
              <SimplePage
                title="Contact Cloud Matrix Technologies"
                description="Get in touch with Cloud Matrix Technologies for website development, digital marketing, ERP, CRM, AI, e-commerce and SEO solutions."
              >

                <Link
                  to="/talk-to-expert"
                  className="inline-block px-7 py-4 rounded-xl bg-black text-white"
                >
                  Talk to an Expert
                </Link>

              </SimplePage>
            }
          />

          {/* ==================================================
              CASE STUDIES
          ================================================== */}

          <Route
            path="/case-studies"
            element={
              <SimplePage
                title="Case Studies | Cloud Matrix Technologies"
                description="Explore technology and digital solutions delivered by Cloud Matrix Technologies."
              >

                <p className="leading-8 opacity-75 max-w-3xl">
                  Explore our technology and digital
                  solution projects including websites,
                  software solutions, digital marketing
                  and business technology services.
                </p>

              </SimplePage>
            }
          />

          {/* ==================================================
              BLOG
          ================================================== */}

          <Route
            path="/blog"
            element={<Blog />}
          />

          {/* ==================================================
              CAREER
          ================================================== */}

          <Route
            path="/career"
            element={<Career />}
          />

          {/* ==================================================
              TALK TO EXPERT
          ================================================== */}

          <Route
            path="/talk-to-expert"
            element={<TalkToExpert />}
          />

          {/* ==================================================
              PRIVACY POLICY
          ================================================== */}

          <Route
            path="/privacy-policy"
            element={<PrivacyPolicy />}
          />

          {/* ==================================================
              TERMS OF SERVICE
          ================================================== */}

          <Route
            path="/terms-of-service"
            element={<TermsOfService />}
          />

          {/* ==================================================
              404
          ================================================== */}

          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      </main>

      {/* ======================================================
          FOOTER
      ====================================================== */}

      <Footer />

    </div>
  );
}