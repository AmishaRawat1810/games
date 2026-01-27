Deno.stdin.setRaw(true, { cbreak: true });
const target = "hello world";
const info = {
  errorHits: 0,
  index: 0,
  prevInputState: true,
  seconds: 0,
  totalKeystrokes: target.length,
};

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

const format = (key) => {
  const isCorrect = key === target[info.index];
  const isBackSpace = key === "\x7f";
  let color = 32;

  if (isBackSpace) {
    info.index -= info.index - 1 >= 0 ? 1 : 0;
    errorHits += prevInputState ? 0 : 1;
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

const transformInput = new TransformStream({
  transform(key, controller) {
    const letter = format(key);
    controller.enqueue(letter);
    if (info.index === target.length) {
      clearInterval(id);
      controller.terminate();
    }
  },
});

console.log(target);
const id = setInterval(() => {
  info.seconds += 1;
}, 1);

await Deno.stdin.readable
  .pipeThrough(new TextDecoderStream())
  .pipeThrough(transformInput)
  .pipeThrough(new TextEncoderStream())
  .pipeTo(Deno.stdout.writable, { preventClose: true });

typingSpeedStats(info);
