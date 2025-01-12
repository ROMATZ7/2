// Contraseña específica para este juego
const correctPassword = "BUEN0RR0";

// Referencias a elementos HTML
const passwordScreen = document.getElementById("password-screen");
const passwordInput = document.getElementById("password");
const errorMessage = document.getElementById("error-message");
const gameContainer = document.getElementById("game-container");

// Función para verificar la contraseña
function checkPassword() {
  if (passwordInput.value === correctPassword) {
    // Ocultar pantalla de contraseña y mostrar el juego
    passwordScreen.classList.add("hidden");
    gameContainer.classList.remove("hidden");
  } else {
    // Mostrar mensaje de error si la contraseña es incorrecta
    errorMessage.classList.remove("hidden");
  }
}

// Continuación del código del juego
const words = ["BUENO", "BESOS", "CIELO", "NOVIO", "SUEÑO", "QUIERO", "GUAPO"]; // Lista de palabras posibles
let targetWord = ""; // Palabra seleccionada
const grid = document.getElementById("grid");
const wordInput = document.getElementById("word-input");
const submitWord = document.getElementById("submit-word");
const retryButton = document.getElementById("retry");
const message = document.getElementById("message");

let currentRow = 0; // Índice de la fila actual
let currentGuess = ""; // Palabra actual en construcción

// Seleccionar una palabra aleatoria de la lista
function selectRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  targetWord = words[randomIndex];
}

// Configurar el tablero
function setupGrid() {
  grid.innerHTML = ""; // Reiniciar la cuadrícula
  for (let i = 0; i < 6; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
  currentRow = 0; // Reiniciar fila actual
  wordInput.value = ""; // Limpiar input
  wordInput.disabled = false; // Habilitar input
  submitWord.disabled = false; // Habilitar botón
  message.textContent = ""; // Limpiar mensaje
  selectRandomWord(); // Seleccionar una nueva palabra
}

// Validar la palabra ingresada
function validateWord() {
  currentGuess = wordInput.value.toUpperCase();

  if (currentGuess.length !== 5) {
    message.textContent = "La palabra debe tener 5 letras.";
    return;
  }

  const row = grid.children[currentRow];
  const targetLetters = targetWord.split("");
  const guessLetters = currentGuess.split("");

  // Validar cada letra
  for (let i = 0; i < 5; i++) {
    const cell = row.children[i];
    cell.textContent = guessLetters[i];

    if (guessLetters[i] === targetLetters[i]) {
      cell.classList.add("correct");
      targetLetters[i] = null;
    } else if (targetLetters.includes(guessLetters[i])) {
      cell.classList.add("present");
      targetLetters[targetLetters.indexOf(guessLetters[i])] = null;
    } else {
      cell.classList.add("absent");
    }
  }

  // Verificar si se acertó la palabra
  if (currentGuess === targetWord) {
    message.textContent = "¡Ganaste CONTRASEÑA TEdejoTOCARMElaTETAderecha!Para avanzar haz click en una boca de incendio un poco más abajo la presentación ";
    endGame();
  } else if (currentRow < 5) {
    currentRow++;
    wordInput.value = ""; // Limpiar el input
  } else {
    message.textContent = `Lo siento, no lo lograste. La palabra era "${targetWord}".`;
    endGame();
  }
}

// Terminar el juego
function endGame() {
  wordInput.disabled = true; // Deshabilitar input
  submitWord.disabled = true; // Deshabilitar botón
  retryButton.classList.remove("hidden"); // Mostrar botón de reintentar
}

// Reiniciar el juego
function restartGame() {
  setupGrid(); // Configurar tablero
  retryButton.classList.add("hidden"); // Ocultar botón de reintentar
}

// Configurar eventos
submitWord.addEventListener("click", validateWord);
retryButton.addEventListener("click", restartGame);

// Inicializar el juego
setupGrid();