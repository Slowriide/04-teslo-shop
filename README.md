#Description

#Correr en dev

1. Clonar repositorio
2. Instalar dependencias `npm install`
3. Correr el proyecto `npm run dev`

#Correr en prod

1. Clonar repositorio
2. Crear una copia del `.env.template`, renombrarlo a `.env` y cambiar las variables de entorno
3. Instalar dependencias `npm install`
4. Levantar base de datos `docker compose up -d`
5. Ejecutar seed `npm run seed`
6. Correr las migraciones de prisma `npx prisma migrate dev`
7. Correr el proyecto `npm run dev`
