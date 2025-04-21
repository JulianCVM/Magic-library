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
        
        if (genre === 'ficción literaria') {
            fontFamily = "'Playfair Display', serif";
            titleFont = "'Playfair Display', serif";
        } else if (genre === 'narrativa contemporánea') {
            fontFamily = "'Montserrat', sans-serif";
            titleFont = "'Montserrat', sans-serif";
        } else if (genre === 'novela') {
            fontFamily = "'Roboto Slab', serif";
            titleFont = "'Roboto Slab', serif";
        } else if (genre === 'ficción histórica') {
            fontFamily = "'Crimson Text', serif";
            titleFont = "'Crimson Text', serif";
        } else if (genre === 'realismo mágico') {
            fontFamily = "'Libre Baskerville', serif";
            titleFont = "'Libre Baskerville', serif";
        } else if (genre === 'drama') {
            fontFamily = "'Merriweather', serif";
            titleFont = "'Merriweather', serif";
        } else if (genre === 'misterio') {
            fontFamily = "'Source Sans Pro', sans-serif";
            titleFont = "'Source Sans Pro', sans-serif";
        } else {
            fontFamily = "'Poppins', sans-serif";
            titleFont = "'Playfair Display', serif";
        }
        
        this.shadowRoot.innerHTML = `
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600;700&family=Roboto+Slab:wght@300;400;500;600;700&family=Crimson+Text:wght@400;600;700&family=Libre+Baskerville:wght@400;700&family=Merriweather:wght@300;400;700&family=Source+Sans+Pro:wght@300;400;600;700&family=Poppins:wght@300;400;500;600;700&display=swap');
                
                :host {
                    --primary-color: #3a466c;
                    --secondary-color: #f0c987;
                    --text-color: #333;
                    --text-light: #666;
                    --bg-color: #fff;
                    --shadow-color: rgba(0, 0, 0, 0.2);
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
                    background-color: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(5px);
                    animation: fadeIn 0.3s ease forwards;
                }
                
                .detail-container {
                    position: relative;
                    width: 90%;
                    max-width: 900px;
                    max-height: 85vh;
                    background-color: var(--bg-color);
                    border-radius: 12px;
                    box-shadow: 0 10px 30px var(--shadow-color);
                    display: grid;
                    grid-template-columns: minmax(250px, 1fr) 2fr;
                    overflow: hidden;
                    transform: translateY(50px);
                    opacity: 0;
                    animation: slideUp 0.4s ease 0.1s forwards;
                    font-family: var(--font-family);
                }
                
                @media (max-width: 768px) {
                    .detail-container {
                        grid-template-columns: 1fr;
                        grid-template-rows: auto 1fr;
                    }
                    
                    .book-image {
                        height: 250px;
                    }
                }
                
                .book-image {
                    height: 100%;
                    overflow: hidden;
                    background-color: var(--primary-color);
                }
                
                .book-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                
                .book-content {
                    padding: 30px;
                    overflow-y: auto;
                    max-height: 85vh;
                }
                
                .close-btn {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.9);
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 20px;
                    color: var(--text-color);
                    transition: background-color 0.3s, transform 0.3s;
                    z-index: 10;
                }
                
                .close-btn:hover {
                    background-color: #fff;
                    transform: scale(1.1);
                }
                
                .book-title {
                    font-size: 2rem;
                    font-weight: 700;
                    color: var(--primary-color);
                    margin: 0 0 10px 0;
                    font-family: var(--title-font);
                }
                
                .book-meta {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    flex-wrap: wrap;
                    margin-bottom: 20px;
                }
                
                .author {
                    font-size: 1.2rem;
                    font-weight: 500;
                    color: var(--text-color);
                }
                
                .genre-tag {
                    background-color: var(--secondary-color);
                    color: var(--primary-color);
                    padding: 4px 12px;
                    border-radius: 50px;
                    font-size: 0.9rem;
                    font-weight: 600;
                }
                
                .section-title {
                    font-size: 1.2rem;
                    font-weight: 600;
                    color: var(--primary-color);
                    margin: 25px 0 10px 0;
                    font-family: var(--title-font);
                }
                
                .synopsis {
                    font-size: 1rem;
                    line-height: 1.6;
                    color: var(--text-color);
                    margin-bottom: 20px;
                }
                
                .book-info {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 15px;
                    margin-top: 20px;
                }
                
                .info-item {
                    display: flex;
                    flex-direction: column;
                }
                
                .info-label {
                    font-size: 0.9rem;
                    color: var(--text-light);
                    margin-bottom: 3px;
                }
                
                .info-value {
                    font-size: 1rem;
                    font-weight: 500;
                    color: var(--text-color);
                }
                
                .quotes-section {
                    margin-top: 25px;
                    padding-top: 20px;
                    border-top: 1px solid rgba(0, 0, 0, 0.1);
                }
                
                .quote {
                    font-style: italic;
                    color: var(--text-color);
                    padding: 15px;
                    background-color: rgba(0, 0, 0, 0.03);
                    border-left: 3px solid var(--secondary-color);
                    margin-bottom: 15px;
                    border-radius: 0 5px 5px 0;
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
                    </div>
                    
                    <div class="section-title">Sinopsis</div>
                    <div class="synopsis">${book.synopsis || book.description || 'No hay sinopsis disponible para este libro.'}</div>
                    
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
                            ${book.quotes.map(quote => `<div class="quote">"${quote}"</div>`).join('')}
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
