"use client";

import { myProjects } from "@/lib/constants";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export function PortfolioSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

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
            <motion.span className="bg-primary text-primary-foreground px-3 py-1 inline-block shadow-[4px_4px_0px_0px_var(--border)] cursor-default">
              Projects
            </motion.span>
          </h2>
        </motion.div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4 md:-ml-10">
            {myProjects.map((project, index) => (
              <div
                key={index}
                className="flex-[0_0_100%] min-w-0 pl-4 md:pl-10">
                <div className="group bg-card border-[3px] border-border rounded-[32px] overflow-hidden p-6 md:p-12 h-full flex flex-col justify-center">
                  <div className="flex flex-col md:flex-row gap-8 md:gap-12 h-full">
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex items-center justify-between mb-8">
                        <div className="size-20 relative bg-muted rounded-2xl flex items-center justify-center border-2 border-border shadow-[4px_4px_0px_0px_var(--border)]">
                          <Image
                            src={project.logo || "/placeholder.svg"}
                            alt={`${project.title} logo`}
                            width={56}
                            height={56}
                            className="object-contain p-2.5"
                          />
                        </div>
                        <div className="flex items-center gap-4">
                          <PrevButton
                            onClick={onPrevButtonClick}
                            disabled={prevBtnDisabled}
                          />
                          <NextButton
                            onClick={onNextButtonClick}
                            disabled={nextBtnDisabled}
                          />
                        </div>
                      </div>

                      <h3 className="text-2xl md:text-[32px] font-bold mb-4 leading-tight text-foreground">
                        {project.title}
                      </h3>

                      <p className="text-base md:text-[18px] text-muted-foreground mb-4 leading-relaxed font-medium">
                        {project.desc}
                      </p>

                      <p className="text-sm md:text-base text-muted-foreground/70 mb-8 italic">
                        {project.subdesc}
                      </p>

                      <div className="flex flex-wrap items-center gap-4 mb-8">
                        {project.tags.map((tag) => (
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
                            <span className="text-xs font-bold">
                              {tag.name}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-6">
                        {project.live ? (
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 font-semibold text-accent hover:underline text-sm md:text-base">
                            Live Preview
                            <div className="size-2 rounded-full bg-accent animate-pulse" />
                          </a>
                        ) : (
                          <div className="flex items-center gap-2 font-semibold text-muted-foreground text-sm md:text-base cursor-default uppercase tracking-wider">
                            Coming Soon
                            <div className="size-2 rounded-full bg-muted-foreground" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-12">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`h-3 rounded-full transition-all border-2 border-border shadow-[2px_2px_0px_0px_var(--border)] ${
                index === selectedIndex ? "w-12 bg-primary" : "w-3 bg-muted"
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function usePrevNextButtons(emblaApi: any) {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: any) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
}

function useDotButton(emblaApi: any) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);

    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
}

function PrevButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="size-12 rounded-xl bg-muted border-2 border-border flex items-center justify-center transition-all shadow-[4px_4px_0px_0px_var(--border)] disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Previous project">
      <ArrowLeft className="w-6 h-6" />
    </button>
  );
}

function NextButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="size-12 rounded-xl bg-muted border-2 border-border flex items-center justify-center transition-all shadow-[4px_4px_0px_0px_var(--border)] disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Next project">
      <ArrowRight className="w-6 h-6" />
    </button>
  );
}

function DotButton({ onClick, className, "aria-label": ariaLabel }: any) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
    />
  );
}
