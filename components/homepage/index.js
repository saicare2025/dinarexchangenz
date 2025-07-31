
import { BuyingDinarNow } from "./BuyingDinar";
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
      <BuyingDinarNow/>
      <InvestmentOpportunity/>
    </main>
  );
}
