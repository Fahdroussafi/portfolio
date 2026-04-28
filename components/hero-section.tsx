"use client";

import { Button } from "@/components/ui/button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FolderOpen, Mail } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
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
    { text: "Next.js", color: "#000000", x: 10, y: -120, delay: 0.1 },
    { text: "NestJS", color: "#E0234E", x: 60, y: 150, delay: 0.2 },
    { text: "Tailwind", color: "#38B2AC", x: -400, y: -100, delay: 0.3 },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-white dark:bg-[#0B0B0B] transition-colors duration-300">
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 opacity-10 dark:opacity-[0.05] pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 border-8 border-black rounded-full dark:border-white" />
        <div className="absolute bottom-20 right-20 w-80 h-80 border-8 border-black rotate-45 dark:border-white" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 border-8 border-black rounded-3xl dark:border-white" />
      </motion.div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div style={{ x: moveX, y: moveY }} className="space-y-6">
            <h1 className="text-4xl leading-[50px] md:text-[72px] font-bold md:leading-[85px] dark:text-white">
              I'm{" "}
              <motion.span
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="bg-[#FF6B7A] text-gray-50 px-4 py-1 inline-block cursor-default shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                Fahd Roussafi
              </motion.span>{" "}
              a Full-Stack Developer from{" "}
              <motion.span
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="bg-[#2F81F7] text-gray-50 px-4 py-1 inline-block cursor-default shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                Morocco
              </motion.span>
            </h1>

            <p className="text-[#393939] dark:text-gray-400 text-[16px] md:text-[18px] font-medium leading-[28px] md:leading-[30px] max-w-xl">
              I build scalable, high-performance web applications with a focus
              on modern technologies and exceptional user experiences.
              Specializing in React, Next.js, and NestJS.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-7 pt-4">
              <Button className="bg-[#0B0B0B] dark:bg-white text-gray-50 dark:text-black dark:hover:bg-gray-50/90 hover:bg-black/90 rounded-lg py-5 px-8 md:py-[22px] md:px-[62px] text-base md:text-lg font-semibold h-auto w-full sm:w-auto sm:min-w-[240px] shadow-[6px_6px_0px_0px_rgba(255,74,96,1)] hover:shadow-none transition-all">
                <Mail className="size-5" />
                Get in touch
              </Button>
              <Button
                variant="outline"
                className="bg-white dark:bg-transparent border-[3px] border-black dark:border-white hover:bg-gray-50 dark:hover:bg-white/10 rounded-lg py-5 px-8 md:py-[22px] md:px-[62px] text-base md:text-lg font-semibold h-auto w-full sm:w-auto sm:min-w-[240px] dark:text-white shadow-[6px_6px_0px_0px_rgba(47,129,247,1)] hover:shadow-none transition-all">
                <FolderOpen className="size-5" />
                View portfolio
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
                  className="px-4 py-2 border-2 border-black bg-white font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)] whitespace-nowrap rotate-[-5deg]"
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
              className="relative w-full max-w-md aspect-square bg-[#FFF] border-4 border-black rounded-3xl overflow-hidden dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-shadow duration-300">
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
