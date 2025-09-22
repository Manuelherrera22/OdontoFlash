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
  GraduationCap, 
  Star, 
  Calendar, 
  Phone, 
  MapPin,
  BookOpen,
  Award
} from 'lucide-react'

interface Student {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  averageRating: number
  totalReviews: number
  studentProfile: {
    university: string
    studentId: string
    semester: number
    specialization: string
  }
}

export function StudentList() {
  const [students, setStudents] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSpecialization, setFilterSpecialization] = useState('')
  const [filterUniversity, setFilterUniversity] = useState('')

  const specializations = [
    'Odontología General',
    'Ortodoncia',
    'Endodoncia',
    'Periodoncia',
    'Cirugía Oral',
    'Odontopediatría',
    'Prótesis Dental',
    'Estética Dental'
  ]

  const universities = [
    'Universidad Nacional',
    'Universidad de los Andes',
    'Universidad Javeriana',
    'Universidad del Rosario',
    'Universidad El Bosque'
  ]

  useEffect(() => {
    const loadStudents = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/students')
        const data = await response.json()
        if (data.success) {
          setStudents(data.students)
        }
      } catch (error) {
        console.error('Error loading students:', error)
        // Mock data for demo
        setStudents([
          {
            id: '1',
            firstName: 'Laura',
            lastName: 'Fernández',
            email: 'laura@email.com',
            phone: '+57 300 111 2222',
            address: 'Bogotá, Colombia',
            averageRating: 4.9,
            totalReviews: 18,
            studentProfile: {
              university: 'Universidad Nacional',
              studentId: '20201012345',
              semester: 8,
              specialization: 'Ortodoncia'
            }
          },
          {
            id: '2',
            firstName: 'Miguel',
            lastName: 'Torres',
            email: 'miguel@email.com',
            phone: '+57 301 222 3333',
            address: 'Medellín, Colombia',
            averageRating: 4.7,
            totalReviews: 12,
            studentProfile: {
              university: 'Universidad de los Andes',
              studentId: '20211054321',
              semester: 6,
              specialization: 'Endodoncia'
            }
          },
          {
            id: '3',
            firstName: 'Sofia',
            lastName: 'Ramírez',
            email: 'sofia@email.com',
            phone: '+57 302 333 4444',
            address: 'Cali, Colombia',
            averageRating: 4.8,
            totalReviews: 15,
            studentProfile: {
              university: 'Universidad Javeriana',
              studentId: '20221098765',
              semester: 7,
              specialization: 'Odontopediatría'
            }
          }
        ])
      }
      setIsLoading(false)
    }

    loadStudents()
  }, [])

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.studentProfile.university.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialization = !filterSpecialization || student.studentProfile.specialization === filterSpecialization
    const matchesUniversity = !filterUniversity || student.studentProfile.university === filterUniversity
    return matchesSearch && matchesSpecialization && matchesUniversity
  })

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
            <GraduationCap className="h-5 w-5" />
            Estudiantes Disponibles
          </CardTitle>
          <CardDescription>
            Encuentra estudiantes según su especialización y universidad
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nombre, email o universidad..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterSpecialization} onValueChange={setFilterSpecialization}>
              <SelectTrigger>
                <SelectValue placeholder="Especialización" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas las especializaciones</SelectItem>
                {specializations.map((spec: string) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterUniversity} onValueChange={setFilterUniversity}>
              <SelectTrigger>
                <SelectValue placeholder="Universidad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todas las universidades</SelectItem>
                {universities.map((uni: string) => (
                  <SelectItem key={uni} value={uni}>
                    {uni}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Student List */}
      <div className="grid gap-4">
        {filteredStudents.map((student: any, index: number) => (
          <motion.div
            key={student.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-secondary to-primary flex items-center justify-center text-white font-bold text-lg">
                        {student.firstName[0]}{student.lastName[0]}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {student.firstName} {student.lastName}
                        </h3>
                        <p className="text-sm text-muted-foreground">{student.email}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{student.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{student.address}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {student.studentProfile.specialization}
                      </Badge>
                      <Badge variant="outline" className="flex items-center gap-1">
                        <Award className="h-3 w-3" />
                        {student.studentProfile.university}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{student.averageRating}</span>
                        <span className="text-xs text-muted-foreground">
                          ({student.totalReviews} reseñas)
                        </span>
                      </div>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      <strong>Semestre:</strong> {student.studentProfile.semester} | 
                      <strong> ID:</strong> {student.studentProfile.studentId}
                    </div>
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

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No se encontraron estudiantes
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
