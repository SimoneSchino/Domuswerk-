'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Mail, Phone } from 'lucide-react';
import { services } from '@/data/mock-data';

interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

const timeSlots = [
  '09:00',
  '10:00',
  '11:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
];

export default function BookingPage() {
  const [step, setStep] = useState<'service' | 'datetime' | 'personal' | 'confirm'>('service');
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleServiceSelect = (serviceId: string) => {
    setFormData({ ...formData, service: serviceId });
    setStep('datetime');
  };

  const handleDateTimeSelect = () => {
    if (formData.date && formData.time) {
      setStep('personal');
    }
  };

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirm');
  };

  const handleConfirm = () => {
    console.log('Booking submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setStep('service');
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        date: '',
        time: '',
        message: '',
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-white pt-20">
      {/* Hero */}
      <section className="px-4 py-12 md:py-20 border-b border-gray-200">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">Prenota una Consulenza</h1>
          <p className="text-lg text-gray-600">
            Scegli il servizio e seleziona la data e l'ora che preferisci. Preferibilmente online o in sede.
          </p>
        </motion.div>
      </section>

      {/* Booking Form */}
      <section className="px-4 py-12 md:py-20">
        <div className="max-w-2xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-12">
            {(['service', 'datetime', 'personal', 'confirm'] as const).map((stepName, index) => (
              <div key={stepName} className="flex items-center">
                <motion.div
                  animate={{
                    backgroundColor: ['service', 'datetime', 'personal', 'confirm'].indexOf(step) >= index ? '#000' : '#e5e7eb',
                  }}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                >
                  {index + 1}
                </motion.div>
                {index < 3 && <div className="hidden md:block w-20 h-1 bg-gray-300 mx-2" />}
              </div>
            ))}
          </div>

          {/* Step: Service Selection */}
          {step === 'service' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold text-black mb-6">Seleziona un Servizio</h2>
              <div className="grid grid-cols-1 gap-4">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className="p-4 text-left border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-50 transition-all group"
                  >
                    <h3 className="font-bold text-black text-lg group-hover:text-black transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step: Date & Time Selection */}
          {step === 'datetime' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold text-black mb-6">
                Seleziona Data e Ora
              </h2>
              <div className="space-y-6">
                {/* Date */}
                <div>
                  <label className="flex items-center gap-2 font-bold text-black mb-3">
                    <Calendar className="w-5 h-5" />
                    Data
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>

                {/* Time */}
                {formData.date && (
                  <div>
                    <label className="flex items-center gap-2 font-bold text-black mb-3">
                      <Clock className="w-5 h-5" />
                      Ora
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setFormData({ ...formData, time })}
                          className={`py-2 px-3 rounded-lg font-medium transition-all ${
                            formData.time === time
                              ? 'bg-black text-white'
                              : 'bg-gray-200 text-black hover:bg-gray-300'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Next Button */}
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setStep('service')}
                    className="flex-1 py-3 px-6 border-2 border-gray-300 rounded-lg font-bold text-black hover:bg-gray-50 transition-colors"
                  >
                    Indietro
                  </button>
                  <button
                    onClick={handleDateTimeSelect}
                    disabled={!formData.date || !formData.time}
                    className="flex-1 py-3 px-6 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continua
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step: Personal Information */}
          {step === 'personal' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold text-black mb-6">I Tuoi Dati</h2>
              <form onSubmit={handlePersonalSubmit} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="flex items-center gap-2 font-bold text-black mb-2">
                    <User className="w-5 h-5" />
                    Nome Completo
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="flex items-center gap-2 font-bold text-black mb-2">
                    <Mail className="w-5 h-5" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="flex items-center gap-2 font-bold text-black mb-2">
                    <Phone className="w-5 h-5" />
                    Telefono
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="font-bold text-black mb-2 block">Messaggio (Opzionale)</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Aggiungi dettagli sulla tua richiesta..."
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                  />
                </div>

                {/* Buttons */}
                <div className="flex gap-4 mt-8">
                  <button
                    type="button"
                    onClick={() => setStep('datetime')}
                    className="flex-1 py-3 px-6 border-2 border-gray-300 rounded-lg font-bold text-black hover:bg-gray-50 transition-colors"
                  >
                    Indietro
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-6 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition-colors"
                  >
                    Anteprima Prenotazione
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Step: Confirmation */}
          {step === 'confirm' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h2 className="text-2xl font-bold text-black mb-6">Conferma Prenotazione</h2>
              <div className="space-y-4 p-6 bg-gray-50 rounded-lg border border-gray-200 mb-8">
                <div className="flex justify-between">
                  <span className="text-gray-600">Servizio:</span>
                  <span className="font-bold text-black">
                    {services.find((s) => s.id === formData.service)?.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data:</span>
                  <span className="font-bold text-black">{formData.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ora:</span>
                  <span className="font-bold text-black">{formData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Nome:</span>
                  <span className="font-bold text-black">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-bold text-black">{formData.email}</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setStep('personal')}
                  className="flex-1 py-3 px-6 border-2 border-gray-300 rounded-lg font-bold text-black hover:bg-gray-50 transition-colors"
                >
                  Modifica
                </button>
                <button
                  onClick={handleConfirm}
                  className="flex-1 py-3 px-6 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-5 h-5" />
                  Conferma Prenotazione
                </button>
              </div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-900"
                >
                  ✓ Prenotazione confermata! Riceverai un'email di conferma.
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}
