export function calculateWinner(squares) {
  // possible wins
  const winningScenarios = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  for (let i = 0; i < winningScenarios.length; i++) {
    const [a, b, c] = winningScenarios[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningSquares: [a, b, c] }
    }
  }
  return null
}

export function calculateTurns(squares) {
  // check for remaining turns by filtering out only null items
  const nullSquares = squares.filter((square) => !square)
  const remainingTurns = nullSquares.length
  return remainingTurns
}

export function calculateStatus(winnerInfo, remainingTurns, player) {
  // if no winner and no turns it's a draw
  if (!winnerInfo && !remainingTurns) return "It's a draw"
  // if there's a winner return the winner
  if (winnerInfo) return `GG`
  // otherwise return next player
  return `Player ${player}, you're up!`
}
