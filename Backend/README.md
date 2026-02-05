# Technical Test API - Backend

API REST desarrollada con **NestJS** para el calculo de acumulacion de agua en terrenos (Rain Water Trapping Problem).

## Tecnologias

- **NestJS** v10 - Framework progresivo de Node.js
- **TypeScript** v5.1.3
- **Jest** - Testing
- **ESLint + Prettier** - Linting y formateo

## Requisitos Previos

- Node.js >= 18.x
- npm >= 9.x

## Instalacion

```bash
cd Backend
npm install
```

## Scripts Disponibles

| Comando | Descripcion |
|---------|-------------|
| `npm run start` | Ejecutar en produccion |
| `npm run start:dev` | Modo desarrollo con hot-reload |
| `npm run start:debug` | Modo debug |
| `npm run build` | Compilar TypeScript |
| `npm run test` | Ejecutar tests unitarios |
| `npm run test:e2e` | Tests end-to-end |
| `npm run lint` | Ejecutar ESLint |
| `npm run format` | Formatear con Prettier |

## Ejecucion

```bash
# Desarrollo
npm run start:dev

# El servidor estara disponible en http://localhost:3001
```

## Estructura del Proyecto

```
Backend/
├── src/
│   ├── main.ts                 # Punto de entrada (puerto 3001)
│   ├── app.module.ts           # Modulo raiz
│   ├── app.controller.ts       # Controlador raiz
│   ├── app.service.ts          # Servicio raiz
│   └── terrain/
│       ├── terrain.module.ts   # Modulo de terreno
│       ├── terrain.controller.ts # Endpoints de la API
│       ├── terrain.service.ts  # Logica de negocio
│       ├── dto/
│       │   └── calculate.dto.ts # DTO para calculos
│       └── entities/
│           ├── terrain.entity.ts    # Entidad Terrain
│           ├── topologist.entity.ts # Entidad Topologist
│           └── project.entity.ts    # Entidad Project
├── test/                       # Tests e2e
├── dist/                       # Codigo compilado
└── package.json
```

## API Endpoints

Base URL: `http://localhost:3001`

### Calculo de Agua

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| `POST` | `/api/calculate` | Calcula agua acumulada en un terreno |

**Request Body:**
```json
{
  "heights": [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
}
```

**Response:**
```json
{
  "heights": [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
  "totalWater": 6
}
```

### Topologos

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| `GET` | `/api/topologists` | Obtener todos los topologos |
| `GET` | `/api/topologists/:id` | Obtener topologo por ID |
| `GET` | `/api/topologists/:id/terrains` | Terrenos de un topologo |

### Proyectos

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| `GET` | `/api/projects` | Obtener todos los proyectos |
| `GET` | `/api/projects/:id` | Obtener proyecto por ID |
| `GET` | `/api/projects/:id/terrains` | Terrenos de un proyecto |

### Terrenos

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| `GET` | `/api/terrains` | Obtener todos los terrenos |
| `GET` | `/api/terrains/:id` | Obtener terreno por ID |
| `POST` | `/api/terrains` | Crear nuevo terreno |

**Request Body (POST):**
```json
{
  "topologistId": 1,
  "projectId": 1,
  "heights": [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
  "latitude": 19.4326,
  "longitude": -99.1332
}
```

### Reportes

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| `GET` | `/api/report` | Estadisticas agregadas |

**Response:**
```json
{
  "totalTerrains": 3,
  "totalWater": 18,
  "avgWater": 6,
  "maxWater": 8,
  "minWater": 4,
  "totalTopologists": 2,
  "totalProjects": 2
}
```

## Modelos de Datos

### Terrain
```typescript
{
  id: number
  topologistId: number
  projectId: number
  heights: number[]
  waterUnits: number
  maxHeight: number
  arrayLength: number
  latitude: number
  longitude: number
  createdAt: Date
}
```

### Topologist
```typescript
{
  id: number
  name: string
  lastName: string
  email: string
  phone: string
  organization: string
  registerDate: Date
  active: boolean
}
```

### Project
```typescript
{
  id: number
  name: string
  description: string
  client: string
  startDate: Date
  endDate: Date
  active: boolean
  createdAt: Date
}
```

## Algoritmo: Rain Water Trapping

El algoritmo calcula cuantas unidades de agua se pueden acumular en un terreno dado un array de alturas.

**Funcionamiento:**
1. Crear arrays `maxLeft` y `maxRight`
2. `maxLeft[i]` = maxima altura desde el inicio hasta la posicion `i`
3. `maxRight[i]` = maxima altura desde la posicion `i` hasta el final
4. Para cada posicion: `agua = min(maxLeft[i], maxRight[i]) - heights[i]`
5. Sumar toda el agua acumulada

**Ejemplo:**
```
Input:  [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
Output: 6 unidades de agua

Visualizacion:
       #
   #~~~#~#
 #~##~####~#
____________
```

## Notas

- Los datos se almacenan en memoria (no hay base de datos persistente)
- El proyecto incluye datos de ejemplo precargados (3 topologos, 2 proyectos, 3 terrenos)
- CORS esta habilitado para desarrollo local
