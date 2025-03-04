const themes = {
    emoji: ["🍎", "🍎", "🍌", "🍌", "🍒", "🍒", "🍇", "🍇", "🍉", "🍉", "🍓", "🍓", "🥝", "🥝", "🍍", "🍍"],
    animals: ["🐶", "🐶", "🐱", "🐱", "🐰", "🐰", "🦊", "🦊", "🐻", "🐻", "🐼", "🐼", "🐨", "🐨", "🐯", "🐯"],
    flags: ["🇵🇹", "🇵🇹", "🇧🇷", "🇧🇷", "🇺🇸", "🇺🇸", "🇫🇷", "🇫🇷", "🇩🇪", "🇩🇪", "🇯🇵", "🇯🇵", "🇨🇳", "🇨🇳", "🇮🇳", "🇮🇳"],
  };
  
  let cards = [];
  let flippedCards = [];
  let matchedCards = [];
  let moveCount = 0;
  let timer;
  let startTime;
  let currentTheme = "emoji";
  
  // Função para embaralhar as cartas
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  // Função para criar o tabuleiro do jogo
  function createBoard() {
    const gameBoard = document.getElementById("game-board");
    gameBoard.innerHTML = "";
    const shuffledCards = shuffle([...cards]);
  
    shuffledCards.forEach((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card", "bg-white", "rounded-lg", "cursor-pointer", "h-24", "w-24", "shadow-md", "hover:shadow-lg");
  
      const cardInner = document.createElement("div");
      cardInner.classList.add("card-inner");
  
      const cardFront = document.createElement("div");
      cardFront.classList.add("card-front", "bg-gray-200", "rounded-lg", "flex", "items-center", "justify-center", "text-4xl");
      cardFront.textContent = "❓";
  
      const cardBack = document.createElement("div");
      cardBack.classList.add("card-back", "rounded-lg", "flex", "items-center", "justify-center", "text-4xl");
      cardBack.textContent = card;
  
      cardInner.appendChild(cardFront);
      cardInner.appendChild(cardBack);
      cardElement.appendChild(cardInner);
      cardElement.dataset.index = index;
      cardElement.addEventListener("click", flipCard);
      gameBoard.appendChild(cardElement);
    });
  }
  
  // Função para virar uma carta
  function flipCard() {
    const card = this;
  
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !card.classList.contains("matched")) {
      card.classList.add("flipped");
      flippedCards.push(card);
  
      if (flippedCards.length === 2) {
        moveCount++;
        document.getElementById("move-counter").textContent = `Movimentos: ${moveCount}`;
        setTimeout(checkForMatch, 500);
      }
    }
  }
  
  // Função para verificar se as cartas viradas são iguais
  function checkForMatch() {
    const [card1, card2] = flippedCards;
  
    if (card1.querySelector(".card-back").textContent === card2.querySelector(".card-back").textContent) {
      card1.classList.add("matched");
      card2.classList.add("matched");
      matchedCards.push(card1, card2);
  
      if (matchedCards.length === cards.length) {
        clearInterval(timer);
        document.getElementById("result").textContent = "Parabéns! Ganhaste o jogo!";
        document.getElementById("reset-button").classList.remove("hidden");
      }
    } else {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
    }
  
    flippedCards = [];
  }
  
  // Função para reiniciar o jogo
  function resetGame() {
    clearInterval(timer);
    flippedCards = [];
    matchedCards = [];
    moveCount = 0;
    document.getElementById("move-counter").textContent = "Movimentos: 0";
    document.getElementById("result").textContent = "";
    document.getElementById("reset-button").classList.add("hidden");
    document.getElementById("timer").textContent = "Tempo: 00:00";
    startTimer();
    createBoard();
  }
  
  // Função para iniciar o temporizador
  function startTimer() {
    startTime = Date.now();
    timer = setInterval(() => {
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const minutes = Math.floor(elapsedTime / 60);
      const seconds = elapsedTime % 60;
      document.getElementById("timer").textContent = `Tempo: ${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }, 1000);
  }
  
  // Função para mudar o tema
  function changeTheme(theme) {
    currentTheme = theme;
    cards = themes[theme];
    resetGame();
  }
  
  // Inicia o jogo ao carregar a página
  document.addEventListener("DOMContentLoaded", () => {
    cards = themes[currentTheme];
    createBoard();
    startTimer();
  });
  
  // Adiciona eventos aos botões de tema
  document.getElementById("theme-emoji").addEventListener("click", () => changeTheme("emoji"));
  document.getElementById("theme-animals").addEventListener("click", () => changeTheme("animals"));
  document.getElementById("theme-flags").addEventListener("click", () => changeTheme("flags"));
  
  // Adiciona evento ao botão de reiniciar
  document.getElementById("reset-button").addEventListener("click", resetGame);