'use client';

import { motion } from 'framer-motion';
import { BarChart3, Mail, Calendar, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: TrendingUp,
    label: 'Visitatori Mese',
    value: '2,341',
    change: '+12%',
    color: 'text-blue-600',
  },
  {
    icon: Mail,
    label: 'Messaggi',
    value: '8',
    change: '3 nuovi',
    color: 'text-green-600',
  },
  {
    icon: Calendar,
    label: 'Prenotazioni',
    value: '12',
    change: '2 in sospeso',
    color: 'text-purple-600',
  },
  {
    icon: BarChart3,
    label: 'Progetti',
    value: '6',
    change: 'Attivi',
    color: 'text-orange-600',
  },
];

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-gray-100 pt-20">
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="px-4 md:px-8 py-6">
          <h1 className="text-3xl font-bold text-black">Dashboard Admin</h1>
          <p className="text-gray-600 text-sm mt-1">Benvenuto in DomusWerk Admin</p>
        </div>
      </div>

      <div className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-lg bg-gray-100 ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-gray-600">{stat.change}</span>
                </div>
                <h3 className="text-gray-600 text-sm mb-1">{stat.label}</h3>
                <p className="text-3xl font-bold text-black">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6"
          >
            <h2 className="text-xl font-bold text-black mb-6">Messaggi Recenti</h2>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-0">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="flex-1">
                    <p className="font-semibold text-black">Cliente {i}</p>
                    <p className="text-sm text-gray-600">Interesse per il servizio...</p>
                    <p className="text-xs text-gray-500 mt-1">2 ore fa</p>
                  </div>
                  <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded hover:bg-blue-200 transition-colors">
                    Leggi
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <h2 className="text-xl font-bold text-black mb-6">Azioni Rapide</h2>
            <div className="space-y-3">
              <button className="w-full py-2 px-4 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors font-medium text-sm">
                + Nuovo Progetto
              </button>
              <button className="w-full py-2 px-4 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm">
                + Nuovo Testimonial
              </button>
              <button className="w-full py-2 px-4 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm">
                Vedi Prenotazioni
              </button>
              <button className="w-full py-2 px-4 bg-gray-100 text-black rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm">
                Impostazioni
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
