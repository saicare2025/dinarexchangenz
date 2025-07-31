// app/page.js
"use client";

import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import HomePage from "@/components/homepage";


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <HomePage/>
      <Footer/>
    </main>
  );
}
