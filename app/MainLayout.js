import { Footer } from "@/components/Footer";
import Header from "@/components/Header";


export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-orange-100">
      <Header />
      <main className="container max-w-7xl mx-auto px-4">
        {children}
      </main>
      <Footer/>
    </div>
  );
}