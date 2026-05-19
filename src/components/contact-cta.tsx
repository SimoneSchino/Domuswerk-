'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ContactCTAProps {
  title: string;
  description: string;
}

export default function ContactCTA({ title, description }: ContactCTAProps) {
  return (
    <section className="px-4 py-20 bg-black text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">{description}</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contatti"
            className="px-8 py-3 bg-white text-black rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2 group"
          >
            Contattaci
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/prenotazioni"
            className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-black transition-colors"
          >
            Prenota una Consulenza
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
