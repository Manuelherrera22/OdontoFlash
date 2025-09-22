import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createReviewSchema = z.object({
  reviewerId: z.string(),
  receiverId: z.string(),
  appointmentId: z.string().optional(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createReviewSchema.parse(body)

    // Check if review already exists for this appointment
    if (validatedData.appointmentId) {
      const existingReview = await prisma.review.findFirst({
        where: {
          reviewerId: validatedData.reviewerId,
          appointmentId: validatedData.appointmentId
        }
      })

      if (existingReview) {
        return NextResponse.json(
          { success: false, error: 'Ya has calificado esta cita' },
          { status: 409 }
        )
      }
    }

    const review = await prisma.review.create({
      data: validatedData,
      include: {
        reviewer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            userType: true
          }
        },
        receiver: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            userType: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      review
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating review:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const receiverId = searchParams.get('receiverId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where = receiverId ? { receiverId } : {}

    const [reviews, total] = await Promise.all([
      prisma.review.findMany({
        where,
        include: {
          reviewer: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              userType: true
            }
          },
          receiver: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              userType: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.review.count({ where })
    ])

    return NextResponse.json({
      success: true,
      reviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
