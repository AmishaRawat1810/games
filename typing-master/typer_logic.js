const typingSpeedStats = (info) => {
  const { totalKeystrokes, seconds, errorHits } = info;
  const KPM = (totalKeystrokes / seconds) * 60;
  const WPM = KPM / 5;
  const netHits = totalKeystrokes - errorHits;
  const accuracy = (netHits / totalKeystrokes) * 100;

  console.log(`
    WPM (words per minute)        : ${WPM.toFixed(2)}
    KPM (keystrokes per minute)   : ${KPM.toFixed(2)}
    Accuracy (rate of net hits )  : ${accuracy.toFixed(2)}
    Net Hits (correct keystrokes) : ${netHits.toFixed(2)}
  `);
  Deno.stdout.writable.close();
};

const format = (key, info, target) => {
  const isCorrect = key === target[info.index];
  const isBackSpace = key === "\x7f";
  let color = 32;

  if (isBackSpace) {
    info.index -= info.index - 1 >= 0 ? 1 : 0;
    info.errorHits += info.prevInputState ? 0 : 1;
    return "\x1b[D \x1b[D";
  }

  if (!isCorrect) {
    color = 31;
    ++info.errorHits;
    info.prevInputState = false;
  }

  info.index += 1;

  return `\x1b[${color}m${key}\x1b[0m`;
};

const transformInput = (info, target) =>
  new TransformStream({
    transform(key, controller) {
      const letter = format(key, info, target);
      controller.enqueue(letter);
      if (info.index === target.length) {
        controller.terminate();
      }
    },
  });

export const startGame = async () => {
  const response = await Deno.readTextFile("./quotes.json");
  const quotes = JSON.parse(response).quotes;
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const target = quotes[randomIndex].quote;
  const info = {
    errorHits: 0,
    index: 0,
    prevInputState: true,
    seconds: 0,
    totalKeystrokes: target.length,
  };

  Deno.stdin.setRaw(true, { cbreak: true });
  prompt("Press a key to start...");
  console.clear();
  console.log(`Target: ${target}\n`);
  try {
    info.seconds = Date.now();
    await Deno.stdin.readable
      .pipeThrough(new TextDecoderStream())
      .pipeThrough(transformInput(info, target))
      .pipeThrough(new TextEncoderStream())
      .pipeTo(Deno.stdout.writable, { preventClose: true });
    info.seconds = (Date.now() - info.seconds) / 1000;
  } finally {
    typingSpeedStats(info);
    Deno.stdin.close();
  }
};

await startGame();
