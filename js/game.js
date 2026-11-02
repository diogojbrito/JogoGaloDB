// JavaScript for game logic
let firstPlayer = 'X'; // Quem começa cada jogo
let currentPlayer = 'X'; // Jogador atual ('X' or 'O')
let gameActive = true; // Indica se o jogo está ativo
const cells = document.querySelectorAll('.cell'); // Seleciona todas as células do tabuleiro


// Função para realizar um movimento no tabuleiro
function makeMove(cell) {
    if (cell.textContent !== '' || !gameActive) return;
    cell.textContent = currentPlayer;

    if (checkWin()) {
        showWinModal(`Venceu o jogador ${currentPlayer} !`);
        gameActive = false;
        return;
    }

    if (checkDraw()) {
        showWinModal('Empate no Jogo!');
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.getElementById('currentPlayer').textContent = currentPlayer;
}

// Função para verificar se há um vencedor no jogo
// Retorna true se houver uma combinação vencedora no tabuleiro, caso contrário, retorna false.
function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (let combination of winningCombinations) {
        const a = cells[combination[0]].textContent;
        const b = cells[combination[1]].textContent;
        const c = cells[combination[2]].textContent;

        if (a && a === b && b === c) {
            return true;
        }
    }

    return false;
}

// Função para verificar se o jogo terminou em empate
function checkDraw() {
    // Verifica se todas as células estão preenchidas, indicando um empate no jogo.
    for (let cell of cells) { // Itera sobre todas as células do tabuleiro
        if (cell.textContent === '') { // Verifica se a célula está vazia
            return false; // Se existe alguma célula vazia, não é empate
        }
    }
    return true; // Se todas as células estão preenchidas, é empate
}

// Função para exibir o modal de vitória ou empate; recebe a mensagem a ser exibida como parâmetro.
// Envia a mensagem para o modal com o id "winMessage" da página.
// Mostra o modal adicionando a classe "show" ao elemento com o id "winModal".
function showWinModal(message) {
    document.getElementById('winMessage').textContent = message; // Define a mensagem no modal de vitória ou empate
    document.getElementById('winModal').classList.add('show'); // Mostra o modal de vitória ou empate
}

// Função para fechar o modal de vitória ou empate e reiniciar o jogo
// Remove a classe "show" do modal e reinicia o jogo
function closeModal() {
    document.getElementById('winModal').classList.remove('show'); // Esconde o modal de vitória ou empate
    resetGame(); // Reinicia o jogo após fechar o modal
}

// Função para reiniciar o jogo
// Reseta o jogador atual, ativa o jogo e limpa todas as células do tabuleiro.
// Atualiza o indicador do jogador atual na página.
function resetGame() {
    currentPlayer = firstPlayer;
    gameActive = true; // Ativa o jogo
    cells.forEach(cell => cell.textContent = ''); // Limpa todas as células do tabuleiro
    document.getElementById('currentPlayer').textContent = currentPlayer; // Atualiza o indicador do jogador atual na página
}


// Função para mudar quem joga primeiro
function changeFirstPlayer() {
    firstPlayer = firstPlayer === 'X' ? 'O' : 'X'; // Troca entre X e O
    document.getElementById('firstPlayerBtn').textContent = 'Começa: ' + firstPlayer; // Atualiza o texto do botão
    resetGame(); // Recomeça o jogo com o novo jogador
}