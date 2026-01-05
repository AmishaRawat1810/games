export const getInput = () => {
    const move = Deno.readTextFileSync("./snake/input.txt").at(-1);
    console.log({ move });
    return move;
};
