"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import Image from "next/image";

export function ExperienceSection() {
  const experiences = [
    {
      period: "2023 - Present",
      title: "Harmony Technology",
      description:
        "Worked as a Front end Developer using TypeScript, Next.js, React.js, and Tailwind CSS to build responsive and scalable web applications. Integrated REST APIs to fetch and display dynamic data, and optimized performance with server-side rendering. Collaborated with the team to deliver clean, maintainable code and user-friendly interfaces.",
      icon: "/images/agency.png",
    },
    {
      period: "2021 - 2023",
      title: "Youcode",
      description:
        "Developed full stack web applications with a focus on content management and e-commerce solutions, including database design, data access components, and back-end functionality. Created mockups and built responsive, dynamic front-end interfaces using modern web technologies to deliver user-friendly experiences.",
      icon: "/images/company.png",
    },
    {
      period: "2022 - 2022",
      title: "Better Apps",
      description:
        "A simple and effective application for managing the poultry activity of small and medium-sized poultry farmers.",
      icon: "/images/busines.png",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as const;

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  } as const;

  return (
    <section
      id="experiences"
      className="bg-background py-16 md:py-24 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-foreground pt-0 md:pt-12 md:sticky md:top-12 self-start text-center md:text-left">
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 md:mb-8 leading-[1.1]">
              Take a look at my{" "}
              <motion.span
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="bg-primary text-primary-foreground px-2.5 py-1 inline-block shadow-[4px_4px_0px_0px_var(--border)]">
                past experiences
              </motion.span>
            </h2>
            <p className="text-muted-foreground mb-8 md:mb-10 leading-relaxed text-lg md:text-xl max-w-md mx-auto md:mx-0 font-medium">
              I've worked with various startups and established companies,
              helping them build premium digital products.
            </p>
            <a
              href="/resume.pdf"
              download="front-end developer.pdf"
              className="w-full sm:w-auto flex justify-center md:justify-start">
              <Button className="bg-foreground text-background hover:bg-foreground/90 rounded-xl py-6 px-10 text-lg font-bold h-auto w-full sm:w-auto shadow-[6px_6px_0px_0px_var(--primary)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all">
                <FileText className="size-6" />
                Download resume
              </Button>
            </a>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-card border-4 border-border rounded-[32px] overflow-hidden shadow-[8px_8px_0px_0px_var(--border)] transition-colors duration-300">
                <div className="flex items-center justify-between p-6 md:p-8">
                  <div className="text-xl md:text-2xl font-bold text-foreground">
                    {exp.period}
                  </div>
                  <div className="bg-muted rounded-full p-2 border-2 border-border shadow-[4px_4px_0px_0px_var(--border)]">
                    <Image
                      src={exp.icon || "/placeholder.svg"}
                      alt={exp.title}
                      width={48}
                      height={48}
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full dark:opacity-80 dark:brightness-[0.9]"
                    />
                  </div>
                </div>

                <div className="border-t-4 border-border"></div>

                <div className="p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-black text-foreground mb-4">
                    {exp.title}
                  </h3>
                  <p className="text-muted-foreground text-lg md:text-xl leading-relaxed font-medium">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
