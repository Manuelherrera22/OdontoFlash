'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GraduationCap, User, Mail, Lock, Phone, MapPin, Calendar, Stethoscope } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  type: 'login' | 'register'
  onSwitchType: (type: 'login' | 'register') => void
}

export function AuthModal({ isOpen, onClose, type, onSwitchType }: AuthModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    birthDate: '',
    userType: 'patient' as 'patient' | 'student',
    // Patient specific
    dentalNeeds: '',
    medicalHistory: '',
    // Student specific
    university: '',
    semester: '',
    specialization: '',
    studentId: ''
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    onClose()
  }

  const dentalNeedsOptions = [
    'Limpieza dental',
    'Ortodoncia',
    'Endodoncia',
    'Periodoncia',
    'Cirugía oral',
    'Prótesis dental',
    'Blanqueamiento',
    'Odontopediatría',
    'Otro'
  ]

  const specializations = [
    'Odontología General',
    'Ortodoncia',
    'Endodoncia',
    'Periodoncia',
    'Cirugía Oral',
    'Odontopediatría',
    'Prótesis Dental',
    'Estética Dental'
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            {type === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
          </DialogTitle>
        </DialogHeader>

        <Tabs value={type} onValueChange={(value) => onSwitchType(value as 'login' | 'register')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Accede a tu cuenta</CardTitle>
                <CardDescription className="text-center">
                  Ingresa tus credenciales para acceder a OdontoFlash
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" variant="gradient" disabled={isLoading}>
                    {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Crea tu cuenta</CardTitle>
                <CardDescription className="text-center">
                  Únete a la comunidad de OdontoFlash
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* User Type Selection */}
                  <div className="space-y-2">
                    <Label>Tipo de usuario</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <Button
                        type="button"
                        variant={formData.userType === 'patient' ? 'default' : 'outline'}
                        onClick={() => handleInputChange('userType', 'patient')}
                        className="flex items-center gap-2"
                      >
                        <User className="h-4 w-4" />
                        Paciente
                      </Button>
                      <Button
                        type="button"
                        variant={formData.userType === 'student' ? 'default' : 'outline'}
                        onClick={() => handleInputChange('userType', 'student')}
                        className="flex items-center gap-2"
                      >
                        <GraduationCap className="h-4 w-4" />
                        Estudiante
                      </Button>
                    </div>
                  </div>

                  {/* Basic Information */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">Nombre</Label>
                      <Input
                        id="firstName"
                        placeholder="Tu nombre"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Apellido</Label>
                      <Input
                        id="lastName"
                        placeholder="Tu apellido"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Correo electrónico</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="tu@email.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+57 300 123 4567"
                        className="pl-10"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Dirección</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        placeholder="Tu dirección"
                        className="pl-10"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthDate">Fecha de nacimiento</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="birthDate"
                        type="date"
                        className="pl-10"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {/* Patient Specific Fields */}
                  {formData.userType === 'patient' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="dentalNeeds">Necesidades odontológicas</Label>
                        <Select value={formData.dentalNeeds} onValueChange={(value) => handleInputChange('dentalNeeds', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tus necesidades" />
                          </SelectTrigger>
                          <SelectContent>
                            {dentalNeedsOptions.map((need) => (
                              <SelectItem key={need} value={need}>
                                {need}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="medicalHistory">Historial médico</Label>
                        <textarea
                          id="medicalHistory"
                          placeholder="Describe tu historial médico relevante..."
                          className="w-full min-h-[100px] px-3 py-2 border border-input bg-background rounded-md text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          value={formData.medicalHistory}
                          onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {/* Student Specific Fields */}
                  {formData.userType === 'student' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="university">Universidad</Label>
                        <Input
                          id="university"
                          placeholder="Nombre de tu universidad"
                          value={formData.university}
                          onChange={(e) => handleInputChange('university', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="studentId">ID de estudiante</Label>
                        <Input
                          id="studentId"
                          placeholder="Tu ID de estudiante"
                          value={formData.studentId}
                          onChange={(e) => handleInputChange('studentId', e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="semester">Semestre</Label>
                        <Select value={formData.semester} onValueChange={(value) => handleInputChange('semester', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tu semestre" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((semester) => (
                              <SelectItem key={semester} value={semester.toString()}>
                                Semestre {semester}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="specialization">Especialización</Label>
                        <Select value={formData.specialization} onValueChange={(value) => handleInputChange('specialization', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecciona tu especialización" />
                          </SelectTrigger>
                          <SelectContent>
                            {specializations.map((spec) => (
                              <SelectItem key={spec} value={spec}>
                                {spec}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password">Contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={formData.password}
                        onChange={(e) => handleInputChange('password', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" variant="gradient" disabled={isLoading}>
                    {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
