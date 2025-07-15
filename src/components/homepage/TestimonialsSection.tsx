"use client";

import { motion, easeOut } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";
import AnimatedBackground from "./AnimatedBackground";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "University Student",
      avatar: "/api/placeholder/80/80",
      content: "This app has helped me expand my vocabulary incredibly fast! The flashcards are engaging and the progress tracking keeps me motivated every day.",
      rating: 5,
      country: "USA"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Professional",
      avatar: "/api/placeholder/80/80",
      content: "The Business English flashcard set was exactly what I needed. I feel much more confident in meetings and presentations now. Highly recommended!",
      rating: 5,
      country: "Singapore"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Travel Blogger",
      avatar: "/api/placeholder/80/80",
      content: "As someone who travels frequently, the Travel English set has been a lifesaver. I can communicate better in English-speaking countries now!",
      rating: 5,
      country: "Spain"
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: easeOut }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section className="relative py-32 bg-gradient-to-b from-white via-slate-50/50 to-white">
      {/* Animated Background */}
      <AnimatedBackground variant="default" intensity="normal" />

      <div className="container mx-auto px-8 lg:px-12">
        <motion.div
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              What Our Learners Say
            </span>
          </h2>
          <p className="text-xl text-slate-600/90 max-w-3xl mx-auto leading-relaxed">
            Join thousands of satisfied learners who have transformed their English skills
          </p>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={fadeInUp}
              className="group"
            >
              <div className="relative h-full bg-white/60 backdrop-blur-sm border border-white/40 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                {/* Quote Icon */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                  <Quote className="w-6 h-6 text-white" />
                </div>

                <div className="space-y-6">
                  {/* Rating */}
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-slate-700 leading-relaxed text-lg italic">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-slate-200/50">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-purple-600">
                      <div className="absolute inset-0.5 bg-white rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-slate-700">
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">{testimonial.name}</h4>
                      <p className="text-sm text-slate-600">{testimonial.role}</p>
                      <p className="text-xs text-slate-500">{testimonial.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="inline-flex items-center space-x-8 px-8 py-4 bg-white/40 backdrop-blur-sm rounded-full border border-white/30 shadow-lg">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-800">50K+</p>
              <p className="text-sm text-slate-600">Active Users</p>
            </div>
            <div className="w-px h-12 bg-slate-300"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-800">4.9/5</p>
              <p className="text-sm text-slate-600">Average Rating</p>
            </div>
            <div className="w-px h-12 bg-slate-300"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-800">95%</p>
              <p className="text-sm text-slate-600">Success Rate</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;