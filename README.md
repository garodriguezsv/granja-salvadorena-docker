# Granja Salvadoreña — Docker

Proyecto de contenedorización de una aplicación web de comercio electrónico para Granja Salvadoreña.

## Arquitectura

El proyecto está compuesto por los siguientes servicios:

| Servicio | Tecnología |
|---|---|
| Frontend | Next.js 16, React y TypeScript |
| Backend | Laravel 13 y PHP 8.4 |
| Base de datos | MySQL 8 |
| Servidor web | Nginx |
| Contenedores | Docker y Docker Compose |

## Estructura del proyecto

```text
granja-salvadorena-docker/
├── granja-salvadorena-api/
├── granja-salvadorena-web/
├── nginx/
│   └── default.conf
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## Requisitos

- Docker Desktop
- Docker Compose
- Git

## Configuración

1. Clonar el repositorio.
2. Crear el archivo `.env.docker` a partir de `.env.example`.
3. Configurar las variables de entorno y credenciales de la base de datos.
4. Configurar `APP_KEY` con una clave válida de Laravel.

## Construcción y ejecución

Desde la raíz del proyecto:

```powershell
docker compose --env-file .env.docker up -d --build
```

Para consultar los contenedores:

```powershell
docker compose ps
```

Para consultar los registros:

```powershell
docker compose logs
```

Para detener los servicios:

```powershell
docker compose down
```

## Acceso a los servicios

| Servicio | Dirección |
|---|---|
| Frontend | http://localhost:3000 |
| API | http://localhost:8000/api |

## Persistencia

Docker Compose define volúmenes para conservar los datos de MySQL y los archivos de la aplicación Laravel.

## Seguridad

- No publicar archivos `.env` con credenciales reales.
- No publicar claves privadas ni contraseñas.
- Utilizar `.env.example` como plantilla de configuración.

## Estado del proyecto

Proyecto en proceso de integración y validación de los servicios Docker. La ejecución completa debe comprobarse antes de considerar finalizada la implementación.
