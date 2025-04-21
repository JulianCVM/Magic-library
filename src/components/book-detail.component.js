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
    
    render() {
        if (!this._data) return;
        
        const { title, author, coverUrl, publishedDate, genre, summary, quotes } = this._data;
        
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
            }

            .book-detail {
                background-color: var(--color-bg);
                padding: 2rem;
                border-radius: var(--border-radius-lg);
                box-shadow: var(--shadow-md);
                transition: all var(--transition-medium);
            }

            .book-detail:hover {    
                box-shadow: var(--shadow-xl);
                transform: translateY(-5px);
            }

            .book-detail h2 {
                font-family: var(--font-heading);   
                font-size: 2rem;
                margin-bottom: 1rem;
            }

            .book-detail p {
                font-family: var(--font-body);  
                font-size: 1.1rem;
                line-height: 1.6;
                color: var(--color-text);
            }

            .book-detail img {  
                width: 100%;    
                max-width: 300px;
                margin-bottom: 1rem;
                border-radius: var(--border-radius-lg);
                box-shadow: var(--shadow-md);
            }   

            .book-detail .quotes {
                margin-top: 2rem;
                padding-top: 2rem;
                border-top: 1px solid var(--color-bg-card);
            }   

            .book-detail .quotes blockquote {
                font-style: italic;
                color: var(--color-secondary);
                margin-bottom: 1rem;
            }

            .book-detail .quotes blockquote {
                font-style: italic;
                color: var(--color-secondary);
                margin-bottom: 1rem;
            }       
        `;

        const container = document.createElement('div');
        container.classList.add('book-detail');
        const bookTitle = document.createElement('h2');
        bookTitle.textContent = title;
        const bookAuthor = document.createElement('p');
        bookAuthor.textContent = author;
        const bookImage = document.createElement('img');
        bookImage.src = coverUrl;
        bookImage.alt = title;
        const bookPublishedDate = document.createElement('p');
        bookPublishedDate.textContent = publishedDate;
        const bookGenre = document.createElement('p');
        bookGenre.textContent = genre;
        const bookSummary = document.createElement('p');
        bookSummary.textContent = summary;
        const bookQuotes = document.createElement('div');
        bookQuotes.classList.add('quotes');
        const bookQuotesBlockquote = document.createElement('blockquote');
        bookQuotesBlockquote.textContent = quotes;
        bookQuotes.appendChild(bookQuotesBlockquote);
        container.appendChild(bookTitle);
        container.appendChild(bookAuthor);
        container.appendChild(bookImage);
        container.appendChild(bookPublishedDate);
        container.appendChild(bookGenre);
        container.appendChild(bookSummary);
        container.appendChild(bookQuotes);
        this.shadowRoot.appendChild(container);

        backButton.addEventListener('click', () => {
            const bookInfoCard = document.querySelector('book-card');
            if (bookInfoCard) {
                bookInfoCard.data = this._data;
                bookInfoCard.render();
            } else {
                console.error('No se encontró el componente book-card');
            }
        });
    }
}

customElements.define('book-detail', BookDetailComponent);
