import libros from './objetos.json';

export const obtenerLibros = () => {
    return libros;
};

export const obtenerLibroPorTitulo = (titulo) => {
    return libros.find(libro => libro.title.toLowerCase() === titulo.toLowerCase());
};

export const obtenerLibrosPorAutor = (autor) => {
    return libros.filter(libro => libro.author.toLowerCase() === autor.toLowerCase());
};

export const obtenerLibrosPorGenero = (genero) => {
    return libros.filter(libro => libro.genre.toLowerCase() === genero.toLowerCase());
};
