import { select, Separator } from "@inquirer/prompts";
import { startGame } from "./typer_logic.js";

const justifyCenter = (text) => {
  const textLength = text.length;
  const terminalWidth = 168;
  const leftPadding = Math.floor((terminalWidth - textLength) / 2);
  const centeredText = text.padStart(leftPadding + textLength, " ");
  return centeredText;
};

export const appUI = async () => {
  const answer = await select({
    message: justifyCenter("WELCOME TO TYPING MASTER"),
    choices: [
      {
        name: justifyCenter("Start"),
        value: "start",
        description: justifyCenter("Begin the typing master"),
      },
      {
        name: justifyCenter("Quit"),
        value: "quit",
        description: justifyCenter("quit the game"),
      },
      new Separator(),
      {
        name: justifyCenter("LeaderBoard"),
        value: "leaderboard",
        disabled: true,
      },
      {
        name: justifyCenter("Create Profile"),
        value: "profile",
        disabled: true,
      },
    ],
  });
  if (answer === "start") {
    console.clear();
    return await startGame();
  }

  Deno.exit(0);
};
