# Technical Test - Rain Water Trapping

Aplicacion fullstack para calcular y visualizar la acumulacion de agua en terrenos (Rain Water Trapping Problem).

## Descripcion del Problema

Dado un array de alturas que representa un terreno, calcular cuantas unidades de agua se pueden acumular despues de la lluvia.

```
Input: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]

       #
   #~~~#~#
 #~##~####~#
____________

Output: 6 unidades de agua
```

## Tecnologias

| Componente | Tecnologia |
|------------|------------|
| Backend | NestJS 10, TypeScript |
| Frontend | React 19, Vite |
| Contenedores | Docker, Docker Compose |

## Requisitos

- Docker >= 20.x
- Docker Compose >= 2.x

O para ejecucion local:
- Node.js >= 18.x
- npm >= 9.x

---

## Ejecucion con Docker Compose (Recomendado)

### Levantar todos los servicios

```bash
# Construir y ejecutar
docker-compose up --build

# O en segundo plano
docker-compose up -d --build
```

### URLs de acceso

| Servicio | URL |
|----------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3001 |

### Comandos utiles

```bash
# Ver logs en tiempo real
docker-compose logs -f

# Ver logs de un servicio especifico
docker-compose logs -f backend
docker-compose logs -f frontend

# Detener servicios
docker-compose down

# Reconstruir un servicio
docker-compose up --build backend
docker-compose up --build frontend

# Eliminar volumenes (limpieza completa)
docker-compose down -v
```

---

## Ejecucion Local (Sin Docker)

### Backend

```bash
cd Backend
npm install
npm run start:dev
```

El servidor estara en http://localhost:3001

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

La aplicacion estara en http://localhost:5173

---

## Estructura del Proyecto

```
Prueba-tecnica-EduardoTun/
├── docker-compose.yml          # Orquestador de contenedores
├── README.md                   # Este archivo
│
├── Backend/
│   ├── Dockerfile
│   ├── src/
│   │   ├── main.ts             # Punto de entrada
│   │   ├── app.module.ts
│   │   └── terrain/            # Modulo principal
│   │       ├── terrain.controller.ts
│   │       ├── terrain.service.ts
│   │       ├── dto/
│   │       └── entities/
│   └── README.md               # Documentacion del backend
│
└── Frontend/
    ├── Dockerfile
    ├── src/
    │   ├── main.jsx            # Punto de entrada
    │   ├── App.jsx
    │   └── components/
    │       ├── Input.jsx       # Entrada de datos
    │       ├── Grid.jsx        # Visualizacion
    │       └── Cell.jsx        # Celda del grid
    └── README.md               # Documentacion del frontend
```

---

## API Endpoints - Ejemplos con cURL

Base URL: `http://localhost:3001`

### Calcular Agua

```bash
curl -X POST http://localhost:3001/api/calculate \
  -H "Content-Type: application/json" \
  -d '{"heights": [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]}'
```

### Topologos

```bash
# Obtener todos los topologos
curl http://localhost:3001/api/topologists

# Obtener topologo por ID
curl http://localhost:3001/api/topologists/1

# Obtener terrenos de un topologo
curl http://localhost:3001/api/topologists/1/terrains
```

### Proyectos

```bash
# Obtener todos los proyectos
curl http://localhost:3001/api/projects

# Obtener proyecto por ID
curl http://localhost:3001/api/projects/1

# Obtener terrenos de un proyecto
curl http://localhost:3001/api/projects/1/terrains
```

### Terrenos

```bash
# Obtener todos los terrenos
curl http://localhost:3001/api/terrains

# Obtener terreno por ID
curl http://localhost:3001/api/terrains/1

# Crear nuevo terreno
curl -X POST http://localhost:3001/api/terrains \
  -H "Content-Type: application/json" \
  -d '{
    "topologistId": 1,
    "projectId": 1,
    "heights": [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
    "latitude": 19.4326,
    "longitude": -99.1332
  }'
```

### Reporte de Estadisticas

```bash
curl http://localhost:3001/api/report
```

Ver documentacion completa en [Backend/README.md](./Backend/README.md)

---

## Uso de la Aplicacion

1. Abrir http://localhost:5173
2. Ingresar alturas separadas por comas (ej: `0,1,0,2,1,0,1,3,2,1,2,1`)
3. Click en "Submit"
4. Ver la visualizacion del terreno y agua acumulada

---

## Autor

Eduardo Tun
