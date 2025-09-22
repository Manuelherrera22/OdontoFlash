import { NextRequest, NextResponse } from 'next/server'

// Mock data for static build
const mockPatients = [
  {
    id: '1',
    firstName: 'María',
    lastName: 'González',
    email: 'maria@email.com',
    phone: '+57 300 123 4567',
    address: 'Bogotá, Colombia',
    averageRating: 4.8,
    totalReviews: 12,
    patientProfile: {
      dentalNeeds: 'Limpieza dental',
      medicalHistory: 'Sin alergias conocidas'
    }
  },
  {
    id: '2',
    firstName: 'Carlos',
    lastName: 'Ruiz',
    email: 'carlos@email.com',
    phone: '+57 301 234 5678',
    address: 'Medellín, Colombia',
    averageRating: 4.9,
    totalReviews: 8,
    patientProfile: {
      dentalNeeds: 'Ortodoncia',
      medicalHistory: 'Diabetes controlada'
    }
  },
  {
    id: '3',
    firstName: 'Ana',
    lastName: 'Martínez',
    email: 'ana@email.com',
    phone: '+57 302 345 6789',
    address: 'Cali, Colombia',
    averageRating: 4.7,
    totalReviews: 15,
    patientProfile: {
      dentalNeeds: 'Endodoncia',
      medicalHistory: 'Hipertensión controlada'
    }
  }
]

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const dentalNeeds = searchParams.get('dentalNeeds')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    // Filter patients based on dental needs
    let filteredPatients = mockPatients
    if (dentalNeeds) {
      filteredPatients = mockPatients.filter(patient => 
        patient.patientProfile.dentalNeeds.toLowerCase().includes(dentalNeeds.toLowerCase())
      )
    }

    // Pagination
    const total = filteredPatients.length
    const paginatedPatients = filteredPatients.slice(skip, skip + limit)

    return NextResponse.json({
      success: true,
      patients: paginatedPatients,
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
