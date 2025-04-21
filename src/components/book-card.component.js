class BookCardComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._data = null;
        this._esFavorito = false;
    }

    set data(data) {
        this._data = data;
        // Verificar si el libro está en favoritos
        const favoritos = JSON.parse(localStorage.getItem('librosDestacados')) || [];
        this._esFavorito = favoritos.some(libro => libro.title === data.title);
        this.render();
    }

    render() {
        if (!this._data) return;
        
        const { title, author, coverUrl, synopsis, publishedDate, genre, summary, quotes } = this._data;
        
        const style = document.createElement('style');
        style.textContent = `
            :host {
                --color-primary: #6a3093;
                --color-secondary: #a044ff;
                --color-accent: #e36bae;
                --color-dark: #2c2c54;
                --color-light: #f5f5f5;
                --color-text: #333;
                --color-text-light: #f5f5f5;
                
                --color-ficcion: #3498db;
                --color-narrativa: #2ecc71;
                --color-novela: #e74c3c;
                
                --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
                --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.12);
                --shadow-lg: 0 10px 20px rgba(0, 0, 0, 0.15);
                --shadow-xl: 0 15px 25px rgba(0, 0, 0, 0.2);
                
                --transition-fast: 0.3s ease;
                --transition-medium: 0.5s ease;
                --transition-slow: 0.8s ease;
                
                --border-radius-sm: 4px;
                --border-radius-md: 8px;
                --border-radius-lg: 12px;
                
                display: block;
            }
            
            .book-card {
                width: 300px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: var(--border-radius-lg);
                overflow: hidden;
                transition: all var(--transition-medium);
                position: relative;
                backdrop-filter: blur(10px);
                box-shadow: var(--shadow-md);
                transform-style: preserve-3d;
                perspective: 1000px;
                cursor: pointer;
                border-top: 4px solid var(--color-primary);
            }
            
            .book-card:hover {
                transform: translateY(-10px) rotateY(5deg);
                box-shadow: var(--shadow-xl);
            }
            
            .book-card::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
                z-index: -1;
            }
            
            .book-cover-container {
                position: relative;
                height: 400px;
                overflow: hidden;
                transform-style: preserve-3d;
            }
            
            .book-cover {
                width: 100%;
                height: 100%;
                object-fit: cover;
                transition: transform var(--transition-medium);
            }
            
            .book-card:hover .book-cover {
                transform: scale(1.05);
            }
            
            .book-spine {
                position: absolute;
                top: 0;
                left: 0;
                width: 20px;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                transform: translateX(-100%) rotateY(90deg);
                transform-origin: right;
                transition: all var(--transition-medium);
            }
            
            .book-card:hover .book-spine {
                transform: translateX(-20px) rotateY(30deg);
            }
            
            .book-info {
                padding: 1.5rem;
                color: var(--color-light);
            }
            
            .book-title {
                font-family: "Playfair Display", serif;
                font-size: 1.5rem;
                margin-bottom: 0.5rem;
                line-height: 1.3;
                color: var(--color-light);
            }
            
            .book-author {
                font-style: italic;
                opacity: 0.8;
                margin-bottom: 1rem;
                color: var(--color-light);
            }
            
            .book-year {
                font-size: 0.9rem;
                opacity: 0.7;
                margin-bottom: 0.5rem;
                color: var(--color-light);
            }
            
            .book-genre {
                display: inline-block;
                padding: 0.3rem 0.8rem;
                border-radius: var(--border-radius-sm);
                font-size: 0.8rem;
                font-weight: 600;
                margin-bottom: 1rem;
                background-color: var(--color-primary);
                color: white;
            }
            
            .book-synopsis {
                font-size: 0.9rem;
                margin-bottom: 1.5rem;
                opacity: 0.9;
                color: var(--color-light);
                line-height: 1.4;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
            }
            
            .favorite-btn {
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(0, 0, 0, 0.5);
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all var(--transition-fast);
                z-index: 10;
                box-shadow: var(--shadow-sm);
            }
            
            .favorite-btn:hover {
                background: rgba(0, 0, 0, 0.7);
                transform: scale(1.1);
            }
            
            .star {
                font-size: 24px;
                color: rgba(255, 255, 255, 0.7);
                transition: all var(--transition-fast);
            }
            
            .star.active {
                color: #FFD700;
            }
            
            .star:hover {
                color: #FFD700;
                transform: scale(1.2);
            }
            
            .action-buttons {
                display: flex;
                gap: 1rem;
                margin-top: 1rem;
            }
            
            .btn-details {
                padding: 0.6rem 1.2rem;
                border: none;
                border-radius: var(--border-radius-sm);
                font-weight: 600;
                cursor: pointer;
                transition: all var(--transition-fast);
                background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
                color: white;
                flex: 1;
                font-size: 0.9rem;
            }
            
            .btn-details:hover {
                transform: translateY(-3px);
                box-shadow: var(--shadow-md);
            }
        `;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(style);

        // Crear tarjeta del libro
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        if (genre) {
            bookCard.setAttribute('data-genre', genre);
            
            // Aplicar colores específicos según el género
            if (genre.toLowerCase() === 'ficción literaria') {
                bookCard.style.borderTopColor = 'var(--color-ficcion)';
            } else if (genre.toLowerCase() === 'narrativa contemporánea') {
                bookCard.style.borderTopColor = 'var(--color-narrativa)';
            } else if (genre.toLowerCase() === 'novela') {
                bookCard.style.borderTopColor = 'var(--color-novela)';
            }
        }
        
        // Contenedor de la portada
        const coverContainer = document.createElement('div');
        coverContainer.classList.add('book-cover-container');
        
        // Imagen de portada
        const image = document.createElement('img');
        image.classList.add('book-cover');
        image.src = coverUrl;
        image.alt = title;
        
        // Efecto de lomo del libro
        const spine = document.createElement('div');
        spine.classList.add('book-spine');
        
        // Contenedor de información
        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');
        
        // Título del libro
        const bookTitle = document.createElement('h3');
        bookTitle.classList.add('book-title');
        bookTitle.textContent = title;
        
        // Autor del libro
        const bookAuthor = document.createElement('p');
        bookAuthor.classList.add('book-author');
        bookAuthor.textContent = `Por: ${author}`;
        
        // Año de publicación
        const bookYear = document.createElement('p');
        bookYear.classList.add('book-year');
        bookYear.textContent = `Publicado: ${publishedDate}`;
        
        // Género del libro
        const bookGenre = document.createElement('span');
        bookGenre.classList.add('book-genre');
        bookGenre.textContent = genre;
        
        // Sinopsis
        const bookSynopsis = document.createElement('p');
        bookSynopsis.classList.add('book-synopsis');
        bookSynopsis.textContent = synopsis;
        
        // Botón de favorito (estrella)
        const favoriteButton = document.createElement('button');
        favoriteButton.classList.add('favorite-btn');
        favoriteButton.setAttribute('title', this._esFavorito ? 'Quitar de destacados' : 'Añadir a destacados');
        
        const starIcon = document.createElement('span');
        starIcon.classList.add('star');
        starIcon.innerHTML = '★';
        if (this._esFavorito) {
            starIcon.classList.add('active');
        }
        
        favoriteButton.appendChild(starIcon);
        
        // Botones de acción
        const actionButtons = document.createElement('div');
        actionButtons.classList.add('action-buttons');
        
        const detailsButton = document.createElement('button');
        detailsButton.classList.add('btn-details');
        detailsButton.textContent = 'Ver detalles';
        detailsButton.addEventListener('click', (e) => {
            e.stopPropagation();
            this.mostrarDetalles();
        });
        
        actionButtons.appendChild(detailsButton);
        
        // Construir la estructura
        coverContainer.appendChild(image);
        coverContainer.appendChild(spine);
        
        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(bookGenre);
        bookInfo.appendChild(bookSynopsis);
        bookInfo.appendChild(actionButtons);
        
        bookCard.appendChild(coverContainer);
        bookCard.appendChild(favoriteButton);
        bookCard.appendChild(bookInfo);
        
        // Agregar evento al botón de favoritos
        favoriteButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que el evento llegue al card
            this.toggleFavorito();
        });

        // Agregar evento a la tarjeta completa
        bookCard.addEventListener('click', () => {
            console.log('Libro seleccionado:', title);
            // Mostrar detalles del libro
            this.mostrarDetalles();
        });

        this.shadowRoot.appendChild(bookCard);
    }
    
    mostrarDetalles() {
        if (!this._data) return;
        
        // Crear elemento de detalle
        const bookDetail = document.createElement('book-detail');
        bookDetail.data = this._data;
        
        // Escuchar evento de cierre
        bookDetail.addEventListener('close-detail', () => {
            document.body.style.overflow = 'auto'; // Restaurar scroll
        });
        
        // Añadir al DOM
        document.body.appendChild(bookDetail);
        document.body.style.overflow = 'hidden'; // Prevenir scroll en el fondo
    }

    toggleFavorito() {
        this._esFavorito = !this._esFavorito;
        const starElement = this.shadowRoot.querySelector('.star');
        const favoriteButton = this.shadowRoot.querySelector('.favorite-btn');
        
        if (this._esFavorito) {
            starElement.classList.add('active');
            favoriteButton.setAttribute('title', 'Quitar de destacados');
        } else {
            starElement.classList.remove('active');
            favoriteButton.setAttribute('title', 'Añadir a destacados');
        }
        
        // Actualizar localStorage
        const favoritos = JSON.parse(localStorage.getItem('librosDestacados')) || [];
        
        if (this._esFavorito) {
            // Agregar a favoritos si no existe
            const yaExiste = favoritos.some(libro => libro.title === this._data.title);
            if (!yaExiste) {
                favoritos.push(this._data);
            }
        } else {
            // Quitar de favoritos
            const index = favoritos.findIndex(libro => libro.title === this._data.title);
            if (index !== -1) {
                favoritos.splice(index, 1);
            }
        }
        
        localStorage.setItem('librosDestacados', JSON.stringify(favoritos));
        
        // Disparar evento para actualizar la UI
        const event = new CustomEvent('favorito-cambiado', {
            bubbles: true,
            composed: true,
            detail: { esFavorito: this._esFavorito, libro: this._data }
        });
        this.dispatchEvent(event);
    }
}

customElements.define('book-card', BookCardComponent);
