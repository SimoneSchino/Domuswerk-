import { Metadata } from 'next';

export const baseMetadata: Metadata = {
  title: 'DomusWerk | Interior Design, Ristrutturazione e Giardini',
  description:
    'Scopri i servizi professionali di DomusWerk: interior design, ristrutturazione, energie rinnovabili e giardini. Portfolio completo e prenotazioni online.',
  keywords: [
    'interior design',
    'ristrutturazione',
    'energie rinnovabili',
    'giardini',
    'design',
    'Milano',
  ],
  authors: [{ name: 'DomusWerk Team' }],
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://domuswerk.it',
    siteName: 'DomusWerk',
    title: 'DomusWerk | Interior Design, Ristrutturazione e Giardini',
    description:
      'Scopri i servizi professionali di DomusWerk: interior design, ristrutturazione, energie rinnovabili e giardini.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DomusWerk',
    description: 'Servizi di interior design, ristrutturazione e giardini',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generatePageMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  return {
    title: `${title} | DomusWerk`,
    description,
    openGraph: {
      title: `${title} | DomusWerk`,
      description,
      url: `https://domuswerk.it${path}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://domuswerk.it${path}`,
    },
  };
}
