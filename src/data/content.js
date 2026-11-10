export const subjects = [
  { id: 'matematicas', name: 'Matemáticas', icon: '➗', color: 'blue', description: 'Practica operaciones, álgebra y razonamiento lógico.', topics: ['Operaciones básicas', 'Fracciones', 'Álgebra'] },
  { id: 'espanol', name: 'Español', icon: '📚', color: 'pink', description: 'Refuerza lectura, escritura y comprensión de textos.', topics: ['Comprensión lectora', 'Ortografía', 'Tipos de texto'] },
  { id: 'ciencias', name: 'Ciencias', icon: '🔬', color: 'green', description: 'Descubre conceptos de biología, física y química.', topics: ['Seres vivos', 'Materia y energía', 'Ecosistemas'] },
  { id: 'ingles', name: 'Inglés', icon: '🌎', color: 'yellow', description: 'Aprende vocabulario y expresiones básicas.', topics: ['Saludos', 'Verbo to be', 'Vocabulario'] }
];

export const resources = [
  { id: 1, subject: 'matematicas', title: 'Operaciones básicas', type: 'Guía de estudio', level: 'Básico', summary: 'Repasa suma, resta, multiplicación y división con ejemplos sencillos.', body: 'Las operaciones básicas son la suma, la resta, la multiplicación y la división. Para resolver ejercicios, identifica primero qué operación necesitas y revisa tu resultado.' },
  { id: 2, subject: 'matematicas', title: 'Introducción a las fracciones', type: 'Resumen', level: 'Básico', summary: 'Conoce el numerador, el denominador y las fracciones equivalentes.', body: 'Una fracción representa una parte de un todo. El numerador indica cuántas partes tomamos y el denominador en cuántas partes iguales se dividió el entero.' },
  { id: 3, subject: 'espanol', title: 'Comprensión lectora', type: 'Guía de estudio', level: 'Intermedio', summary: 'Identifica ideas principales y secundarias en un texto.', body: 'Para comprender un texto, lee con atención, identifica el tema, reconoce la idea principal y distingue los detalles que la apoyan.' },
  { id: 4, subject: 'espanol', title: 'Reglas básicas de acentuación', type: 'Resumen', level: 'Básico', summary: 'Repasa palabras agudas, graves y esdrújulas.', body: 'Las palabras agudas llevan la fuerza de voz en la última sílaba; las graves, en la penúltima; y las esdrújulas, en la antepenúltima. Las reglas de acentuación indican cuándo llevan tilde.' },
  { id: 5, subject: 'ciencias', title: 'Los ecosistemas', type: 'Lectura', level: 'Básico', summary: 'Aprende cómo interactúan los seres vivos con su ambiente.', body: 'Un ecosistema está formado por los seres vivos y los elementos no vivos de un lugar. Todos interactúan y dependen unos de otros.' },
  { id: 6, subject: 'ciencias', title: 'Estados de la materia', type: 'Resumen', level: 'Básico', summary: 'Conoce las características de sólidos, líquidos y gases.', body: 'La materia puede encontrarse principalmente en estado sólido, líquido o gaseoso. Cada estado tiene características distintas según la organización y movimiento de sus partículas.' },
  { id: 7, subject: 'ingles', title: 'Saludos en inglés', type: 'Vocabulario', level: 'Básico', summary: 'Aprende expresiones comunes para saludar y despedirte.', body: 'Hello significa hola, Good morning significa buenos días, Good afternoon significa buenas tardes y Goodbye significa adiós.' },
  { id: 8, subject: 'ingles', title: 'Verbo to be', type: 'Guía de estudio', level: 'Básico', summary: 'Practica las formas am, is y are.', body: 'El verbo to be puede significar ser o estar. Se utiliza am con I, is con he, she e it, y are con you, we y they.' }
];

export const quizzes = {
  matematicas: [
    { q: '¿Cuánto es 8 × 7?', options: ['54', '56', '64'], answer: 1, explain: '8 multiplicado por 7 es 56.' },
    { q: '¿Cuál es el resultado de 15 + 9?', options: ['23', '24', '25'], answer: 1, explain: '15 + 9 = 24.' },
    { q: '¿Qué fracción equivale a la mitad?', options: ['1/2', '1/3', '1/4'], answer: 0, explain: 'Una de dos partes iguales representa la mitad.' },
    { q: '¿Cuánto es 36 ÷ 6?', options: ['5', '6', '7'], answer: 1, explain: '36 dividido entre 6 es 6.' },
    { q: '¿Cuál es el doble de 12?', options: ['22', '24', '26'], answer: 1, explain: '12 × 2 = 24.' }
  ],
  espanol: [
    { q: '¿Cuál es la idea principal de un texto?', options: ['El tema central', 'Un ejemplo', 'El título solamente'], answer: 0, explain: 'La idea principal expresa lo más importante del texto.' },
    { q: '¿Cuál palabra está escrita correctamente?', options: ['Arvol', 'Árbol', 'Arból'], answer: 1, explain: 'Árbol lleva tilde por ser palabra grave terminada en consonante distinta de n o s.' },
    { q: '¿Qué signo se usa para hacer una pregunta?', options: ['¡ !', '¿ ?', '( )'], answer: 1, explain: 'En español se utilizan signos de interrogación de apertura y cierre.' },
    { q: '¿Qué es un sinónimo?', options: ['Una palabra de significado similar', 'Una palabra opuesta', 'Una sílaba'], answer: 0, explain: 'Los sinónimos tienen significados iguales o parecidos.' },
    { q: '¿Qué tipo de texto cuenta una historia?', options: ['Narrativo', 'Instructivo', 'Informativo'], answer: 0, explain: 'El texto narrativo relata hechos reales o imaginarios.' }
  ],
  ciencias: [
    { q: '¿Cuál es la unidad básica de los seres vivos?', options: ['El átomo', 'La célula', 'El órgano'], answer: 1, explain: 'La célula es la unidad estructural y funcional de los seres vivos.' },
    { q: '¿En qué estado tiene forma y volumen definidos la materia?', options: ['Sólido', 'Líquido', 'Gaseoso'], answer: 0, explain: 'Los sólidos conservan su forma y volumen.' },
    { q: '¿Qué necesitan las plantas para realizar la fotosíntesis?', options: ['Luz solar', 'Plástico', 'Arena solamente'], answer: 0, explain: 'La luz solar proporciona energía para la fotosíntesis.' },
    { q: '¿Cuál de estos es un ser vivo?', options: ['Una roca', 'Un árbol', 'El agua'], answer: 1, explain: 'Un árbol nace, crece, se reproduce y muere.' },
    { q: '¿Qué planeta habitamos?', options: ['Marte', 'Venus', 'Tierra'], answer: 2, explain: 'Vivimos en el planeta Tierra.' }
  ],
  ingles: [
    { q: '¿Qué significa “Hello”?', options: ['Adiós', 'Hola', 'Gracias'], answer: 1, explain: 'Hello significa hola.' },
    { q: 'Completa: I ___ a student.', options: ['am', 'is', 'are'], answer: 0, explain: 'Con el pronombre I se utiliza am.' },
    { q: '¿Qué significa “Good morning”?', options: ['Buenas noches', 'Buenas tardes', 'Buenos días'], answer: 2, explain: 'Good morning significa buenos días.' },
    { q: '¿Cuál es el plural de “book”?', options: ['Bookes', 'Books', 'Bookies'], answer: 1, explain: 'El plural regular se forma agregando s: books.' },
    { q: '¿Qué significa “Thank you”?', options: ['Por favor', 'Perdón', 'Gracias'], answer: 2, explain: 'Thank you significa gracias.' }
  ]
};
