'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock, 
  CheckCircle,
  XCircle,
  Eye,
  Plus
} from 'lucide-react'

interface TimeSlot {
  id: string
  time: string
  isAvailable: boolean
  isBooked: boolean
  patientName?: string
}

interface CalendarProps {
  studentId: string
  isPublicView?: boolean
  onTimeSlotClick?: (date: string, timeSlot: TimeSlot) => void
}

const DAYS_OF_WEEK = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']
const MONTHS = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
]

const TIME_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
]

export function StudentCalendar({ studentId, isPublicView = false, onTimeSlotClick }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [timeSlots, setTimeSlots] = useState<Record<string, TimeSlot[]>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadCalendarData()
  }, [studentId, currentDate])

  const loadCalendarData = async () => {
    setIsLoading(true)
    try {
      // Simulate API call - in real app, fetch from backend
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock data for demonstration
      const mockData: Record<string, TimeSlot[]> = {}
      const startDate = new Date(currentDate)
      startDate.setDate(1)
      
      for (let i = 0; i < 30; i++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i)
        const dateStr = date.toISOString().split('T')[0]
        
        mockData[dateStr] = TIME_SLOTS.map((time, index) => ({
          id: `${dateStr}-${time}`,
          time,
          isAvailable: Math.random() > 0.3, // 70% availability
          isBooked: Math.random() > 0.7, // 30% booked
          patientName: Math.random() > 0.7 ? 'Paciente Ejemplo' : undefined
        }))
      }
      
      setTimeSlots(mockData)
    } catch (error) {
      console.error('Error loading calendar data:', error)
    }
    setIsLoading(false)
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i))
    }
    
    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const formatDate = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const getAvailableSlotsCount = (date: Date) => {
    const dateStr = formatDate(date)
    const slots = timeSlots[dateStr] || []
    return slots.filter(slot => slot.isAvailable && !slot.isBooked).length
  }

  const getBookedSlotsCount = (date: Date) => {
    const dateStr = formatDate(date)
    const slots = timeSlots[dateStr] || []
    return slots.filter(slot => slot.isBooked).length
  }

  const handleDateClick = (date: Date) => {
    const dateStr = formatDate(date)
    setSelectedDate(selectedDate === dateStr ? null : dateStr)
  }

  const handleTimeSlotToggle = (dateStr: string, timeSlot: TimeSlot) => {
    if (isPublicView) return
    
    setTimeSlots(prev => ({
      ...prev,
      [dateStr]: prev[dateStr]?.map(slot => 
        slot.id === timeSlot.id 
          ? { ...slot, isAvailable: !slot.isAvailable }
          : slot
      ) || []
    }))
  }

  const days = getDaysInMonth(currentDate)

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: 35 }).map((_, i) => (
                <div key={i} className="h-8 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Calendar Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                {isPublicView ? 'Disponibilidad' : 'Mi Calendario'}
              </CardTitle>
              <CardDescription>
                {isPublicView 
                  ? 'Horarios disponibles para citas' 
                  : 'Gestiona tu disponibilidad y citas programadas'
                }
              </CardDescription>
            </div>
            {!isPublicView && (
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Cita
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <h2 className="text-xl font-semibold">
              {MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-4">
            {DAYS_OF_WEEK.map(day => (
              <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
            
            {days.map((day, index) => {
              if (!day) {
                return <div key={index} className="h-10" />
              }
              
              const dateStr = formatDate(day)
              const availableCount = getAvailableSlotsCount(day)
              const bookedCount = getBookedSlotsCount(day)
              const isToday = formatDate(new Date()) === dateStr
              const isSelected = selectedDate === dateStr
              
              return (
                <motion.div
                  key={dateStr}
                  className={`
                    h-10 flex flex-col items-center justify-center rounded-md cursor-pointer transition-all
                    ${isToday ? 'bg-primary/20 text-primary font-semibold ring-2 ring-purple-200' : ''}
                    ${isSelected ? 'bg-secondary text-secondary-foreground ring-2 ring-purple-300' : ''}
                    ${!isToday && !isSelected ? 'hover:bg-purple-50 hover:ring-1 hover:ring-purple-200' : ''}
                  `}
                  onClick={() => handleDateClick(day)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm">{day.getDate()}</span>
                  {availableCount > 0 && (
                    <div className="flex gap-1 mt-1">
                      <div className="w-1 h-1 bg-green-500 rounded-full"></div>
                      {bookedCount > 0 && (
                        <div className="w-1 h-1 bg-purple-500 rounded-full"></div>
                      )}
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Disponible</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>Reservado</span>
            </div>
            {!isPublicView && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>No disponible</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Time Slots for Selected Date */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Horarios - {new Date(selectedDate).toLocaleDateString('es-ES', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {timeSlots[selectedDate]?.map(slot => (
                <motion.div
                  key={slot.id}
                  className={`
                    p-3 rounded-lg border text-center cursor-pointer transition-all
                    ${slot.isBooked 
                      ? 'bg-purple-50 border-purple-200 text-purple-700' 
                      : slot.isAvailable 
                        ? 'bg-green-50 border-green-200 text-green-700 hover:bg-green-100' 
                        : 'bg-red-50 border-red-200 text-red-700'
                    }
                    ${isPublicView ? 'cursor-default' : ''}
                  `}
                  onClick={() => !isPublicView && handleTimeSlotToggle(selectedDate, slot)}
                  whileHover={!isPublicView ? { scale: 1.05 } : {}}
                  whileTap={!isPublicView ? { scale: 0.95 } : {}}
                >
                  <div className="text-sm font-medium">{slot.time}</div>
                  {slot.isBooked && (
                    <div className="text-xs mt-1 opacity-75">
                      {slot.patientName}
                    </div>
                  )}
                  {slot.isAvailable && !slot.isBooked && !isPublicView && (
                    <div className="text-xs mt-1 opacity-75">
                      Click para cambiar
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
            
            {isPublicView && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Eye className="h-4 w-4" />
                  <span>Vista pública - Los pacientes pueden ver tu disponibilidad</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
