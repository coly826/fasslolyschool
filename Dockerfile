# Image PHP avec Apache
FROM php:8.2-apache

# Installer extensions nécessaires
RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev

# Installer extensions PHP
RUN docker-php-ext-install pdo pdo_mysql mbstring

# Activer mod_rewrite
RUN a2enmod rewrite

# Copier le projet Laravel
COPY . /var/www/html

# Définir le dossier de travail
WORKDIR /var/www/html

# Créer les dossiers nécessaires
RUN mkdir -p storage bootstrap/cache

# Permissions
RUN chown -R www-data:www-data storage bootstrap/cache

RUN chmod -R 775 storage bootstrap/cache

# Exposer le port
EXPOSE 80

# Lancer Apache
CMD ["apache2-foreground"]