const ALPHABETS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
  'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '.',
  ',', '?', ':', ';', '-', '/', '(', ')', '"', '@', '=', '+', '1', '2', '3',
  , '4', '5', '6', '7', '8', '9', '0'];

const MORSECODE = ['·–', '–···', '–·–·', '–··', '·', '··–·', '––·', '····',
  '··', '·–––', '–·–', '·–··', '––', '–·', '–––', '·––·', '––·–', '·–·', '···',
  '–', '··–', '···–', '·–', '–··–', '–·––', '––··', '.-.-.-', '--..--',
  '..- -..', '.----.', '---...', '-.-.-.', '-....-', '-..-.', '-.--.-',
  '.-..-.', '.-..-.', '.--.-.', '-...-', '.-.-.', '..-.-', '_', '.-- - -',
  '..- - -', '...-- -', '....-', '.....', '-....', '--...', '---..', '----.',
  '-----'];

function enterAgain(response) {
  if (response) {
    return toMorseCode();
  }
  console.log("Visit again.. 👋🏻");
  return;
}

function showLetter(text) {
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
    'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '.',
    ',', '?', ':', ';', '-', '/', '(', ')', '"', '@', '=', '+', '1', '2', '3',
    , '4', '5', '6', '7', '8', '9', '0'];
  let morseValue = "";

  for (let index = 0; index < text.length; index++) {
    const position = alphabet.indexOf(text[index]);
    let value = '';

    if (position !== -1) {
      value = `[${alphabet[position]} :- ${MORSECODE[position]}]\n`
      alphabet[position] = '❌';
    }

    morseValue += value;
  }
  return morseValue;
}

function convertWordToMorse(word) {
  let encodedWord = "";

  for (let index = 0; index < word.length; index++) {
    const alphabetIndex = ALPHABETS.indexOf(word[index]);
    encodedWord += MORSECODE[alphabetIndex];
  }
  return encodedWord;
}

function convertTextToMorse(text) {
  const sentence = text.split(" ");
  let encodedText = "";

  for (let index = 0; index < sentence.length; index++) {
    encodedText += convertWordToMorse(sentence[index]) + "  ";
  }
  return encodedText;
}

function underline(char, times) {
  return char.repeat(times);
}

function invalidDisplay() {
  console.log("⚠️ INVALID INPUT !\n");
  console.log(underline("=", 40));
}

function validSentence(text) {
  for (let index = 0; index < text.length; index++) {
    if (!ALPHABETS.includes(text[index]) && text[index] !== " ") {
      invalidDisplay();
      return toMorseCode();
    }
  }
  return;
}

function toMorseCode() {
  const sentence = (prompt("Enter a sentence : ")).toUpperCase();
  validSentence(sentence);

  const sentenceInMorse = convertTextToMorse(sentence);

  console.log(`MORSE CODE : ${sentenceInMorse}`);
  console.log(underline("=", 40));
  console.log(`Letters :\n${showLetter(sentence)}`)

  const response = confirm("\nDo you want to play again ?  ");
  enterAgain(response);
}

toMorseCode();
