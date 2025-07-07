import React, { Suspense, useEffect, useState } from "react";
import {ImagesSlider} from "@/components/aceternity/ui/page-hero";
import {motion} from "framer-motion";

const images = [
  "/2023mall.webp",
  "/2022snyvex.webp",
  "/2022snyvrchigh.webp",
  "/2022snyvrc.webp",
  "/2022wpi.webp",
];

const sponsors = [
  {
    title: "Vex Robotics Competition",
    link: "/sponsors/Vex.webp",
    url: "https://www.vexrobotics.com/competition"
  },
  {
    title: "Vex IQ Robotics Competition",
    link: "/sponsors/VexIQ.webp",
    url: "https://www.vexrobotics.com/iq"
  },
  {
    title: "Whimsy Tech",
    link: "/sponsors/WhimsyTech.webp",
    url: "https://www.whimsytech.net/"
  },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Early return with loading state
  if (!isClient || isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <div className="animate-pulse text-2xl text-neutral-400">Loading...</div>
      </div>
    );
  }

  return (
    <section className="overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        {/* Hero Section */}
        <div className="relative h-[100vh] w-full -top-[2rem]">
          <ImagesSlider className="object-cover" images={images}>
            <motion.div
              initial={{opacity: 0, y: -80}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.6}}
              className="z-50 flex flex-col justify-center items-center px-4"
            >
                <motion.p 
                  className="font-bold text-4xl sm:text-6xl md:text-7xl text-center text-white py-4 main"
                  initial={{opacity: 0, y: 20}}
                  animate={{opacity: 1, y: 0}}
                  transition={{duration: 0.5, delay: .4}}
                >
                  Coast 2 Coast Robotics
                </motion.p>
                <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-2xl sm:text-3xl md:text-4xl mb-2 secondary">
                  <motion.span
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{duration: 0.5, delay: 1}}
                    className="text-blue-400 font-semibold"
                  >
                    Turning dreams into reality
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </ImagesSlider>
        </div>

        {/* Awards and Who We Are Section */}
        <Suspense fallback={<div>Loading content...</div>}>
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 p-4 md:p-8 my-12 md:my-20 max-w-8xl mx-auto">

            {/* Who We Are Section*/}
            <motion.div 
              className="w-full md:w-1/2"
              initial={{opacity: 0, x: 50}}
              whileInView={{opacity: 1, x: 0}}
              transition={{duration: 0.5}}
              viewport={{once: true}}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold main mb-6 md:mb-8 text-center">Who We Are</h2>
              <div className="h-[400px] md:h-[500px] overflow-y-auto pr-2 md:pr-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-300">
                <div className="flex flex-col gap-6 px-2 md:px-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 my-8">
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-blue-400">59</h3>
                    <p className="text-gray-300">Students</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-blue-400">5</h3>
                    <p className="text-gray-300">Mentors</p>
                  </div>
                  <div className="text-center">
                    <h3 className="text-4xl font-bold text-blue-400">50+</h3>
                    <p className="text-gray-300">Alumni</p>
                  </div>
                </div>
                  
                  <p className="secondary text-base md:text-lg leading-relaxed text-center md:text-left">
                    Dedicated to building since 1998, we are the TechKnights, Brooklyn Technical High School’s FIRST Robotics Competition (FRC) team. Meeting daily, we come together to tackle the new challenge posed by the international FIRST organization in a 6-week competition season devoted to learning and innovating. Including members from all backgrounds is a pivotal aspect of our team, bringing a diverse range of new members to our lab’s doors every year, and pushing the bounds of growth for the team. Composed of 50 engineers, the TechKnights develop designs through CAD that we go on to manufacture in-house, then create proprietary code for, synthesizing the work of every student across five distinct divisions into one, competition-ready robot.
                  </p>
                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-xl font-bold main mb-3">Open Alliance 2024 &#8208;  2025</h3>
                    <p className="secondary text-base md:text-lg leading-relaxed">
                      We believe in sharing knowledge and promoting collaboration. Check out our build thread on Chief Delphi where we share our progress and insights:
                    </p>
                    <a 
                      href="https://www.chiefdelphi.com/t/frc-334-techknights-2024-25-build-thread-open-alliance/476058"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      View our Open Alliance Build Thread →
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </Suspense>
        
        {/* Sponsors Section */}
        <Suspense fallback={<div>Loading sponsors...</div>}>
          <div className="py-12 md:py-20 px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold main mb-6 md:mb-8 text-center">Our Sponsors</h2>
            <div className="flex flex-wrap justify-center gap-8 md:gap-12">
              {sponsors.map((sponsor, index) => (
              <motion.a 
                key={index}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-4 md:p-6 hover:bg-gray-700 transition-colors"
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: index * 0.1, duration: 0.5}}
                style={{flex: "0 1 220px", maxWidth: 260}}
                >
                <img 
                  src={sponsor.link} 
                  alt={sponsor.title} 
                  className="w-full h-28 md:h-32 object-contain mb-2"
                />
              </motion.a>
              ))}
            </div>
          </div>
        </Suspense>

      </Suspense>
    </section>
  );
}
