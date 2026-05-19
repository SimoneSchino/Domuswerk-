'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';
import { projects, services } from '@/data/mock-data';
import ContactCTA from '@/components/contact-cta';

interface ProjectDetailPageProps {
  params: {
    id: string;
  };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = projects.find((p) => p.id === params.id);
  const service = services.find((s) => s.id === project?.serviceId);
  const [activeTab, setActiveTab] = useState<'overview' | 'details' | 'gallery'>('overview');

  if (!project) {
    return (
      <main className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Progetto non trovato</h1>
          <Link href="/portfolio" className="text-blue-600 hover:underline">
            ← Torna al portfolio
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-20">
      {/* Back Button */}
      <div className="sticky top-20 bg-white border-b border-gray-200 z-40 px-4 py-4">
        <div className="max-w-6xl mx-auto">
          <Link href="/portfolio" className="flex items-center gap-2 text-black hover:text-gray-600 font-medium">
            <ArrowLeft className="w-5 h-5" />
            Torna al Portfolio
          </Link>
        </div>
      </div>

      {/* Hero Image */}
      <section className="relative w-full h-96 md:h-screen">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover"
          priority
        />
      </section>

      {/* Content */}
      <section className="px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-2 bg-black text-white text-sm font-medium rounded-full">
                {service?.name}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">{project.title}</h1>
            <p className="text-lg text-gray-600 leading-relaxed">{project.description}</p>
          </motion.div>

          {/* Info Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 p-6 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-5 h-5 text-black" />
                <span className="font-medium text-black">Durata</span>
              </div>
              <p className="text-gray-600">{project.duration}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-black" />
                <span className="font-medium text-black">Ubicazione</span>
              </div>
              <p className="text-gray-600">{project.location}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-black" />
                <span className="font-medium text-black">Team</span>
              </div>
              <p className="text-gray-600">DomusWerk Team</p>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex gap-4 border-b border-gray-200 mb-8">
              {(['overview', 'details', 'gallery'] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 font-medium transition-colors capitalize ${
                    activeTab === tab
                      ? 'text-black border-b-2 border-black'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  {tab === 'overview' && 'Panoramica'}
                  {tab === 'details' && 'Dettagli'}
                  {tab === 'gallery' && 'Galleria'}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            {activeTab === 'overview' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-black mb-3">Progetto</h3>
                  <p className="text-gray-700 leading-relaxed">{project.description}</p>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black mb-3">Sfide</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Questo progetto ha presentato sfide interessanti nel bilanciare estetica e funzionalità. Il nostro team ha lavorato per creare uno spazio che riflettesse il carattere unico del cliente.
                  </p>
                </div>
              </motion.div>
            )}

            {activeTab === 'details' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-bold text-black mb-2">Materiali Utilizzati</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Legno sostenibile</li>
                      <li>Finiture eco-friendly</li>
                      <li>Illuminazione a LED</li>
                      <li>Impianti intelligenti</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-black mb-2">Servizi Forniti</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Design concept</li>
                      <li>Project management</li>
                      <li>Implementazione</li>
                      <li>Supporto post-progetto</li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'gallery' && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-gray-100">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
                <div className="relative h-64 md:h-80 rounded-lg overflow-hidden bg-gray-100">
                  <Image src={project.beforeImage} alt="Prima" fill className="object-cover" />
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <ContactCTA
        title="Vuoi un progetto come questo?"
        description="Contattaci oggi per discutere come possiamo trasformare il tuo spazio."
      />
    </main>
  );
}
