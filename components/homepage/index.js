
import ReviewsWidget from "../ReviewsWidget";
import FaqSection from "./Faq";
import HeroSection from "./HeroSection";
import { InvestmentOpportunity } from "./Investment";
import IraqiDinarSection from "./IraqiDinarSection";
import ACSReviewsCarousel from "./Testmonial";



export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ACSReviewsCarousel/>
      <IraqiDinarSection />
      <InvestmentOpportunity/>
      <FaqSection/>
   
    </main>
  );
}
