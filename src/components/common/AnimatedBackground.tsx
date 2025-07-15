"use client";

import { motion } from "framer-motion";

const AnimatedBackground = ({ 
  variant = "default",
  intensity = "normal" 
}: { 
  variant?: "default" | "blue" | "purple" | "gradient";
  intensity?: "light" | "normal" | "heavy";
}) => {
  const getColors = () => {
    switch (variant) {
      case "blue":
        return {
          shape1: "from-blue-400/20 to-indigo-500/20",
          shape2: "from-cyan-400/20 to-blue-500/20", 
          shape3: "from-indigo-400/20 to-blue-500/20",
          particles: "from-blue-400 to-indigo-400"
        };
      case "purple":
        return {
          shape1: "from-purple-400/20 to-pink-500/20",
          shape2: "from-indigo-400/20 to-purple-500/20",
          shape3: "from-pink-400/20 to-purple-500/20", 
          particles: "from-purple-400 to-pink-400"
        };
      case "gradient":
        return {
          shape1: "from-emerald-400/20 to-teal-500/20",
          shape2: "from-orange-400/20 to-red-500/20",
          shape3: "from-violet-400/20 to-purple-500/20",
          particles: "from-emerald-400 to-violet-400"
        };
      default:
        return {
          shape1: "from-blue-400/20 to-indigo-500/20",
          shape2: "from-purple-400/20 to-pink-500/20", 
          shape3: "from-cyan-400/20 to-blue-500/20",
          particles: "from-blue-400 to-indigo-400"
        };
    }
  };

  const getIntensitySettings = () => {
    switch (intensity) {
      case "light":
        return {
          particleCount: 3,
          animationSpeed: { base: 20, modifier: 4 },
          opacity: "/10"
        };
      case "heavy":
        return {
          particleCount: 12,
          animationSpeed: { base: 10, modifier: 2 },
          opacity: "/30"
        };
      default:
        return {
          particleCount: 6,
          animationSpeed: { base: 15, modifier: 3 },
          opacity: "/20"
        };
    }
  };

  const colors = getColors();
  const settings = getIntensitySettings();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large Floating Geometric Shapes */}
      <motion.div
        animate={{ 
          y: [-20, 20, -20],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: settings.animationSpeed.base, 
          ease: "easeInOut" 
        }}
        className={`absolute top-20 left-10 w-32 h-32 bg-gradient-to-br ${colors.shape1} rounded-3xl backdrop-blur-sm`}
      />
      
      <motion.div
        animate={{ 
          y: [20, -20, 20],
          rotate: [360, 180, 0],
          scale: [1.1, 1, 1.1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: settings.animationSpeed.base - 3, 
          ease: "easeInOut" 
        }}
        className={`absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-br ${colors.shape2} rounded-full backdrop-blur-sm`}
      />
      
      <motion.div
        animate={{ 
          x: [-30, 30, -30],
          rotate: [0, 45, 90],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: settings.animationSpeed.base + 3, 
          ease: "easeInOut" 
        }}
        className={`absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-br ${colors.shape3} transform rotate-45 backdrop-blur-sm`}
      />

      {/* Medium Shapes */}
      <motion.div
        animate={{ 
          x: [30, -30, 30],
          y: [10, -10, 10],
          rotate: [0, 90, 180, 270, 360],
        }}
        transition={{ 
          repeat: Infinity, 
          duration: settings.animationSpeed.base + 5, 
          ease: "easeInOut" 
        }}
        className={`absolute top-1/2 left-1/3 w-20 h-20 bg-gradient-to-br ${colors.shape1} rounded-2xl backdrop-blur-sm`}
      />

      <motion.div
        animate={{ 
          y: [-40, 40, -40],
          x: [20, -20, 20],
          scale: [0.8, 1.2, 0.8]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: settings.animationSpeed.base + 2, 
          ease: "easeInOut" 
        }}
        className={`absolute bottom-1/3 right-1/3 w-28 h-28 bg-gradient-to-br ${colors.shape2} rounded-full backdrop-blur-sm`}
      />

      {/* Small Decorative Elements */}
      {/* <motion.div
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.3, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: settings.animationSpeed.base - 5, 
          ease: "linear" 
        }}
        className={`absolute top-1/4 left-1/2 w-12 h-12 bg-gradient-to-br ${colors.shape3} rounded-xl backdrop-blur-sm`}
      /> */}

      {/* Floating Particles */}
      {/* {[...Array(settings.particleCount)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-100, -200, -100],
            x: [0, Math.sin(i) * 50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 8 + i * settings.animationSpeed.modifier,
            delay: i * 1.5,
            ease: "easeInOut"
          }}
          className={`absolute w-2 h-2 bg-gradient-to-r ${colors.particles} rounded-full`}
          style={{
            left: `${20 + i * (60 / settings.particleCount)}%`,
            bottom: '10%'
          }}
        />
      ))} */}

      {/* Subtle Gradient Overlays */}
      {/* <motion.div
        animate={{ 
          opacity: [0.1, 0.3, 0.1],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: settings.animationSpeed.base + 10, 
          ease: "easeInOut" 
        }}
        className={`absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl ${colors.shape1.replace('/20', settings.opacity)} rounded-full blur-3xl`}
      />

      <motion.div
        animate={{ 
          opacity: [0.2, 0.4, 0.2],
          scale: [1.1, 1, 1.1]
        }}
        transition={{ 
          repeat: Infinity, 
          duration: settings.animationSpeed.base + 8, 
          ease: "easeInOut" 
        }}
        className={`absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr ${colors.shape2.replace('/20', settings.opacity)} rounded-full blur-2xl`}
      /> */}

      {/* Additional Morphing Shapes */}
      <motion.div
        animate={{
          borderRadius: ["30% 70% 70% 30% / 30% 30% 70% 70%", 
                       "70% 30% 30% 70% / 70% 70% 30% 30%",
                       "30% 70% 70% 30% / 30% 30% 70% 70%"],
          rotate: [0, 120, 240, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          repeat: Infinity,
          duration: settings.animationSpeed.base + 12,
          ease: "easeInOut"
        }}
        className={`absolute top-3/4 left-3/4 w-24 h-24 bg-gradient-to-br ${colors.shape3} backdrop-blur-sm`}
      />

      {/* Pulsing Dots */}
      {/* {[...Array(4)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 0.6, 0]
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            delay: i * 1,
            ease: "easeInOut"
          }}
          className={`absolute w-3 h-3 bg-gradient-to-r ${colors.particles} rounded-full`}
          style={{
            top: `${25 + i * 20}%`,
            right: `${15 + i * 10}%`
          }}
        />
      ))} */}
    </div>
  );
};

export default AnimatedBackground;