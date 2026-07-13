"use client";

import HeaderLockup from "@/components/ui/HeaderLockup";
import DisplayHeadline from "@/components/ui/DisplayHeadline";
import TagPill from "@/components/ui/TagPill";
import Link from "next/link";
import PillButton from "@/components/ui/PillButton";
import PaperIngestionModal from "@/components/ui/PaperIngestionModal";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { Zap, BookOpen, Loader2 } from "lucide-react";
import { API_BASE_URL } from "@/lib/api";

export default function ProjectWorkspace() {
  const params = useParams();
  const id = params.id as string;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [papers, setPapers] = useState<any[]>([]);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const [processStage, setProcessStage] = useState("");

  const fetchPapers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects/${id}/papers`);
      if (res.ok) {
        const data = await res.json();
        if (data.papers) {
          setPapers(data.papers);
        }
      }
    } catch (err) {
      console.error("Error fetching papers:", err);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPapers();
    }
  }, [id]);

  const handleAddPaper = (title: string, method: string) => {
    setTimeout(fetchPapers, 500);
  };

  const handleProcess = async (paperId: number) => {
    setProcessingId(paperId);
    setProcessStage("Starting pipeline...");

    // Optimistically update the UI
    setPapers(prev => prev.map(p => p.id === paperId ? {...p, status: "EXTRACTING"} : p));
    setProcessStage("Extracting text from PDF...");

    try {
      const res = await fetch(`${API_BASE_URL}/api/papers/${paperId}/process`, {
        method: "POST",
      });
      const data = await res.json();
      
      if (data.status === "success") {
        setProcessStage("Complete!");
        await fetchPapers(); // Refresh to get final status
      } else {
        setProcessStage(`Error: ${data.message || "Unknown error"}`);
        await fetchPapers();
      }
    } catch (err) {
      setProcessStage("Network error — is the backend running?");
      console.error(err);
    } finally {
      setTimeout(() => {
        setProcessingId(null);
        setProcessStage("");
      }, 2000);
    }
  };

  const getStatusColor = (status: string) => {
    const s = status?.toUpperCase();
    if (s === "COMPLETED") return "bg-green-600 text-white";
    if (s === "ERROR") return "bg-red-500 text-white";
    if (s === "PENDING") return "bg-gold text-ink-black";
    return "bg-blue-500 text-white animate-pulse"; // Processing states
  };

  return (
    <div className="min-h-screen bg-bone-white">
      <HeaderLockup />
      <main className="px-4 md:px-8 pt-16 pb-32 max-w-[1440px] mx-auto overflow-x-hidden">
        <Link href="/dashboard" className="text-[14px] text-graphite hover:text-ink-black mb-8 inline-block transition-colors">
          ← Back to Dashboard
        </Link>
        <p className="text-[12px] uppercase text-graphite mb-4 tracking-normal">THESIS WORKSPACE</p>
        <DisplayHeadline className="max-w-[1000px] mb-12">
          RESEARCH PROJECT
        </DisplayHeadline>

        {/* Tabs / Navigation */}
        <div className="flex gap-8 mb-16 border-b border-ash/30 overflow-x-auto">
          <Link href={`/projects/${id}`} className="text-[14px] uppercase text-ink-black tracking-normal border-b-2 border-ink-black pb-4 font-medium">Library</Link>
          <Link href={`/projects/${id}/concepts`} className="text-[14px] uppercase text-graphite hover:text-ink-black tracking-normal pb-4 transition-colors">Concept Graph</Link>
          <Link href={`/projects/${id}/notes`} className="text-[14px] uppercase text-graphite hover:text-ink-black tracking-normal pb-4 transition-colors">Synthesis Notes</Link>
        </div>

        <div className="flex justify-between items-end mb-8 border-b border-ash/30 pb-4">
          <h2 className="text-[34px] font-light tracking-[-0.02em]">Paper Library</h2>
          <PillButton onClick={() => setIsModalOpen(true)}>+ Add Paper</PillButton>
        </div>

        {/* Processing Status Banner */}
        {processingId && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-ink-black text-bone-white flex items-center gap-3"
          >
            <Loader2 size={18} className="animate-spin" />
            <span className="text-[14px]">{processStage}</span>
          </motion.div>
        )}

        {/* Paper List */}
        {papers.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center border-t border-ash"
          >
             <h3 className="text-[20px] font-light mb-2">Workspace Empty</h3>
             <p className="text-[14px] text-graphite mb-6">Start your research by adding some academic literature.</p>
             <PillButton onClick={() => setIsModalOpen(true)}>Upload or Search Literature</PillButton>
          </motion.div>
        ) : (
          <div className="flex flex-col gap-0 border-t border-ash/30">
            {papers.map((paper, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                key={paper.id} 
                className="py-6 border-b border-ash/30 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-ash/10 transition-colors px-4 -mx-4 group"
              >
                <div className="max-w-[550px]">
                  <h3 className="text-[18px] font-light text-ink-black mb-1 group-hover:text-forest-teal transition-colors">{paper.title}</h3>
                  <p className="text-[13px] text-graphite">{paper.authors}</p>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className={`text-[11px] uppercase font-bold px-3 py-1.5 rounded-full ${getStatusColor(paper.status)}`}>
                    {paper.status}
                  </span>
                  
                  {paper.status?.toUpperCase() === "PENDING" && (
                    <button
                      onClick={() => handleProcess(paper.id)}
                      disabled={processingId !== null}
                      className="flex items-center gap-1.5 bg-ink-black text-bone-white text-[12px] uppercase px-4 py-2 rounded-full hover:opacity-80 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Zap size={13} />
                      Process
                    </button>
                  )}

                  {["ERROR", "EXTRACTING", "ANALYZING", "EMBEDDING", "GENERATING"].includes(paper.status?.toUpperCase()) && (
                    <button
                      onClick={() => handleProcess(paper.id)}
                      disabled={processingId !== null}
                      className="flex items-center gap-1.5 bg-red-50 text-red-600 border border-red-200 text-[12px] uppercase px-4 py-2 rounded-full hover:bg-red-100 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Zap size={13} />
                      Retry
                    </button>
                  )}

                  {paper.status?.toUpperCase() === "COMPLETED" && (
                    <Link href={`/papers/${paper.id}/read`}>
                      <button className="flex items-center gap-1.5 bg-forest-teal text-bone-white text-[12px] uppercase px-4 py-2 rounded-full hover:opacity-80 transition-all">
                        <BookOpen size={13} />
                        Read
                      </button>
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <PaperIngestionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddPaper}
      />
    </div>
  );
}
