'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Star } from 'lucide-react';
import { services, projects } from '@/data/mock-data';
import ContactCTA from '@/components/contact-cta';

interface ServicePageProps {
  params: {
    slug: string;
  };
}

const serviceDetails: Record<
  string,
  {
    features: string[];
    process: string[];
    testimonial: {
      text: string;
      author: string;
      role: string;
      rating: number;
    };
    faq: Array<{ q: string; a: string }>;
  }
> = {
  'interior-design': {
    features: [
      'Consulenza progettuale personalizzata',
      'Rendering 3D e visualizzazione',
      'Selezione materiali e finiture',
      'Gestione fornitori',
      'Supporto durante i lavori',
      'Styling finale',
    ],
    process: [
      'Briefing e raccolta esigenze',
      'Analisi dello spazio',
      'Proposta progettuale',
      'Affinamento design',
      'Implementazione',
      'Consegna finale',
    ],
    testimonial: {
      text: 'DomusWerk ha trasformato il nostro spazio in una casa da sogno. Professionalità e creatività sono stati i punti forti.',
      author: 'Marco Rossi',
      role: 'Cliente Milano',
      rating: 5,
    },
    faq: [
      {
        q: 'Quanto tempo richiede un progetto?',
        a: 'Un progetto completo richiede solitamente 2-4 mesi, in base alla complessità dello spazio.',
      },
      {
        q: 'Qual è il costo medio?',
        a: 'I costi variano in base alle dimensioni e ai materiali. Contattaci per un preventivo personalizzato.',
      },
      {
        q: 'Siete disponibili per consultazioni online?',
        a: 'Sì, offriamo consultazioni online e in sede. Scegli la modalità che preferisci.',
      },
    ],
  },
  'ristrutturazione': {
    features: [
      'Progettazione ristrutturazione',
      'Gestione budget',
      'Coordin cronometraggio lavori',
      'Supervisione cantiere',
      'Certificazioni tecniche',
      'Garanzie lavori',
    ],
    process: [
      'Ispezione e valutazione',
      'Pianificazione progettuale',
      'Permessi e documentazione',
      'Esecuzione lavori',
      'Controlli qualità',
      'Collaudo finale',
    ],
    testimonial: {
      text: 'La nostra ristrutturazione è stata completata perfettamente, nel budget e nei tempi previsti.',
      author: 'Elena Bianchi',
      role: 'Cliente Torino',
      rating: 5,
    },
    faq: [
      {
        q: 'Quali permessi sono necessari?',
        a: 'Dipende dalla portata dei lavori. Ci occupiamo noi di tutte le pratiche necessarie.',
      },
      {
        q: 'Posso continuare a vivere durante i lavori?',
        a: 'Dipende dal tipo di ristrutturazione. Valutiamo le soluzioni migliori per la tua situazione.',
      },
    ],
  },
  'energie-rinnovabili': {
    features: [
      'Audit energetico',
      'Progettazione impianti solari',
      'Pompe di calore',
      'Sistemi di accumulo',
      'Gestione incentivi',
      'Manutenzione',
    ],
    process: [
      'Valutazione potenziale',
      'Progettazione sistema',
      'Richiesta incentivi',
      'Installazione',
      'Collaudo e certificazione',
      'Training e supporto',
    ],
    testimonial: {
      text: 'Grazie al sistema solare di DomusWerk, abbiamo ridotto i costi energetici del 60%.',
      author: 'Giovanni Verdi',
      role: 'Cliente Palermo',
      rating: 5,
    },
    faq: [
      {
        q: 'Quali incentivi sono disponibili?',
        a: 'Sono disponibili vari incentivi statali. Analizziamo i migliori per la tua situazione.',
      },
      {
        q: 'Quanto tempo per l\'installazione?',
        a: 'Un impianto solare tipico richiede 1-2 settimane di installazione.',
      },
    ],
  },
  'giardini': {
    features: [
      'Progettazione paesaggistica',
      'Scelta piante',
      'Impianti irrigazione',
      'Arredi da giardino',
      'Illuminazione esterna',
      'Manutenzione periodica',
    ],
    process: [
      'Sopralluogo e misure',
      'Concept design',
      'Scelta elementi',
      'Preparazione terreno',
      'Impianto piante',
      'Finitura e styling',
    ],
    testimonial: {
      text: 'Il nostro giardino è diventato l\'estensione perfetta della nostra casa. Semplicemente bellissimo!',
      author: 'Laura Ferrari',
      role: 'Cliente Bergamo',
      rating: 5,
    },
    faq: [
      {
        q: 'Qual è la stagione migliore?',
        a: 'Primavera e autunno sono ideali. Possiamo fare però anche in altre stagioni.',
      },
      {
        q: 'Come mantenerlo nel tempo?',
        a: 'Offriamo pacchetti di manutenzione mensile o stagionale in base alle tue esigenze.',
      },
    ],
  },
};

const slugToId: Record<string, string> = {
  'interior-design': 'interior-design',
  'ristrutturazione': 'renovation',
  'energie-rinnovabili': 'renewable-energy',
  'giardini': 'gardens',
};

export default function ServicePage({ params }: ServicePageProps) {
  const serviceId = slugToId[params.slug];
  const service = services.find((s) => s.id === serviceId);
  const details = serviceDetails[params.slug];
  const relatedProjects = projects.filter((p) => p.serviceId === serviceId).slice(0, 3);

  if (!service || !details) {
    return (
      <main className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Servizio non trovato</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            ← Torna alla home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="relative h-96 md:h-[500px] bg-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent z-10" />
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 h-full flex flex-col justify-center px-4 text-white"
        >
          <div className="max-w-6xl mx-auto w-full">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{service.name}</h1>
            <p className="text-lg text-gray-300 max-w-2xl">{service.description}</p>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-black mb-12">Cosa Offriamo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {details.features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-black transition-colors"
              >
                <Check className="w-6 h-6 text-black flex-shrink-0 mt-0.5" />
                <p className="text-gray-700">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-4 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-black mb-12">Il Nostro Processo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {details.process.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-black text-lg mb-2">{step}</h3>
                    <p className="text-gray-600 text-sm">
                      Fase {index + 1} del nostro processo professionale.
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-6 flex justify-center">
            {Array.from({ length: details.testimonial.rating }).map((_, i) => (
              <Star key={i} className="w-5 h-5 text-black fill-black" />
            ))}
          </div>
          <blockquote className="text-2xl font-bold text-black mb-6 italic">
            "{details.testimonial.text}"
          </blockquote>
          <div>
            <p className="font-bold text-black">{details.testimonial.author}</p>
            <p className="text-gray-600">{details.testimonial.role}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-black mb-12 text-center">Domande Frequenti</h2>
          <div className="space-y-4">
            {details.faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="p-4 bg-white rounded-lg border border-gray-200 hover:border-black transition-colors"
              >
                <h3 className="font-bold text-black mb-2">{item.q}</h3>
                <p className="text-gray-600 text-sm">{item.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-black mb-12">Progetti Correlati</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {relatedProjects.map((project) => (
                <Link key={project.id} href={`/portfolio/${project.id}`}>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="group cursor-pointer overflow-hidden rounded-lg bg-gray-100 aspect-square relative"
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all" />
                  </motion.div>
                </Link>
              ))}
            </div>
            <Link href="/portfolio" className="inline-flex items-center gap-2 text-black font-bold hover:gap-3 transition-all">
              Vedi tutti i progetti <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <ContactCTA
        title={`Inizia il tuo progetto ${service.name}`}
        description="Contattaci oggi per una consulenza gratuita e scopri come possiamo aiutarti."
      />
    </main>
  );
}
