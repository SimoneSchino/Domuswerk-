'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';
import { projects, services } from '@/data/mock-data';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function PortfolioPage() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesService = !selectedService || project.serviceId === selectedService;
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesService && matchesSearch;
    });
  }, [selectedService, searchQuery]);

  return (
    <main className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="px-4 py-12 md:py-20 border-b border-gray-200">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Portfolio Progetti</h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Scopri i nostri ultimi progetti di interior design, ristrutturazione, energie rinnovabili e giardini.
          </p>
        </motion.div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 bg-white border-b border-gray-200 z-40 py-6">
        <div className="max-w-6xl mx-auto px-4 space-y-6">
          {/* Search */}
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
            <Search className="w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Cerca progetti..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent flex-1 outline-none text-black placeholder-gray-500"
            />
          </div>

          {/* Service Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedService(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                selectedService === null
                  ? 'bg-black text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              Tutti i Progetti ({filteredProjects.length})
            </button>
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  selectedService === service.id
                    ? 'bg-black text-white'
                    : 'bg-gray-200 text-black hover:bg-gray-300'
                }`}
              >
                {service.name} ({projects.filter((p) => p.serviceId === service.id).length})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-600 text-lg">Nessun progetto trovato. Prova a cambiare i filtri.</p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max"
            >
              {filteredProjects.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <Link href={`/portfolio/${project.id}`}>
                    <div className="group cursor-pointer overflow-hidden rounded-lg bg-gray-100 aspect-square relative">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
                        <div className="w-full p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
                          <p className="text-gray-200 text-sm line-clamp-2">{project.description}</p>
                          <div className="mt-4 inline-block px-4 py-2 bg-white text-black font-medium rounded text-sm">
                            Scopri di più →
                          </div>
                        </div>
                      </div>

                      {/* Badge Service */}
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-black text-white text-xs font-medium rounded-full">
                          {services.find((s) => s.id === project.serviceId)?.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
