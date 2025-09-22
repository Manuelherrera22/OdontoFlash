'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Users, 
  Star, 
  CreditCard, 
  Shield, 
  Calendar, 
  MessageCircle,
  GraduationCap,
  Heart,
  Clock,
  CheckCircle
} from 'lucide-react'

const features = [
  {
    icon: Users,
    title: 'Registro de Pacientes',
    description: 'Los pacientes pueden registrarse según sus necesidades odontológicas específicas.',
    color: 'text-blue-500'
  },
  {
    icon: GraduationCap,
    title: 'Selección de Estudiantes',
    description: 'Los estudiantes pueden elegir pacientes según sus requerimientos y especialización.',
    color: 'text-green-500'
  },
  {
    icon: Star,
    title: 'Sistema de Calificaciones',
    description: 'Calificación bidireccional entre estudiantes y pacientes para garantizar calidad.',
    color: 'text-yellow-500'
  },
  {
    icon: CreditCard,
    title: 'Descuentos y Gratuidad',
    description: 'Sistema flexible de precios con opciones de descuento y tratamientos gratuitos.',
    color: 'text-purple-500'
  },
  {
    icon: Calendar,
    title: 'Gestión de Citas',
    description: 'Sistema completo de programación y gestión de citas odontológicas.',
    color: 'text-indigo-500'
  },
  {
    icon: MessageCircle,
    title: 'Comunicación Directa',
    description: 'Chat integrado para comunicación entre estudiantes y pacientes.',
    color: 'text-pink-500'
  },
  {
    icon: Shield,
    title: 'Seguridad Garantizada',
    description: 'Protección de datos y privacidad con los más altos estándares de seguridad.',
    color: 'text-red-500'
  },
  {
    icon: Heart,
    title: 'Atención Personalizada',
    description: 'Cada paciente recibe atención personalizada según sus necesidades específicas.',
    color: 'text-rose-500'
  },
  {
    icon: Clock,
    title: 'Disponibilidad 24/7',
    description: 'Plataforma disponible las 24 horas para gestionar citas y consultas.',
    color: 'text-orange-500'
  },
  {
    icon: CheckCircle,
    title: 'Certificación Profesional',
    description: 'Los estudiantes obtienen certificación de sus prácticas clínicas.',
    color: 'text-emerald-500'
  }
]

export function Features() {
  return (
    <section id="features" className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Características Principales
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Una plataforma completa diseñada específicamente para la educación odontológica
            con todas las herramientas necesarias para el éxito.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature: any, index: number) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg bg-muted ${feature.color}`}>
                      <feature.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="max-w-4xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                ¿Por qué elegir OdontoFlash?
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Somos la única plataforma diseñada específicamente para conectar estudiantes 
                de odontología con pacientes reales, ofreciendo una experiencia educativa 
                completa y profesional.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Gratuito para estudiantes</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Soporte disponible</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Citas exitosas</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
