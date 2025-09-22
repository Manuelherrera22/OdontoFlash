'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  DollarSign,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'

interface Appointment {
  id: string
  title: string
  description?: string
  date: string
  duration: number
  status: 'SCHEDULED' | 'CONFIRMED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
  price?: number
  discount?: number
  isFree: boolean
  student: {
    firstName: string
    lastName: string
    email: string
  }
  patient: {
    firstName: string
    lastName: string
    email: string
  }
}

const statusConfig = {
  SCHEDULED: { label: 'Programada', color: 'bg-blue-500', icon: Calendar },
  CONFIRMED: { label: 'Confirmada', color: 'bg-green-500', icon: CheckCircle },
  IN_PROGRESS: { label: 'En Progreso', color: 'bg-yellow-500', icon: Clock },
  COMPLETED: { label: 'Completada', color: 'bg-emerald-500', icon: CheckCircle },
  CANCELLED: { label: 'Cancelada', color: 'bg-red-500', icon: XCircle },
  NO_SHOW: { label: 'No Asistió', color: 'bg-gray-500', icon: AlertCircle }
}

export function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterStatus, setFilterStatus] = useState<string>('')

  useEffect(() => {
    const loadAppointments = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/appointments')
        const data = await response.json()
        if (data.success) {
          setAppointments(data.appointments)
        }
      } catch (error) {
        console.error('Error loading appointments:', error)
        // Mock data for demo
        setAppointments([
          {
            id: '1',
            title: 'Limpieza Dental',
            description: 'Limpieza dental completa y profilaxis',
            date: '2024-01-15T10:00:00Z',
            duration: 60,
            status: 'CONFIRMED',
            price: 50000,
            discount: 20,
            isFree: false,
            student: {
              firstName: 'Laura',
              lastName: 'Fernández',
              email: 'laura@email.com'
            },
            patient: {
              firstName: 'María',
              lastName: 'González',
              email: 'maria@email.com'
            }
          },
          {
            id: '2',
            title: 'Consulta de Ortodoncia',
            description: 'Evaluación inicial para tratamiento de ortodoncia',
            date: '2024-01-16T14:30:00Z',
            duration: 90,
            status: 'SCHEDULED',
            price: 80000,
            discount: 0,
            isFree: false,
            student: {
              firstName: 'Miguel',
              lastName: 'Torres',
              email: 'miguel@email.com'
            },
            patient: {
              firstName: 'Carlos',
              lastName: 'Ruiz',
              email: 'carlos@email.com'
            }
          },
          {
            id: '3',
            title: 'Endodoncia',
            description: 'Tratamiento de conducto en molar superior',
            date: '2024-01-12T09:00:00Z',
            duration: 120,
            status: 'COMPLETED',
            price: 120000,
            discount: 50,
            isFree: false,
            student: {
              firstName: 'Sofia',
              lastName: 'Ramírez',
              email: 'sofia@email.com'
            },
            patient: {
              firstName: 'Ana',
              lastName: 'Martínez',
              email: 'ana@email.com'
            }
          }
        ])
      }
      setIsLoading(false)
    }

    loadAppointments()
  }, [])

  const filteredAppointments = appointments.filter(appointment => 
    !filterStatus || appointment.status === filterStatus
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const calculatePrice = (appointment: Appointment) => {
    if (appointment.isFree) return 0
    if (!appointment.price) return 0
    if (appointment.discount) {
      return appointment.price * (1 - appointment.discount / 100)
    }
    return appointment.price
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_: any, i: number) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-1/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Mis Citas
          </CardTitle>
          <CardDescription>
            Gestiona tus citas odontológicas programadas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filterStatus === '' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterStatus('')}
            >
              Todas
            </Button>
            {Object.entries(statusConfig).map(([status, config]: [string, any]) => (
              <Button
                key={status}
                variant={filterStatus === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="flex items-center gap-2"
              >
                <config.icon className="h-3 w-3" />
                {config.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Appointment List */}
      <div className="grid gap-4">
        {filteredAppointments.map((appointment: any, index: number) => {
          const StatusIcon = statusConfig[appointment.status].icon
          const finalPrice = calculatePrice(appointment)
          
          return (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-3 h-3 rounded-full ${statusConfig[appointment.status].color}`}></div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {appointment.title}
                        </h3>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <StatusIcon className="h-3 w-3" />
                          {statusConfig[appointment.status].label}
                        </Badge>
                      </div>

                      {appointment.description && (
                        <p className="text-muted-foreground mb-4">{appointment.description}</p>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(appointment.date)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{formatDuration(appointment.duration)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>
                            {appointment.student.firstName} {appointment.student.lastName}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="h-4 w-4" />
                          <span>
                            {appointment.patient.firstName} {appointment.patient.lastName}
                          </span>
                        </div>
                      </div>

                      {appointment.price && (
                        <div className="flex items-center gap-2 text-sm">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-medium">
                            {appointment.isFree ? (
                              <span className="text-green-500">Gratuito</span>
                            ) : (
                              <>
                                <span className={appointment.discount ? 'line-through text-muted-foreground' : ''}>
                                  ${appointment.price.toLocaleString()}
                                </span>
                                {appointment.discount && (
                                  <>
                                    <span className="text-green-500 ml-2">
                                      ${finalPrice.toLocaleString()}
                                    </span>
                                    <Badge variant="secondary" className="ml-2">
                                      -{appointment.discount}%
                                    </Badge>
                                  </>
                                )}
                              </>
                            )}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      {appointment.status === 'SCHEDULED' && (
                        <>
                          <Button variant="gradient" size="sm">
                            Confirmar
                          </Button>
                          <Button variant="outline" size="sm">
                            Reagendar
                          </Button>
                        </>
                      )}
                      {appointment.status === 'CONFIRMED' && (
                        <>
                          <Button variant="gradient" size="sm">
                            Iniciar
                          </Button>
                          <Button variant="outline" size="sm">
                            Cancelar
                          </Button>
                        </>
                      )}
                      {appointment.status === 'COMPLETED' && (
                        <Button variant="outline" size="sm">
                          Ver Detalles
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {filteredAppointments.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No hay citas programadas
            </h3>
            <p className="text-muted-foreground">
              {filterStatus ? 'No hay citas con este estado' : 'Programa tu primera cita'}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
