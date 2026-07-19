"use client";

import { motion } from "framer-motion";
import React from "react";

export default function DisplayHeadline({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.h1 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className={`text-[40px] md:text-[64px] lg:text-[84px] font-light leading-none tracking-[-0.04em] text-ink-black uppercase ${className}`}
    >
      {children}
    </motion.h1>
  );
}
