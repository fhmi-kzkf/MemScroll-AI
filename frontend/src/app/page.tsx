"use client";

import HeaderLockup from "@/components/ui/HeaderLockup";
import DisplayHeadline from "@/components/ui/DisplayHeadline";
import Link from "next/link";
import PillButton from "@/components/ui/PillButton";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { Database, CheckCircle2, Brain } from "lucide-react";
import { useRef, useState } from "react";

// --- Subcomponents ---

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66.66%"]);
  const [activeSlide, setActiveSlide] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.33) setActiveSlide(1);
    else if (latest < 0.66) setActiveSlide(2);
    else setActiveSlide(3);
  });

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-ink-black text-bone-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-[300vw]">
          
          {/* SLIDE 1 */}
          <div className="w-[100vw] h-screen flex items-center justify-center px-4 md:px-16 pt-16">
            <div className="flex flex-col md:flex-row gap-12 max-w-[1440px] w-full">
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-[14px] uppercase text-ash tracking-normal mb-6">FEATURE 01</p>
                <h2 className="text-[64px] md:text-[84px] font-light leading-[0.9] tracking-[-0.04em] mb-8">Adaptive<br/>Reader</h2>
                <p className="text-[18px] text-ash font-light leading-[1.6] max-w-[400px]">
                  Upload a PDF and read it as an interactive webpage. The AI detects concepts you've mastered in previous papers and automatically condenses them, saving you hours.
                </p>
              </div>
              <div className="flex-1 hidden md:flex items-center justify-center">
                <div className="w-full aspect-[4/3] bg-ash/10 relative overflow-hidden flex items-center justify-center p-8 border border-ash/30">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <div className="bg-bone-white p-6 shadow-subtle z-10 w-full max-w-[300px] text-ink-black transform rotate-2">
                    <p className="text-[10px] uppercase text-forest-teal mb-2">Mastered Concept</p>
                    <h4 className="text-[16px] font-medium mb-2">Encoder-Decoder</h4>
                    <p className="text-[12px] italic text-graphite mb-4">[This section is collapsed based on your mastery score from 4 previous papers.]</p>
                    <div className="h-1 w-full bg-ash/30"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 2 */}
          <div className="w-[100vw] h-screen flex items-center justify-center px-4 md:px-16 pt-16">
            <div className="flex flex-col md:flex-row gap-12 max-w-[1440px] w-full">
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-[14px] uppercase text-ash tracking-normal mb-6">FEATURE 02</p>
                <h2 className="text-[64px] md:text-[84px] font-light leading-[0.9] tracking-[-0.04em] mb-8">Persistent<br/>Memory</h2>
                <p className="text-[18px] text-ash font-light leading-[1.6] max-w-[400px]">
                  Every concept extracted is tracked in a project-scoped pgvector database. The AI remembers what you know and selectively forgets low-importance data.
                </p>
              </div>
              <div className="flex-1 hidden md:flex items-center justify-center">
                <div className="w-full aspect-[4/3] bg-ash/10 relative overflow-hidden flex items-center justify-center p-8 border border-ash/30">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <div className="bg-bone-white p-6 shadow-subtle z-10 w-full max-w-[300px] text-ink-black transform -rotate-2">
                    <div className="flex items-center gap-2 mb-4 border-b border-ash pb-2">
                      <Database size={16} className="text-forest-teal" />
                      <span className="text-[12px] uppercase font-medium">Memory Audit</span>
                    </div>
                    <ul className="space-y-3 text-[12px] text-graphite">
                      <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-ink-black"/> Transformer (Pinned)</li>
                      <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-ink-black"/> Attention (Mastered)</li>
                      <li className="flex items-center gap-2 text-ash"><CheckCircle2 size={14} /> RNN (Archived)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SLIDE 3 */}
          <div className="w-[100vw] h-screen flex items-center justify-center px-4 md:px-16 pt-16">
            <div className="flex flex-col md:flex-row gap-12 max-w-[1440px] w-full">
              <div className="flex-1 flex flex-col justify-center">
                <p className="text-[14px] uppercase text-ash tracking-normal mb-6">FEATURE 03</p>
                <h2 className="text-[64px] md:text-[84px] font-light leading-[0.9] tracking-[-0.04em] mb-8">Conflict<br/>Resolution</h2>
                <p className="text-[18px] text-ash font-light leading-[1.6] max-w-[400px]">
                  Automatically cross-reference new claims against your historical reading list. Detect methodological conflicts and write synthesis notes seamlessly.
                </p>
              </div>
              <div className="flex-1 hidden md:flex items-center justify-center">
                <div className="w-full aspect-[4/3] bg-ash/10 relative overflow-hidden flex items-center justify-center p-8 border border-ash/30">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                  <div className="bg-candy-pink p-6 shadow-subtle z-10 w-full max-w-[300px] text-ink-black transform rotate-1">
                    <p className="text-[10px] uppercase font-bold mb-2">Contradiction Detected</p>
                    <p className="text-[12px] mb-4">"We use multi-head attention..." conflicts with Smith et al. (2025).</p>
                    <div className="w-full bg-bone-white/50 border border-ink-black/20 p-3 text-[12px] font-light">
                      Write synthesis note...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </motion.div>
        
        {/* Fixed Footer for the carousel */}
        <div className="absolute bottom-12 left-0 w-full px-4 md:px-16 z-20">
          <div className="flex justify-between items-center text-[12px] uppercase tracking-normal">
            <span className="w-12">[{activeSlide}/3]</span>
            <div className="flex-1 mx-4 md:mx-12 h-[1px] bg-ash/30 relative">
              <motion.div 
                className="absolute left-0 top-0 h-full bg-bone-white" 
                style={{ scaleX: scrollYProgress, transformOrigin: 'left' }} 
              />
            </div>
            <Link href="/dashboard" className="text-ash hover:text-bone-white transition-colors text-right">
              View All Features ↗
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const TestimonialCards = () => {
  return (
    <section className="flex flex-col md:flex-row w-full overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="flex-1 bg-candy-pink p-8 md:p-16 min-h-[60vh] flex flex-col justify-between"
      >
        <p className="text-[32px] md:text-[48px] lg:text-[56px] font-light leading-[1.05] text-[#b50d88] tracking-[-0.03em]">
          Unlike traditional summarizers, MemscrollAI actually remembers what I've read across my entire project. It's a game changer.
        </p>
        <div className="mt-16 text-[#b50d88] text-[14px]">
          <p className="font-medium">Sarah Jenkins</p>
          <p className="opacity-80 font-light">Master's Student, Computer Science</p>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="flex-1 bg-mint-wash p-8 md:p-16 min-h-[60vh] flex flex-col justify-between"
      >
        <p className="text-[32px] md:text-[48px] lg:text-[56px] font-light leading-[1.05] text-[#0d735a] tracking-[-0.03em]">
          The way it cross-references methodologies and flags contradictions automatically saved me weeks of manual literature review.
        </p>
        <div className="mt-16 text-[#0d735a] text-[14px]">
          <p className="font-medium">Dr. Alan Turing</p>
          <p className="opacity-80 font-light">Lead Researcher</p>
        </div>
      </motion.div>
    </section>
  );
};

const TechMarquee = () => {
  return (
    <div className="w-full overflow-hidden bg-bone-white py-20 flex items-center border-b border-ash/20">
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 15, repeat: Infinity }}
        className="flex whitespace-nowrap items-center"
      >
        {/* Double the content for seamless looping */}
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex gap-24 px-12 items-center text-ink-black/60 font-bold text-[32px] md:text-[40px] uppercase tracking-tighter">
            <span className="flex items-center gap-3"><Brain size={40} className="text-ink-black" /> QWEN 3.7-PLUS</span>
            <span className="flex items-center gap-3"><Database size={40} className="text-ink-black" /> PGVECTOR</span>
            <span className="flex items-center gap-3">FASTAPI</span>
            <span className="flex items-center gap-3">NEXT.JS</span>
            <span className="flex items-center gap-3">FRAMER MOTION</span>
            <span className="flex items-center gap-3">TAILWIND CSS</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const ComplexFooter = () => {
  return (
    <footer className="bg-ink-black text-bone-white pt-24 overflow-hidden">
      {/* Top Grid */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="max-w-[1440px] mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 border-t border-ash/30 pt-16 mb-24"
      >
        {/* Left Col */}
        <div className="flex flex-col justify-between pr-8 md:border-r md:border-ash/30">
          <div>
            <div className="flex items-center gap-2 mb-6">
               <div className="w-8 h-8 rounded-full bg-bone-white flex-shrink-0 text-ink-black flex items-center justify-center font-bold">M</div>
               <div className="text-[12px] uppercase leading-[1.43] tracking-normal">MemscrollAI<br/>// Research Platform</div>
            </div>
            <p className="text-[14px] text-ash font-light leading-[1.6] max-w-[300px]">
              An AI-powered research assistant designed to transform the way students and researchers consume academic literature.
            </p>
          </div>
          <div className="mt-16 text-[14px] font-light text-ash">
            <p>Jakarta, Indonesia</p>
            <p className="mt-2 text-bone-white hover:text-ash cursor-pointer transition-colors">hello@memscroll.ai</p>
            <div className="flex gap-4 mt-4">
              <span className="cursor-pointer hover:text-bone-white transition-colors">IG</span>
              <span className="cursor-pointer hover:text-bone-white transition-colors">LI</span>
            </div>
          </div>
        </div>

        {/* Middle Col */}
        <div className="flex flex-col border-t border-b md:border-t-0 md:border-b-0 border-ash/30 md:border-r">
          <Link href="/" className="px-8 py-6 border-b border-ash/30 hover:text-ash transition-colors flex justify-between items-center text-[14px] uppercase tracking-normal">
            Home ↗
          </Link>
          <Link href="/dashboard" className="px-8 py-6 border-b border-ash/30 hover:text-ash transition-colors flex justify-between items-center text-[14px] uppercase tracking-normal">
            Dashboard ↗
          </Link>
          <Link href="/login" className="px-8 py-6 border-b border-ash/30 hover:text-ash transition-colors flex justify-between items-center text-[14px] uppercase tracking-normal">
            Settings ↗
          </Link>
          <Link href="#" className="px-8 py-6 hover:text-ash transition-colors flex justify-between items-center text-[14px] uppercase tracking-normal">
            Get In Touch ↗
          </Link>
        </div>

        {/* Right Col */}
        <div className="pl-0 md:pl-8 flex flex-col justify-between pt-8 md:pt-0">
          <div className="flex justify-between items-start">
             <div>
               <h3 className="text-[34px] md:text-[40px] font-light leading-[1.1] mb-4 tracking-[-0.02em]">Ready to kick start<br/>a research session?</h3>
               <p className="text-[14px] text-ash font-light max-w-[280px] leading-[1.6]">Upload your PDFs, and we'll begin building your memory graph today.</p>
             </div>
             <PillButton className="bg-transparent border border-bone-white !text-bone-white hover:bg-bone-white/10 hidden lg:flex flex-shrink-0">Menu</PillButton>
          </div>
          <div className="mt-16 flex justify-between text-[12px] uppercase text-ash tracking-normal pb-4 md:pb-0">
            <span>MEMSCROLL AI © 2026</span>
            <span>BUILT BY AGENT</span>
          </div>
        </div>
      </motion.div>

      {/* Giant Typography */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="w-full flex justify-center items-end leading-none overflow-hidden select-none px-4 pb-0"
      >
        <h1 className="text-[15vw] lg:text-[18vw] font-bold tracking-[-0.03em] text-bone-white whitespace-nowrap leading-[0.75]">
          MEMSCROLL
        </h1>
      </motion.div>
    </footer>
  );
};

// --- Main Page Component ---

export default function Home() {
  return (
    <div className="min-h-screen bg-bone-white">
      <HeaderLockup />
      
      {/* Hero Section */}
      <main className="px-4 md:px-8 pt-24 pb-32 max-w-[1440px] mx-auto min-h-[90vh] flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 max-w-[800px]">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[14px] uppercase text-forest-teal mb-6 tracking-normal font-medium"
          >
            AI-Powered Research Assistant
          </motion.p>
          <DisplayHeadline className="mb-8">
            MASTER YOUR LITERATURE REVIEW. FASTER.
          </DisplayHeadline>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[20px] md:text-[24px] font-light text-graphite leading-[1.4] max-w-[600px] mb-12"
          >
            Stop re-reading the same foundational concepts. MemscrollAI builds a persistent memory graph of your reading history, generating adaptive scrollytelling narratives that focus on what truly matters.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/login">
               <PillButton className="px-8 py-4 text-[16px]">Get Started</PillButton>
            </Link>
            <Link href="/dashboard">
               <PillButton className="bg-transparent !text-ink-black border border-ink-black hover:bg-ash/20 px-8 py-4 text-[16px]">
                 View Demo Workspace
               </PillButton>
            </Link>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex-1 hidden md:flex items-center justify-center relative w-full aspect-square max-w-[550px]"
        >
          {/* Subtle gradient overlay to blend with bone-white background */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#f5f0e8]/80 to-transparent z-10 mix-blend-overlay pointer-events-none rounded-[40px]" />
          <img 
            src="/hero_graphic.png" 
            alt="MemscrollAI abstract memory graph" 
            className="w-full h-full object-cover rounded-[40px] shadow-2xl border border-ash/20" 
          />
        </motion.div>
      </main>

      {/* Horizontal Scroll Features Section */}
      <HorizontalScrollCarousel />

      {/* Giant Testimonial Cards */}
      <TestimonialCards />

      {/* Tech Stack Marquee */}
      <TechMarquee />

      {/* Giant Footer */}
      <ComplexFooter />
    </div>
  );
}
