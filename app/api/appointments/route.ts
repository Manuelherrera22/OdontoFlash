import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const createAppointmentSchema = z.object({
  studentId: z.string(),
  patientId: z.string(),
  title: z.string(),
  description: z.string().optional(),
  date: z.string().transform((str) => new Date(str)),
  duration: z.number().min(15).max(480), // 15 minutes to 8 hours
  price: z.number().optional(),
  discount: z.number().min(0).max(100).optional(),
  isFree: z.boolean().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createAppointmentSchema.parse(body)

    const appointment = await prisma.appointment.create({
      data: validatedData,
      include: {
        student: {
          include: {
            studentProfile: true
          }
        },
        patient: {
          include: {
            patientProfile: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      appointment
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }

    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const userType = searchParams.get('userType')
    const status = searchParams.get('status')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const where = {
      ...(userId && userType === 'STUDENT' && { studentId: userId }),
      ...(userId && userType === 'PATIENT' && { patientId: userId }),
      ...(status && { status: status as any })
    }

    const [appointments, total] = await Promise.all([
      prisma.appointment.findMany({
        where,
        include: {
          student: {
            include: {
              studentProfile: true
            }
          },
          patient: {
            include: {
              patientProfile: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: {
          date: 'desc'
        }
      }),
      prisma.appointment.count({ where })
    ])

    return NextResponse.json({
      success: true,
      appointments,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
