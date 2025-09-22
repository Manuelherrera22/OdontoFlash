import { NextRequest, NextResponse } from 'next/server'
import { createUser } from '@/lib/auth'
import { z } from 'zod'

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  phone: z.string().min(1),
  address: z.string().min(1),
  birthDate: z.string().transform((str) => new Date(str)),
  userType: z.enum(['PATIENT', 'STUDENT']),
  patientData: z.object({
    dentalNeeds: z.string(),
    medicalHistory: z.string().optional()
  }).optional(),
  studentData: z.object({
    university: z.string(),
    studentId: z.string(),
    semester: z.number(),
    specialization: z.string()
  }).optional()
}).refine((data) => {
  if (data.userType === 'PATIENT' && !data.patientData) return false
  if (data.userType === 'STUDENT' && !data.studentData) return false
  return true
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = registerSchema.parse(body)

    const user = await createUser(validatedData)

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType
      }
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Datos inválidos', details: error.errors },
        { status: 400 }
      )
    }

    if (error instanceof Error && error.message.includes('Unique constraint')) {
      return NextResponse.json(
        { success: false, error: 'El correo electrónico ya está registrado' },
        { status: 409 }
      )
    }

    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}
