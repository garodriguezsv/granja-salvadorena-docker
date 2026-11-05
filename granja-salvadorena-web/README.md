# Granja Salvadoreña — Frontend

Aplicación web de comercio electrónico desarrollada con Next.js y TypeScript para consultar productos, gestionar un carrito de compras, crear órdenes y procesar pagos mediante Stripe.

## Tecnologías

- Next.js 16 — App Router
- React 19
- TypeScript
- Tailwind CSS
- pnpm
- Laravel 13 — API REST
- MySQL — base de datos de la API
- Stripe — procesamiento de pagos en modo de pruebas

## Funcionalidades

- Catálogo público de productos y categorías.
- Consulta del detalle de cada producto.
- Registro e inicio de sesión.
- Autenticación mediante token JWT almacenado en una cookie `HttpOnly`.
- Carrito de compras con persistencia local.
- Creación y consulta del detalle de órdenes.
- Historial de compras protegido.
- Integración con Stripe para procesar pagos.
- Actualización del estado de las órdenes mediante webhook de Stripe.
- Estados de carga, manejo de errores y React Suspense.

## Requisitos previos

- Node.js compatible con la versión de Next.js utilizada.
- pnpm.
- API Laravel configurada y ejecutándose.
- Base de datos configurada para la API.
- Cuenta de Stripe para las pruebas de pago.

## Instalación

Clona el repositorio y accede al directorio del proyecto:

```bash
git clone <URL_DEL_REPOSITORIO>
cd granja-salvadorena-web
```

Instala las dependencias:

```bash
pnpm install
```

## Variables de entorno

Crea un archivo `.env.local` en la raíz del proyecto:

```env
BASE_URL=http://127.0.0.1:8000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_REEMPLAZAR
```

Configura `BASE_URL` con la URL de la API Laravel. Sustituye la clave de Stripe por tu clave pública de pruebas.

La clave secreta de Stripe y el secreto del webhook deben configurarse únicamente en el entorno de Laravel. No deben incluirse en el frontend ni subirse al repositorio.

## Ejecución en desarrollo

Inicia el frontend:

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000).

La API Laravel debe ejecutarse por separado.

## Rutas principales

| Ruta | Descripción |
|---|---|
| `/` | Catálogo de productos |
| `/productos/[id]` | Detalle del producto |
| `/registro`       | Registro de usuarios |
| `/login`          | Inicio de sesión |
| `/cuenta`         | Cuenta del usuario autenticado |
| `/carrito`        | Carrito y creación de órdenes |
| `/ordenes`        | Historial de compras |
| `/ordenes/[id]`   | Detalle de una orden |
| `/pago/confirmacion` | Resultado del proceso de pago |

## Validación del proyecto

Comprobar los tipos de TypeScript:

```bash
pnpm exec tsc --noEmit
```

Generar la compilación de producción:

```bash
pnpm build
```

Ejecutar la versión compilada:

```bash
pnpm start
```

## Pagos de prueba

La integración utiliza Stripe en modo de pruebas. Para comprobar el flujo completo de pagos, configura las claves de prueba en Laravel y Next.js y ejecuta el webhook de Stripe según la configuración del backend.

No utilices claves reales en un entorno de pruebas ni publiques secretos en el repositorio.

## Seguridad

- El token de autenticación se almacena en una cookie `HttpOnly`.
- Las operaciones protegidas requieren autenticación en la API.
- Las claves secretas se mantienen en el backend.
- Las credenciales y los archivos de entorno no deben publicarse en Git.

## Estado del proyecto

El frontend cuenta con catálogo, autenticación, carrito, creación de órdenes, historial de compras e integración de pagos. La compilación de producción y la comprobación de TypeScript se han validado durante el desarrollo.
