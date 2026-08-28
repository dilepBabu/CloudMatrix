import Hero from '../sections/Hero'
import CompanyIntro from '../sections/CompanyIntro'
import Services from '../sections/Services'
import Process from '../sections/Process'
import WhyChooseUs from '../sections/WhyChooseUs'
import IndustriesSection from '../sections/Industries'
import Testimonials from '../sections/Testimonials'
import FAQ from '../sections/FAQ'
import ContactCTA from '../sections/ContactCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <CompanyIntro />
      <Services />
      <Process />
      <WhyChooseUs />
      
      <Testimonials />
      <FAQ />
      <ContactCTA />
    </>
  )
}
