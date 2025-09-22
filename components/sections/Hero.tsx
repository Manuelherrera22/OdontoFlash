'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, Star, Shield } from 'lucide-react'

interface HeroProps {
  onAuth: (type: 'login' | 'register') => void
}

export function Hero({ onAuth }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
      
      <div className="container relative">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              >
                Conecta{' '}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Estudiantes
                </span>{' '}
                con{' '}
                <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  Pacientes
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg text-muted-foreground sm:text-xl"
              >
                La plataforma que revoluciona la educación odontológica conectando 
                estudiantes con pacientes reales. Sistema de calificaciones, 
                descuentos y gratuidad incluidos.
              </motion.p>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">500+</div>
                <div className="text-sm text-muted-foreground">Estudiantes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary">1,200+</div>
                <div className="text-sm text-muted-foreground">Pacientes</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">4.8★</div>
                <div className="text-sm text-muted-foreground">Calificación</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                variant="gradient"
                onClick={() => onAuth('register')}
                className="group"
              >
                Comenzar Ahora
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onAuth('login')}
              >
                Ya tengo cuenta
              </Button>
            </motion.div>

            {/* Features Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-6 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span>Registro gratuito</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-secondary" />
                <span>Sistema de calificaciones</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-accent" />
                <span>100% seguro</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Hero Image/Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 p-8">
              {/* Mockup of the app interface */}
              <div className="space-y-4">
                <div className="rounded-lg bg-card p-4 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">María González</div>
                      <div className="text-xs text-muted-foreground">Estudiante de Odontología</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    "Excelente experiencia con mi paciente. Muy profesional y atenta."
                  </div>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>

                <div className="rounded-lg bg-card p-4 shadow-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-full bg-secondary/20 flex items-center justify-center">
                      <Shield className="h-4 w-4 text-secondary" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm">Carlos Ruiz</div>
                      <div className="text-xs text-muted-foreground">Paciente</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    "Tratamiento de limpieza dental. Muy satisfecho con el servicio."
                  </div>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
