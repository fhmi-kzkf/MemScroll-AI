"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Search, FileText, Trash2, Zap } from "lucide-react";
import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import { API_BASE_URL } from "@/lib/api";

export default function PaperIngestionModal({
  isOpen,
  onClose,
  onAdd
}: {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, method: string) => void;
}) {
  const [method, setMethod] = useState<"upload" | "search">("search");
  const [query, setQuery] = useState("");
  const params = useParams();
  const id = params?.id as string;
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, "pending" | "done" | "error">>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addFiles = (newFiles: FileList | File[]) => {
    const arr = Array.from(newFiles).filter(f => f.type === "application/pdf");
    setFiles(prev => {
      const existingNames = new Set(prev.map(f => f.name));
      return [...prev, ...arr.filter(f => !existingNames.has(f.name))];
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
    }
    // Reset input so same file can be re-selected
    e.target.value = "";
  };

  const removeFile = (name: string) => {
    setFiles(prev => prev.filter(f => f.name !== name));
    setUploadProgress(prev => { const next = { ...prev }; delete next[name]; return next; });
  };

  const handleSearchAdd = () => {
    if (query.trim()) {
      onAdd(query, "search");
      setQuery("");
      onClose();
    }
  };

  const handleExecute = async () => {
    if (files.length === 0) return;
    setIsUploading(true);

    const initialProgress: Record<string, "pending" | "done" | "error"> = {};
    files.forEach(f => initialProgress[f.name] = "pending");
    setUploadProgress(initialProgress);

    // Upload files sequentially to prevent SQLite database locks
    for (const file of files) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("project_id", id || "default_project");

        const res = await fetch(`${API_BASE_URL}/api/papers/ingest`, {
          method: "POST",
          body: formData,
        });

        if (res.ok) {
          setUploadProgress(prev => ({ ...prev, [file.name]: "done" }));
          onAdd(file.name, "upload");
        } else {
          setUploadProgress(prev => ({ ...prev, [file.name]: "error" }));
        }
      } catch {
        setUploadProgress(prev => ({ ...prev, [file.name]: "error" }));
      }
    }
    setIsUploading(false);
    setFiles([]);
    setUploadProgress({});
    onClose();
  };

  const handleClose = () => {
    if (!isUploading) {
      setFiles([]);
      setQuery("");
      setUploadProgress({});
      onClose();
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
            onClick={handleClose}
            className="absolute inset-0 bg-ink-black/20 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="relative w-full max-w-[620px] bg-bone-white shadow-subtle border border-ash/30 rounded-none overflow-hidden"
          >
            {/* Header */}
            <div className="px-8 pt-8 pb-0">
              <button onClick={handleClose} disabled={isUploading} className="absolute top-4 right-4 p-2 text-graphite hover:text-ink-black transition-colors disabled:opacity-40">
                <X size={20} strokeWidth={1.5} />
              </button>
              <h3 className="text-[34px] font-light mb-6 tracking-[-0.02em]">Add Literature</h3>

              {/* Tabs */}
              <div className="flex gap-8 border-b border-ash">
                <button
                  onClick={() => setMethod("search")}
                  className={`pb-2 text-[14px] uppercase tracking-normal transition-colors border-b-2 ${method === "search" ? "border-ink-black text-ink-black" : "border-transparent text-graphite hover:text-ink-black"}`}
                >
                  API Search
                </button>
                <button
                  onClick={() => setMethod("upload")}
                  className={`pb-2 text-[14px] uppercase tracking-normal transition-colors border-b-2 ${method === "upload" ? "border-ink-black text-ink-black" : "border-transparent text-graphite hover:text-ink-black"}`}
                >
                  PDF Upload
                  {files.length > 0 && (
                    <span className="ml-2 bg-ink-black text-bone-white text-[10px] font-bold rounded-full px-1.5 py-0.5">{files.length}</span>
                  )}
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="px-8 pt-6 pb-8">
              {method === "search" ? (
                <div>
                  <p className="text-[14px] text-graphite mb-4">Search Semantic Scholar by Title, DOI, or Keyword.</p>
                  <div className="relative">
                    <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-ash" size={20} strokeWidth={1.5} />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSearchAdd()}
                      placeholder="e.g. Attention Is All You Need"
                      autoFocus
                      className="w-full bg-transparent border-b border-ash py-4 pl-10 text-[20px] font-light text-ink-black placeholder:text-ash focus:outline-none focus:border-ink-black transition-colors mb-8 rounded-none"
                    />
                  </div>
                  <div className="flex justify-end gap-4 items-center">
                    <button onClick={handleClose} className="text-[14px] text-graphite hover:text-ink-black px-4">Cancel</button>
                    <button onClick={handleSearchAdd} className="bg-ink-black text-bone-white text-[13px] uppercase px-6 py-3 hover:opacity-80 transition-opacity rounded-full">
                      Search & Add
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  {/* Drop Zone */}
                  <div
                    className={`relative border border-dashed p-8 flex flex-col items-center justify-center mb-4 transition-all cursor-pointer ${isDragging ? "border-ink-black bg-ash/5 text-ink-black scale-[1.01]" : "border-ash text-graphite hover:border-ink-black hover:text-ink-black"
                      }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="application/pdf"
                      multiple
                      className="hidden"
                    />
                    <Upload size={28} strokeWidth={1} className="mb-3" />
                    <p className="text-[15px] font-light">Drag & drop PDFs here</p>
                    <p className="text-[11px] uppercase mt-1 opacity-60">or click to browse — multiple files supported</p>
                  </div>

                  {/* File Queue */}
                  {files.length > 0 && (
                    <div className="mb-6 max-h-[200px] overflow-y-auto space-y-2 pr-1">
                      {files.map((f) => {
                        const status = uploadProgress[f.name];
                        return (
                          <motion.div
                            key={f.name}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex items-center gap-3 p-3 border border-ash/40 bg-ash/5"
                          >
                            <FileText size={16} strokeWidth={1.5} className="text-graphite flex-shrink-0" />
                            <span className="text-[13px] text-ink-black truncate flex-1">{f.name}</span>
                            {status === "pending" && (
                              <span className="text-[11px] text-gold uppercase font-medium animate-pulse">Uploading...</span>
                            )}
                            {status === "done" && (
                              <span className="text-[11px] text-green-600 uppercase font-medium">Done</span>
                            )}
                            {status === "error" && (
                              <span className="text-[11px] text-red-500 uppercase font-medium">Error</span>
                            )}
                            {!status && (
                              <button onClick={() => removeFile(f.name)} className="text-graphite hover:text-ink-black transition-colors flex-shrink-0">
                                <Trash2 size={14} />
                              </button>
                            )}
                          </motion.div>
                        );
                      })}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-between gap-4 items-center">
                    <button onClick={handleClose} disabled={isUploading} className="text-[14px] text-graphite hover:text-ink-black px-4 disabled:opacity-40">
                      Cancel
                    </button>
                    <button
                      onClick={handleExecute}
                      disabled={files.length === 0 || isUploading}
                      className="flex items-center gap-2 bg-ink-black text-bone-white text-[13px] uppercase px-6 py-3 hover:opacity-80 transition-all rounded-full disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      <Zap size={14} />
                      {isUploading ? `Uploading ${files.length} file${files.length > 1 ? "s" : ""}...` : `Upload & Execute (${files.length})`}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
