'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { LocationSelector } from '@/components/ui/location-selector'
import { 
  Search, 
  Filter, 
  Star, 
  Calendar, 
  Phone, 
  MapPin,
  Stethoscope,
  Heart,
  CheckCircle,
  UserPlus
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
  isAvailable: boolean
  location: {
    country: string
    state: string
    city: string
  }
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
  const [filterLocation, setFilterLocation] = useState({
    country: '',
    state: '',
    city: ''
  })
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null)

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
            address: 'Carrera 15 #93-47, Chapinero',
            averageRating: 4.8,
            totalReviews: 12,
            isAvailable: true,
            location: {
              country: 'colombia',
              state: 'bogota',
              city: 'chapinero'
            },
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
            address: 'Calle 50 #43-12, El Poblado',
            averageRating: 4.9,
            totalReviews: 8,
            isAvailable: true,
            location: {
              country: 'colombia',
              state: 'antioquia',
              city: 'medellin'
            },
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
            address: 'Avenida 6N #28-50, Granada',
            averageRating: 4.7,
            totalReviews: 15,
            isAvailable: false,
            location: {
              country: 'colombia',
              state: 'valle_cauca',
              city: 'cali'
            },
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
    const matchesLocation = !filterLocation.country || 
                           (patient.location.country === filterLocation.country &&
                            (!filterLocation.state || patient.location.state === filterLocation.state) &&
                            (!filterLocation.city || patient.location.city === filterLocation.city))
    return matchesSearch && matchesFilter && matchesLocation
  })

  const handlePatientSelection = (patientId: string) => {
    setSelectedPatient(selectedPatient === patientId ? null : patientId)
  }

  const handleLocationChange = (location: { country: string; state: string; city: string }) => {
    setFilterLocation(location)
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
            <Stethoscope className="h-5 w-5" />
            Pacientes Disponibles
          </CardTitle>
          <CardDescription>
            Selecciona pacientes según sus necesidades odontológicas y ubicación
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre o email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterNeeds} onValueChange={setFilterNeeds}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por necesidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas las necesidades</SelectItem>
                  {dentalNeedsOptions.map((need: string) => (
                    <SelectItem key={need} value={need}>
                      {need}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Location Filter */}
            <div className="space-y-3">
              <LocationSelector 
                onLocationChange={handleLocationChange}
                initialLocation={filterLocation}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient List */}
      <div className="grid gap-4">
        {filteredPatients.map((patient: any, index: number) => (
          <motion.div
            key={patient.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`hover:shadow-lg transition-all duration-300 ${
              selectedPatient === patient.id ? 'ring-2 ring-primary shadow-lg' : ''
            } ${!patient.isAvailable ? 'opacity-60' : ''}`}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-lg">
                        {patient.firstName[0]}{patient.lastName[0]}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            {patient.firstName} {patient.lastName}
                          </h3>
                          {!patient.isAvailable && (
                            <Badge variant="secondary" className="text-xs">
                              No disponible
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{patient.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{patient.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span className="truncate">{patient.address}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-4">
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

                  <div className="flex flex-col gap-2 sm:min-w-[200px]">
                    {selectedPatient === patient.id ? (
                      <div className="space-y-2">
                        <Button 
                          variant="gradient" 
                          size="sm" 
                          className="w-full"
                          disabled={!patient.isAvailable}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Paciente Seleccionado
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          <Calendar className="h-4 w-4 mr-2" />
                          Agendar Cita
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handlePatientSelection(patient.id)}
                          className="w-full text-muted-foreground"
                        >
                          Deseleccionar
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handlePatientSelection(patient.id)}
                          disabled={!patient.isAvailable}
                          className="w-full"
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Seleccionar Paciente
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full">
                          Ver Perfil
                        </Button>
                      </div>
                    )}
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
