import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Experience from "../components/Experience";
import Portfolio from "../components/Portfolio";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full">
        <Hero />
        <About />
        <Experience />
        <Portfolio />
      </main>
      
      <footer className="py-8 text-center text-slate-500 text-sm border-t border-slate-800/50 glass relative z-10">
        <p>© {new Date().getFullYear()} Darren D. Tan. All rights reserved.</p>
        <p className="mt-2">Built with Next.js and Tailwind CSS.</p>
      </footer>
    </>
  );
}
