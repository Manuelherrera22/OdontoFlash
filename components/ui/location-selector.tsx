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
  { value: 'brazil', label: 'Brasil' }
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
    { value: 'valle_cauca', label: 'Valle del Cauca' },
    { value: 'amazonas', label: 'Amazonas' },
    { value: 'arauca', label: 'Arauca' },
    { value: 'casanare', label: 'Casanare' },
    { value: 'choco', label: 'Chocó' },
    { value: 'guainia', label: 'Guainía' },
    { value: 'guaviare', label: 'Guaviare' },
    { value: 'putumayo', label: 'Putumayo' },
    { value: 'san_andres', label: 'San Andrés y Providencia' },
    { value: 'vaupes', label: 'Vaupés' },
    { value: 'vichada', label: 'Vichada' }
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
  ],
  brazil: [
    { value: 'acre', label: 'Acre' },
    { value: 'alagoas', label: 'Alagoas' },
    { value: 'amapa', label: 'Amapá' },
    { value: 'amazonas', label: 'Amazonas' },
    { value: 'bahia', label: 'Bahía' },
    { value: 'ceara', label: 'Ceará' },
    { value: 'distrito_federal', label: 'Distrito Federal' },
    { value: 'espirito_santo', label: 'Espírito Santo' },
    { value: 'goias', label: 'Goiás' },
    { value: 'maranhao', label: 'Maranhão' },
    { value: 'mato_grosso', label: 'Mato Grosso' },
    { value: 'mato_grosso_sul', label: 'Mato Grosso do Sul' },
    { value: 'minas_gerais', label: 'Minas Gerais' },
    { value: 'para', label: 'Pará' },
    { value: 'paraiba', label: 'Paraíba' },
    { value: 'parana', label: 'Paraná' },
    { value: 'pernambuco', label: 'Pernambuco' },
    { value: 'piaui', label: 'Piauí' },
    { value: 'rio_de_janeiro', label: 'Río de Janeiro' },
    { value: 'rio_grande_norte', label: 'Río Grande do Norte' },
    { value: 'rio_grande_sul', label: 'Río Grande do Sul' },
    { value: 'rondonia', label: 'Rondônia' },
    { value: 'roraima', label: 'Roraima' },
    { value: 'santa_catarina', label: 'Santa Catarina' },
    { value: 'sao_paulo', label: 'São Paulo' },
    { value: 'sergipe', label: 'Sergipe' },
    { value: 'tocantins', label: 'Tocantins' }
  ],
  spain: [
    { value: 'andalucia', label: 'Andalucía' },
    { value: 'aragon', label: 'Aragón' },
    { value: 'asturias', label: 'Asturias' },
    { value: 'baleares', label: 'Islas Baleares' },
    { value: 'canarias', label: 'Canarias' },
    { value: 'cantabria', label: 'Cantabria' },
    { value: 'castilla_leon', label: 'Castilla y León' },
    { value: 'castilla_mancha', label: 'Castilla-La Mancha' },
    { value: 'cataluna', label: 'Cataluña' },
    { value: 'ceuta', label: 'Ceuta' },
    { value: 'extremadura', label: 'Extremadura' },
    { value: 'galicia', label: 'Galicia' },
    { value: 'la_rioja', label: 'La Rioja' },
    { value: 'madrid', label: 'Madrid' },
    { value: 'melilla', label: 'Melilla' },
    { value: 'murcia', label: 'Murcia' },
    { value: 'navarra', label: 'Navarra' },
    { value: 'pais_vasco', label: 'País Vasco' },
    { value: 'valencia', label: 'Comunidad Valenciana' }
  ],
  ecuador: [
    { value: 'azuay', label: 'Azuay' },
    { value: 'bolivar', label: 'Bolívar' },
    { value: 'canar', label: 'Cañar' },
    { value: 'carchi', label: 'Carchi' },
    { value: 'chimborazo', label: 'Chimborazo' },
    { value: 'cotopaxi', label: 'Cotopaxi' },
    { value: 'el_oro', label: 'El Oro' },
    { value: 'esmeraldas', label: 'Esmeraldas' },
    { value: 'galapagos', label: 'Galápagos' },
    { value: 'guayas', label: 'Guayas' },
    { value: 'imbabura', label: 'Imbabura' },
    { value: 'loja', label: 'Loja' },
    { value: 'los_rios', label: 'Los Ríos' },
    { value: 'manabi', label: 'Manabí' },
    { value: 'morona_santiago', label: 'Morona Santiago' },
    { value: 'napo', label: 'Napo' },
    { value: 'orellana', label: 'Orellana' },
    { value: 'pastaza', label: 'Pastaza' },
    { value: 'pichincha', label: 'Pichincha' },
    { value: 'santa_elena', label: 'Santa Elena' },
    { value: 'santo_domingo', label: 'Santo Domingo de los Tsáchilas' },
    { value: 'sucumbios', label: 'Sucumbíos' },
    { value: 'tungurahua', label: 'Tungurahua' },
    { value: 'zamora_chinchipe', label: 'Zamora Chinchipe' }
  ],
  venezuela: [
    { value: 'amazonas', label: 'Amazonas' },
    { value: 'anzoategui', label: 'Anzoátegui' },
    { value: 'apure', label: 'Apure' },
    { value: 'aragua', label: 'Aragua' },
    { value: 'barinas', label: 'Barinas' },
    { value: 'bolivar', label: 'Bolívar' },
    { value: 'carabobo', label: 'Carabobo' },
    { value: 'cojedes', label: 'Cojedes' },
    { value: 'delta_amacuro', label: 'Delta Amacuro' },
    { value: 'falcon', label: 'Falcón' },
    { value: 'guarico', label: 'Guárico' },
    { value: 'lara', label: 'Lara' },
    { value: 'merida', label: 'Mérida' },
    { value: 'miranda', label: 'Miranda' },
    { value: 'monagas', label: 'Monagas' },
    { value: 'nueva_esparta', label: 'Nueva Esparta' },
    { value: 'portuguesa', label: 'Portuguesa' },
    { value: 'sucre', label: 'Sucre' },
    { value: 'tachira', label: 'Táchira' },
    { value: 'trujillo', label: 'Trujillo' },
    { value: 'vargas', label: 'Vargas' },
    { value: 'yaracuy', label: 'Yaracuy' },
    { value: 'zulia', label: 'Zulia' },
    { value: 'distrito_capital', label: 'Distrito Capital' }
  ],
  peru: [
    { value: 'amazonas', label: 'Amazonas' },
    { value: 'ancash', label: 'Áncash' },
    { value: 'apurimac', label: 'Apurímac' },
    { value: 'arequipa', label: 'Arequipa' },
    { value: 'ayacucho', label: 'Ayacucho' },
    { value: 'cajamarca', label: 'Cajamarca' },
    { value: 'callao', label: 'Callao' },
    { value: 'cusco', label: 'Cusco' },
    { value: 'huancavelica', label: 'Huancavelica' },
    { value: 'huanuco', label: 'Huánuco' },
    { value: 'ica', label: 'Ica' },
    { value: 'junin', label: 'Junín' },
    { value: 'la_libertad', label: 'La Libertad' },
    { value: 'lambayeque', label: 'Lambayeque' },
    { value: 'lima', label: 'Lima' },
    { value: 'loreto', label: 'Loreto' },
    { value: 'madre_de_dios', label: 'Madre de Dios' },
    { value: 'moquegua', label: 'Moquegua' },
    { value: 'pasco', label: 'Pasco' },
    { value: 'piura', label: 'Piura' },
    { value: 'puno', label: 'Puno' },
    { value: 'san_martin', label: 'San Martín' },
    { value: 'tacna', label: 'Tacna' },
    { value: 'tumbes', label: 'Tumbes' },
    { value: 'ucayali', label: 'Ucayali' }
  ],
  chile: [
    { value: 'arica_parinacota', label: 'Arica y Parinacota' },
    { value: 'tarapaca', label: 'Tarapacá' },
    { value: 'antofagasta', label: 'Antofagasta' },
    { value: 'atacama', label: 'Atacama' },
    { value: 'coquimbo', label: 'Coquimbo' },
    { value: 'valparaiso', label: 'Valparaíso' },
    { value: 'metropolitana', label: 'Metropolitana' },
    { value: 'ohiggins', label: 'O\'Higgins' },
    { value: 'maule', label: 'Maule' },
    { value: 'nuble', label: 'Ñuble' },
    { value: 'biobio', label: 'Biobío' },
    { value: 'la_araucania', label: 'La Araucanía' },
    { value: 'los_rios', label: 'Los Ríos' },
    { value: 'los_lagos', label: 'Los Lagos' },
    { value: 'aysen', label: 'Aysén' },
    { value: 'magallanes', label: 'Magallanes y Antártica Chilena' }
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
    { value: 'tigre', label: 'Tigre' },
    { value: 'avellaneda', label: 'Avellaneda' },
    { value: 'lomas_de_zamora', label: 'Lomas de Zamora' },
    { value: 'san_miguel', label: 'San Miguel' },
    { value: 'moreno', label: 'Moreno' }
  ],
  // Brasil - São Paulo
  sao_paulo: [
    { value: 'sao_paulo_city', label: 'São Paulo' },
    { value: 'guarulhos', label: 'Guarulhos' },
    { value: 'campinas', label: 'Campinas' },
    { value: 'sao_bernardo', label: 'São Bernardo do Campo' },
    { value: 'santo_andre', label: 'Santo André' },
    { value: 'osasco', label: 'Osasco' },
    { value: 'sorocaba', label: 'Sorocaba' },
    { value: 'ribeirao_preto', label: 'Ribeirão Preto' },
    { value: 'santos', label: 'Santos' },
    { value: 'maua', label: 'Mauá' }
  ],
  // Brasil - Río de Janeiro
  rio_de_janeiro: [
    { value: 'rio_de_janeiro_city', label: 'Río de Janeiro' },
    { value: 'sao_goncalo', label: 'São Gonçalo' },
    { value: 'duque_de_caxias', label: 'Duque de Caxias' },
    { value: 'nova_iguacu', label: 'Nova Iguaçu' },
    { value: 'niteroi', label: 'Niterói' },
    { value: 'belford_roxo', label: 'Belford Roxo' },
    { value: 'sao_joao_de_meriti', label: 'São João de Meriti' },
    { value: 'campos_dos_goytacazes', label: 'Campos dos Goytacazes' },
    { value: 'petropolis', label: 'Petrópolis' },
    { value: 'volta_redonda', label: 'Volta Redonda' }
  ],
  // España - Madrid
  madrid: [
    { value: 'madrid_city', label: 'Madrid' },
    { value: 'mostoles', label: 'Móstoles' },
    { value: 'fuenlabrada', label: 'Fuenlabrada' },
    { value: 'alcala_henares', label: 'Alcalá de Henares' },
    { value: 'leganes', label: 'Leganés' },
    { value: 'getafe', label: 'Getafe' },
    { value: 'alcorcon', label: 'Alcorcón' },
    { value: 'torrejon_ardoz', label: 'Torrejón de Ardoz' },
    { value: 'parla', label: 'Parla' },
    { value: 'alcala_henares', label: 'Alcalá de Henares' }
  ],
  // España - Cataluña
  cataluna: [
    { value: 'barcelona', label: 'Barcelona' },
    { value: 'hospitalet', label: 'Hospitalet de Llobregat' },
    { value: 'terrassa', label: 'Terrassa' },
    { value: 'badalona', label: 'Badalona' },
    { value: 'sabadell', label: 'Sabadell' },
    { value: 'lleida', label: 'Lleida' },
    { value: 'tarragona', label: 'Tarragona' },
    { value: 'mataro', label: 'Mataró' },
    { value: 'santa_coloma', label: 'Santa Coloma de Gramenet' },
    { value: 'reus', label: 'Reus' }
  ],
  // Colombia - Cundinamarca
  cundinamarca: [
    { value: 'soacha', label: 'Soacha' },
    { value: 'girardot', label: 'Girardot' },
    { value: 'zipaquira', label: 'Zipaquirá' },
    { value: 'facatativa', label: 'Facatativá' },
    { value: 'chia', label: 'Chía' },
    { value: 'madrid', label: 'Madrid' },
    { value: 'mosquera', label: 'Mosquera' },
    { value: 'sibate', label: 'Sibaté' },
    { value: 'tabio', label: 'Tabio' },
    { value: 'tenjo', label: 'Tenjo' }
  ],
  // Colombia - Santander
  santander: [
    { value: 'bucaramanga', label: 'Bucaramanga' },
    { value: 'floridablanca', label: 'Floridablanca' },
    { value: 'giron', label: 'Girón' },
    { value: 'piedecuesta', label: 'Piedecuesta' },
    { value: 'barrancabermeja', label: 'Barrancabermeja' },
    { value: 'socorro', label: 'Socorro' },
    { value: 'san_gil', label: 'San Gil' },
    { value: 'velez', label: 'Vélez' },
    { value: 'aguachica', label: 'Aguachica' },
    { value: 'sabana_torres', label: 'Sabana de Torres' }
  ],
  // Ecuador - Pichincha
  pichincha: [
    { value: 'quito', label: 'Quito' },
    { value: 'cayambe', label: 'Cayambe' },
    { value: 'machachi', label: 'Machachi' },
    { value: 'puerto_quito', label: 'Puerto Quito' },
    { value: 'pedro_vicente', label: 'Pedro Vicente Maldonado' },
    { value: 'mejia', label: 'Mejía' },
    { value: 'pedro_moncayo', label: 'Pedro Moncayo' },
    { value: 'ruminahui', label: 'Rumiñahui' },
    { value: 'san_miguel', label: 'San Miguel de los Bancos' }
  ],
  // Ecuador - Guayas
  guayas: [
    { value: 'guayaquil', label: 'Guayaquil' },
    { value: 'duran', label: 'Durán' },
    { value: 'samborondon', label: 'Samborondón' },
    { value: 'salitre', label: 'Salitre' },
    { value: 'naranjito', label: 'Naranjito' },
    { value: 'milagro', label: 'Milagro' },
    { value: 'nobol', label: 'Nobol' },
    { value: 'playas', label: 'Playas' },
    { value: 'yaguachi', label: 'Yaguachi' }
  ],
  // Venezuela - Miranda
  miranda: [
    { value: 'caracas', label: 'Caracas' },
    { value: 'petare', label: 'Petare' },
    { value: 'guatire', label: 'Guatire' },
    { value: 'guarenas', label: 'Guarenas' },
    { value: 'los_teques', label: 'Los Teques' },
    { value: 'ocumare', label: 'Ocumare del Tuy' },
    { value: 'santa_lucia', label: 'Santa Lucía' },
    { value: 'charallave', label: 'Charallave' },
    { value: 'cua', label: 'Cúa' }
  ],
  // Venezuela - Zulia
  zulia: [
    { value: 'maracaibo', label: 'Maracaibo' },
    { value: 'cabimas', label: 'Cabimas' },
    { value: 'ciudad_ojeda', label: 'Ciudad Ojeda' },
    { value: 'valencia', label: 'Valencia' },
    { value: 'san_francisco', label: 'San Francisco' },
    { value: 'machiques', label: 'Machiques' },
    { value: 'puerto_cabello', label: 'Puerto Cabello' },
    { value: 'santa_rita', label: 'Santa Rita' },
    { value: 'la_cañada', label: 'La Cañada' }
  ],
  // Perú - Lima
  lima: [
    { value: 'lima_metropolitana', label: 'Lima Metropolitana' },
    { value: 'callao', label: 'Callao' },
    { value: 'huaral', label: 'Huaral' },
    { value: 'huacho', label: 'Huacho' },
    { value: 'canete', label: 'Cañete' },
    { value: 'barranca', label: 'Barranca' },
    { value: 'huarochiri', label: 'Huarochirí' },
    { value: 'oyon', label: 'Oyón' },
    { value: 'yauyos', label: 'Yauyos' }
  ],
  // Perú - Arequipa
  arequipa: [
    { value: 'arequipa_city', label: 'Arequipa' },
    { value: 'camana', label: 'Camaná' },
    { value: 'caraveli', label: 'Caravelí' },
    { value: 'castilla', label: 'Castilla' },
    { value: 'caylloma', label: 'Caylloma' },
    { value: 'condesuyos', label: 'Condesuyos' },
    { value: 'islay', label: 'Islay' },
    { value: 'la_union', label: 'La Unión' }
  ],
  // Chile - Metropolitana
  metropolitana: [
    { value: 'santiago', label: 'Santiago' },
    { value: 'puente_alto', label: 'Puente Alto' },
    { value: 'maipu', label: 'Maipú' },
    { value: 'la_florida', label: 'La Florida' },
    { value: 'las_condes', label: 'Las Condes' },
    { value: 'san_bernardo', label: 'San Bernardo' },
    { value: 'penalolen', label: 'Peñalolén' },
    { value: 'macul', label: 'Macul' },
    { value: 'quinta_normal', label: 'Quinta Normal' }
  ],
  // Chile - Valparaíso
  valparaiso: [
    { value: 'valparaiso_city', label: 'Valparaíso' },
    { value: 'vina_del_mar', label: 'Viña del Mar' },
    { value: 'quillota', label: 'Quillota' },
    { value: 'san_antonio', label: 'San Antonio' },
    { value: 'los_andes', label: 'Los Andes' },
    { value: 'san_felipe', label: 'San Felipe' },
    { value: 'la_ligua', label: 'La Ligua' },
    { value: 'petorca', label: 'Petorca' },
    { value: 'zapallar', label: 'Zapallar' }
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
