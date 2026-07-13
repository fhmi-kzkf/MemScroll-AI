"use client";
import { useState, useEffect } from "react";

import HeaderLockup from "@/components/ui/HeaderLockup";
import DisplayHeadline from "@/components/ui/DisplayHeadline";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { API_BASE_URL } from "@/lib/api";

export default function SynthesisNotes() {
  const params = useParams();
  const id = params.id as string;
  const isNewProject = id && id.length > 5;

  const [notes, setNotes] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      fetch(`${API_BASE_URL}/api/projects/${id}/notes`)
        .then(res => res.json())
        .then(data => {
          if (data.notes) setNotes(data.notes);
        })
        .catch(err => console.error(err));
    }
  }, [id]);

  return (
    <div className="min-h-screen bg-bone-white">
      <HeaderLockup />
      <main className="px-4 md:px-8 pt-16 pb-32 max-w-[1440px] mx-auto overflow-x-hidden">
        <Link href="/dashboard" className="text-[14px] text-graphite hover:text-ink-black mb-8 inline-block transition-colors">
          ← Back to Dashboard
        </Link>
        <p className="text-[12px] uppercase text-graphite mb-4 tracking-normal">THESIS WORKSPACE</p>
        <DisplayHeadline className="max-w-[1000px] mb-12">
          SYNTHESIS NOTES
        </DisplayHeadline>

        {/* Tabs / Navigation */}
        <div className="flex gap-4 mb-16 border-b border-ash pb-4 overflow-x-auto">
          <Link href={`/projects/${id}`} className="text-[14px] uppercase text-graphite hover:text-ink-black tracking-normal pb-1 transition-colors">Library</Link>
          <Link href={`/projects/${id}/concepts`} className="text-[14px] uppercase text-graphite hover:text-ink-black tracking-normal pb-1 transition-colors">Concept Graph</Link>
          <Link href={`/projects/${id}/notes`} className="text-[14px] uppercase text-ink-black tracking-normal border-b border-ink-black pb-1">Synthesis Notes</Link>
        </div>

        <div className="w-full max-w-[800px]">
          <h3 className="text-[20px] font-light mb-8">Critical Insights</h3>
          
          {notes.length === 0 ? (
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 border-t border-ash text-graphite text-[14px]">
               No synthesis notes written yet. Notes you write during conflict resolution will appear here.
             </motion.div>
          ) : (
            <div className="flex flex-col gap-12 border-t border-ash pt-8">
              {notes.map((note, i) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  key={i} 
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[12px] uppercase text-forest-teal tracking-normal">Concept: {note.concept}</span>
                    <span className="text-[12px] text-graphite">{note.date}</span>
                  </div>
                  <p className="text-[18px] font-light leading-[1.6] text-ink-black">
                    "{note.content}"
                  </p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
