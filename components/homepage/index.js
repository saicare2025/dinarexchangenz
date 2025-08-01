
import FaqSection from "./Faq";
import HeroSection from "./HeroSection";
import { InvestmentOpportunity } from "./Investment";
import IraqiDinarSection from "./IraqiDinarSection";
import { Testimonials3DCarousel } from "./Testmonial";



export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <Testimonials3DCarousel/>
      <IraqiDinarSection />
      <InvestmentOpportunity/>
      <FaqSection/>
    </main>
  );
}
