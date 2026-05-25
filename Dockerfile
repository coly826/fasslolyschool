# Copier le projet
COPY . /var/www/html

WORKDIR /var/www/html

# Créer les dossiers nécessaires
RUN mkdir -p storage bootstrap/cache

# Donner les permissions
RUN chown -R www-data:www-data storage bootstrap/cache

# Permissions supplémentaires
RUN chmod -R 775 storage bootstrap/cache