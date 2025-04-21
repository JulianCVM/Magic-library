// Definición de los datos de libros directamente en JavaScript en lugar de importar desde JSON
const libros = [
  {
    "title": "Don Quijote de la Mancha",
    "author": "Miguel de Cervantes",
    "coverUrl": "https://placehold.co/300x400?text=Don+Quijote+de+la+Mancha",
    "synopsis": "Una obra destacada de la literatura en español, escrita por Miguel de Cervantes.",
    "publishedDate": "1977",
    "genre": "Ficción literaria",
    "summary": "Don Quijote de la Mancha es una obra representativa de Miguel de Cervantes que explora las complejidades humanas y sociales.",
    "quotes": [
      "Hay que ser valiente para ser feliz.",
      "Uno no es de ninguna parte mientras no tenga un muerto bajo la tierra.",
      "La vida no es la que uno vivió, sino la que uno recuerda."
    ]
  },
  {
    "title": "La sombra del viento",
    "author": "Carlos Ruiz Zafón",
    "coverUrl": "https://placehold.co/300x400?text=La+sombra+del+viento",
    "synopsis": "Una obra destacada de la literatura en español, escrita por Carlos Ruiz Zafón.",
    "publishedDate": "1996",
    "genre": "Narrativa contemporánea",
    "summary": "La sombra del viento es una obra representativa de Carlos Ruiz Zafón que explora las complejidades humanas y sociales.",
    "quotes": [
      "Cada quien es dueño de su propio destino.",
      "Los libros son espejos: solo se ve en ellos lo que uno ya lleva dentro.",
      "La vida no es la que uno vivió, sino la que uno recuerda."
    ]
  },
  {
    "title": "Rayuela",
    "author": "Julio Cortázar",
    "coverUrl": "https://placehold.co/300x400?text=Rayuela",
    "synopsis": "Una obra destacada de la literatura en español, escrita por Julio Cortázar.",
    "publishedDate": "1987",
    "genre": "Novela",
    "summary": "Rayuela es una obra representativa de Julio Cortázar que explora las complejidades humanas y sociales.",
    "quotes": [
      "No existe mejor medicina que tener pensamientos alegres.",
      "Los libros son espejos: solo se ve en ellos lo que uno ya lleva dentro.",
      "Nunca se debe confundir la verdad con la opinión de la mayoría."
    ]
  },
  {
    "title": "El amor en los tiempos del cólera",
    "author": "Gabriel García Márquez",
    "coverUrl": "https://placehold.co/300x400?text=El+amor+en+los+tiempos+del+cólera",
    "synopsis": "Una obra destacada de la literatura en español, escrita por Gabriel García Márquez.",
    "publishedDate": "1997",
    "genre": "Narrativa contemporánea",
    "summary": "El amor en los tiempos del cólera es una obra representativa de Gabriel García Márquez que explora las complejidades humanas y sociales.",
    "quotes": [
      "Uno no es de ninguna parte mientras no tenga un muerto bajo la tierra.",
      "La vida no es la que uno vivió, sino la que uno recuerda.",
      "No hay medicina que cure lo que no cura la felicidad."
    ]
  },
  {
    "title": "Pedro Páramo",
    "author": "Juan Rulfo",
    "coverUrl": "https://placehold.co/300x400?text=Pedro+Páramo",
    "synopsis": "Una obra destacada de la literatura en español, escrita por Juan Rulfo.",
    "publishedDate": "1972",
    "genre": "Ficción histórica",
    "summary": "Pedro Páramo es una obra representativa de Juan Rulfo que explora las complejidades humanas y sociales.",
    "quotes": [
      "Cada quien es dueño de su propio destino.",
      "No hay medicina que cure lo que no cura la felicidad.",
      "Nada tiene sentido si no se vive con pasión."
    ]
  },
  {
    "title": "La ciudad y los perros",
    "author": "Mario Vargas Llosa",
    "coverUrl": "https://placehold.co/300x400?text=La+ciudad+y+los+perros",
    "synopsis": "Una obra destacada de la literatura en español, escrita por Mario Vargas Llosa.",
    "publishedDate": "2005",
    "genre": "Ficción literaria",
    "summary": "La ciudad y los perros es una obra representativa de Mario Vargas Llosa que explora las complejidades humanas y sociales.",
    "quotes": [
      "Uno no es de ninguna parte mientras no tenga un muerto bajo la tierra.",
      "Los libros son espejos: solo se ve en ellos lo que uno ya lleva dentro.",
      "Nunca se debe confundir la verdad con la opinión de la mayoría."
    ]
  },
  {
    "title": "Ficciones",
    "author": "Jorge Luis Borges",
    "coverUrl": "https://placehold.co/300x400?text=Ficciones",
    "synopsis": "Una obra destacada de la literatura en español, escrita por Jorge Luis Borges.",
    "publishedDate": "1960",
    "genre": "Narrativa contemporánea",
    "summary": "Ficciones es una obra representativa de Jorge Luis Borges que explora las complejidades humanas y sociales.",
    "quotes": [
      "Cada quien es dueño de su propio destino.",
      "No existe mejor medicina que tener pensamientos alegres.",
      "La vida no es la que uno vivió, sino la que uno recuerda."
    ]
  },
  {
    "title": "Los detectives salvajes",
    "author": "Roberto Bolaño",
    "coverUrl": "https://placehold.co/300x400?text=Los+detectives+salvajes",
    "synopsis": "Una obra destacada de la literatura en español, escrita por Roberto Bolaño.",
    "publishedDate": "1991",
    "genre": "Realismo mágico",
    "summary": "Los detectives salvajes es una obra representativa de Roberto Bolaño que explora las complejidades humanas y sociales.",
    "quotes": [
      "Nunca se debe confundir la verdad con la opinión de la mayoría.",
      "Uno no es de ninguna parte mientras no tenga un muerto bajo la tierra.",
      "Los libros son espejos: solo se ve en ellos lo que uno ya lleva dentro."
    ]
  },
  {
    "title": "El túnel",
    "author": "Ernesto Sabato",
    "coverUrl": "https://placehold.co/300x400?text=El+túnel",
    "synopsis": "Una obra destacada de la literatura en español, escrita por Ernesto Sabato.",
    "publishedDate": "1992",
    "genre": "Drama",
    "summary": "El túnel es una obra representativa de Ernesto Sabato que explora las complejidades humanas y sociales.",
    "quotes": [
      "Todo lo que realmente importa sucede en secreto.",
      "La vida no es la que uno vivió, sino la que uno recuerda.",
      "No hay medicina que cure lo que no cura la felicidad."
    ]
  },
  {
    "title": "Ensayo sobre la ceguera",
    "author": "José Saramago",
    "coverUrl": "https://placehold.co/300x400?text=Ensayo+sobre+la+ceguera",
    "synopsis": "Una obra destacada de la literatura en español, escrita por José Saramago.",
    "publishedDate": "1999",
    "genre": "Misterio",
    "summary": "Ensayo sobre la ceguera es una obra representativa de José Saramago que explora las complejidades humanas y sociales.",
    "quotes": [
      "Todo lo que realmente importa sucede en secreto.",
      "Uno no es de ninguna parte mientras no tenga un muerto bajo la tierra.",
      "Nunca se debe confundir la verdad con la opinión de la mayoría."
    ]
  }
];

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
