'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  UserPlus, 
  Search, 
  Calendar, 
  MessageCircle, 
  Star, 
  CheckCircle,
  ArrowRight
} from 'lucide-react'

const steps = [
  {
    step: 1,
    icon: UserPlus,
    title: 'Registro',
    description: 'Los pacientes se registran especificando sus necesidades odontológicas y ubicación. Los estudiantes crean su perfil profesional.',
    color: 'from-blue-500 to-purple-400'
  },
  {
    step: 2,
    icon: Search,
    title: 'Selección de Pacientes',
    description: 'Los estudiantes buscan y seleccionan pacientes según sus especialidades, ubicación geográfica y disponibilidad.',
    color: 'from-purple-500 to-violet-500'
  },
  {
    step: 3,
    icon: Calendar,
    title: 'Programación de Citas',
    description: 'Se coordina la fecha y hora de la cita odontológica según la disponibilidad del calendario del estudiante.',
    color: 'from-violet-500 to-purple-600'
  },
  {
    step: 4,
    icon: MessageCircle,
    title: 'Comunicación',
    description: 'Chat directo para coordinar detalles del tratamiento y resolver dudas antes de la cita.',
    color: 'from-purple-600 to-indigo-500'
  },
  {
    step: 5,
    icon: CheckCircle,
    title: 'Realización del Tratamiento',
    description: 'Se lleva a cabo la consulta odontológica con supervisión profesional cuando sea necesario.',
    color: 'from-indigo-500 to-violet-500'
  },
  {
    step: 6,
    icon: Star,
    title: 'Calificación y Feedback',
    description: 'Ambas partes califican la experiencia y proporcionan comentarios para mejorar el servicio.',
    color: 'from-purple-500 to-pink-500'
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Cómo Funciona
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Un proceso simple y eficiente que conecta estudiantes con pacientes 
            en solo 6 pasos fáciles.
          </p>
        </motion.div>

        <div className="space-y-8">
          {steps.map((step: any, index: number) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex flex-col lg:flex-row items-center gap-8">
                {/* Step Content */}
                <div className={`flex-1 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <Card className="h-full">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${step.color} text-white`}>
                          <step.icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">Paso {step.step}</CardTitle>
                          <CardDescription className="text-lg font-medium">
                            {step.title}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Step Number */}
                <div className={`flex-shrink-0 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                    {step.step}
                  </div>
                </div>

                {/* Arrow (except for last step) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">
                ¿Listo para comenzar?
              </h3>
              <p className="text-lg text-muted-foreground mb-6">
                Únete a la comunidad de estudiantes y pacientes que ya están 
                transformando la educación odontológica.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Estudiantes activos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">1,200+</div>
                  <div className="text-sm text-muted-foreground">Pacientes atendidos</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfacción</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
