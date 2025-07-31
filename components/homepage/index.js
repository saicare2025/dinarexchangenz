
import FaqSection from "./Faq";
import HeroSection from "./HeroSection";
import { InvestmentOpportunity } from "./Investment";
import IraqiDinarSection from "./IraqiDinarSection";

import { TestimonialsSection } from "./Testmonial";


export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TestimonialsSection/>
      <IraqiDinarSection />
      <InvestmentOpportunity/>
      <FaqSection/>
    </main>
  );
}
