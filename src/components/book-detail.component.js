class BookDetailComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this._data = null;
    }

    set data(data) {
        this._data = data;
        this.render();
    }
    
    connectedCallback() {
        // Agregar evento para cerrar modal al hacer clic fuera del contenido
        document.addEventListener('click', this.handleOutsideClick.bind(this));
        // Agregar evento para cerrar modal con Escape
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }
    
    disconnectedCallback() {
        // Remover eventos al eliminar el componente
        document.removeEventListener('click', this.handleOutsideClick.bind(this));
        document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    }
    
    handleOutsideClick(e) {
        // Verificar si el clic fue dentro del modal o fuera
        const path = e.composedPath();
        if (path.includes(this) && !path.includes(this.shadowRoot.querySelector('.modal-content'))) {
            this.closeModal();
        }
    }
    
    handleKeyDown(e) {
        if (e.key === 'Escape') {
            this.closeModal();
        }
    }
    
    closeModal() {
        // Disparar evento para indicar que se cerró el modal
        const event = new CustomEvent('close-detail', {
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(event);
        
        // Animación de salida
        const modal = this.shadowRoot.querySelector('.modal');
        if (modal) {
            modal.classList.add('closing');
            setTimeout(() => {
                this.remove();
            }, 300);
        } else {
            this.remove();
        }
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
                --color-bg-card-hover: rgba(255, 255, 255, 0.2);
                --font-heading: 'Playfair Display', serif;
                --font-body: 'Poppins', sans-serif;
                
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }

            .modal {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.7);
                backdrop-filter: blur(5px);
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }
            
            .modal.closing {
                animation: fadeOut 0.3s ease;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
            
            @keyframes slideIn {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }

            .modal-content {
                background-color: #fff;
                padding: 30px;
                border-radius: var(--border-radius-lg);
                box-shadow: var(--shadow-xl);
                max-width: 90%;
                width: 900px;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                animation: slideIn 0.3s ease;
            }

            .close-btn {
                position: absolute;
                top: 15px;
                right: 15px;
                background: var(--color-primary);
                color: white;
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                font-size: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.3s;
                box-shadow: var(--shadow-md);
            }
            
            .close-btn:hover {
                background: var(--color-secondary);
                transform: rotate(90deg);
            }

            .book-detail {
                display: grid;
                grid-template-columns: 1fr 2fr;
                gap: 30px;
            }
            
            .book-detail-img {
                text-align: center;
            }

            .book-detail-img img {  
                width: 100%;    
                max-width: 300px;
                border-radius: var(--border-radius-lg);
                box-shadow: var(--shadow-md);
                margin-bottom: 20px;
            }
            
            .book-info h2 {
                font-family: var(--font-heading);   
                font-size: 2.5rem;
                margin: 0 0 10px 0;
                color: var(--color-primary);
            }

            .author {
                font-size: 1.4rem;
                margin-bottom: 20px;
                font-style: italic;
                color: #666;
            }
            
            .metadata {
                display: flex;
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .metadata-item {
                background: #f5f5f5;
                padding: 8px 15px;
                border-radius: 30px;
                font-size: 0.9rem;
            }
            
            .metadata-item strong {
                font-weight: 600;
                margin-right: 5px;
            }

            .summary, .synopsis {
                font-family: var(--font-body);  
                font-size: 1.1rem;
                line-height: 1.7;
                color: var(--color-text);
                margin-bottom: 30px;
            }
            
            .synopsis {
                margin-top: 20px;
            }
            
            .section-title {
                font-family: var(--font-heading);
                font-size: 1.6rem;
                margin: 20px 0 15px 0;
                color: var(--color-primary);
                position: relative;
                padding-bottom: 10px;
            }
            
            .section-title::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 80px;
                height: 3px;
                background: var(--color-secondary);
                border-radius: 3px;
            }

            .quotes {
                margin-top: 30px;
                padding: 20px;
                background: #f9f9f9;
                border-radius: var(--border-radius-lg);
                border-left: 5px solid var(--color-secondary);
            }   

            .quotes h3 {
                margin-top: 0;
                margin-bottom: 15px;
                font-family: var(--font-heading);
                font-size: 1.4rem;
                color: var(--color-primary);
            }
            
            .quote {
                font-style: italic;
                color: #555;
                margin-bottom: 10px;
                position: relative;
                padding-left: 20px;
                line-height: 1.6;
            }
            
            .quote::before {
                content: '"';
                position: absolute;
                left: 0;
                top: 0;
                font-size: 1.5rem;
                color: var(--color-secondary);
                font-family: Georgia, serif;
            }
            
            @media (max-width: 768px) {
                .book-detail {
                    grid-template-columns: 1fr;
                }
                
                .modal-content {
                    padding: 20px;
                    width: 100%;
                }
                
                .book-detail-img {
                    text-align: center;
                }
                
                .book-detail-img img {
                    max-width: 200px;
                }
                
                .book-info h2 {
                    font-size: 1.8rem;
                }
                
                .metadata {
                    flex-wrap: wrap;
                }
            }
        `;

        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(style);
        
        const modal = document.createElement('div');
        modal.classList.add('modal');
        
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');
        
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('close-btn');
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', () => this.closeModal());
        
        const bookDetail = document.createElement('div');
        bookDetail.classList.add('book-detail');
        
        // Columna izquierda (imagen)
        const bookImageColumn = document.createElement('div');
        bookImageColumn.classList.add('book-detail-img');
        
        const bookImage = document.createElement('img');
        bookImage.src = coverUrl;
        bookImage.alt = title;
        
        bookImageColumn.appendChild(bookImage);
        
        // Columna derecha (información)
        const bookInfo = document.createElement('div');
        bookInfo.classList.add('book-info');
        
        const bookTitle = document.createElement('h2');
        bookTitle.textContent = title;
        
        const bookAuthor = document.createElement('p');
        bookAuthor.classList.add('author');
        bookAuthor.textContent = `por ${author}`;
        
        // Metadatos
        const metadata = document.createElement('div');
        metadata.classList.add('metadata');
        
        const genreItem = document.createElement('div');
        genreItem.classList.add('metadata-item');
        genreItem.innerHTML = `<strong>Género:</strong> ${genre}`;
        
        const yearItem = document.createElement('div');
        yearItem.classList.add('metadata-item');
        yearItem.innerHTML = `<strong>Año:</strong> ${publishedDate}`;
        
        metadata.appendChild(genreItem);
        metadata.appendChild(yearItem);
        
        // Sinopsis
        const synopsisTitle = document.createElement('h3');
        synopsisTitle.classList.add('section-title');
        synopsisTitle.textContent = 'Sinopsis';
        
        const synopsisText = document.createElement('p');
        synopsisText.classList.add('synopsis');
        synopsisText.textContent = synopsis;
        
        // Resumen
        const summaryTitle = document.createElement('h3');
        summaryTitle.classList.add('section-title');
        summaryTitle.textContent = 'Acerca del libro';
        
        const summaryText = document.createElement('p');
        summaryText.classList.add('summary');
        summaryText.textContent = summary;
        
        // Frases célebres
        const quotesSection = document.createElement('div');
        quotesSection.classList.add('quotes');
        
        const quotesTitle = document.createElement('h3');
        quotesTitle.textContent = 'Frases célebres';
        
        quotesSection.appendChild(quotesTitle);
        
        if (quotes && quotes.length > 0) {
            quotes.forEach(quote => {
                const quoteItem = document.createElement('p');
                quoteItem.classList.add('quote');
                quoteItem.textContent = quote;
                quotesSection.appendChild(quoteItem);
            });
        }
        
        // Añadir todo a la columna de información
        bookInfo.appendChild(bookTitle);
        bookInfo.appendChild(bookAuthor);
        bookInfo.appendChild(metadata);
        bookInfo.appendChild(synopsisTitle);
        bookInfo.appendChild(synopsisText);
        bookInfo.appendChild(summaryTitle);
        bookInfo.appendChild(summaryText);
        bookInfo.appendChild(quotesSection);
        
        // Combinar columnas
        bookDetail.appendChild(bookImageColumn);
        bookDetail.appendChild(bookInfo);
        
        // Estructurar modal
        modalContent.appendChild(closeBtn);
        modalContent.appendChild(bookDetail);
        modal.appendChild(modalContent);
        
        this.shadowRoot.appendChild(modal);
    }
}

customElements.define('book-detail', BookDetailComponent);
