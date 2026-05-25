FROM php:8.2-apache

# Installer dépendances
RUN apt-get update && apt-get install -y \
    zip \
    unzip \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev

# Extensions PHP
RUN docker-php-ext-install pdo pdo_mysql mbstring

# Activer rewrite
RUN a2enmod rewrite

# Définir le dossier public Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public

# Modifier configuration Apache
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/*.conf

RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/apache2.conf \
    /etc/apache2/conf-available/*.conf

# Copier projet
COPY . /var/www/html

WORKDIR /var/www/html

# Créer dossiers Laravel
RUN mkdir -p storage bootstrap/cache

# Permissions
RUN chown -R www-data:www-data storage bootstrap/cache

RUN chmod -R 775 storage bootstrap/cache

EXPOSE 80

CMD ["apache2-foreground"]