"use client";
import { useState, useEffect } from "react";

import HeaderLockup from "@/components/ui/HeaderLockup";
import DisplayHeadline from "@/components/ui/DisplayHeadline";
import Link from "next/link";
import TagPill from "@/components/ui/TagPill";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { API_BASE_URL } from "@/lib/api";

export default function ConceptManager() {
  const params = useParams();
  const id = params.id as string;
  const isNewProject = id && id.length > 5;

  const [concepts, setConcepts] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      fetch(`${API_BASE_URL}/api/projects/${id}/concepts`)
        .then(res => res.json())
        .then(data => {
          if (data.concepts) setConcepts(data.concepts);
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
          CONCEPT GRAPH
        </DisplayHeadline>

        {/* Tabs / Navigation */}
        <div className="flex gap-4 mb-16 border-b border-ash pb-4 overflow-x-auto">
          <Link href={`/projects/${id}`} className="text-[14px] uppercase text-graphite hover:text-ink-black tracking-normal pb-1 transition-colors">Library</Link>
          <Link href={`/projects/${id}/concepts`} className="text-[14px] uppercase text-ink-black tracking-normal border-b border-ink-black pb-1">Concept Graph</Link>
          <Link href={`/projects/${id}/notes`} className="text-[14px] uppercase text-graphite hover:text-ink-black tracking-normal pb-1 transition-colors">Synthesis Notes</Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-[20px] font-light mb-8">Active Concepts</h3>
            
            {concepts.length === 0 ? (
               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-12 border-t border-ash text-graphite text-[14px]">
                 No concepts extracted yet. Add some papers to build your graph.
               </motion.div>
            ) : (
              <div className="flex flex-col gap-0 border-t border-ash">
                {concepts.map((concept, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={i} 
                    className="py-4 border-b border-ash flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[16px] font-light">{concept.name}</span>
                      <TagPill isAccent={concept.status === 'pinned'}>{concept.status}</TagPill>
                    </div>
                    <div className="text-right">
                      <p className="text-[12px] text-graphite">Decay: {concept.decay}</p>
                      <p className="text-[12px] text-graphite">Papers: {concept.papers}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
          
          <div className="bg-navy-ink text-bone-white p-8 rounded-none">
            <h3 className="text-[20px] font-light mb-4">Memory Audit</h3>
            <p className="text-[14px] text-ash mb-8 font-light">
              The AI automatically archives low-frequency concepts to optimize retrieval. Pinned concepts are always retained.
            </p>
            {concepts.length === 0 ? (
               <p className="text-[12px] text-ash italic">Memory log is empty.</p>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="border-b border-ash/20 pb-4">
                  <p className="text-[12px] text-signal-yellow uppercase mb-1 tracking-normal">Archived</p>
                  <p className="text-[16px] font-light">RNN (Recurrent Neural Network)</p>
                  <p className="text-[12px] text-ash mt-1 leading-[1.43]">Reason: Not mentioned in last 2 papers. Decay score dropped below threshold.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
