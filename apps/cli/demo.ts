import { Playlist, Song } from "@play-list/types";
import { Queue } from "@play-list/api";
import { program } from "commander";
import chalk from "chalk";

const ONE_SECOND_MS = 1000;
const ONE_MINUTE_MS = ONE_SECOND_MS * 60;

const exampleSong1: Song = {
    _typename: 'song',
    name: "S1: TestSong",
    artist: "Dunco",
    lengthMilliseconds: ONE_MINUTE_MS
};

const exampleSong2: Song = {
    _typename: 'song',
    name: "S2: SongTest",
    artist: "Dunco",
    lengthMilliseconds: ONE_MINUTE_MS * 2
};

const exampleSong3: Song = {
    _typename: 'song',
    name: "S3: SingSong",
    artist: "Dunco",
    lengthMilliseconds: ONE_MINUTE_MS * 3
};


const examplePlaylist: Playlist = {
    _typename: 'playlist',
    name: "P3: Thirdlist",
    songs: [
        exampleSong1,
        exampleSong2,
        exampleSong3
    ]
}

const lineBreak = () => console.log("\n");
const divider = () => console.log(chalk.green("==============="));
const info = (...args: Parameters<typeof console.log>) => console.info(chalk.yellowBright(args));

const SHUFFLE_COUNT = 3


function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

await program.action(async () => {
    const queue = new Queue();
    queue.enqueueSong(exampleSong1);
    const logQ = () => {
        divider();
        queue.print();
        divider();
        lineBreak();
    };
    const nextSong = () => {
        info("Next song");
        queue.nextSong()
        logQ();
    }
    info("Initial queue")
    logQ();

    await sleep(ONE_SECOND_MS);

    info("Enqueuing a couple more songs...");
    queue.enqueueSong(exampleSong2);
    queue.enqueueSong(exampleSong3);
    logQ();

    await sleep(ONE_SECOND_MS);

    nextSong();

    await sleep(ONE_SECOND_MS);

    info("Shuffling queue...");
    for (let i = 1; i < SHUFFLE_COUNT + 1; i++) {
        info(i);
        queue.shuffle();
        logQ();
        await sleep(ONE_SECOND_MS);
    }

    await sleep(ONE_SECOND_MS);

    info("Adding playlist to queue");
    queue.enqueuePlaylist(examplePlaylist);
    logQ();

    await sleep(ONE_SECOND_MS * 5);

    info("Shuffling queue with playlist...");
    for (let i = 1; i < SHUFFLE_COUNT + 1; i++) {
        info(i);
        queue.shuffle();
        logQ();
    }

    await sleep(ONE_SECOND_MS);

    nextSong();

}).parseAsync();
