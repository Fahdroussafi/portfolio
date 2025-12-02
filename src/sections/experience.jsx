import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { workExperiences } from '../constants/index.js';

gsap.registerPlugin(ScrollTrigger);

const WorkExperience = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray('.work-content_container');

      items.forEach((item, index) => {
        gsap.fromTo(
          item,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
            },
          },
        );
      });

      gsap.fromTo(
        '.work-content_bar',
        { height: 0 },
        {
          height: '100%',
          duration: 1.5,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: '.work-content',
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: 1,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section className="c-space my-20" id="work" ref={containerRef}>
      <div className="w-full text-white-600">
        <p className="head-text">My Work Experience</p>

        <div className="work-container">
          <div className="work-canvas"></div>

          <div className="work-content">
            <div className="sm:py-10 py-5 sm:px-5 px-2.5">
              {workExperiences.map(({ id, name, pos, duration, icon, title }) => (
                <div
                  key={id}
                  className="work-content_container group relative pl-8 border-l-2 border-gray-700 hover:border-white transition-colors duration-300">
                  <div className="absolute -left-[9px] top-0 bg-black-200 rounded-full p-2 border border-gray-700 group-hover:border-white transition-colors duration-300">
                    <img className="w-6 h-6 object-contain" src={icon} alt="" loading="lazy" />
                  </div>

                  <div className="sm:p-5 px-2.5 py-5 bg-black-200 rounded-lg transition-all duration-500 hover:bg-black-300/50">
                    <p className="font-bold text-white-800 text-xl">{name}</p>
                    <p className="text-sm text-gray-400 mb-5 font-medium">
                      {pos} -- <span className="text-white-500">{duration}</span>
                    </p>
                    <p className="text-sm lg:text-base text-gray-300 group-hover:text-white transition-all ease-in-out duration-500 leading-relaxed">
                      {title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
