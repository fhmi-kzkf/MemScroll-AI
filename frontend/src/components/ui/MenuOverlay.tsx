"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

export default function MenuOverlay({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const menuVariants = {
    closed: { opacity: 0, y: "-100%" },
    open: { opacity: 1, y: "0%", transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }
  };

  const linkVariants = {
    closed: { opacity: 0, y: 50 },
    open: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: 0.2 + i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }
    })
  };

  const links = [
    { name: "HOME", href: "/" },
    { name: "DASHBOARD", href: "/dashboard" },
    { name: "SETTINGS", href: "/login" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="closed"
          animate="open"
          exit="closed"
          className="fixed inset-0 z-50 bg-ink-black text-bone-white flex flex-col justify-center px-4 md:px-16"
        >
          {/* Header Area inside Menu */}
          <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center z-50">
            <div className="flex items-center gap-2">
               <div className="w-8 h-8 rounded-full bg-bone-white flex-shrink-0 text-ink-black flex items-center justify-center font-bold">M</div>
               <div className="text-[12px] uppercase leading-[1.2] hidden md:block">MemscrollAI<br/>// Research Platform</div>
            </div>
            <button onClick={onClose} className="p-4 bg-bone-white text-ink-black rounded-full hover:scale-105 transition-transform flex items-center gap-2">
              <X size={16} /> <span className="text-[12px] uppercase font-bold pr-2">Close</span>
            </button>
          </div>

          <div className="flex flex-col items-start gap-4">
            {links.map((link, i) => (
              <motion.div custom={i} variants={linkVariants} key={link.name} className="overflow-hidden">
                <Link 
                  href={link.href} 
                  onClick={onClose}
                  className="text-[15vw] md:text-[10vw] lg:text-[120px] leading-[0.85] font-light tracking-[-0.04em] hover:text-ash transition-colors uppercase block"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Footer Area inside Menu */}
          <div className="absolute bottom-8 left-4 md:left-16 flex flex-col md:flex-row gap-12 text-[12px] uppercase tracking-normal text-ash">
             <div>
               <p className="text-bone-white mb-2">Get in touch</p>
               <p className="hover:text-bone-white cursor-pointer transition-colors">hello@memscroll.ai</p>
             </div>
             <div>
               <p className="text-bone-white mb-2">Socials</p>
               <div className="flex gap-4">
                 <p className="hover:text-bone-white cursor-pointer transition-colors">Instagram</p>
                 <p className="hover:text-bone-white cursor-pointer transition-colors">LinkedIn</p>
               </div>
             </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
