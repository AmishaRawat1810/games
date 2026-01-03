function display (text) {
  console.log(text)
}

function underline (char, times) {
  return char.repeat(times)
}

function delayTheText (seconds) {
  const startTime = Date.now()
  while (Date.now() - startTime < seconds) {}
  console.clear()
}

function roundsToPlay () {
  return Math.ceil(Math.random() * 4) + 2
}

function aboutGame() {
  const gameName = "\n\nThe Prisoner's Dilemma"
  const gameDescription = `
Imagine two friends, Alex 🥷 and Ben 🥷🏿, steal something together 💰. The police 🚓 catch them and put them in separate rooms, so they cannot talk to each other. 

A police officer 🕵️ goes to Alex 🥷 and says:
"You have two choices, Alex:

  1. Stay silent: If you don't talk 🤐 and your friend Ben also stays silent 🤐, both of you will go to jail ⛓️‍👮‍♂️ for only 1 year.
  2. Blame your friend: If you blame 🥷📢 Ben , but Ben stays silent 🤐, you will go free! Ben will go to jail ⛓️‍👮‍♂️ for 5 years.
  3. What if both blame each other? If both you 🥷 and Ben 🥷🏿 blame each other , both of you will go to jail ⛓️‍👮‍♂️ for 5 years." 

The officer tells the exact same thing to Ben.`

  const gameRule = `
Simple rules (for the player)

The rules are simple for each player. You are Alex. You have two choices

Choice 1: "Stay Silent 🤐" (Cooperate).
Choice 2: "Blame Your Friend 🗣️" (Betray).

You must make a choice. Your friend Ben is doing the same thing in another room.`

  const gameObjective = `
Simple objective :
Your personal objective is to get the shortest jail sentence possible. But you must choose without knowing what your friend will do.`

  display(`${underline('-', gameName.length)}\n${gameDescription}`)
  delayTheText(30000)
  display(gameRule)
  delayTheText(20000)
  display(gameObjective)
  delayTheText(10000)
}

function gameIntroduction() {
  aboutGame();
  if (confirm('Do you want to see about the game again ?')) {
    delayTheText(2000)
    aboutGame();
  }

  display('GAME WILL START NOW')
  delayTheText(0)
}

function validateMove (move) {
  const validMoves = ['c', 'b']

  if (validMoves.includes(move.toLowerCase())) {
    return move
  }

  return null
}

function promptMove (player) {
  const response = prompt(
    `Player ${player}, do you want to cooperate (c) or betray (b) : `
  )

  if (!validateMove(response)) {
    display('⚠️ INVALID MOVE.❌\n🔁 TRY AGAIN..')
    return promptMove(player)
  }

  return response.toLowerCase()
}

function updateSentence (playerMoves, player1Sentence, player2Sentence) {
  switch (playerMoves) {
    case 'cc':
      player1Sentence += 1
      player2Sentence += 1
      break
    case 'cb':
      player1Sentence += 5
      player2Sentence += 0
      break
    case 'bc':
      player1Sentence += 0
      player2Sentence += 5
      break
    case 'bb':
      player1Sentence += 5
      player2Sentence += 5
      break

    default:
      player1Sentence += 0
      player2Sentence += 0
  }
  return [player1Sentence, player2Sentence]
}

function displayRoundSummary (
  round,
  player1Move,
  player2Move,
  player1Score,
  player2Score
) {
  display(`🎯 Round ${round}:`)
  display(
    `Player 1 chose : ${player1Move === 'c' ? '🤝 Cooperate' : '💣 Betray'}`
  )
  display(
    `Player 2 chose : ${player2Move === 'c' ? '🤝 Cooperate' : '💣 Betray'}`
  )

  display(`Current Sentences ->
    Player 1 : ${player1Score} years
    Player 2 : ${player2Score} years`)
  display(underline('=', 30))
}

function displayResult (player1Sentence, player2Sentence) {
  if (player1Sentence < player2Sentence) {
    return display('Player 1 🥷 served less time!')
  }

  if (player2Sentence < player1Sentence) {
    return display('Player 2 🥷🏿 served less time!')
  }

  if (player1Sentence === player2Sentence) {
    display('Both 🥷🥷🏿 served the same sentence')
  }

  display(`Player 1 : ${player1Sentence} years`)
  display(`Player 2 : ${player2Sentence} years`)

  display(underline('=', 30))
}

function playAgain () {
  const confirmation = confirm('Do you want to play one more round? 🤔')
  if (confirmation) {
    console.clear()
    playGame()
  } else {
    display('👋 Thanks for playing!')
  }
}

function playGame () {
  let player1Sentence = 0
  let player2Sentence = 0
  let rounds = roundsToPlay()
  const player1History = []
  const player2History = []

  for (let round = 1; round <= rounds; round++) {
    display(`🔔 Round ${round} :`)
    const player1Move = promptMove(1)
    delayTheText(10)
    const player2Move = promptMove(2)
    delayTheText(10)
    const combinedMove = player1Move + player2Move

    ;[player1Sentence, player2Sentence] = updateSentence(
      combinedMove,
      player1Sentence,
      player2Sentence
    )
    player1History.push(player1Move)
    player2History.push(player2Move)

    displayRoundSummary(
      round,
      player1Move,
      player2Move,
      player1Sentence,
      player2Sentence
    )
    delayTheText(3000)
  }

  displayResult(player1Sentence, player2Sentence)
  playAgain()
}

gameIntroduction()
playGame()
