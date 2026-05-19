'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, AlertCircle } from 'lucide-react';
import { services } from '@/data/mock-data';

interface ContactFormProps {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Nome richiesto';
    if (!formData.email.trim()) newErrors.email = 'Email richiesta';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email non valida';
    }
    if (!formData.phone.trim()) newErrors.phone = 'Telefono richiesto';
    if (!formData.service) newErrors.service = 'Seleziona un servizio';
    if (!formData.message.trim()) newErrors.message = 'Messaggio richiesto';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simula invio email
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      onSuccess?.();
      setFormData({ name: '', email: '', phone: '', service: '', message: '' });
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-6 p-6 md:p-8 bg-gray-50 rounded-lg border border-gray-200"
    >
      {/* Name */}
      <div>
        <label htmlFor="name" className="block font-bold text-black mb-2">
          Nome *
        </label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-colors ${
            errors.name ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-black'
          }`}
          placeholder="Il tuo nome"
        />
        {errors.name && (
          <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.name}
          </div>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block font-bold text-black mb-2">
          Email *
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-colors ${
            errors.email ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-black'
          }`}
          placeholder="tua@email.it"
        />
        {errors.email && (
          <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.email}
          </div>
        )}
      </div>

      {/* Phone */}
      <div>
        <label htmlFor="phone" className="block font-bold text-black mb-2">
          Telefono *
        </label>
        <input
          type="tel"
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-colors ${
            errors.phone ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-black'
          }`}
          placeholder="+39 123 456 7890"
        />
        {errors.phone && (
          <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.phone}
          </div>
        )}
      </div>

      {/* Service Select */}
      <div>
        <label htmlFor="service" className="block font-bold text-black mb-2">
          Servizio *
        </label>
        <select
          id="service"
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-colors ${
            errors.service ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-black'
          }`}
        >
          <option value="">Seleziona un servizio...</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
        {errors.service && (
          <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.service}
          </div>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block font-bold text-black mb-2">
          Messaggio *
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={5}
          className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition-colors resize-none ${
            errors.message ? 'border-red-500 focus:border-red-600' : 'border-gray-300 focus:border-black'
          }`}
          placeholder="Raccontaci del tuo progetto..."
        />
        {errors.message && (
          <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
            <AlertCircle className="w-4 h-4" />
            {errors.message}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 px-6 bg-black text-white rounded-lg font-bold hover:bg-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Invio in corso...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Invia Messaggio
          </>
        )}
      </button>
    </motion.form>
  );
}
