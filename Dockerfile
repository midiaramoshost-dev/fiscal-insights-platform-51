# Etapa 1: Build da aplicação com Node.js
FROM node:20-alpine AS builder

WORKDIR /app

# Copia apenas os arquivos de dependência primeiro para aproveitar o cache do Docker
COPY package.json package-lock.json ./

# Instala todas as dependências (incluindo devDependencies necessárias para o build do Vite/React)
# Usamos 'npm install' em vez de 'npm ci' para evitar erros rígidos de sincronia de lock file
RUN npm install && npm cache clean --force

# Copia todo o restante do código fonte
COPY . .

# Executa o build de produção do Vite
RUN npm run build

# Etapa 2: Servidor leve com Nginx para servir os arquivos estáticos
FROM nginx:alpine

# Remove a configuração padrão do Nginx para evitar conflitos
RUN rm -rf /etc/nginx/conf.d/default.conf

# Copia nossa configuração customizada do Nginx (para suportar SPA/Rotas)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos construídos (pasta dist) da etapa anterior para a pasta pública do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Inicia o Nginx em primeiro plano
CMD ["nginx", "-g", "daemon off;"]
