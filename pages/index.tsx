import React, { Suspense, useEffect, useState } from "react";
import {ImagesSlider} from "@/components/aceternity/ui/page-hero";
import {motion} from "framer-motion";
import {siteConfig} from "@/config/site"
import Sponsors from "@/components/sponsor";

const images = [
  "/2023mall.webp",
  "/2022snyvex.webp",
  "/2022snyvrchigh.webp",
  "/2022snyvrc.webp",
  "/2022wpi.webp",
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

        {/* Sponsors Section */}
        <Suspense fallback={<div>Loading sponsors...</div>}>
          <div className="max-w-4xl mx-auto py-12 px-4">
            <Sponsors/>
          </div>
        </Suspense>
      </Suspense>
    </section>
  );
}
