import { Queue } from "@play-list/api";
import { program } from "commander";
import chalk from "chalk";
import { ONE_SECOND_MS, sleep } from "./utils";
import { examplePlaylist, exampleSong1, exampleSong2, exampleSong3, } from "./exampleSongs";
import { QueuePlayer } from "./queuePlayer";

const lineBreak = () => console.log("\n");
const divider = () => console.log(chalk.green("==============="));
const info = (...args: Parameters<typeof console.log>) => console.info(chalk.yellowBright(args));

const SHUFFLE_COUNT = 3

await program.action(async () => {
    const queue = new Queue([exampleSong1]);
    const logQ = () => {
        divider();
        queue.print();
        divider();
        lineBreak();
    };
    info("Initial queue")
    logQ();

    info("Enqueuing a couple more songs...");
    queue.enqueueSong(exampleSong2);
    queue.enqueueSong(exampleSong3);
    logQ();

    info("Shuffling queue...");
    for (let i = 1; i < SHUFFLE_COUNT + 1; i++) {
        info(i);
        queue.shuffle();
        logQ();
        await sleep(ONE_SECOND_MS);
    }

    info("Adding playlist to queue");
    queue.enqueuePlaylist(examplePlaylist);
    logQ();

    info("Shuffling queue with playlist...");
    for (let i = 1; i < SHUFFLE_COUNT + 1; i++) {
        info(i);
        queue.shuffle();
        logQ();
        await sleep(ONE_SECOND_MS);
    }

    info("Starting queue player from the top")
    queue.toTop();
    const player = new QueuePlayer(queue);
    player.play();

}).parseAsync();
