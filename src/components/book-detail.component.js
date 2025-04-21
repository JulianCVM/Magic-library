class BookDetail extends HTMLElement {
    constructor() {
        super();
        this._data = null;
        this.attachShadow({ mode: 'open' });
    }

    set data(value) {
        this._data = value;
        this.render();
    }

    connectedCallback() {
        if (this._data) {
            this.render();
        }
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('.close-btn')?.removeEventListener('click', this.close);
        this.shadowRoot.querySelector('.backdrop')?.removeEventListener('click', this.close);
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        if (!this._data) return;

        const book = this._data;
        const genre = book.genre ? book.genre.toLowerCase() : '';
        
        // Aplicar fuentes según el género
        let fontFamily = '';
        let titleFont = '';
        let genreColor = '';
        
        if (genre === 'ficción literaria') {
            fontFamily = "'Playfair Display', serif";
            titleFont = "'Playfair Display', serif";
            genreColor = '#3498db'; // Azul
        } else if (genre === 'narrativa contemporánea') {
            fontFamily = "'Montserrat', sans-serif";
            titleFont = "'Montserrat', sans-serif";
            genreColor = '#2ecc71'; // Verde
        } else if (genre === 'novela') {
            fontFamily = "'Roboto Slab', serif";
            titleFont = "'Roboto Slab', serif";
            genreColor = '#e74c3c'; // Rojo
        } else if (genre === 'ficción histórica') {
            fontFamily = "'Crimson Text', serif";
            titleFont = "'Crimson Text', serif";
            genreColor = '#2ecc71'; // Verde
        } else if (genre === 'realismo mágico') {
            fontFamily = "'Libre Baskerville', serif";
            titleFont = "'Libre Baskerville', serif";
            genreColor = '#f39c12'; // Naranja
        } else if (genre === 'drama') {
            fontFamily = "'Merriweather', serif";
            titleFont = "'Merriweather', serif";
            genreColor = '#34495e'; // Azul oscuro
        } else if (genre === 'misterio') {
            fontFamily = "'Source Sans Pro', sans-serif";
            titleFont = "'Source Sans Pro', sans-serif";
            genreColor = '#8e44ad'; // Púrpura
        } else {
            fontFamily = "'Poppins', sans-serif";
            titleFont = "'Playfair Display', serif";
            genreColor = '#6a3093'; // Morado por defecto
        }
        
        this.shadowRoot.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&family=Roboto+Slab:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600;700&family=Libre+Baskerville:wght@400;700&family=Merriweather:wght@300;400;700&family=Source+Sans+Pro:wght@300;400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');
                
                :host {
                    --primary-color: ${genreColor};
                    --text-color: #e5e5e5;
                    --text-secondary: #b8b8b8;
                    --bg-color: #0c0c1d;
                    --card-bg: #1c1c2d;
                    --shadow-color: rgba(0, 0, 0, 0.4);
                    --font-family: ${fontFamily};
                    --title-font: ${titleFont};
                    
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .backdrop {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.85);
                    backdrop-filter: blur(8px);
                    animation: fadeIn 0.3s ease forwards;
                }
                
                .detail-container {
                    position: relative;
                    width: 90%;
                    max-width: 1000px;
                    max-height: 85vh;
                    background-color: var(--card-bg);
                    border-radius: 16px;
                    box-shadow: 0 15px 35px var(--shadow-color);
                    display: grid;
                    grid-template-columns: minmax(300px, 1fr) 2fr;
                    overflow: hidden;
                    transform: translateY(50px);
                    opacity: 0;
                    animation: slideUp 0.4s ease 0.1s forwards;
                    font-family: var(--font-family);
                    border-top: 4px solid var(--primary-color);
                }
                
                @media (max-width: 768px) {
                    .detail-container {
                        grid-template-columns: 1fr;
                        grid-template-rows: auto 1fr;
                    }
                    
                    .book-image {
                        height: 300px;
                    }
                }
                
                .book-image {
                    height: 100%;
                    overflow: hidden;
                    position: relative;
                }
                
                .book-image::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(28,28,45,0.8) 100%);
                    z-index: 1;
                }
                
                .book-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.4s ease;
                }
                
                .detail-container:hover .book-image img {
                    transform: scale(1.05);
                }
                
                .book-content {
                    padding: 35px;
                    overflow-y: auto;
                    max-height: 85vh;
                    color: var(--text-color);
                }
                
                .close-btn {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(5px);
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 22px;
                    color: white;
                    transition: all 0.3s;
                    z-index: 10;
                }
                
                .close-btn:hover {
                    background-color: rgba(255, 255, 255, 0.2);
                    transform: scale(1.1);
                }
                
                .book-title {
                    font-size: 2.4rem;
                    font-weight: 700;
                    color: white;
                    margin: 0 0 15px 0;
                    font-family: var(--title-font);
                    line-height: 1.2;
                }
                
                .book-meta {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    flex-wrap: wrap;
                    margin-bottom: 25px;
                }
                
                .author {
                    font-size: 1.2rem;
                    font-weight: 500;
                    color: var(--text-color);
                }
                
                .genre-tag {
                    background-color: var(--primary-color);
                    color: white;
                    padding: 5px 15px;
                    border-radius: 50px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                    text-transform: uppercase;
                }
                
                .published-year {
                    font-size: 0.95rem;
                    opacity: 0.7;
                    color: var(--text-secondary);
                }
                
                .section-title {
                    font-size: 1.3rem;
                    font-weight: 600;
                    color: white;
                    margin: 30px 0 15px 0;
                    font-family: var(--title-font);
                    position: relative;
                    display: inline-block;
                }
                
                .section-title::after {
                    content: "";
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    width: 40px;
                    height: 3px;
                    background-color: var(--primary-color);
                }
                
                .synopsis {
                    font-size: 1.1rem;
                    line-height: 1.6;
                    color: var(--text-color);
                    margin-bottom: 25px;
                }
                
                .book-info {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
                    gap: 25px;
                    margin-top: 25px;
                    background-color: rgba(0, 0, 0, 0.2);
                    border-radius: 12px;
                    padding: 20px;
                }
                
                .info-item {
                    display: flex;
                    flex-direction: column;
                }
                
                .info-label {
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                    margin-bottom: 5px;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    font-weight: 500;
                }
                
                .info-value {
                    font-size: 1.1rem;
                    font-weight: 500;
                    color: var(--text-color);
                }
                
                .quotes-section {
                    margin-top: 30px;
                    padding-top: 25px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                }
                
                .quote {
                    font-style: italic;
                    color: var(--text-color);
                    padding: 20px;
                    background-color: rgba(255, 255, 255, 0.05);
                    border-left: 3px solid var(--primary-color);
                    margin-bottom: 20px;
                    border-radius: 0 8px 8px 0;
                    position: relative;
                }
                
                .quote::before {
                    content: '"';
                    position: absolute;
                    top: 10px;
                    left: 10px;
                    font-size: 40px;
                    opacity: 0.2;
                    color: var(--primary-color);
                }
                
                /* Animaciones */
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                /* Scrollbar personalizado */
                .book-content::-webkit-scrollbar {
                    width: 8px;
                }
                
                .book-content::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-radius: 10px;
                }
                
                .book-content::-webkit-scrollbar-thumb {
                    background: var(--primary-color);
                    border-radius: 10px;
                }
                
                .book-content::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.3);
                }
            </style>
            
            <div class="backdrop"></div>
            <div class="detail-container">
                <div class="book-image">
                    <img src="${book.coverUrl || book.cover}" alt="${book.title}">
                </div>
                <div class="book-content">
                    <button class="close-btn">×</button>
                    <h1 class="book-title">${book.title}</h1>
                    
                    <div class="book-meta">
                        <div class="author">Por ${book.author}</div>
                        <div class="genre-tag">${book.genre}</div>
                        <div class="published-year">${book.publishedDate || book.publicationDate || ''}</div>
                    </div>
                    
                    <div class="synopsis">${book.synopsis || book.description || 'No hay sinopsis disponible para este libro.'}</div>
                    
                    <div class="section-title">Detalles del libro</div>
                    <div class="book-info">
                        <div class="info-item">
                            <div class="info-label">Publicación</div>
                            <div class="info-value">${book.publishedDate || book.publicationDate || 'Desconocida'}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Editorial</div>
                            <div class="info-value">${book.publisher || 'Desconocida'}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">Páginas</div>
                            <div class="info-value">${book.pages || 'Desconocido'}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">ISBN</div>
                            <div class="info-value">${book.isbn || 'Desconocido'}</div>
                        </div>
                    </div>
                    
                    ${book.quotes && book.quotes.length > 0 ? `
                        <div class="quotes-section">
                            <div class="section-title">Citas destacadas</div>
                            ${book.quotes.map(quote => `<div class="quote">${quote}</div>`).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        
        // Prevenir el scroll en el body cuando el detalle está abierto
        document.body.style.overflow = 'hidden';
        
        // Añadir event listeners
        this.close = this.close.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        
        this.shadowRoot.querySelector('.close-btn').addEventListener('click', this.close);
        this.shadowRoot.querySelector('.backdrop').addEventListener('click', this.close);
        document.addEventListener('keydown', this.handleKeyDown);
    }
    
    handleKeyDown(e) {
        if (e.key === 'Escape') {
            this.close();
        }
    }
    
    close() {
        // Restaurar el scroll del body
        document.body.style.overflow = '';
        
        // Crear animación de salida
        const backdrop = this.shadowRoot.querySelector('.backdrop');
        const detailContainer = this.shadowRoot.querySelector('.detail-container');
        
        detailContainer.style.animation = 'slideUp 0.3s ease reverse';
        backdrop.style.animation = 'fadeIn 0.3s ease reverse';
        
        // Remover el componente después de la animación
        setTimeout(() => {
            this.remove();
        }, 300);
    }
}

customElements.define('book-detail', BookDetail);
