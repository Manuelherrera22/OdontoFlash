import { NextRequest, NextResponse } from 'next/server'

// Mock data for static build
const mockStudents = [
  {
    id: '1',
    firstName: 'Laura',
    lastName: 'Fernández',
    email: 'laura@email.com',
    phone: '+57 300 111 2222',
    address: 'Bogotá, Colombia',
    averageRating: 4.9,
    totalReviews: 18,
    studentProfile: {
      university: 'Universidad Nacional',
      studentId: '20201012345',
      semester: 8,
      specialization: 'Ortodoncia'
    }
  },
  {
    id: '2',
    firstName: 'Miguel',
    lastName: 'Torres',
    email: 'miguel@email.com',
    phone: '+57 301 222 3333',
    address: 'Medellín, Colombia',
    averageRating: 4.7,
    totalReviews: 12,
    studentProfile: {
      university: 'Universidad de los Andes',
      studentId: '20211054321',
      semester: 6,
      specialization: 'Endodoncia'
    }
  },
  {
    id: '3',
    firstName: 'Sofia',
    lastName: 'Ramírez',
    email: 'sofia@email.com',
    phone: '+57 302 333 4444',
    address: 'Cali, Colombia',
    averageRating: 4.8,
    totalReviews: 15,
    studentProfile: {
      university: 'Universidad Javeriana',
      studentId: '20221098765',
      semester: 7,
      specialization: 'Odontopediatría'
    }
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const specialization = searchParams.get('specialization')
    const university = searchParams.get('university')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Filter students based on criteria
    let filteredStudents = mockStudents
    if (specialization) {
      filteredStudents = filteredStudents.filter(student => 
        student.studentProfile.specialization.toLowerCase().includes(specialization.toLowerCase())
      )
    }
    if (university) {
      filteredStudents = filteredStudents.filter(student => 
        student.studentProfile.university.toLowerCase().includes(university.toLowerCase())
      )
    }

    // Pagination
    const total = filteredStudents.length
    const paginatedStudents = filteredStudents.slice(skip, skip + limit)

    return NextResponse.json({
      success: true,
      students: paginatedStudents,
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
