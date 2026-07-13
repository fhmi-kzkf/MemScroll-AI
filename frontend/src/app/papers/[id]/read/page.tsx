"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ChevronDown } from "lucide-react";
import DOMPurify from "isomorphic-dompurify";
import { API_BASE_URL } from "@/lib/api";

interface Section {
  id: number;
  order: number;
  title: string;
  type: string;
  html_content: string;
}

export default function ScrollytellingReader() {
  const params = useParams();
  const paperId = params.id as string;
  const router = useRouter();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/papers/${paperId}/scrollytelling`);
        if (res.ok) {
          const data = await res.json();
          setSections(data.sections || []);
        } else {
          setError("Failed to load scrollytelling content.");
        }
      } catch {
        setError("Cannot connect to backend. Is the server running?");
      } finally {
        setLoading(false);
      }
    };
    fetchSections();
  }, [paperId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          className="w-10 h-10 border-2 border-[#e94560] border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || sections.length === 0) {
    return (
      <div className="min-h-screen bg-bone-white flex flex-col items-center justify-center gap-4 px-4">
        <h2 className="text-[28px] font-light text-ink-black">
          {error || "No scrollytelling content generated yet."}
        </h2>
        <button
          onClick={() => router.back()}
          className="mt-4 flex items-center gap-2 text-[14px] text-graphite hover:text-ink-black transition-colors"
        >
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Fixed Navigation Bar */}
      <motion.nav
        initial={{ y: -60 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5 }}
        className="fixed top-0 left-0 w-full z-50 bg-[#1a1a2e]/90 backdrop-blur-md border-b border-white/10 px-6 py-3 flex justify-between items-center"
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-[13px] text-[#f5f0e8]/70 hover:text-[#f5f0e8] transition-colors uppercase tracking-wider"
        >
          <ArrowLeft size={14} /> Back to Library
        </button>
        <span className="text-[11px] text-[#f5f0e8]/40 uppercase tracking-widest">
          MemscrollAI — Scrollytelling Reader
        </span>
      </motion.nav>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 3, duration: 1 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-1 text-[#f5f0e8]/50"
      >
        <span className="text-[11px] uppercase tracking-widest">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>

      {/* Scrollytelling Sections */}
      {sections.map((section, i) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Section Type Badge */}
          <div className="absolute top-6 right-6 z-10">
            <span className="text-[10px] uppercase tracking-widest text-white/30 bg-white/5 px-3 py-1 rounded-full border border-white/10">
              {section.type} — {i + 1}/{sections.length}
            </span>
          </div>
          
          {/* Render the AI-generated HTML securely */}
          <div 
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(section.html_content) }}
            className="scrollytelling-section"
          />
        </motion.div>
      ))}

      {/* End Card */}
      <div className="min-h-[50vh] bg-[#1a1a2e] flex flex-col items-center justify-center gap-6 px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-[14px] uppercase tracking-widest text-[#e94560] mb-4">End of Paper</p>
          <h2 className="text-[36px] md:text-[48px] font-light text-[#f5f0e8] tracking-[-0.02em] mb-6 max-w-[600px]">
            Ready for the next one?
          </h2>
          <button
            onClick={() => router.back()}
            className="bg-[#e94560] text-white text-[13px] uppercase px-8 py-3 rounded-full hover:opacity-80 transition-all tracking-wider"
          >
            Back to Library
          </button>
        </motion.div>
      </div>
    </div>
  );
}
