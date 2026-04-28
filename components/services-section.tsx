"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function ServicesSection() {
  const services = [
    {
      title: "Frontend Development",
      description:
        "Building modern, high-performance web applications using React and Next.js. I focus on creating fluid, accessible, and type-safe interfaces that provide a premium user experience.",
      image: "/images/frontend.svg",
    },
    {
      title: "UI Implementation",
      description:
        "Pixel-perfect translation of designs into responsive Tailwind CSS code. I ensure every interaction feels intentional and polished across all possible screen sizes.",
      image: "/images/ui-implementation.svg",
    },
    {
      title: "Backend Development",
      description:
        "Designing robust server-side architectures with NestJS. From database modeling to secure API design, I build systems that scale with your business needs and ensure data integrity.",
      image: "/images/backend.svg",
    },
    {
      title: "Full-stack Solutions",
      description:
        "Bridging the gap between design and logic. I deliver end-to-end applications that solve complex business problems, handling everything from the UI state to the cloud infrastructure.",
      image: "/images/full-stack.svg",
    },
    {
      title: "Performance & SEO",
      description:
        "Optimizing for speed, accessibility, and search visibility. I help your application rank higher and load faster, directly impacting your bottom line.",
      image: "/images/seo-performance.svg",
    },
  ];

  return (
    <section
      id="about"
      className="bg-background py-16 md:py-24 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-[52px] md:leading-[60px] font-bold mb-4 text-foreground">
              My broad{" "}
              <motion.span
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="bg-secondary text-secondary-foreground px-4 py-1 inline-block cursor-default shadow-[4px_4px_0px_0px_var(--border)]">
                set of services
              </motion.span>
            </h2>
            <p className="text-muted-foreground text-base md:text-lg font-medium leading-relaxed md:leading-[30px] max-w-2xl mx-auto">
              I specialize in building scalable, user-centric digital products.
              From sleek front-end interfaces to robust back-end systems, I
              deliver high-quality code that drives results.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${
                  index === 0 ? "lg:col-span-2" : ""
                } bg-card border-[3px] border-border rounded-[32px] overflow-hidden hover:translate-y-[-4px] hover:shadow-[8px_8px_0px_0px_var(--border)] transition-all duration-300 flex flex-col group`}>
                <div className="w-full mt-[-50px] overflow-hidden rounded-t-[29px]">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={index === 0 ? 800 : 382}
                    height={328}
                    className="w-full h-auto object-cover group-hover:scale-110 transition-all duration-500 ease-out dark:opacity-80 dark:brightness-[0.85]"
                  />
                </div>
                <div className="p-8 pt-4 flex-1 flex flex-col justify-center">
                  <h3 className="text-[28px] leading-[40px] font-bold mb-3 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-[18px] leading-[30px] font-medium text-muted-foreground">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
