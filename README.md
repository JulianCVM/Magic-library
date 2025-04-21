# 📚 Solución: Explorador de Libros con Web Components

<div align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
</div>

## 🎯 Descripción

Este repositorio contiene la implementación de una aplicación web compuesta por **Web Components** que permite visualizar información de libros de manera modular, interactiva y encapsulada. La solución implementa el uso de `customElements`, `Shadow DOM`, eventos, y manipulación dinámica del DOM con `document.createElement`.

---

## 📚 Componentes Implementados

### 1. `<book-card>`

Componente que representa una tarjeta individual de un libro.

**Características implementadas:**

- 📸 Visualización de imagen de portada (`coverUrl`)
- 📖 Visualización del título (`title`)
- ✍️ Visualización del autor (`author`)
- 📝 Visualización de sinopsis corta (`synopsis`)
- 🖱️ Interactividad: al hacer clic, se reemplaza por el componente `<book-detail>`

---

### 2. `<book-detail>`

Componente que muestra la vista detallada del libro seleccionado.

**Características implementadas:**

- 📖 Visualización del título (`title`)
- ✍️ Visualización del autor (`author`)
- 📸 Visualización de imagen de portada (`coverUrl`)
- 📅 Visualización de fecha de publicación (`publishedDate`)
- 🏷️ Visualización del género (`genre`)
- 📝 Visualización del resumen (`summary`)
- 💬 Visualización de lista de citas (`quotes`)
- ↩️ Botón para volver al componente `<book-card>`

---

## 📦 Datos de Ejemplo

El proyecto incluye un conjunto de datos de ejemplo con información de libros clásicos de la literatura en español, incluyendo:

- 📚 Don Quijote de la Mancha
- 📚 La sombra del viento
- 📚 Rayuela
- 📚 El amor en los tiempos del cólera
- 📚 Y otros títulos destacados

Cada libro contiene información estructurada como:
- 📖 Título
- ✍️ Autor
- 🖼️ URL de portada
- 📝 Sinopsis
- 📅 Fecha de publicación
- 🏷️ Género
- 📄 Resumen
- 💬 Citas destacadas

---

## 🚀 Cómo Usar

1. 📥 Clonar el repositorio
2. 🌐 Abrir el archivo `index.html` en un navegador moderno
3. 🖱️ Interactuar con las tarjetas de libros para ver los detalles

---

## 💻 Tecnologías Utilizadas

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" width="40" height="40" alt="HTML5">
        <br>HTML5
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" width="40" height="40" alt="JavaScript">
        <br>JavaScript
      </td>
      <td align="center">
        <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" width="40" height="40" alt="CSS3">
        <br>CSS3
      </td>
    </tr>
  </table>
</div>

- HTML5
- JavaScript (ES6+)
- Web Components API
- Shadow DOM
- CSS3

---

## 📝 Notas de Implementación

- 🔒 Se ha utilizado Shadow DOM para encapsular los estilos y la estructura de cada componente
- 📡 La comunicación entre componentes se maneja a través de eventos personalizados
- 🛠️ La manipulación del DOM se realiza de manera dinámica usando `document.createElement`
- 📱 Se ha implementado un diseño responsive para diferentes tamaños de pantalla

---

<div align="center">
  <sub>Desarrollado con ❤️ por el equipo de desarrollo</sub>
</div>
