// Colores disponibles
var colores = ['red', 'green', 'blue', 'yellow', 'pink', 'orange'];

// Variables de juego
let score = 0; // Contador de respuestas correctas
let questionsCount = 0; // Contador de preguntas realizadas
let previousQuestion = ''; // Pregunta anterior

// Generar un número aleatorio entre 0 y el número de colores - 1
function generarNumeroAleatorio() {
  return Math.floor(Math.random() * colores.length);
}

// Obtener una pregunta aleatoria que no sea igual a la pregunta anterior
function obtenerPreguntaAleatoria() {
  var pregunta;
  var indicePregunta = generarNumeroAleatorio() % 3;

  switch (indicePregunta) {
    case 0:
      pregunta = '¿De qué color es el primer círculo?';
      break;
    case 1:
      pregunta = '¿De qué color es el segundo círculo?';
      break;
    case 2:
      pregunta = '¿De qué color es el último círculo?';
      break;
  }

  // Comprobar si la pregunta es igual a la anterior y generar una nueva si es necesario
  if (pregunta === previousQuestion) {
    return obtenerPreguntaAleatoria();
  }

  previousQuestion = pregunta;

  return pregunta;
}

// Verificar la respuesta del usuario
function verificarRespuesta(respuesta) {
  var pregunta = document.getElementById('question').textContent;
  var respuestaCorrecta = false;

  switch (pregunta) {
    case '¿De qué color es el primer círculo?':
      respuestaCorrecta = respuesta === document.getElementById('circle1').style.backgroundColor;
      break;
    case '¿De qué color es el segundo círculo?':
      respuestaCorrecta = respuesta === document.getElementById('circle2').style.backgroundColor;
      break;
    case '¿De qué color es el último círculo?':
      respuestaCorrecta = respuesta === document.getElementById('circle3').style.backgroundColor;
      break;
  }

  if (respuestaCorrecta) {
    mostrarMensaje('¡Respuesta correcta!', true);
    score++;
  } else {
    mostrarMensaje('Respuesta incorrecta. ¡Inténtalo de nuevo!', false);
  }

  questionsCount++;

  if (questionsCount >= 5) {
    // Mostrar el mensaje de fin de juego
    const scoreElement = document.querySelector("#score");
    scoreElement.textContent = `¡Fin!`;

    if (score === 5) {
      scoreElement.textContent += ` ¡Felicidades, eres un/a campeón/a!`;
      scoreElement.style.color = "green";
    } else {
      scoreElement.textContent += ` ¡Vuelve a intentarlo!`;
      scoreElement.style.color = "red";
    }

    // Mostrar el botón "Comenzar el juego"
    document.getElementById('play-again-button').style.display = 'block';
  } else {
    // Actualizar puntaje y generar la siguiente pregunta
    actualizarPuntajeYGenerarSiguientePregunta();
  }
}

// Generar colores aleatorios sin repetir
function generarColoresAleatorios() {
  var coloresDisponibles = colores.slice(); // Copiar el array de colores disponibles
  var coloresAleatorios = [];

  // Obtener tres colores aleatorios sin repetir
  for (var i = 0; i < 3; i++) {
    var indiceAleatorio = generarNumeroAleatorio() % coloresDisponibles.length;
    var colorAleatorio = coloresDisponibles.splice(indiceAleatorio, 1)[0];
    coloresAleatorios.push(colorAleatorio);
  }

  return coloresAleatorios;
}

// Generar una nueva pregunta y colores aleatorios
function generarPreguntaYColores() {
  // Restablecer resultados y mensajes del juego anterior
  resetGame();

  // Generar colores aleatorios sin repetir
  var coloresAleatorios = generarColoresAleatorios();

  // Aplicar los colores a los círculos
  document.getElementById('circle1').style.backgroundColor = coloresAleatorios[0];
  document.getElementById('circle2').style.backgroundColor = coloresAleatorios[1];
  document.getElementById('circle3').style.backgroundColor = coloresAleatorios[2];

  // Aplicar los colores a los botones
  document.getElementById('button1').style.backgroundColor = coloresAleatorios[2];
  document.getElementById('button2').style.backgroundColor = coloresAleatorios[0];
  document.getElementById('button3').style.backgroundColor = coloresAleatorios[1];

  // Generar una pregunta aleatoria
  var pregunta = obtenerPreguntaAleatoria();

  // Mostrar la pregunta en la página
  document.getElementById('question').textContent = pregunta;
}

// Mostrar un mensaje en la página
function mostrarMensaje(mensaje, esCorrecto) {
  var resultado = document.getElementById('result');
  resultado.textContent = mensaje;
  resultado.style.color = esCorrecto ? 'green' : 'red';
}

// Actualizar puntaje y generar la siguiente pregunta
function actualizarPuntajeYGenerarSiguientePregunta() {
  const scoreElement = document.querySelector("#score");
  scoreElement.textContent = `${score} respuestas correctas de ${questionsCount}`;

  setTimeout(generarPreguntaYColores, 1000);
}

// Función para restablecer los resultados y mensajes del juego anterior
function resetGame() {
  const scoreElement = document.querySelector("#score");
  const resultElement = document.querySelector("#result");

  scoreElement.textContent = "";
  resultElement.textContent = "";
  scoreElement.style.color = "initial";
  resultElement.style.color = "initial";
}

// Evento clic del botón "Comenzar el juego"
var comenzarJuegoButton = document.getElementById('play-again-button');
comenzarJuegoButton.addEventListener('click', function () {
  comenzarJuegoButton.style.display = 'none'; // Ocultar el botón "Comenzar el juego"
  score = 0; // Reiniciar el puntaje
  questionsCount = 0; // Reiniciar el contador de preguntas
  previousQuestion = ''; // Reiniciar la pregunta anterior
  generarPreguntaYColores(); // Generar la primera pregunta y colores
});

// Eventos clic de los botones de respuesta
var botonesRespuesta = document.getElementsByClassName('guess-button');
for (var i = 0; i < botonesRespuesta.length; i++) {
  botonesRespuesta[i].addEventListener('click', function () {
    var respuesta = this.style.backgroundColor;
    verificarRespuesta(respuesta);
  });
}

// Generar la primera pregunta y colores aleatorios
generarPreguntaYColores();
