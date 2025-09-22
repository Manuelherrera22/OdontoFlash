'use client'

import { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { MapPin } from 'lucide-react'

interface Location {
  country: string
  state: string
  city: string
}

interface LocationSelectorProps {
  onLocationChange: (location: Location) => void
  initialLocation?: Location
  className?: string
}

const countries = [
  { value: 'colombia', label: 'Colombia' },
  { value: 'mexico', label: 'México' },
  { value: 'argentina', label: 'Argentina' },
  { value: 'chile', label: 'Chile' },
  { value: 'peru', label: 'Perú' },
  { value: 'ecuador', label: 'Ecuador' },
  { value: 'venezuela', label: 'Venezuela' },
  { value: 'uruguay', label: 'Uruguay' },
  { value: 'paraguay', label: 'Paraguay' },
  { value: 'bolivia', label: 'Bolivia' }
]

const statesByCountry: Record<string, Array<{ value: string; label: string }>> = {
  colombia: [
    { value: 'antioquia', label: 'Antioquia' },
    { value: 'atlantico', label: 'Atlántico' },
    { value: 'bogota', label: 'Bogotá D.C.' },
    { value: 'bolivar', label: 'Bolívar' },
    { value: 'boyaca', label: 'Boyacá' },
    { value: 'caldas', label: 'Caldas' },
    { value: 'caqueta', label: 'Caquetá' },
    { value: 'cauca', label: 'Cauca' },
    { value: 'cesar', label: 'Cesar' },
    { value: 'cordoba', label: 'Córdoba' },
    { value: 'cundinamarca', label: 'Cundinamarca' },
    { value: 'huila', label: 'Huila' },
    { value: 'magdalena', label: 'Magdalena' },
    { value: 'meta', label: 'Meta' },
    { value: 'narino', label: 'Nariño' },
    { value: 'norte_santander', label: 'Norte de Santander' },
    { value: 'quindio', label: 'Quindío' },
    { value: 'risaralda', label: 'Risaralda' },
    { value: 'santander', label: 'Santander' },
    { value: 'sucre', label: 'Sucre' },
    { value: 'tolima', label: 'Tolima' },
    { value: 'valle_cauca', label: 'Valle del Cauca' }
  ],
  mexico: [
    { value: 'aguascalientes', label: 'Aguascalientes' },
    { value: 'baja_california', label: 'Baja California' },
    { value: 'baja_california_sur', label: 'Baja California Sur' },
    { value: 'campeche', label: 'Campeche' },
    { value: 'chiapas', label: 'Chiapas' },
    { value: 'chihuahua', label: 'Chihuahua' },
    { value: 'coahuila', label: 'Coahuila' },
    { value: 'colima', label: 'Colima' },
    { value: 'durango', label: 'Durango' },
    { value: 'guanajuato', label: 'Guanajuato' },
    { value: 'guerrero', label: 'Guerrero' },
    { value: 'hidalgo', label: 'Hidalgo' },
    { value: 'jalisco', label: 'Jalisco' },
    { value: 'mexico', label: 'Estado de México' },
    { value: 'michoacan', label: 'Michoacán' },
    { value: 'morelos', label: 'Morelos' },
    { value: 'nayarit', label: 'Nayarit' },
    { value: 'nuevo_leon', label: 'Nuevo León' },
    { value: 'oaxaca', label: 'Oaxaca' },
    { value: 'puebla', label: 'Puebla' },
    { value: 'queretaro', label: 'Querétaro' },
    { value: 'quintana_roo', label: 'Quintana Roo' },
    { value: 'san_luis_potosi', label: 'San Luis Potosí' },
    { value: 'sinaloa', label: 'Sinaloa' },
    { value: 'sonora', label: 'Sonora' },
    { value: 'tabasco', label: 'Tabasco' },
    { value: 'tamaulipas', label: 'Tamaulipas' },
    { value: 'tlaxcala', label: 'Tlaxcala' },
    { value: 'veracruz', label: 'Veracruz' },
    { value: 'yucatan', label: 'Yucatán' },
    { value: 'zacatecas', label: 'Zacatecas' },
    { value: 'cdmx', label: 'Ciudad de México' }
  ],
  argentina: [
    { value: 'buenos_aires', label: 'Buenos Aires' },
    { value: 'catamarca', label: 'Catamarca' },
    { value: 'chaco', label: 'Chaco' },
    { value: 'chubut', label: 'Chubut' },
    { value: 'cordoba', label: 'Córdoba' },
    { value: 'corrientes', label: 'Corrientes' },
    { value: 'entre_rios', label: 'Entre Ríos' },
    { value: 'formosa', label: 'Formosa' },
    { value: 'jujuy', label: 'Jujuy' },
    { value: 'la_pampa', label: 'La Pampa' },
    { value: 'la_rioja', label: 'La Rioja' },
    { value: 'mendoza', label: 'Mendoza' },
    { value: 'misiones', label: 'Misiones' },
    { value: 'neuquen', label: 'Neuquén' },
    { value: 'rio_negro', label: 'Río Negro' },
    { value: 'salta', label: 'Salta' },
    { value: 'san_juan', label: 'San Juan' },
    { value: 'san_luis', label: 'San Luis' },
    { value: 'santa_cruz', label: 'Santa Cruz' },
    { value: 'santa_fe', label: 'Santa Fe' },
    { value: 'santiago_del_estero', label: 'Santiago del Estero' },
    { value: 'tierra_del_fuego', label: 'Tierra del Fuego' },
    { value: 'tucuman', label: 'Tucumán' }
  ]
}

const citiesByState: Record<string, Array<{ value: string; label: string }>> = {
  // Colombia - Antioquia
  antioquia: [
    { value: 'medellin', label: 'Medellín' },
    { value: 'bello', label: 'Bello' },
    { value: 'itagui', label: 'Itagüí' },
    { value: 'envigado', label: 'Envigado' },
    { value: 'copacabana', label: 'Copacabana' },
    { value: 'girardota', label: 'Girardota' },
    { value: 'barbosa', label: 'Barbosa' },
    { value: 'sabaneta', label: 'Sabaneta' }
  ],
  // Colombia - Bogotá
  bogota: [
    { value: 'bogota_dc', label: 'Bogotá D.C.' },
    { value: 'chapinero', label: 'Chapinero' },
    { value: 'usaquen', label: 'Usaquén' },
    { value: 'suba', label: 'Suba' },
    { value: 'engativa', label: 'Engativá' },
    { value: 'fontibon', label: 'Fontibón' },
    { value: 'kennedy', label: 'Kennedy' },
    { value: 'bosa', label: 'Bosa' }
  ],
  // Colombia - Valle del Cauca
  valle_cauca: [
    { value: 'cali', label: 'Cali' },
    { value: 'palmira', label: 'Palmira' },
    { value: 'buenaventura', label: 'Buenaventura' },
    { value: 'tulua', label: 'Tuluá' },
    { value: 'cartago', label: 'Cartago' },
    { value: 'buga', label: 'Buga' },
    { value: 'yumbo', label: 'Yumbo' },
    { value: 'ginebra', label: 'Ginebra' }
  ],
  // México - Jalisco
  jalisco: [
    { value: 'guadalajara', label: 'Guadalajara' },
    { value: 'zapopan', label: 'Zapopan' },
    { value: 'tlaquepaque', label: 'Tlaquepaque' },
    { value: 'tonala', label: 'Tonalá' },
    { value: 'tlaquepaque', label: 'Tlaquepaque' },
    { value: 'el_salto', label: 'El Salto' },
    { value: 'tlaquepaque', label: 'Tlaquepaque' },
    { value: 'tlaquepaque', label: 'Tlaquepaque' }
  ],
  // México - Ciudad de México
  cdmx: [
    { value: 'alvaro_obregon', label: 'Álvaro Obregón' },
    { value: 'azcapotzalco', label: 'Azcapotzalco' },
    { value: 'benito_juarez', label: 'Benito Juárez' },
    { value: 'coyoacan', label: 'Coyoacán' },
    { value: 'cuajimalpa', label: 'Cuajimalpa' },
    { value: 'cuauhtemoc', label: 'Cuauhtémoc' },
    { value: 'gustavo_madero', label: 'Gustavo A. Madero' },
    { value: 'iztacalco', label: 'Iztacalco' },
    { value: 'iztapalapa', label: 'Iztapalapa' },
    { value: 'magdalena_contreras', label: 'Magdalena Contreras' },
    { value: 'miguel_hidalgo', label: 'Miguel Hidalgo' },
    { value: 'milpa_alta', label: 'Milpa Alta' },
    { value: 'tlahuac', label: 'Tláhuac' },
    { value: 'tlalpan', label: 'Tlalpan' },
    { value: 'venustiano_carranza', label: 'Venustiano Carranza' },
    { value: 'xochimilco', label: 'Xochimilco' }
  ],
  // Argentina - Buenos Aires
  buenos_aires: [
    { value: 'la_plata', label: 'La Plata' },
    { value: 'mar_del_plata', label: 'Mar del Plata' },
    { value: 'quilmes', label: 'Quilmes' },
    { value: 'banfield', label: 'Banfield' },
    { value: 'merlo', label: 'Merlo' },
    { value: 'moron', label: 'Morón' },
    { value: 'san_isidro', label: 'San Isidro' },
    { value: 'tigre', label: 'Tigre' }
  ]
}

export function LocationSelector({ onLocationChange, initialLocation, className = '' }: LocationSelectorProps) {
  const [selectedCountry, setSelectedCountry] = useState(initialLocation?.country || '')
  const [selectedState, setSelectedState] = useState(initialLocation?.state || '')
  const [selectedCity, setSelectedCity] = useState(initialLocation?.city || '')

  useEffect(() => {
    if (selectedCountry && selectedState && selectedCity) {
      onLocationChange({
        country: selectedCountry,
        state: selectedState,
        city: selectedCity
      })
    }
  }, [selectedCountry, selectedState, selectedCity, onLocationChange])

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country)
    setSelectedState('')
    setSelectedCity('')
  }

  const handleStateChange = (state: string) => {
    setSelectedState(state)
    setSelectedCity('')
  }

  const availableStates = selectedCountry ? statesByCountry[selectedCountry] || [] : []
  const availableCities = selectedState ? citiesByState[selectedState] || [] : []

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <MapPin className="h-4 w-4 text-primary" />
        <Label className="text-sm font-medium">Ubicación</Label>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Country Selector */}
        <div className="space-y-2">
          <Label htmlFor="country" className="text-xs text-muted-foreground">
            País
          </Label>
          <Select value={selectedCountry} onValueChange={handleCountryChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar país" />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.value} value={country.value}>
                  {country.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* State/Province Selector */}
        <div className="space-y-2">
          <Label htmlFor="state" className="text-xs text-muted-foreground">
            {selectedCountry === 'colombia' ? 'Departamento' : 
             selectedCountry === 'mexico' ? 'Estado' : 'Provincia'}
          </Label>
          <Select 
            value={selectedState} 
            onValueChange={handleStateChange}
            disabled={!selectedCountry}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar" />
            </SelectTrigger>
            <SelectContent>
              {availableStates.map((state) => (
                <SelectItem key={state.value} value={state.value}>
                  {state.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* City Selector */}
        <div className="space-y-2">
          <Label htmlFor="city" className="text-xs text-muted-foreground">
            Ciudad
          </Label>
          <Select 
            value={selectedCity} 
            onValueChange={setSelectedCity}
            disabled={!selectedState}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar ciudad" />
            </SelectTrigger>
            <SelectContent>
              {availableCities.map((city) => (
                <SelectItem key={city.value} value={city.value}>
                  {city.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
