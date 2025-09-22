import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  userType: 'PATIENT' | 'STUDENT'
}

// Mock users for static build
const mockUsers = [
  {
    id: '1',
    email: 'maria@example.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/4.8.8.8', // password123
    firstName: 'María',
    lastName: 'González',
    phone: '+1234567890',
    address: 'Calle Principal 123',
    birthDate: new Date('1990-01-01'),
    userType: 'PATIENT' as const,
    patientProfile: {
      dentalNeeds: 'Limpieza dental y revisión general',
      medicalHistory: 'Sin alergias conocidas'
    }
  },
  {
    id: '2',
    email: 'carlos@example.com',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/4.8.8.8', // password123
    firstName: 'Carlos',
    lastName: 'Ruiz',
    phone: '+1234567891',
    address: 'Avenida Central 456',
    birthDate: new Date('1985-05-15'),
    userType: 'PATIENT' as const,
    patientProfile: {
      dentalNeeds: 'Tratamiento de caries',
      medicalHistory: 'Diabetes tipo 2'
    }
  },
  {
    id: '3',
    email: 'laura@university.edu',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/4.8.8.8', // password123
    firstName: 'Laura',
    lastName: 'Fernández',
    phone: '+1234567892',
    address: 'Campus Universitario',
    birthDate: new Date('2000-03-20'),
    userType: 'STUDENT' as const,
    studentProfile: {
      university: 'Universidad Nacional',
      studentId: '2023001',
      semester: 6,
      specialization: 'Odontología General'
    }
  },
  {
    id: '4',
    email: 'miguel@university.edu',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/4.8.8.8', // password123
    firstName: 'Miguel',
    lastName: 'Torres',
    phone: '+1234567893',
    address: 'Campus Universitario',
    birthDate: new Date('1999-07-10'),
    userType: 'STUDENT' as const,
    studentProfile: {
      university: 'Universidad Nacional',
      studentId: '2023002',
      semester: 8,
      specialization: 'Ortodoncia'
    }
  }
]

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateToken(user: User): string {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email, 
      userType: user.userType 
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

export function verifyToken(token: string): User | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any
    return {
      id: decoded.id,
      email: decoded.email,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      userType: decoded.userType
    }
  } catch {
    return null
  }
}

export async function createUser(userData: {
  email: string
  password: string
  firstName: string
  lastName: string
  phone: string
  address: string
  birthDate: Date
  userType: 'PATIENT' | 'STUDENT'
  patientData?: {
    dentalNeeds: string
    medicalHistory?: string
  }
  studentData?: {
    university: string
    studentId: string
    semester: number
    specialization: string
  }
}) {
  // Mock user creation
  const newUser = {
    id: Date.now().toString(),
    email: userData.email,
    password: await hashPassword(userData.password),
    firstName: userData.firstName,
    lastName: userData.lastName,
    phone: userData.phone,
    address: userData.address,
    birthDate: userData.birthDate,
    userType: userData.userType,
    patientProfile: userData.patientData,
    studentProfile: userData.studentData
  }

  return newUser
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  // Mock user authentication
  const user = mockUsers.find(u => u.email === email)
  
  if (!user) return null

  const isValid = await verifyPassword(password, user.password)
  if (!isValid) return null

  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    userType: user.userType
  }
}
