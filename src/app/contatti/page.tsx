'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';
import ContactForm from '@/components/contact-form';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="px-4 py-12 md:py-20 border-b border-gray-200">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Contattaci</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Siamo pronti a discutere il tuo prossimo progetto. Contattaci oggi stesso!
          </p>
        </motion.div>
      </section>

      {/* Content */}
      <section className="px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Email */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-black">Email</h3>
                </div>
                <p className="text-gray-600 ml-13">info@domuswerk.it</p>
                <p className="text-gray-600 ml-13 text-sm">Rispondiamo entro 24 ore</p>
              </div>

              {/* Phone */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-black">Telefono</h3>
                </div>
                <p className="text-gray-600 ml-13">+39 123 456 7890</p>
                <p className="text-gray-600 ml-13 text-sm">Lun-Ven, 09:00-18:00</p>
              </div>

              {/* Location */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-black">Ubicazione</h3>
                </div>
                <p className="text-gray-600 ml-13">Via Design, 123</p>
                <p className="text-gray-600 ml-13 text-sm">Milano, Italia</p>
              </div>

              {/* Social */}
              <div>
                <h3 className="text-lg font-bold text-black mb-3">Seguici</h3>
                <div className="flex gap-4 ml-13">
                  {['Instagram', 'Facebook', 'LinkedIn'].map((social) => (
                    <button
                      key={social}
                      className="w-10 h-10 bg-gray-200 hover:bg-black text-black hover:text-white rounded-full flex items-center justify-center transition-all"
                    >
                      {social[0]}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 px-6 bg-green-50 border-2 border-green-200 rounded-lg"
                >
                  <CheckCircle className="w-16 h-16 text-green-600 mb-4" />
                  <h3 className="text-2xl font-bold text-green-900 mb-2">Messaggio Inviato!</h3>
                  <p className="text-green-800 text-center max-w-sm">
                    Grazie per averci contattato. Riceverai una risposta entro 24 ore.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Invia un altro messaggio
                  </button>
                </motion.div>
              ) : (
                <ContactForm onSuccess={() => setSubmitted(true)} />
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
