'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'María González',
    role: 'Estudiante de Odontología',
    university: 'Universidad Nacional',
    content: 'OdontoFlash ha revolucionado mi formación clínica. He podido atender a pacientes reales y ganar experiencia práctica invaluable. El sistema de calificaciones me ayuda a mejorar constantemente.',
    rating: 5,
    avatar: 'MG'
  },
  {
    name: 'Carlos Ruiz',
    role: 'Paciente',
    age: '45 años',
    content: 'Excelente servicio. Mi estudiante fue muy profesional y el tratamiento de limpieza dental fue perfecto. Además, el precio fue muy accesible. Definitivamente recomiendo la plataforma.',
    rating: 5,
    avatar: 'CR'
  },
  {
    name: 'Ana Martínez',
    role: 'Estudiante de Odontología',
    university: 'Universidad de los Andes',
    content: 'La plataforma me ha permitido especializarme en ortodoncia trabajando con pacientes específicos. El sistema de descuentos es genial para los pacientes y la comunicación es muy fluida.',
    rating: 5,
    avatar: 'AM'
  },
  {
    name: 'Roberto Silva',
    role: 'Paciente',
    age: '32 años',
    content: 'Necesitaba un tratamiento de endodoncia y encontré un estudiante muy capacitado. El proceso fue transparente, seguro y el resultado fue excelente. Muy recomendado.',
    rating: 5,
    avatar: 'RS'
  },
  {
    name: 'Laura Fernández',
    role: 'Estudiante de Odontología',
    university: 'Universidad Javeriana',
    content: 'Como estudiante, OdontoFlash me ha dado la oportunidad de practicar con diferentes tipos de casos clínicos. La retroalimentación de los pacientes es muy valiosa para mi formación.',
    rating: 5,
    avatar: 'LF'
  },
  {
    name: 'Miguel Torres',
    role: 'Paciente',
    age: '28 años',
    content: 'El tratamiento de blanqueamiento dental fue excelente. Mi estudiante fue muy cuidadoso y profesional. La plataforma es fácil de usar y muy confiable.',
    rating: 5,
    avatar: 'MT'
  }
]

export function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Lo que dicen nuestros usuarios
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Testimonios reales de estudiantes y pacientes que han transformado 
            su experiencia odontológica con OdontoFlash.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {testimonial.avatar}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      {testimonial.university && (
                        <p className="text-xs text-muted-foreground">{testimonial.university}</p>
                      )}
                      {testimonial.age && (
                        <p className="text-xs text-muted-foreground">{testimonial.age}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 h-6 w-6 text-muted-foreground/20" />
                    <p className="text-muted-foreground text-sm leading-relaxed pl-4">
                      "{testimonial.content}"
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
                  <div className="text-sm text-muted-foreground">Calificación promedio</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary mb-2">98%</div>
                  <div className="text-sm text-muted-foreground">Satisfacción</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent mb-2">500+</div>
                  <div className="text-sm text-muted-foreground">Testimonios</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                  <div className="text-sm text-muted-foreground">Soporte</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
