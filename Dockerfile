# Etapa 1: Build da aplicação com Node.js
FROM node:20-alpine AS builder

WORKDIR /app

# Copia apenas os arquivos de dependência primeiro (cache eficiente)
COPY package.json package-lock.json ./

# Instala dependências
RUN npm ci --only=production && npm cache clean --force

# Copia todo o código
COPY . .

# Build da aplicação Vite
RUN npm run build

# Etapa 2: Servidor leve com Nginx para servir arquivos estáticos
FROM nginx:alpine

# Remove configuração padrão do Nginx
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copia configuração customizada (opcional, mas recomendado)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos construídos do builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe porta 80
EXPOSE 80

# Inicia Nginx em foreground
CMD ["nginx", "-g", "daemon off;"]
