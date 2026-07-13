"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import PillButton from "./PillButton";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";

export default function NewProjectModal({ 
  isOpen, 
  onClose,
  onCreate 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  onCreate: (name: string) => void;
}) {
  const [projectName, setProjectName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    if (!projectName.trim() || isCreating) return;
    setIsCreating(true);
    try {
      const formData = new FormData();
      formData.append("name", projectName.trim());
      const res = await fetch(`${API_BASE_URL}/api/projects`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        const data = await res.json();
        onCreate(projectName);
        setProjectName("");
        onClose();
        router.push(`/projects/${data.id}`);
      }
    } catch {
      // Fallback: still navigate locally if backend is down
      onCreate(projectName);
      setProjectName("");
      onClose();
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink-black/20 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[500px] bg-bone-white p-8 shadow-subtle border border-ash/30 rounded-none"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 text-graphite hover:text-ink-black transition-colors">
              <X size={20} strokeWidth={1.5} />
            </button>
            <h3 className="text-[34px] font-light mb-6 tracking-[-0.02em]">Create Project</h3>
            <p className="text-[14px] text-graphite mb-8">Enter a name for your new research workspace.</p>
            
            <input 
              type="text" 
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. Thesis: Machine Learning" 
              autoFocus
              className="w-full bg-transparent border-b border-ash py-4 text-[20px] font-light text-ink-black placeholder:text-ash focus:outline-none focus:border-ink-black transition-colors mb-8 rounded-none"
            />
            
            <div className="flex justify-end gap-4 items-center">
              <button onClick={onClose} className="text-[14px] text-graphite hover:text-ink-black px-4">Cancel</button>
              <PillButton onClick={handleCreate}>{isCreating ? "Creating..." : "Create Workspace"}</PillButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
