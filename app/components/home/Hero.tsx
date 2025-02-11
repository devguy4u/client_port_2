"use client";

import { Variants, motion, useScroll, useTransform } from "framer-motion";
import ReactTypingEffect from "react-typing-effect";
import { TbArrowsDownUp } from "react-icons/tb";
import { useRef } from "react";
import { useAppTheme } from "../theme/AppTheme";
import { HeroBg } from "./HeroBg";
import {
  pt_serif_caption,
  poppins,
  roboto,
  robotoMono,
} from "@/app/utils/Fonts";
import { star } from "@/app/utils/placeholder";

const viewport = {
  once: false,
  amount:
    typeof window !== "undefined" ? (window.innerWidth > 450 ? 0.8 : 0.5) : 0.8,
};

const transition = {
  closed: { staggerChildren: 0.3, staggerDirection: -1 },
  open: { staggerChildren: 0.3, delayChildren: 0.2 },
};

const Top: Variants = {
  closed: { x: -50, y: -50, opacity: 0, scale: 0.8 },
  open: {
    x: 0,
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, delay: 0.2 },
  },
};

const Bottom: Variants = {
  closed: { x: 50, y: 50, opacity: 0 },
  open: { x: 0, y: 0, opacity: 1, transition: { duration: 0.5, delay: 0.2 } },
};

export default function Hero() {
  const { themeColor } = useAppTheme();
  const mainRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: mainRef,
    offset: ["start start", "end start"],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "-0%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="Intro"
      ref={mainRef}
      className="relative min-h-screen overflow-hidden"
    >
      <motion.div
        className="min-h-screen flex overflow-hidden z-10"
        initial="closed"
        whileInView="open"
        viewport={viewport}
        transition={transition}
        style={{ y: contentY }}
      >
        <div className="flex my-auto max-w-2xl lg:max-w-4xl mx-auto p-6 flex-col z-10 rounded-md backdrop-blur-sm bg-transparent dark:md:bg-slate-300/5">
          <motion.div variants={Top}>
            <div className="flex">
              <h2
                className="text-base md:text-xl mr-1 font-mono"
                style={{ color: themeColor }}
              >
                &lt;
              </h2>
              <ReactTypingEffect
                text={[
                  "Hello World !",
                  "नमस्ते दुनिया !",
                  "নমস্কার বিশ্ব!",
                  "こんにちは世界 !",
                  "Hola Mundo !",
                  "Bonjour le monde !",
                  "Olá Mundo!",
                  "Hallo Welt !",
                  "مرحبا بالعالم !",
                  "你好世界 !",
                ]}
                speed={100}
                eraseSpeed={50}
                typingDelay={150}
                eraseDelay={1500}
                cursorClassName="text-base md:text-xl ml-1 dark:text-gray-200 text-gray-900"
                displayTextRenderer={(text: string, i: number) => {
                  return (
                    <h2>
                      {text.split("").map((item, i) => {
                        return (
                          <span
                            key={`greet_${i}`}
                            className="font-mono text-base md:text-xl dark:text-gray-200 text-gray-900"
                          >
                            {item}
                          </span>
                        );
                      })}
                    </h2>
                  );
                }}
              />
              <h2
                className="text-xl md:text-2xl font-ubuntu ml-1"
                style={{ color: themeColor }}
              >
                /&gt;
              </h2>
            </div>
            <div className="text-center">
              <h1
                className="noSelection lg:text-5xl text-4xl lg:leading-relaxed bg-gradient-to-b bg-clip-text text-transparent dark:from-white dark:to-[#38495a] from-[#807a70] to-[#6d5b45]"
                style={pt_serif_caption.style}
              >
                <span>Hi, I&apos;m {star}, a </span>
                <br className="" />
                <span className="font-extrabold py-2 md:py-4">
                  User Experience Designer.
                </span>
              </h1>
            </div>
          </motion.div>
          <motion.article
            variants={Bottom}
            className="mt-6 text-base lg:text-lg text-[#7c6a56] dark:text-[#DCD3C4]  text-center px-0 md:px-8"
          >
            <p>
              <span className="font-bold pe-2" style={robotoMono.style}>
                Welcome to my portfolio!
              </span>
              <span style={roboto.style}>
                I&apos;m a skilled User Experience Designer who loves telling
                engaging and immersive stories through human-centered design
                solutions.
              </span>
            </p>
          </motion.article>
        </div>
        <div className="absolute min-w-full flex justify-center items-center bottom-14 lg:bottom-10 dark:text-gray-500 text-gray-600">
          <motion.div
            className="flex"
            initial={{ y: 5 }}
            animate={{ y: -5 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <TbArrowsDownUp
              className="text-xl lg:text-2xl"
              style={{ color: themeColor }}
            ></TbArrowsDownUp>
          </motion.div>
          <span className="ml-1 lg:text-lg text-xs" style={poppins.style}>
            Keep Scrolling
          </span>
        </div>
      </motion.div>
      <HeroBg y={backgroundY} />
    </section>
  );
}
