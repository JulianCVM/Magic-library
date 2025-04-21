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
                --border-radius-lg: 12px;
                --transition-medium: 0.3s;
                --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
                --shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
                --color-primary: #3f51b5;
                --color-secondary: #f50057;
                --color-text: #333;
                --color-bg: #f5f5f5;
                --color-bg-card: rgba(255, 255, 255, 0.1);
            }
            .book-card {
                width: 300px;
                background: var(--color-bg-card);
                border-radius: var(--border-radius-lg);
                overflow: hidden;
                transition: all var(--transition-medium);
                position: relative;
                backdrop-filter: blur(10px);
                box-shadow: var(--shadow-md);
                transform-style: preserve-3d;
                perspective: 1000px;
                cursor: pointer;
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .book-card:hover {
                transform: translateY(-10px) rotateY(5deg);
                box-shadow: var(--shadow-xl);
            }
            img {
                width: 100%;
                height: 250px;
                object-fit: cover;
            }
            h3, p {
                padding: 0 15px;
                color: var(--color-text);
            }
            h3 {
                margin-top: 10px;
                margin-bottom: 5px;
                font-size: 1.2rem;
                color: var(--color-primary);
            }
            .author {
                margin-top: 5px;
                font-style: italic;
                color: #666;
            }
            .genre {
                margin-top: 2px;
                font-size: 0.9rem;
                color: var(--color-secondary);
                padding: 3px 15px;
            }
            .synopsis {
                margin-top: 10px;
                margin-bottom: 15px;
                font-size: 0.9rem;
                line-height: 1.4;
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .favorite-btn {
                position: absolute;
                top: 10px;
                right: 10px;
                background: rgba(255, 255, 255, 0.7);
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s;
                z-index: 10;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            }
            .favorite-btn:hover {
                background: rgba(255, 255, 255, 0.9);
                transform: scale(1.1);
            }
            .star {
                font-size: 24px;
                color: #ccc;
                transition: all 0.3s;
            }
            .star.active {
                color: #FFD700;
            }
        `;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(style);

        let bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        
        let image = document.createElement('img');
        image.src = coverUrl;
        image.alt = title;
        
        let bookTitle = document.createElement('h3');
        bookTitle.textContent = title;
        
        let bookAuthor = document.createElement('p');
        bookAuthor.classList.add('author');
        bookAuthor.textContent = `Por: ${author}`;
        
        let bookGenre = document.createElement('p');
        bookGenre.classList.add('genre');
        bookGenre.textContent = `Género: ${genre}`;
        
        let bookSynopsis = document.createElement('p');
        bookSynopsis.classList.add('synopsis');
        bookSynopsis.textContent = synopsis;
        
        // Crear botón de estrella para favoritos
        let favoriteButton = document.createElement('button');
        favoriteButton.classList.add('favorite-btn');
        favoriteButton.setAttribute('title', this._esFavorito ? 'Quitar de destacados' : 'Añadir a destacados');
        
        let starIcon = document.createElement('span');
        starIcon.classList.add('star');
        starIcon.innerHTML = '★';
        if (this._esFavorito) {
            starIcon.classList.add('active');
        }
        
        favoriteButton.appendChild(starIcon);
        
        // Agregar evento al botón de favoritos
        favoriteButton.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que el evento llegue al card
            this.toggleFavorito();
        });
        
        bookCard.appendChild(image);
        bookCard.appendChild(favoriteButton);
        bookCard.appendChild(bookTitle);
        bookCard.appendChild(bookAuthor);
        bookCard.appendChild(bookGenre);
        bookCard.appendChild(bookSynopsis);

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
