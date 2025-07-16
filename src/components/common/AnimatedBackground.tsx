"use client";

import { motion, easeInOut, easeOut } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface AnimatedBackgroundProps {
  variant?: "default" | "blue" | "purple" | "gradient" | "warm" | "cool" | "sunset";
  intensity?: "light" | "normal" | "heavy";
  pattern?: "floating" | "morphing" | "spiral" | "wave" | "particles";
  speed?: "slow" | "normal" | "fast";
}

interface Shape {
  id: string;
  top: string;
  left: string;
  size: number;
  borderRadius: string;
  duration: number;
  delay: number;
  animationType: "float" | "rotate" | "scale" | "morph" | "spiral";
  opacity: number;
  color: string;
}

export default function AnimatedBackground({
  variant = "default",
  intensity = "normal",
  pattern = "floating",
  speed = "normal",
}: AnimatedBackgroundProps) {
  const [mounted, setMounted] = useState(false);
  const [shapes, setShapes] = useState<Shape[]>([]);

  // Cấu hình số lượng shapes theo intensity
  const getShapeCount = useMemo(() => {
    switch (intensity) {
      case "light":
        return 30;
      case "heavy":
        return 50;
      default:
        return 12;
    }
  }, [intensity]);

  // Cấu hình tốc độ animation
  const getSpeedMultiplier = useMemo(() => {
    switch (speed) {
      case "slow":
        return 1.5;
      case "fast":
        return 0.5;
      default:
        return 1;
    }
  }, [speed]);

  // Định nghĩa color palette theo variant
  const getColorPalette = useMemo(() => {
    switch (variant) {
      case "blue":
        return [
          "from-blue-400/20 to-indigo-500/20",
          "from-cyan-400/15 to-blue-600/15",
          "from-sky-300/25 to-blue-400/25",
        ];
      case "purple":
        return [
          "from-purple-400/20 to-pink-500/20",
          "from-indigo-400/15 to-purple-600/15",
          "from-violet-300/25 to-purple-400/25",
        ];
      case "warm":
        return [
          "from-orange-400/20 to-red-500/20",
          "from-yellow-400/15 to-orange-600/15",
          "from-pink-300/25 to-red-400/25",
        ];
      case "cool":
        return [
          "from-teal-400/20 to-cyan-500/20",
          "from-emerald-400/15 to-teal-600/15",
          "from-green-300/25 to-cyan-400/25",
        ];
      case "sunset":
        return [
          "from-orange-400/20 to-pink-500/20",
          "from-yellow-400/15 to-orange-600/15",
          "from-red-300/25 to-purple-400/25",
        ];
      case "gradient":
        return [
          "from-emerald-400/20 to-violet-500/20",
          "from-blue-400/15 to-pink-600/15",
          "from-cyan-300/25 to-purple-400/25",
        ];
      default:
        return [
          "from-blue-400/20 to-pink-400/20",
          "from-purple-400/15 to-cyan-500/15",
          "from-indigo-300/25 to-pink-400/25",
        ];
    }
  }, [variant]);

  // Generate random shapes với pattern-specific logic
  const generateShapes = useMemo(() => {
    const colors = getColorPalette;
    const baseSpeed = getSpeedMultiplier;
    
    return Array.from({ length: getShapeCount }).map((_, i) => {
      let animationType: Shape["animationType"] = "float";
      
      // Xác định loại animation dựa trên pattern
      switch (pattern) {
        case "morphing":
          animationType = Math.random() > 0.5 ? "morph" : "scale";
          break;
        case "spiral":
          animationType = "spiral";
          break;
        case "wave":
          animationType = i % 2 === 0 ? "float" : "rotate";
          break;
        case "particles":
          animationType = Math.random() > 0.3 ? "scale" : "float";
          break;
        default:
          const types: Shape["animationType"][] = ["float", "rotate", "scale"];
          animationType = types[Math.floor(Math.random() * types.length)];
      }

      return {
        id: `shape-${i}`,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        size: pattern === "particles" 
          ? 60 + Math.random() * 30 
          : 80 + Math.random() * 60,
        borderRadius: pattern === "morphing" 
          ? "30%" 
          : Math.random() > 0.6 ? "50%" : `${20 + Math.random() * 30}%`,
        duration: (8 + Math.random() * 12) * baseSpeed,
        delay: Math.random() * 3,
        animationType,
        opacity: 0.3 + Math.random() * 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
    });
  }, [getShapeCount, getSpeedMultiplier, getColorPalette, pattern]);

  // Khởi tạo shapes chỉ trên client
  useEffect(() => {
    setMounted(true);
    setShapes(generateShapes);
  }, [generateShapes]);

  // Tạo animation variants cho từng loại
  const getAnimationVariants = (shape: Shape) => {
    const baseAnimation = {
      repeat: Infinity,
      duration: shape.duration,
      delay: shape.delay,
      ease: easeInOut,
    };

    switch (shape.animationType) {
      case "rotate":
        return {
          animate: {
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          },
          transition: baseAnimation,
        };
      
      case "scale":
        return {
          animate: {
            scale: [0.8, 1.2, 0.8],
            opacity: [shape.opacity * 0.5, shape.opacity, shape.opacity * 0.5],
          },
          transition: baseAnimation,
        };
      
      case "morph":
        return {
          animate: {
            borderRadius: ["30%", "50%", "20%", "30%"],
            scale: [1, 1.15, 0.9, 1],
            rotate: [0, 90, 180, 270, 360],
          },
          transition: { ...baseAnimation, duration: shape.duration * 1.5 },
        };
      
      case "spiral":
        return {
          animate: {
            x: [0, 50, 0, -50, 0],
            y: [0, -30, 0, 30, 0],
            rotate: [0, 180, 360],
            scale: [1, 1.2, 1],
          },
          transition: baseAnimation,
        };
      
      default: // float
        return {
          animate: {
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            scale: [1, 1.05, 1],
          },
          transition: baseAnimation,
        };
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-purple-50/30" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Gradient Background Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-white/10 to-purple-50/20" />
      
      {/* Animated Shapes */}
      {shapes.map((shape) => {
        const variants = getAnimationVariants(shape);
        
        return (
          <motion.div
            key={shape.id}
            {...variants}
            className={`absolute bg-gradient-to-br ${shape.color} backdrop-blur-sm`}
            style={{
              top: shape.top,
              left: shape.left,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              borderRadius: shape.borderRadius,
              opacity: shape.opacity,
            }}
          />
        );
      })}
      
      {/* Additional Pattern-Specific Elements */}
      {pattern === "wave" && (
        <motion.div
          animate={{
            background: [
              "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
              "linear-gradient(180deg, transparent, rgba(147, 51, 234, 0.1), transparent)",
              "linear-gradient(270deg, transparent, rgba(236, 72, 153, 0.1), transparent)",
              "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
            ],
          }}
          transition={{
            repeat: Infinity,
            duration: 15 * getSpeedMultiplier,
            ease: easeOut,
          }}
          className="absolute inset-0"
        />
      )}
      
      {intensity === "heavy" && (
        <>
          {/* Additional ambient glow effects for heavy intensity */}
          <motion.div
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              repeat: Infinity,
              duration: 20 * getSpeedMultiplier,
              ease: easeInOut,
            }}
            className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"
          />
          
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1.1, 1, 1.1],
            }}
            transition={{
              repeat: Infinity,
              duration: 25 * getSpeedMultiplier,
              ease: easeInOut,
            }}
            className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-purple-400/15 to-pink-400/15 rounded-full blur-2xl"
          />
        </>
      )}
    </div>
  );
}