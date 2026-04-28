"use client";

import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FolderOpen, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroSection() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setMounted(true);
    const isTouchDevice = !window.matchMedia("(pointer: fine)").matches;
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      mouseX.set(clientX / innerWidth - 0.5);
      mouseY.set(clientY / innerHeight - 0.5);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const tiltX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const tiltY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  const moveX = useTransform(smoothX, [-0.5, 0.5], [30, -30]);
  const moveY = useTransform(smoothY, [-0.5, 0.5], [30, -30]);

  const bgX = useTransform(smoothX, [-0.5, 0.5], [50, -50]);
  const bgY = useTransform(smoothY, [-0.5, 0.5], [50, -50]);

  const stickers = [
    { text: "React", color: "#61DAFB", x: -100, y: -150, delay: 0 },
    { text: "Typescript", color: "#007acc", x: -250, y: -150, delay: 0 },
    {
      text: "Next.js",
      color: mounted && resolvedTheme === "dark" ? "#ffffff" : "#000000",
      x: 10,
      y: -120,
      delay: 0.1,
    },
    { text: "NestJS", color: "#E0234E", x: 60, y: 150, delay: 0.2 },
    { text: "Tailwind", color: "#38B2AC", x: -400, y: -100, delay: 0.3 },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-background transition-colors duration-300">
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 opacity-10 dark:opacity-[0.05] pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 border-8 border-border rounded-full" />
        <div className="absolute bottom-20 right-20 w-80 h-80 border-8 border-border rotate-45" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 border-8 border-border rounded-3xl" />
      </motion.div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div style={{ x: moveX, y: moveY }} className="space-y-6">
            <h1 className="text-4xl leading-[50px] md:text-[72px] font-bold md:leading-[85px] text-foreground text-balance">
              I'm{" "}
              <motion.span
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="bg-secondary text-secondary-foreground px-4 py-1 inline-block cursor-default shadow-[4px_4px_0px_0px_var(--border)]">
                Fahd Roussafi
              </motion.span>{" "}
              <span className="inline-block">a Full-Stack Developer</span> from{" "}
              <motion.span
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="bg-accent text-accent-foreground px-4 py-1 inline-block cursor-default shadow-[4px_4px_0px_0px_var(--border)]">
                Morocco
              </motion.span>
            </h1>

            <p className="text-muted-foreground text-[16px] md:text-[18px] font-medium leading-[28px] md:leading-[30px] max-w-xl">
              I build scalable, high-performance web applications with a focus
              on modern technologies and exceptional user experiences.
              Specializing in React, Next.js, and NestJS.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-7 pt-4">
              <Button
                asChild
                className="bg-foreground text-background hover:bg-foreground/90 rounded-lg py-5 px-8 md:py-[22px] md:px-[62px] text-base md:text-lg font-semibold h-auto w-full sm:w-auto sm:min-w-[240px] shadow-[6px_6px_0px_0px_var(--secondary)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all">
                <a href="mailto:roussafifahd@gmail.com">
                  <Mail className="size-5" />
                  Get in touch
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="bg-background border-[3px] border-border hover:bg-accent rounded-lg py-5 px-8 md:py-[22px] md:px-[62px] text-base md:text-lg font-semibold h-auto w-full sm:w-auto sm:min-w-[240px] shadow-[6px_6px_0px_0px_var(--accent)] hover:shadow-none hover:translate-x-[6px] hover:translate-y-[6px] transition-all">
                <a href="#projects">
                  <FolderOpen className="size-5" />
                  View portfolio
                </a>
              </Button>
            </div>
          </motion.div>

          <div className="flex justify-center md:justify-end relative">
            {stickers.map((sticker, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + sticker.delay, type: "spring" }}
                style={{
                  x: useTransform(
                    smoothX,
                    [-0.5, 0.5],
                    [sticker.x - 20, sticker.x + 20],
                  ),
                  y: useTransform(
                    smoothY,
                    [-0.5, 0.5],
                    [sticker.y - 20, sticker.y + 20],
                  ),
                }}
                className="absolute z-20 hidden lg:block">
                <div
                  className="px-4 py-2 border-2 border-border bg-background font-bold text-sm shadow-[4px_4px_0px_0px_var(--border)] whitespace-nowrap rotate-[-5deg]"
                  style={{ color: sticker.color }}>
                  {sticker.text}
                </div>
              </motion.div>
            ))}

            <motion.div
              style={{
                rotateX: tiltX,
                rotateY: tiltY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full max-w-md aspect-square bg-white border-4 border-border rounded-3xl overflow-hidden shadow-[12px_12px_0px_0px_var(--border)] transition-all duration-300">
              <Image
                src="/images/design-mode/grid1.png"
                alt="Pixalated illustration"
                fill
                className="p-2.5"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
