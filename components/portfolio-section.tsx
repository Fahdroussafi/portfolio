"use client";

import { myProjects } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export function PortfolioSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentProject = myProjects[currentIndex];

  const handleNavigation = (direction: "prev" | "next") => {
    setCurrentIndex((prevIndex) => {
      if (direction === "prev") {
        return prevIndex === 0 ? myProjects.length - 1 : prevIndex - 1;
      } else {
        return prevIndex === myProjects.length - 1 ? 0 : prevIndex + 1;
      }
    });
  };

  return (
    <section className="container mx-auto px-4 py-16 md:py-24" id="projects">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-foreground">
            Take a look at my <br />
            <motion.span
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="bg-primary text-primary-foreground px-3 py-1 inline-block shadow-[4px_4px_0px_0px_var(--border)] cursor-default">
              Projects
            </motion.span>
          </h2>
        </motion.div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="group bg-card border-[3px] border-border rounded-[32px] overflow-hidden hover:shadow-[8px_8px_0px_0px_var(--border)] transition-all p-6 md:p-12 min-h-[450px] flex flex-col justify-center">
              <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                <div className="flex-1 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-8">
                    <div className="size-20 relative bg-muted rounded-2xl flex items-center justify-center border-2 border-border shadow-[4px_4px_0px_0px_var(--border)]">
                      <Image
                        src={currentProject.logo || "/placeholder.svg"}
                        alt={`${currentProject.title} logo`}
                        width={56}
                        height={56}
                        className="object-contain p-2.5"
                      />
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => handleNavigation("prev")}
                        className="size-12 rounded-xl bg-muted border-2 border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all shadow-[4px_4px_0px_0px_var(--border)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                        aria-label="Previous project">
                        <ArrowLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => handleNavigation("next")}
                        className="size-12 rounded-xl bg-muted border-2 border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all shadow-[4px_4px_0px_0px_var(--border)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px]"
                        aria-label="Next project">
                        <ArrowRight className="w-6 h-6" />
                      </button>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-[32px] font-bold mb-4 leading-tight text-foreground">
                    {currentProject.title}
                  </h3>

                  <p className="text-base md:text-[18px] text-muted-foreground mb-4 leading-relaxed font-medium">
                    {currentProject.desc}
                  </p>

                  <p className="text-sm md:text-base text-muted-foreground/70 mb-8 italic">
                    {currentProject.subdesc}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mb-8">
                    {currentProject.tags.map((tag) => (
                      <div
                        key={tag.id}
                        className="flex items-center gap-2 bg-muted px-3 py-1.5 rounded-lg border border-border"
                        title={tag.name}>
                        <div className="size-5 relative">
                          <Image
                            src={tag.path}
                            alt={tag.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-xs font-bold">{tag.name}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-6">
                    {currentProject.live ? (
                      <a
                        href={currentProject.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 font-semibold text-accent hover:underline text-sm md:text-base">
                        Live Preview
                        <div className="size-2 rounded-full bg-accent animate-pulse" />
                      </a>
                    ) : (
                      <div className="flex items-center gap-2 font-semibold text-muted-foreground text-sm md:text-base cursor-default uppercase tracking-wider">
                        Coming Soon
                        <div className="size-2 rounded-full bg-muted-foreground opacity-50" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-12">
            {myProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-3 rounded-full transition-all border-2 border-border shadow-[2px_2px_0px_0px_var(--border)] ${
                  index === currentIndex ? "w-12 bg-primary" : "w-3 bg-muted"
                }`}
                aria-label={`Go to project ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
