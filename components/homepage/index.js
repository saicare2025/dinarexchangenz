import { BuyingDinarNow } from "./BuyingDiner";
import HeroSection from "./HeroSection";
import { InvestmentOpportunity } from "./Investment";
import IraqiDinarSection from "./IraqiDinerSection";
import { TestimonialsSection } from "./Testmonial";
import { WhyChooseUs } from "./WhyChooseUs";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <IraqiDinarSection />
      <InvestmentOpportunity/>
      <BuyingDinarNow/>
      <TestimonialsSection/>
    </main>
  );
}
