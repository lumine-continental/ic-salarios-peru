export interface CareerData {
  id: number;
  ranking: number;
  area: string;
  name: string;
  avg: number;
  min: number;
  max: number;
  isContinental?: boolean;
  href?: string;
  availability?: 'available' | 'coming_soon' | 'not_available';
}

export const careers: CareerData[] = [
  { id: 1, ranking: 1, area: "Tecnología e Ingeniería", name: "Mecánica automotriz, Maquinaria y afines", avg: 2858, min: 1959, max: 3946 },
  { id: 2, ranking: 2, area: "Negocios y Creatividad", name: "Administración de empresas", avg: 2395, min: 1309, max: 3754, isContinental: true, href: "https://icontinental.edu.pe/carrera/administracion-de-empresas/", availability: 'available' },
  { id: 3, ranking: 3, area: "Negocios y Creatividad", name: "Contabilidad", avg: 2221, min: 1190, max: 3700, isContinental: true, href: "https://icontinental.edu.pe/carrera/contabilidad/", availability: 'available' },
  { id: 4, ranking: 4, area: "Tecnología e Ingeniería", name: "Electricista industrial", avg: 3757, min: 1800, max: 5784 },
  { id: 5, ranking: 5, area: "Tecnología e Ingeniería", name: "Sistemas de información", avg: 3191, min: 1300, max: 6100, isContinental: true, href: "https://icontinental.edu.pe/carrera/desarrollo-de-sistemas-de-informacion/", availability: 'available' },
  { id: 6, ranking: 5, area: "Tecnología e Ingeniería", name: "Ciencia de datos", avg: 3191, min: 1300, max: 6100, isContinental: true, href: "https://icontinental.edu.pe/carrera/ciencia-de-datos-e-inteligencia-artificial/", availability: 'available' },
  { id: 7, ranking: 6, area: "Negocios y Creatividad", name: "Marketing", avg: 2560, min: 1203, max: 4419, isContinental: true, href: "https://icontinental.edu.pe/carrera/marketing/", availability: 'available' },
  { id: 8, ranking: 6, area: "Negocios y Creatividad", name: "Publicidad y marketing dig.", avg: 2560, min: 1203, max: 4419, availability: 'not_available' },
  { id: 9, ranking: 7, area: "Salud y Servicios", name: "Enfermería", avg: 2256, min: 1200, max: 3546, isContinental: true, href: "https://icontinental.edu.pe/noticias", availability: 'coming_soon' },
  { id: 10, ranking: 8, area: "Tecnología e Ingeniería", name: "Gestión de la construcción", avg: 2575, min: 1976, max: 3613, isContinental: true, href: "https://icontinental.edu.pe/carrera/gestion-de-la-construccion/", availability: 'available' },
  { id: 11, ranking: 9, area: "Negocios y Creatividad", name: "Gastronomía", avg: 2416, min: 1300, max: 3761, isContinental: true, href: "https://icontinental.edu.pe/carrera/gastronomia/", availability: 'available' },
  { id: 12, ranking: 10, area: "Salud y Servicios", name: "Seguridad y salud ocupacional", avg: 2343, min: 1883, max: 3620 }
];
