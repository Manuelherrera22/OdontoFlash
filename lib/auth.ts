import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from './prisma'

const JWT_SECRET = process.env.NEXTAUTH_SECRET || 'your-secret-key'

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  userType: 'PATIENT' | 'STUDENT'
}

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
  const hashedPassword = await hashPassword(userData.password)
  
  const user = await prisma.user.create({
    data: {
      email: userData.email,
      password: hashedPassword,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      address: userData.address,
      birthDate: userData.birthDate,
      userType: userData.userType,
      patientProfile: userData.patientData ? {
        create: userData.patientData
      } : undefined,
      studentProfile: userData.studentData ? {
        create: userData.studentData
      } : undefined
    },
    include: {
      patientProfile: true,
      studentProfile: true
    }
  })

  return user
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      patientProfile: true,
      studentProfile: true
    }
  })

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
