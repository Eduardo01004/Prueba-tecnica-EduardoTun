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

## API Endpoints

Base URL: `http://localhost:3001`

### Calculo de Agua

```bash
POST /api/calculate
Content-Type: application/json

{
  "heights": [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]
}

# Response
{
  "heights": [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1],
  "totalWater": 6
}
```

### Otros Endpoints

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| GET | `/api/topologists` | Lista de topologos |
| GET | `/api/projects` | Lista de proyectos |
| GET | `/api/terrains` | Lista de terrenos |
| POST | `/api/terrains` | Crear terreno |
| GET | `/api/report` | Estadisticas |

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
