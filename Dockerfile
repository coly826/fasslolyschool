# Utiliser une image PHP officielle avec Apache
FROM php:8.1-apache

# Installer les extensions PHP nécessaires
RUN apt-get update && apt-get install -y \
    libonig-dev \
    libzip-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo pdo_mysql zip mbstring

# Copier le code source dans le conteneur
COPY . /var/www/html/

# Donner les permissions nécessaires (ajuste selon ton projet)
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Exposer le port 80
EXPOSE 80

# Lancer Apache en avant-plan
CMD ["apache2-foreground"]
