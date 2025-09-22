import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OdontoFlash - Plataforma para Estudiantes de Odontología',
  description: 'Conecta estudiantes de odontología con pacientes que necesitan atención dental. Sistema de calificaciones y descuentos incluido.',
  keywords: 'odontología, estudiantes, pacientes, citas, calificaciones, descuentos',
  authors: [{ name: 'OdontoFlash Team' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'OdontoFlash - Plataforma para Estudiantes de Odontología',
    description: 'Conecta estudiantes de odontología con pacientes que necesitan atención dental.',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OdontoFlash - Plataforma para Estudiantes de Odontología',
    description: 'Conecta estudiantes de odontología con pacientes que necesitan atención dental.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
