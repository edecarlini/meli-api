
# Meli API

Este es el backend del proyecto **Meli**, construido con [Node.js](https://nodejs.org/) y diseñado para ser ejecutado en un contenedor Docker. La API sirve los datos que son consumidos por el frontend correspondiente.

## Tabla de Contenidos

- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Variables de Entorno](#variables-de-entorno)
- [Ejecución en Desarrollo](#ejecución-en-desarrollo)
- [Ejecución con Docker Compose](#ejecución-con-docker-compose)
- [Licencia](#licencia)

## Requisitos Previos

- [Node.js](https://nodejs.org/) v20.5.1 o superior
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/edecarlini/meli-api.git
   cd meli-api
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

## Variables de Entorno

Este proyecto utiliza un archivo `.env` para configurar las variables de entorno necesarias. El archivo `.env` no está incluido en el repositorio debido a la configuración de `.gitignore`.

### Ejemplo de `.env`

Asegúrate de crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
MERCADOLIBRE_API_URL=https://api.mercadolibre.com
FRONTEND_API_URL=http://localhost:3002
NODE_ENV=development
```

## Ejecución en Desarrollo

Para iniciar el entorno de desarrollo, simplemente ejecuta:

```bash
npm start
```

La API estará disponible en `http://localhost:3000`.

## Ejecución con Docker Compose

El proyecto está configurado para ejecutarse utilizando Docker Compose, que orquesta tanto el backend como el frontend.

### Paso 1: Construir y Ejecutar con Docker Compose

1. Asegúrate de que tu archivo `.env` esté correctamente configurado.
2. Luego, construye y levanta los servicios definidos en `docker-compose.yml`:

   ```bash
   docker-compose up --build
   ```

Esto levantará tanto la API como el frontend. La API estará disponible en `http://localhost:3001`.

### Paso 2: Detener los servicios

Para detener los servicios, puedes usar:

```bash
docker-compose down
```

## Licencia

Este proyecto está licenciado bajo la Licencia MIT. Consulta el archivo `LICENSE` para obtener más detalles.
