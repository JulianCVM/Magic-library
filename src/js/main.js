import { obtenerLibros, obtenerLibrosPorGenero } from '../data/data.objects.js';

// Función que se ejecuta cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    // Obtener referencias a elementos del DOM
    const destacadosContainer = document.getElementById('destacados-container');
    const categoryCarousel = document.getElementById('category-carousel');
    const categoryPrevBtn = document.getElementById('category-prev');
    const categoryNextBtn = document.getElementById('category-next');
    const buscador = document.getElementById('buscador');
    const btnBuscar = document.getElementById('btn-buscar');
    
    // Referencias a secciones de categorías
    const seccionDestacados = document.getElementById('seccion-destacados');
    const seccionFiccionLiteraria = document.getElementById('seccion-ficcion-literaria');
    const seccionNarrativaContemporanea = document.getElementById('seccion-narrativa-contemporanea');
    const seccionNovela = document.getElementById('seccion-novela');
    const seccionFiccionHistorica = document.getElementById('seccion-ficcion-historica');
    const seccionRealismoMagico = document.getElementById('seccion-realismo-magico');
    const seccionDrama = document.getElementById('seccion-drama');
    const seccionMisterio = document.getElementById('seccion-misterio');
    
    // Variables para el carrusel de categorías
    let categoryScrollAmount = 0;
    const categoryScrollStep = 200; // Pixeles a desplazar en cada clic
    
    // Cargar los libros
    const libros = obtenerLibros();
    
    // Obtener libros destacados desde localStorage o iniciar con array vacío
    let librosDestacados = JSON.parse(localStorage.getItem('librosDestacados')) || [];
    
    // Mostrar libros por categorías
    organizarLibrosPorCategoria(libros);
    
    // Mostrar libros destacados
    mostrarLibrosDestacados(librosDestacados);
    
    // Configurar botones del carrusel de categorías
    if (categoryPrevBtn && categoryNextBtn && categoryCarousel) {
        categoryPrevBtn.addEventListener('click', () => {
            scrollCategories(-1);
        });
        
        categoryNextBtn.addEventListener('click', () => {
            scrollCategories(1);
        });
    }
    
    // Funcionalidad de búsqueda
    if (btnBuscar && buscador) {
        btnBuscar.addEventListener('click', () => {
            buscarLibros();
        });
        
        // Permitir búsqueda al presionar Enter
        buscador.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                buscarLibros();
            }
        });
    }
    
    // Agregar funcionalidad a los enlaces de categorías
    if (categoryCarousel) {
        const categoryLinks = categoryCarousel.querySelectorAll('.category-item');
        categoryLinks.forEach(enlace => {
            enlace.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remover clase activa de todos los enlaces
                categoryLinks.forEach(link => link.classList.remove('active'));
                
                // Añadir clase activa al enlace seleccionado
                enlace.classList.add('active');
                
                const href = enlace.getAttribute('href');
                // Desplazarse a la sección correspondiente
                scrollToSection(href);
            });
        });
    }
    
    // Escuchar eventos de cambio en favoritos
    document.addEventListener('favorito-cambiado', (e) => {
        // Actualizar la lista de destacados
        librosDestacados = JSON.parse(localStorage.getItem('librosDestacados')) || [];
        
        // Actualizar vistas de destacados
        mostrarLibrosDestacados(librosDestacados);
        mostrarLibrosEnSeccion(librosDestacados, seccionDestacados);
        
        // Mostrar mensaje cuando no hay libros destacados
        if (librosDestacados.length === 0) {
            const mensaje = "No has seleccionado ningún libro como destacado. Haz clic en la estrella de tus libros favoritos para destacarlos.";
            
            if (destacadosContainer) {
                destacadosContainer.innerHTML = `<p class="no-favorites">${mensaje}</p>`;
            }
            
            if (seccionDestacados) {
                seccionDestacados.innerHTML = `<p class="no-favorites">${mensaje}</p>`;
            }
        }
    });
    
    // Función para desplazar el carrusel de categorías
    function scrollCategories(direction) {
        if (!categoryCarousel) return;
        
        const maxScroll = categoryCarousel.scrollWidth - categoryCarousel.clientWidth;
        
        // Calcular nueva posición
        categoryScrollAmount += direction * categoryScrollStep;
        
        // Limitar el desplazamiento
        if (categoryScrollAmount < 0) categoryScrollAmount = 0;
        if (categoryScrollAmount > maxScroll) categoryScrollAmount = maxScroll;
        
        // Aplicar desplazamiento
        categoryCarousel.style.transform = `translateX(${-categoryScrollAmount}px)`;
    }
    
    // Función para desplazarse a una sección específica
    function scrollToSection(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    }
    
    // Función para organizar los libros por categoría
    function organizarLibrosPorCategoria(listaLibros) {
        // Limpiar contenedores
        if (seccionFiccionLiteraria) seccionFiccionLiteraria.innerHTML = '';
        if (seccionNarrativaContemporanea) seccionNarrativaContemporanea.innerHTML = '';
        if (seccionNovela) seccionNovela.innerHTML = '';
        if (seccionFiccionHistorica) seccionFiccionHistorica.innerHTML = '';
        if (seccionRealismoMagico) seccionRealismoMagico.innerHTML = '';
        if (seccionDrama) seccionDrama.innerHTML = '';
        if (seccionMisterio) seccionMisterio.innerHTML = '';
        if (seccionDestacados) seccionDestacados.innerHTML = '';
        
        // Usar la función obtenerLibrosPorGenero para filtrar por cada género
        const librosFiccionLiteraria = obtenerLibrosPorGenero('ficción literaria');
        const librosNarrativaContemporanea = obtenerLibrosPorGenero('narrativa contemporánea');
        const librosNovela = obtenerLibrosPorGenero('novela');
        const librosFiccionHistorica = obtenerLibrosPorGenero('ficción histórica');
        const librosRealismoMagico = obtenerLibrosPorGenero('realismo mágico');
        const librosDrama = obtenerLibrosPorGenero('drama');
        const librosMisterio = obtenerLibrosPorGenero('misterio');
        
        // Mostrar libros en sus respectivas secciones
        mostrarLibrosEnSeccion(librosFiccionLiteraria, seccionFiccionLiteraria);
        mostrarLibrosEnSeccion(librosNarrativaContemporanea, seccionNarrativaContemporanea);
        mostrarLibrosEnSeccion(librosNovela, seccionNovela);
        mostrarLibrosEnSeccion(librosFiccionHistorica, seccionFiccionHistorica);
        mostrarLibrosEnSeccion(librosRealismoMagico, seccionRealismoMagico);
        mostrarLibrosEnSeccion(librosDrama, seccionDrama);
        mostrarLibrosEnSeccion(librosMisterio, seccionMisterio);
        
        // Mostrar los libros destacados en su sección
        mostrarLibrosEnSeccion(librosDestacados, seccionDestacados);
        
        // Mostrar mensaje cuando no hay libros destacados
        if (librosDestacados.length === 0) {
            const mensaje = "No has seleccionado ningún libro como destacado. Haz clic en la estrella de tus libros favoritos para destacarlos.";
            
            if (seccionDestacados) {
                seccionDestacados.innerHTML = `<p class="no-favorites">${mensaje}</p>`;
            }
        }
    }
    
    // Función auxiliar para mostrar libros en una sección específica
    function mostrarLibrosEnSeccion(libros, seccion) {
        if (!seccion) return;
        
        // Limpiar sección antes de agregar libros
        seccion.innerHTML = '';
        
        if (libros.length === 0 && seccion === seccionDestacados) {
            const mensaje = "No has seleccionado ningún libro como destacado. Haz clic en la estrella de tus libros favoritos para destacarlos.";
            seccion.innerHTML = `<p class="no-favorites">${mensaje}</p>`;
            return;
        }
        
        libros.forEach(libro => {
            const bookCard = document.createElement('book-card');
            bookCard.data = libro;
            seccion.appendChild(bookCard);
        });
    }
    
    // Función para mostrar libros destacados
    function mostrarLibrosDestacados(listaLibros) {
        if (!destacadosContainer) return;
        
        destacadosContainer.innerHTML = '';
        
        if (listaLibros.length === 0) {
            const mensaje = "No has seleccionado ningún libro como destacado. Haz clic en la estrella de tus libros favoritos para destacarlos.";
            destacadosContainer.innerHTML = `<p class="no-favorites">${mensaje}</p>`;
            return;
        }
        
        listaLibros.forEach(libro => {
            const bookCard = document.createElement('book-card');
            bookCard.data = libro;
            destacadosContainer.appendChild(bookCard);
        });
    }
    
    // Función para buscar libros
    function buscarLibros() {
        if (!buscador) return;
        
        const termino = buscador.value.toLowerCase();
        if (termino.trim() === '') {
            // Si el campo de búsqueda está vacío, mostrar todos los libros
            organizarLibrosPorCategoria(libros);
            return;
        }
        
        const librosFiltrados = libros.filter(libro => 
            libro.title.toLowerCase().includes(termino) || 
            libro.author.toLowerCase().includes(termino)
        );
        
        // Mostrar resultados de búsqueda
        if (librosFiltrados.length > 0) {
            // Limpiar contenedores
            if (seccionFiccionLiteraria) seccionFiccionLiteraria.innerHTML = '';
            if (seccionNarrativaContemporanea) seccionNarrativaContemporanea.innerHTML = '';
            if (seccionNovela) seccionNovela.innerHTML = '';
            if (seccionFiccionHistorica) seccionFiccionHistorica.innerHTML = '';
            if (seccionRealismoMagico) seccionRealismoMagico.innerHTML = '';
            if (seccionDrama) seccionDrama.innerHTML = '';
            if (seccionMisterio) seccionMisterio.innerHTML = '';
            if (seccionDestacados) seccionDestacados.innerHTML = '';
            
            // Distribuir libros filtrados en sus categorías correspondientes
            librosFiltrados.forEach(libro => {
                const bookCard = document.createElement('book-card');
                bookCard.data = libro;
                
                switch(libro.genre.toLowerCase()) {
                    case 'ficción literaria':
                        if (seccionFiccionLiteraria) seccionFiccionLiteraria.appendChild(bookCard.cloneNode(true));
                        break;
                    case 'narrativa contemporánea':
                        if (seccionNarrativaContemporanea) seccionNarrativaContemporanea.appendChild(bookCard.cloneNode(true));
                        break;
                    case 'novela':
                        if (seccionNovela) seccionNovela.appendChild(bookCard.cloneNode(true));
                        break;
                    case 'ficción histórica':
                        if (seccionFiccionHistorica) seccionFiccionHistorica.appendChild(bookCard.cloneNode(true));
                        break;
                    case 'realismo mágico':
                        if (seccionRealismoMagico) seccionRealismoMagico.appendChild(bookCard.cloneNode(true));
                        break;
                    case 'drama':
                        if (seccionDrama) seccionDrama.appendChild(bookCard.cloneNode(true));
                        break;
                    case 'misterio':
                        if (seccionMisterio) seccionMisterio.appendChild(bookCard.cloneNode(true));
                        break;
                }
            });
            
            // Filtrar libros destacados que coincidan con la búsqueda
            const librosDestacadosFiltrados = librosDestacados.filter(libro => 
                libro.title.toLowerCase().includes(termino) || 
                libro.author.toLowerCase().includes(termino)
            );
            
            // Mostrar destacados filtrados
            mostrarLibrosEnSeccion(librosDestacadosFiltrados, seccionDestacados);
        } else {
            // Mensaje si no hay resultados
            if (seccionDestacados) {
                seccionDestacados.innerHTML = '<p class="no-results">No se encontraron libros que coincidan con tu búsqueda</p>';
            }
        }
    }
    
    // Ajustar carrusel de categorías en ventanas responsivas
    function ajustarCategoryCarousel() {
        // Resetear la posición del carrusel al cambiar el tamaño
        categoryScrollAmount = 0;
        if (categoryCarousel) categoryCarousel.style.transform = 'translateX(0)';
    }
    
    // Ajustar al cambiar el tamaño de la ventana
    window.addEventListener('resize', ajustarCategoryCarousel);
    
    // Inicializar
    ajustarCategoryCarousel();
});
