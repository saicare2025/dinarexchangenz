import { Footer } from "@/components/Footer";
import Header from "@/components/Header";


export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-orange-50">
      <Header />
      <main className="container max-w-7xl mx-auto px-4">
        {children}
      </main>
      <Footer/>
    </div>
  );
}