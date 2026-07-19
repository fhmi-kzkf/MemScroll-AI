"use client";

import HeaderLockup from "@/components/ui/HeaderLockup";
import DisplayHeadline from "@/components/ui/DisplayHeadline";
import ProjectCard from "@/components/ui/ProjectCard";
import NewProjectModal from "@/components/ui/NewProjectModal";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { API_BASE_URL } from "@/lib/api";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);

  const fetchProjects = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/projects`);
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = (_name: string) => {
    // Refetch from backend; modal handles actual API call + navigation
    fetchProjects();
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
  };

  return (
    <div className="min-h-screen bg-bone-white">
      <HeaderLockup />
      <main className="px-4 md:px-8 pt-16 pb-32 max-w-[1440px] mx-auto overflow-x-hidden">
        <p className="text-[12px] uppercase text-graphite mb-4 tracking-normal">YOUR WORKSPACES</p>
        <DisplayHeadline className="mb-16">PROJECTS</DisplayHeadline>
        
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {projects.map((p) => (
            <motion.div key={p.id} variants={item} className="h-full">
              <Link href={`/projects/${p.id}`}>
                <ProjectCard 
                  title={p.title} 
                  description={p.desc}
                  accentVariant={p.accent}
                />
              </Link>
            </motion.div>
          ))}
          
          <motion.div variants={item} onClick={() => setIsModalOpen(true)} className="h-full">
            <div className="flex flex-col rounded-none bg-transparent border border-dashed border-ash p-6 items-center justify-center aspect-square text-graphite hover:text-ink-black hover:border-ink-black hover:bg-ash/5 transition-all cursor-pointer h-full">
              <span className="text-[34px] font-light leading-none mb-2">+</span>
              <span className="text-[14px] uppercase tracking-normal">New Project</span>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <NewProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={handleCreateProject}
      />
    </div>
  );
}
