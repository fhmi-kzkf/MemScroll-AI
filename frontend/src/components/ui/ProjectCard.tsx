"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  accentVariant?: "none" | "pink" | "mint" | "blue" | "navy";
}

export default function ProjectCard({ title, description, imageSrc, accentVariant = "none" }: ProjectCardProps) {
  
  // If there's no image, we generate a cool abstract cover based on the title length
  const titleHash = title.length;
  const abstractColors = ['bg-mint-wash text-ink-black', 'bg-candy-pink text-ink-black', 'bg-forest-teal text-bone-white', 'bg-ink-black text-bone-white', 'bg-ash/20 text-ink-black'];
  const abstractColor = abstractColors[titleHash % abstractColors.length];

  return (
    <div className="flex flex-col group cursor-pointer h-full">
      {imageSrc ? (
        <div className="w-full aspect-[4/3] relative mb-6 overflow-hidden border border-ash/20">
          <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="w-full h-full relative">
            <Image src={imageSrc} alt={title} fill className="object-cover rounded-none" />
          </motion.div>
        </div>
      ) : (
        <div className={`w-full aspect-[4/3] relative mb-6 overflow-hidden flex flex-col justify-between p-6 md:p-8 ${abstractColor} transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.02] shadow-subtle border border-ash/20`}>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
          <div className="z-10">
            <div className="w-8 h-1 bg-current opacity-30 mb-4"></div>
            <h3 className="text-[24px] md:text-[32px] leading-[1.1] font-light tracking-[-0.02em] opacity-90 line-clamp-3">{title}</h3>
          </div>
          <div className="z-10 self-end text-[64px] font-light opacity-20 tracking-[-0.04em] leading-none">
            {title.substring(0,2).toUpperCase()}
          </div>
        </div>
      )}
      <div>
        <h3 className="text-[20px] font-medium text-ink-black group-hover:text-forest-teal transition-colors line-clamp-2 leading-[1.2]">
          {title}
        </h3>
        <p className="text-[14px] text-graphite font-light mt-2 line-clamp-1">
          {description}
        </p>
      </div>
    </div>
  );
}
