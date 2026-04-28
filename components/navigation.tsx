"use client";

import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experiences", href: "#experiences" },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const targetId = href.replace("#", "");
    const elem = document.getElementById(targetId);
    elem?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 pt-8 pb-4 relative z-50">
      <nav className="flex items-center justify-between bg-white dark:bg-black border-4 border-black dark:border-white rounded-xl px-5 py-3 max-w-2xl mx-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] transition-colors relative z-50">
        <div className="w-10 h-10 bg-black dark:bg-white rounded-full flex items-center justify-center shrink-0 transition-colors">
          <div className="w-6 h-6 bg-white dark:bg-black rounded-full transition-colors"></div>
        </div>

        <div className="hidden md:flex items-center gap-6 flex-1 justify-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleLinkClick(e, link.href)}
              className="text-[18px] font-bold leading-[20px] hover:opacity-70 transition-opacity">
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            size="icon"
            className="border-4 border-black dark:border-white rounded-sm h-12 w-12 shrink-0 bg-transparent hover:bg-black/10 dark:hover:bg-white/10 transition-colors relative"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            <Sun className="h-6 w-6 absolute transition-all scale-0 -rotate-90 dark:scale-100 dark:rotate-0 text-white" />
            <Moon className="h-6 w-6 absolute transition-all scale-100 rotate-0 dark:scale-0 dark:rotate-90 text-black" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="md:hidden border-4 border-black dark:border-white rounded-sm h-12 w-12 shrink-0 bg-transparent hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6 text-black dark:text-white" />
            ) : (
              <Menu className="h-6 w-6 text-black dark:text-white" />
            )}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-4 right-4 mt-4 bg-white dark:bg-black border-4 border-black dark:border-white rounded-xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] z-40">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[24px] font-black leading-tight hover:translate-x-2 transition-transform"
                  onClick={(e) => handleLinkClick(e, link.href)}>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
