# Frontend Dockerfile - React + Vite
FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar codigo fuente
COPY . .

# Exponer puerto
EXPOSE 5173

# Comando de inicio (modo desarrollo con host para Docker)
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
