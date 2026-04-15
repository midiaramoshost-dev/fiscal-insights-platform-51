# Etapa 1: Build da aplicação
FROM node:20-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm ci

# Copia o restante do código
COPY . .

# Constrói a aplicação para produção
RUN npm run build

# Etapa 2: Servidor leve para servir os arquivos estáticos
FROM nginx:alpine

# Copia os arquivos construídos da etapa anterior para a pasta do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# (Opcional) Se você tiver um nginx.conf personalizado, descomente a linha abaixo
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
