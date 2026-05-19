'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '@/data/mock-data';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="px-4 py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-black mb-12 text-center">
          Cosa dicono i nostri clienti
        </h2>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white p-8 md:p-12 rounded-lg border-2 border-gray-200 text-center"
            >
              {/* Rating */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-black fill-black" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-xl md:text-2xl font-bold text-black mb-6 italic">
                "{current.text}"
              </blockquote>

              {/* Author Info */}
              <div>
                <p className="font-bold text-black text-lg">{current.author}</p>
                <p className="text-gray-600">{current.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={prev}
              className="p-2 hover:bg-black hover:text-white rounded-full transition-colors border border-black text-black"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-black w-6' : 'bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="p-2 hover:bg-black hover:text-white rounded-full transition-colors border border-black text-black"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
