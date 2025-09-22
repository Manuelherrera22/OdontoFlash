'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Calendar, 
  Users, 
  Star, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  Plus,
  Search,
  Filter
} from 'lucide-react'
import { PatientList } from '@/components/dashboard/PatientList'
import { StudentList } from '@/components/dashboard/StudentList'
import { AppointmentList } from '@/components/dashboard/AppointmentList'
import { ReviewList } from '@/components/dashboard/ReviewList'
import { StudentCalendar } from '@/components/ui/calendar'

interface DashboardStats {
  totalAppointments: number
  completedAppointments: number
  averageRating: number
  totalReviews: number
  upcomingAppointments: number
  pendingAppointments: number
}

export default function Dashboard() {
  const [userType, setUserType] = useState<'PATIENT' | 'STUDENT'>('PATIENT')
  const [stats, setStats] = useState<DashboardStats>({
    totalAppointments: 0,
    completedAppointments: 0,
    averageRating: 0,
    totalReviews: 0,
    upcomingAppointments: 0,
    pendingAppointments: 0
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading user data and stats
    const loadDashboardData = async () => {
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data - in real app, fetch from API
      setStats({
        totalAppointments: 24,
        completedAppointments: 18,
        averageRating: 4.8,
        totalReviews: 15,
        upcomingAppointments: 3,
        pendingAppointments: 2
      })
      
      setIsLoading(false)
    }

    loadDashboardData()
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b bg-background/95 backdrop-blur"
      >
        <div className="container py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm sm:text-base text-muted-foreground">
                Bienvenido a tu panel de control de OdontoFlash
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Button variant="outline" size="sm" className="w-full sm:w-auto">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
              <Button variant="gradient" size="sm" className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Cita
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4 mb-6 sm:mb-8"
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Citas Totales</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalAppointments}</div>
              <p className="text-xs text-muted-foreground">
                +2 desde la semana pasada
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completadas</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedAppointments}</div>
              <p className="text-xs text-muted-foreground">
                {Math.round((stats.completedAppointments / stats.totalAppointments) * 100)}% de éxito
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Calificación</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageRating}</div>
              <p className="text-xs text-muted-foreground">
                Basado en {stats.totalReviews} reseñas
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Próximas</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.upcomingAppointments}</div>
              <p className="text-xs text-muted-foreground">
                {stats.pendingAppointments} pendientes
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="appointments" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 h-auto">
              <TabsTrigger value="appointments" className="text-xs sm:text-sm">Citas</TabsTrigger>
              <TabsTrigger value="patients" className="text-xs sm:text-sm">Pacientes</TabsTrigger>
              <TabsTrigger value="students" className="text-xs sm:text-sm">Estudiantes</TabsTrigger>
              <TabsTrigger value="calendar" className="text-xs sm:text-sm">Calendario</TabsTrigger>
              <TabsTrigger value="reviews" className="text-xs sm:text-sm">Reseñas</TabsTrigger>
            </TabsList>

            <TabsContent value="appointments" className="space-y-6">
              <AppointmentList />
            </TabsContent>

            <TabsContent value="patients" className="space-y-6">
              <PatientList />
            </TabsContent>

            <TabsContent value="students" className="space-y-6">
              <StudentList />
            </TabsContent>

            <TabsContent value="calendar" className="space-y-6">
              <StudentCalendar studentId="current-user" />
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <ReviewList />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
