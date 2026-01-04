# Sistema de Gestión de Personal y Oficinas

Este es un proyecto de Sistema de Gestión de Personal y Oficinas. Se trata de una aplicación full-stack para la administración de empleados y oficinas, construida con Node.js y Express. Permite realizar operaciones CRUD (Crear, Leer, Actualizar, Borrar) completas para ambas entidades. El front-end utiliza EJS para la renderización dinámica de vistas, demostrando una arquitectura web robusta y escalable.

## Evolución del Proyecto

Originalmente, el proyecto fue desarrollado como una aplicación de Node.js con una base de datos MySQL. Los archivos originales del servidor (`app.js`, las rutas, los controladores y los modelos) se conservan en el repositorio para mostrar la arquitectura inicial y el funcionamiento con una base de datos relacional.

## Versión Estática para GitHub Pages

A fines prácticos y para poder visualizar el proyecto como una página web estática en GitHub Pages, se han realizado las siguientes modificaciones:

*   **Hardcodeo de Datos:** Se ha eliminado la conexión a la base de datos y los datos de personas y oficinas se han incrustado directamente en los archivos HTML correspondientes (`personas.html` y `oficinas.html`) utilizando JavaScript.
*   **HTML Estático:** Las plantillas EJS (`.ejs`) se han convertido en archivos HTML estáticos (`.html`).
*   **Navegación:** Se han actualizado los enlaces de navegación para que funcionen en un entorno de sitio web estático.

Estos cambios permiten que el proyecto se pueda alojar y visualizar fácilmente en plataformas como GitHub Pages, aunque sin la funcionalidad de base de datos dinámica de la versión original.
