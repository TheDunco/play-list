
// https://stackoverflow.com/questions/17309749/node-js-console-log-is-it-possible-to-update-a-line-rather-than-crrate-a-new-l
const writeOver = (buffer: string | Uint8Array) => {
    process.stdout.clearLine(0);
    process.stdout.cursorTo(0);
    process.stdout.write(buffer);
};

export const printProgress = (current: number, total: number, prefix = "Progress:") => {
    writeOver(`${prefix} ${current}/${total} (${Math.round((current / (total > 0 ? total : 1)) * 100)}%)`);
};
