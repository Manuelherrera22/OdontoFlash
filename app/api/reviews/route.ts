import { NextRequest, NextResponse } from 'next/server'

// Mock data for static build
const mockReviews = [
  {
    id: '1',
    rating: 5,
    comment: 'Excelente atención y profesionalismo. Muy recomendado.',
    createdAt: '2024-01-10T10:00:00Z',
    reviewer: {
      id: '1',
      firstName: 'María',
      lastName: 'González',
      userType: 'PATIENT'
    },
    receiver: {
      id: '1',
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
      id: '2',
      firstName: 'Carlos',
      lastName: 'Ruiz',
      userType: 'PATIENT'
    },
    receiver: {
      id: '2',
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
      id: '3',
      firstName: 'Ana',
      lastName: 'Martínez',
      userType: 'PATIENT'
    },
    receiver: {
      id: '3',
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
      id: '4',
      firstName: 'Laura',
      lastName: 'Fernández',
      userType: 'STUDENT'
    },
    receiver: {
      id: '4',
      firstName: 'María',
      lastName: 'González',
      userType: 'PATIENT'
    }
  }
]

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Mock review creation
    const newReview = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      review: newReview
    })
  } catch (error) {
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

    // Filter reviews based on receiverId
    let filteredReviews = mockReviews
    if (receiverId) {
      filteredReviews = mockReviews.filter(review => 
        review.receiver.id === receiverId
      )
    }

    // Pagination
    const total = filteredReviews.length
    const paginatedReviews = filteredReviews.slice(skip, skip + limit)

    return NextResponse.json({
      success: true,
      reviews: paginatedReviews,
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
