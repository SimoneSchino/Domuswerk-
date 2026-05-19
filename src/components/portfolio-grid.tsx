import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  shortDescription: string
  service: 'interior-design' | 'renovation' | 'renewable-energy' | 'gardens'
  image: string
  beforeImage?: string
  afterImage?: string
  location: string
  duration: string
  budget?: string
  materials?: string[]
  testimonial?: string
  testimonialAuthor?: string
  images?: string[]
  featured: boolean
}

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Luxury Penthouse Milano - Interior Design',
    slug: 'luxury-penthouse-milano',
    description: 'Completo redesign di un penthouse di 200mq in centro Milano con vista sul Duomo. Utilizzo di materiali premium e soluzioni di arredo contemporaneo.',
    shortDescription: 'Redesign luxury penthouse nel cuore di Milano',
    service: 'interior-design',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&bri=-20',
    afterImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    location: 'Milano, Italia',
    duration: '6 mesi',
    budget: '€150.000+',
    materials: ['Marmo carrara', 'Legno di noce', 'Ottone', 'Vetro satinato'],
    testimonial: 'DomusWerk ha trasformato la nostra visione in realtà. Professionali, attenti ai dettagli e sempre disponibili.',
    testimonialAuthor: 'Famiglia Rossi',
    featured: true,
  },
  {
    id: '2',
    title: 'Villa Ristrutturazione - Trentino Alto Adige',
    slug: 'villa-ristrutturazione-trentino',
    description: 'Ristrutturazione completa di una villa storica del 1950 con mantenimento delle caratteristiche originali e modernizzazione degli impianti.',
    shortDescription: 'Ristrutturazione completa villa storica',
    service: 'renovation',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&bri=-30',
    afterImage: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    location: 'Bolzano, Italia',
    duration: '10 mesi',
    budget: '€250.000+',
    materials: ['Pietra naturale', 'Legno di abete', 'Cotto toscano', 'Laterizio'],
    testimonial: 'Eccezionali nel gestire una ristrutturazione complessa. Hanno preservato il carattere della villa modernizzandola.',
    testimonialAuthor: 'Dott. Schmidt',
    featured: true,
  },
  {
    id: '3',
    title: 'Impianto Solare Fotovoltaico - Residenziale',
    slug: 'impianto-solare-fotovoltaico',
    description: 'Installazione di un impianto fotovoltaico da 10kW con batteria di accumulo per una casa bifamiliare. Riduzione consumo energetico del 80%.',
    shortDescription: 'Impianto FV 10kW con accumulo',
    service: 'renewable-energy',
    image: 'https://images.unsplash.com/photo-1509391366360-2e938m30dae9?w=800&h=600&fit=crop',
    location: 'Brescia, Italia',
    duration: '3 settimane',
    budget: '€18.000',
    materials: ['Pannelli monocristallini', 'Inverter ibrido', 'Batteria LiFePO4', 'Strutture in alluminio'],
    testimonial: 'Grazie ai pannelli solari abbiamo azzerato la bolletta elettrica. Investimento eccellente!',
    testimonialAuthor: 'Sig. Bianchi',
    featured: false,
  },
  {
    id: '4',
    title: 'Giardino Contemporaneo - Design Minimalista',
    slug: 'giardino-contemporaneo-minimalista',
    description: 'Progettazione e realizzazione di un giardino minimalista con spazi funzionali, piante selezionate e irrigazione automatica smart.',
    shortDescription: 'Giardino moderno con design minimalista',
    service: 'gardens',
    image: 'https://images.unsplash.com/photo-1585320806472-9f933fb41e0a?w=800&h=600&fit=crop',
    location: 'Verona, Italia',
    duration: '2 mesi',
    budget: '€35.000',
    materials: ['Ghiaia decorativa', 'Legno di teak', 'Piante mediterranee', 'Irrigazione smart'],
    testimonial: 'Il nostro giardino è diventato un\'oasi. Design perfetto e piante che prosperano.',
    testimonialAuthor: 'Sig.ra Giulia',
    featured: false,
  },
  {
    id: '5',
    title: 'Appartamento Moderno - Interior Design Urbano',
    slug: 'appartamento-moderno-urbano',
    description: 'Trasformazione di un appartamento anni 80 in uno spazio moderno, luminoso e funzionale. Open space, palette neutra, soluzioni smart.',
    shortDescription: 'Redesign appartamento urbano contemporaneo',
    service: 'interior-design',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&bri=-25',
    afterImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    location: 'Torino, Italia',
    duration: '4 mesi',
    budget: '€85.000',
    materials: ['Cemento levigato', 'Legno chiaro', 'Acciaio', 'Ceramica'],
    testimonial: 'Lo spazio è completamente trasformato. Luminoso, accogliente e perfetto per la nostra famiglia.',
    testimonialAuthor: 'Famiglia Marconi',
    featured: false,
  },
  {
    id: '6',
    title: 'Pompa di Calore - Efficientamento Energetico',
    slug: 'pompa-di-calore-efficientamento',
    description: 'Installazione sistema di riscaldamento e raffrescamento a pompa di calore in villa. Integrazione con pannelli solari esistenti.',
    shortDescription: 'Sistema pompa di calore integrato',
    service: 'renewable-energy',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
    location: 'Padova, Italia',
    duration: '2 settimane',
    budget: '€22.000',
    materials: ['Pompa di calore inverter', 'Collettori riscaldati', 'Termostatico smart', 'Isolamento'],
    testimonial: 'Comfort ottimale tutto l\'anno con consumi minimali. Davvero consigliati!',
    testimonialAuthor: 'Ing. Ferrari',
    featured: false,
  },
  {
    id: '7',
    title: 'Giardino Verticale - Green Wall Urbana',
    slug: 'giardino-verticale-green-wall',
    description: 'Installazione di una green wall verticale in facciata con sistema di irrigazione automatico e manutenzione programmata.',
    shortDescription: 'Green wall verticale con irrigazione automatica',
    service: 'gardens',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    location: 'Milano, Italia',
    duration: '1 mese',
    budget: '€28.000',
    materials: ['Feltro orticolo', 'Piante rampicanti', 'Sistema irrigazione', 'Struttura in acciaio'],
    testimonial: 'La nostra facciata è ora un\'opera d\'arte vivente. Bellissimo e sostenibile!',
    testimonialAuthor: 'Azienda GreenTech',
    featured: false,
  },
  {
    id: '8',
    title: 'Ristrutturazione Bagno - Luxury Spa',
    slug: 'ristrutturazione-bagno-luxury',
    description: 'Trasformazione di un bagno standard in una spa di lusso con rivestimenti marmorizzati, vasca idromassaggio e sistemi di illuminazione.',
    shortDescription: 'Bagno trasformato in spa di lusso',
    service: 'renovation',
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop',
    beforeImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop&bri=-30',
    afterImage: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop',
    location: 'Como, Italia',
    duration: '3 mesi',
    budget: '€65.000',
    materials: ['Marmo nero', 'Acciaio inox', 'Vasca idromassaggio', 'Mosaico cristallo'],
    testimonial: 'Ogni mattina è come una visita alla spa. Consiglio vivamente DomusWerk.',
    testimonialAuthor: 'Dott.ssa Conti',
    featured: false,
  },
]

interface PortfolioGridProps {
  filter?: 'all' | 'interior-design' | 'renovation' | 'renewable-energy' | 'gardens'
}

export default function PortfolioGrid({ filter = 'all' }: PortfolioGridProps) {
  const [selectedFilter, setSelectedFilter] = useState(filter)

  const filteredProjects = selectedFilter === 'all'
    ? MOCK_PROJECTS
    : MOCK_PROJECTS.filter(p => p.service === selectedFilter)

  const serviceLabels: Record<string, string> = {
    'interior-design': 'Interior Design',
    'renovation': 'Ristrutturazione',
    'renewable-energy': 'Energie Rinnovabili',
    'gardens': 'Giardini',
  }

  const filters: Array<{ value: typeof filter; label: string }> = [
    { value: 'all', label: 'Tutti i Progetti' },
    { value: 'interior-design', label: 'Interior Design' },
    { value: 'renovation', label: 'Ristrutturazione' },
    { value: 'renewable-energy', label: 'Energie Rinnovabili' },
    { value: 'gardens', label: 'Giardini' },
  ]

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-black mb-4">Portfolio Progetti</h2>
          <p className="text-gray-600 text-lg">
            Una selezione dei nostri migliori lavori in Interior Design, Ristrutturazione, Energie Rinnovabili e Giardini
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setSelectedFilter(f.value)}
              className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                selectedFilter === f.value
                  ? 'bg-black text-white shadow-lg'
                  : 'bg-gray-100 text-black hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/portfolio/${project.slug}`}>
                <div className="cursor-pointer">
                  {/* Image Container */}
                  <div className="relative h-72 overflow-hidden rounded-lg bg-gray-200 mb-4">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {project.featured && (
                      <div className="absolute top-4 right-4 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold">
                        In Evidenza
                      </div>
                    )}
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end">
                      <div className="w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <button className="w-full bg-white text-black py-2 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-100">
                          Visualizza Progetto
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                      {serviceLabels[project.service]}
                    </span>
                    <h3 className="text-xl font-bold text-black mt-2 mb-2 group-hover:text-gray-700 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.shortDescription}
                    </p>
                    
                    {/* Project Info */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{project.location}</span>
                      <span className="text-gray-500">{project.duration}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Nessun progetto trovato per questa categoria</p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link href="/contatti">
            <button className="px-8 py-4 bg-black text-white rounded-lg font-semibold hover:bg-gray-900 transition-colors">
              Richiedi una Consulenza Gratuita
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
