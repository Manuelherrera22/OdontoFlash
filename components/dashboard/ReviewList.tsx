'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Star, 
  MessageCircle, 
  User, 
  Calendar,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'

interface Review {
  id: string
  rating: number
  comment?: string
  createdAt: string
  reviewer: {
    firstName: string
    lastName: string
    userType: 'PATIENT' | 'STUDENT'
  }
  receiver: {
    firstName: string
    lastName: string
    userType: 'PATIENT' | 'STUDENT'
  }
}

export function ReviewList() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filterRating, setFilterRating] = useState<number | null>(null)

  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/reviews')
        const data = await response.json()
        if (data.success) {
          setReviews(data.reviews)
        }
      } catch (error) {
        console.error('Error loading reviews:', error)
        // Mock data for demo
        setReviews([
          {
            id: '1',
            rating: 5,
            comment: 'Excelente atención y profesionalismo. Muy recomendado.',
            createdAt: '2024-01-10T10:00:00Z',
            reviewer: {
              firstName: 'María',
              lastName: 'González',
              userType: 'PATIENT'
            },
            receiver: {
              firstName: 'Laura',
              lastName: 'Fernández',
              userType: 'STUDENT'
            }
          },
          {
            id: '2',
            rating: 4,
            comment: 'Muy buen tratamiento, solo faltó un poco más de comunicación.',
            createdAt: '2024-01-08T14:30:00Z',
            reviewer: {
              firstName: 'Carlos',
              lastName: 'Ruiz',
              userType: 'PATIENT'
            },
            receiver: {
              firstName: 'Miguel',
              lastName: 'Torres',
              userType: 'STUDENT'
            }
          },
          {
            id: '3',
            rating: 5,
            comment: 'Estudiante muy dedicado y cuidadoso. El tratamiento fue perfecto.',
            createdAt: '2024-01-05T09:15:00Z',
            reviewer: {
              firstName: 'Ana',
              lastName: 'Martínez',
              userType: 'PATIENT'
            },
            receiver: {
              firstName: 'Sofia',
              lastName: 'Ramírez',
              userType: 'STUDENT'
            }
          },
          {
            id: '4',
            rating: 4,
            comment: 'Paciente muy colaborativo y puntual. Excelente experiencia.',
            createdAt: '2024-01-03T16:45:00Z',
            reviewer: {
              firstName: 'Laura',
              lastName: 'Fernández',
              userType: 'STUDENT'
            },
            receiver: {
              firstName: 'María',
              lastName: 'González',
              userType: 'PATIENT'
            }
          }
        ])
      }
      setIsLoading(false)
    }

    loadReviews()
  }, [])

  const filteredReviews = reviews.filter(review => 
    filterRating === null || review.rating === filterRating
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-500'
    if (rating >= 3) return 'text-yellow-500'
    return 'text-red-500'
  }

  const getRatingLabel = (rating: number) => {
    const labels = {
      1: 'Muy Malo',
      2: 'Malo',
      3: 'Regular',
      4: 'Bueno',
      5: 'Excelente'
    }
    return labels[rating as keyof typeof labels]
  }

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
            <Star className="h-5 w-5" />
            Reseñas y Calificaciones
          </CardTitle>
          <CardDescription>
            Revisa las calificaciones y comentarios de tus interacciones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filterRating === null ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterRating(null)}
            >
              Todas
            </Button>
            {[5, 4, 3, 2, 1].map((rating) => (
              <Button
                key={rating}
                variant={filterRating === rating ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterRating(rating)}
                className="flex items-center gap-1"
              >
                <Star className="h-3 w-3 fill-current" />
                {rating}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Review List */}
      <div className="grid gap-4">
        {filteredReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white font-bold text-sm">
                        {review.reviewer.firstName[0]}{review.reviewer.lastName[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {review.reviewer.firstName} {review.reviewer.lastName}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {review.reviewer.userType === 'PATIENT' ? 'Paciente' : 'Estudiante'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-muted-foreground'
                            }`}
                          />
                        ))}
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`${getRatingColor(review.rating)} border-current`}
                      >
                        {getRatingLabel(review.rating)}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>

                    {review.comment && (
                      <div className="bg-muted/50 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-2">
                          <MessageCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-foreground">{review.comment}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>
                          Calificó a {review.receiver.firstName} {review.receiver.lastName}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(review.createdAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Útil
                    </Button>
                    <Button variant="ghost" size="sm">
                      Responder
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredReviews.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              No hay reseñas
            </h3>
            <p className="text-muted-foreground">
              {filterRating ? 'No hay reseñas con esta calificación' : 'Aún no tienes reseñas'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Summary Stats */}
      {reviews.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              Resumen de Calificaciones
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">
                  {reviews.length}
                </div>
                <div className="text-sm text-muted-foreground">Total Reseñas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)}
                </div>
                <div className="text-sm text-muted-foreground">Promedio</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {reviews.filter(r => r.rating >= 4).length}
                </div>
                <div className="text-sm text-muted-foreground">Positivas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">
                  {reviews.filter(r => r.rating <= 2).length}
                </div>
                <div className="text-sm text-muted-foreground">Negativas</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
