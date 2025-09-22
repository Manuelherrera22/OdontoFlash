'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  Filter, 
  Star, 
  Calendar, 
  Phone, 
  MapPin,
  Stethoscope,
  Heart
} from 'lucide-react'

interface Patient {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  averageRating: number
  totalReviews: number
  patientProfile: {
    dentalNeeds: string
    medicalHistory?: string
  }
}

export function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterNeeds, setFilterNeeds] = useState('')

  const dentalNeedsOptions = [
    'Limpieza dental',
    'Ortodoncia',
    'Endodoncia',
    'Periodoncia',
    'Cirugía oral',
    'Prótesis dental',
    'Blanqueamiento',
    'Odontopediatría'
  ]

  useEffect(() => {
    const loadPatients = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/patients')
        const data = await response.json()
        if (data.success) {
          setPatients(data.patients)
        }
      } catch (error) {
        console.error('Error loading patients:', error)
        // Mock data for demo
        setPatients([
          {
            id: '1',
            firstName: 'María',
            lastName: 'González',
            email: 'maria@email.com',
            phone: '+57 300 123 4567',
            address: 'Bogotá, Colombia',
            averageRating: 4.8,
            totalReviews: 12,
            patientProfile: {
              dentalNeeds: 'Limpieza dental',
              medicalHistory: 'Sin alergias conocidas'
            }
          },
          {
            id: '2',
            firstName: 'Carlos',
            lastName: 'Ruiz',
            email: 'carlos@email.com',
            phone: '+57 301 234 5678',
            address: 'Medellín, Colombia',
            averageRating: 4.9,
            totalReviews: 8,
            patientProfile: {
              dentalNeeds: 'Ortodoncia',
              medicalHistory: 'Diabetes controlada'
            }
          },
          {
            id: '3',
            firstName: 'Ana',
            lastName: 'Martínez',
            email: 'ana@email.com',
            phone: '+57 302 345 6789',
            address: 'Cali, Colombia',
            averageRating: 4.7,
            totalReviews: 15,
            patientProfile: {
              dentalNeeds: 'Endodoncia',
              medicalHistory: 'Hipertensión controlada'
            }
          }
        ])
      }
      setIsLoading(false)
    }

    loadPatients()
  }, [])

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = !filterNeeds || patient.patientProfile.dentalNeeds === filterNeeds
    return matchesSearch && matchesFilter
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
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
            <Stethoscope className="h-5 w-5" />
            Pacientes Disponibles
          </CardTitle>
          <CardDescription>
            Encuentra pacientes según sus necesidades odontológicas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterNeeds} onValueChange={setFilterNeeds}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filtrar por necesidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas las necesidades</SelectItem>
                {dentalNeedsOptions.map((need) => (
                  <SelectItem key={need} value={need}>
                    {need}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      <div className="grid gap-4">
        {filteredPatients.map((patient, index) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                        {patient.firstName[0]}{patient.lastName[0]}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {patient.firstName} {patient.lastName}
                        </h3>
                        <p className="text-sm text-muted-foreground">{patient.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{patient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{patient.address}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {patient.patientProfile.dentalNeeds}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{patient.averageRating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({patient.totalReviews} reseñas)
                        </span>
                      </div>
                    </div>

                    {patient.patientProfile.medicalHistory && (
                      <div className="text-sm text-muted-foreground">
                        <strong>Historial médico:</strong> {patient.patientProfile.medicalHistory}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="gradient" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Agendar Cita
                    </Button>
                    <Button variant="outline" size="sm">
                      Ver Perfil
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredPatients.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No se encontraron pacientes
            </h3>
            <p className="text-muted-foreground">
              Intenta ajustar los filtros de búsqueda
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
