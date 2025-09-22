import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dentalNeeds = searchParams.get('dentalNeeds')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where = dentalNeeds ? {
      userType: 'PATIENT',
      patientProfile: {
        dentalNeeds: {
          contains: dentalNeeds,
          mode: 'insensitive'
        },
        isActive: true
      }
    } : {
      userType: 'PATIENT',
      patientProfile: {
        isActive: true
      }
    }

    const [patients, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          patientProfile: true,
          receivedReviews: {
            select: {
              rating: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.user.count({ where })
    ])

    // Calculate average ratings
    const patientsWithRatings = patients.map(patient => {
      const ratings = patient.receivedReviews.map(r => r.rating)
      const averageRating = ratings.length > 0 
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length 
        : 0

      return {
        ...patient,
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews: ratings.length
      }
    })

    return NextResponse.json({
      success: true,
      patients: patientsWithRatings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching patients:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
