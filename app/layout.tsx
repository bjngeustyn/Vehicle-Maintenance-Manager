import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Motora â€” Vehicle Maintenance Manager',
  description: 'Know your car, know your costs, and never miss a service.',
  metadataBase: new URL('https://motora.openai.site'),
  openGraph: {
    title: 'Motora â€” Vehicle Maintenance Manager',
    description: 'Know your car, know your costs, and never miss a service.',
    images: ['/og.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Motora â€” Vehicle Maintenance Manager',
    description: 'Know your car, know your costs, and never miss a service.',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

