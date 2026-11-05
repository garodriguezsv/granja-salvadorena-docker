
# ==========================================
# STAGE 1: Base PHP y extensiones
# ==========================================
FROM php:8.4-fpm-alpine AS base

RUN apk add --no-cache icu-libs libzip oniguruma \
    && apk add --no-cache --virtual .build-deps \
        $PHPIZE_DEPS \
        icu-dev \
        libzip-dev \
        oniguruma-dev \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        mbstring \
        bcmath \
        intl \
        zip \
        opcache \
    && apk del .build-deps

# ==========================================
# STAGE 2: Dependencias y construcción
# ==========================================
FROM base AS build

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Aprovechar la caché de Docker
COPY composer.json composer.lock ./

RUN composer install \
    --no-dev \
    --no-interaction \
    --prefer-dist \
    --no-progress \
    --no-scripts \
    --optimize-autoloader

# Copiar el código de Laravel
COPY . .

# Generar autoload y descubrir paquetes Laravel
RUN composer dump-autoload \
    --no-dev \
    --optimize \
    --no-interaction

# Preparar directorios y permisos
RUN mkdir -p \
    storage/framework/cache \
    storage/framework/sessions \
    storage/framework/views \
    storage/logs \
    bootstrap/cache \
    && chown -R www-data:www-data storage bootstrap/cache

# ==========================================
# STAGE 3: Imagen final de producción
# ==========================================
FROM base AS production

WORKDIR /var/www/html

COPY --from=build --chown=www-data:www-data \
    /var/www/html /var/www/html

EXPOSE 9000

CMD ["php-fpm"]
