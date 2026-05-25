# Image Node.js
FROM node:20

# Dossier de travail
WORKDIR /app

# Copier package.json
COPY package*.json ./

# Installer dépendances
RUN npm install

# Copier le projet
COPY . .

# Exposer le port Express
EXPOSE 3000

# Lancer application
CMD ["npm", "start"]