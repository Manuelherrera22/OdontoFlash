import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const specialization = searchParams.get('specialization')
    const university = searchParams.get('university')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where = {
      userType: 'STUDENT',
      studentProfile: {
        isActive: true,
        ...(specialization && { specialization: { contains: specialization, mode: 'insensitive' } }),
        ...(university && { university: { contains: university, mode: 'insensitive' } })
      }
    }

    const [students, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          studentProfile: true,
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
    const studentsWithRatings = students.map((student: any) => {
      const ratings = student.receivedReviews.map((r: any) => r.rating)
      const averageRating = ratings.length > 0 
        ? ratings.reduce((sum: number, rating: number) => sum + rating, 0) / ratings.length 
        : 0

      return {
        ...student,
        averageRating: Math.round(averageRating * 10) / 10,
        totalReviews: ratings.length
      }
    })

    return NextResponse.json({
      success: true,
      students: studentsWithRatings,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
