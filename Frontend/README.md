# Technical Test App - Frontend

Aplicacion web desarrollada con **React** y **Vite** para visualizar la acumulacion de agua en terrenos (Rain Water Trapping Problem).

## Tecnologias

- **React** v19.2.0
- **Vite** v7.2.4 - Build tool ultra-rapido
- **JavaScript/JSX**
- **ESLint** - Linting

## Requisitos Previos

- Node.js >= 18.x
- npm >= 9.x

## Instalacion

```bash
cd Frontend
npm install
```

## Scripts Disponibles

| Comando | Descripcion |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot-reload |
| `npm run build` | Compilar para produccion |
| `npm run preview` | Previsualizar build de produccion |
| `npm run lint` | Ejecutar ESLint |

## Ejecucion

```bash
# Desarrollo
npm run dev

# La aplicacion estara disponible en http://localhost:5173
```

## Estructura del Proyecto

```
Frontend/
├── src/
│   ├── main.jsx              # Punto de entrada React
│   ├── App.jsx               # Componente raiz
│   ├── App.css               # Estilos principales
│   ├── index.css             # Estilos globales
│   └── components/
│       ├── Input.jsx         # Componente de entrada de datos
│       ├── Grid.jsx          # Visualizacion del terreno
│       └── Cell.jsx          # Celda individual del grid
├── public/                   # Assets publicos
├── index.html                # HTML de entrada
├── vite.config.js            # Configuracion de Vite
└── package.json
```

## Componentes

### App.jsx
Componente raiz que maneja el estado principal de la aplicacion.

**Estado:**
- `heights`: Array de numeros que representa las alturas del terreno

**Valor por defecto:** `[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]`

### Input.jsx
Componente para ingresar las alturas del terreno.

**Props:**
- `heights`: Array actual de alturas
- `setHeights`: Funcion para actualizar las alturas

**Funcionalidades:**
- Campo de texto para ingresar numeros separados por comas
- Validacion de entrada (solo numeros positivos)
- Mensajes de error para valores invalidos
- Boton Submit para aplicar cambios

**Ejemplo de uso:**
```
Entrada: "0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1"
```

### Grid.jsx
Componente que visualiza el terreno y calcula el agua acumulada.

**Props:**
- `heights`: Array de alturas del terreno

**Funcionalidades:**
- Implementa el algoritmo de Rain Water Trapping
- Renderiza un grid 2D con celdas coloreadas
- Muestra el total de agua acumulada

**Visualizacion:**
- Negro (`#333`): Tierra/Terreno
- Azul (`#4A90E2`): Agua acumulada
- Transparente: Espacio vacio

### Cell.jsx
Componente que representa una celda individual del grid.

**Props:**
- `type`: Tipo de celda - `'ground'`, `'water'`, o `'empty'`

## Algoritmo: Rain Water Trapping

El algoritmo calcula cuantas unidades de agua se pueden acumular entre las elevaciones del terreno.

```javascript
function calculateWater(heights) {
  const n = heights.length;
  if (n === 0) return [];

  const maxLeft = [];
  const maxRight = [];
  const water = [];

  // Calcular maximos desde la izquierda
  maxLeft[0] = heights[0];
  for (let i = 1; i < n; i++) {
    maxLeft[i] = Math.max(maxLeft[i - 1], heights[i]);
  }

  // Calcular maximos desde la derecha
  maxRight[n - 1] = heights[n - 1];
  for (let i = n - 2; i >= 0; i--) {
    maxRight[i] = Math.max(maxRight[i + 1], heights[i]);
  }

  // Calcular agua en cada posicion
  for (let i = 0; i < n; i++) {
    water[i] = Math.min(maxLeft[i], maxRight[i]) - heights[i];
  }

  return water;
}
```

**Ejemplo visual:**
```
Input: [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]

       #
   #~~~#~#
 #~##~####~#
____________

Resultado: 6 unidades de agua
```

## Estilos

Las celdas del grid tienen las siguientes clases CSS:

| Clase | Color | Descripcion |
|-------|-------|-------------|
| `.cell.ground` | `#333` (Negro) | Representa el terreno |
| `.cell.water` | `#4A90E2` (Azul) | Representa el agua acumulada |
| `.cell.empty` | Transparente | Espacio vacio |

**Tamano de celda:** 30x30 pixeles

## Uso de la Aplicacion

1. **Abrir la aplicacion** en `http://localhost:5173`
2. **Ver la visualizacion inicial** con el array por defecto
3. **Ingresar nuevos valores** en el campo de texto (numeros separados por comas)
4. **Hacer clic en Submit** para actualizar la visualizacion
5. **Observar el resultado** - total de agua acumulada

## Validaciones

- Solo se permiten numeros enteros positivos
- Los valores deben estar separados por comas
- Se muestra un mensaje de error si la entrada es invalida
- Valores vacios o no numericos son rechazados

## Notas

- La aplicacion funciona completamente en el cliente (sin llamadas al backend)
- El calculo se realiza en tiempo real al actualizar las alturas
- El grid se adapta automaticamente al tamano del array ingresado
