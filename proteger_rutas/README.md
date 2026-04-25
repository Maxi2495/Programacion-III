# Food Store - Primer Examen Parcial

## Descripción
Este proyecto es una aplicación web tipo e-commerce desarrollada como parte del primer parcial de la materia Programación III.

La aplicación simula el flujo completo de compra de un local de comidas. Cuenta con un sistema de registro y autenticación de usuarios, una vista de catálogo con filtros de búsqueda y categorías, y un carrito de compras. La persistencia de los datos (usuarios, sesión activa y estado del carrito) se maneja de forma local utilizando el `localStorage` del navegador.

## Tecnologías utilizadas
* HTML5
* CSS3
* JavaScript
* TypeScript
* Vite (Entorno de desarrollo)

## Características principales implementadas
* **Autenticación:** Registro de nuevos usuarios y Login con redirección de rutas protegidas según el rol (Admin / Cliente).
* **Catálogo:** Carga dinámica de productos, filtrado por categorías y búsqueda por texto.
* **Carrito de compras:** Posibilidad de agregar productos, modificar la cantidad de los ítems seleccionados, eliminar productos y cálculo del monto total en tiempo real.

## Instrucciones para ejecutar el proyecto
Para poder correr esta aplicación en un entorno local, es necesario tener Node.js instalado en la computadora.

Una vez finalizada la instalación del programa necesario, seguir estos pasos:

1. Descomprimir el archivo `.zip` y abrir la carpeta raíz del proyecto en VS Code u otro editor de código.
2. Abrir una terminal dentro de esa misma carpeta.
3. Instalar las dependencias del proyecto ejecutando:
   ```bash
   npm install

Una vez finalizada la instalación, iniciar el servidor de desarrollo con el comando:

Bash
npm run dev

El servidor nos genera una URL (http://localhost:5173/). Ingresar a ese enlace desde cualquier navegador para usar la aplicación.

Estructura principal del proyecto
Plaintext
src/
├── data/
│   └── data.ts
├── pages/
│   ├── admin/
│   │   └── home/
│   ├── auth/
│   │   ├── login/
│   │   └── registro/
│   ├── client/
│   │   └── home/
│   └── store/
│       ├── home/
│       └── cart/
├── types/
│   ├── category.ts
│   ├── IUser.ts
│   ├── products.ts
│   └── Rol.ts
└── utils/
    ├── auth.ts    
    ├── localStorage.ts
    └── navigate.ts

Autor: Maximiliano Niemiec.