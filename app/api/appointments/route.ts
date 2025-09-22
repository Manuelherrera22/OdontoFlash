import { NextRequest, NextResponse } from 'next/server'

// Mock data for static build
const mockAppointments = [
  {
    id: '1',
    title: 'Limpieza Dental',
    description: 'Limpieza dental completa y profilaxis',
    date: '2024-01-15T10:00:00Z',
    duration: 60,
    status: 'CONFIRMED',
    price: 50000,
    discount: 20,
    isFree: false,
    student: {
      firstName: 'Laura',
      lastName: 'Fernández',
      email: 'laura@email.com'
    },
    patient: {
      firstName: 'María',
      lastName: 'González',
      email: 'maria@email.com'
    }
  },
  {
    id: '2',
    title: 'Consulta de Ortodoncia',
    description: 'Evaluación inicial para tratamiento de ortodoncia',
    date: '2024-01-16T14:30:00Z',
    duration: 90,
    status: 'SCHEDULED',
    price: 80000,
    discount: 0,
    isFree: false,
    student: {
      firstName: 'Miguel',
      lastName: 'Torres',
      email: 'miguel@email.com'
    },
    patient: {
      firstName: 'Carlos',
      lastName: 'Ruiz',
      email: 'carlos@email.com'
    }
  },
  {
    id: '3',
    title: 'Endodoncia',
    description: 'Tratamiento de conducto en molar superior',
    date: '2024-01-12T09:00:00Z',
    duration: 120,
    status: 'COMPLETED',
    price: 120000,
    discount: 50,
    isFree: false,
    student: {
      firstName: 'Sofia',
      lastName: 'Ramírez',
      email: 'sofia@email.com'
    },
    patient: {
      firstName: 'Ana',
      lastName: 'Martínez',
      email: 'ana@email.com'
    }
  }
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Mock appointment creation
    const newAppointment = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      appointment: newAppointment
    })
  } catch (error) {
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

    // Filter appointments based on criteria
    let filteredAppointments = mockAppointments
    if (status) {
      filteredAppointments = filteredAppointments.filter(appointment => 
        appointment.status === status
      )
    }

    // Pagination
    const total = filteredAppointments.length
    const paginatedAppointments = filteredAppointments.slice(skip, skip + limit)

    return NextResponse.json({
      success: true,
      appointments: paginatedAppointments,
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
