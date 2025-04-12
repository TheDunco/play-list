import { Playlist, Song } from "@play-list/types";
import { Queue } from "@play-list/api";
import { program } from "commander";
import chalk from "chalk";
import { v4 as uuid } from 'uuid';

const ONE_SECOND_MS = 1000;
const ONE_MINUTE_MS = ONE_SECOND_MS * 60;

const exampleSong1: Song = {
    _typename: 'song',
    id: uuid(),
    name: "S1: TestSong",
    artist: "Dunco",
    lengthMilliseconds: ONE_MINUTE_MS,
    year: 2025,
} as const;

const exampleSong2: Song = {
    _typename: 'song',
    id: uuid(),
    name: "S2: SongTest",
    artist: "Dunco",
    lengthMilliseconds: ONE_MINUTE_MS * 2,
    year: 2022
} as const;

const exampleSong3: Song = {
    _typename: 'song',
    id: uuid(),
    name: "S3: SingSong",
    artist: "Dunco",
    lengthMilliseconds: ONE_MINUTE_MS * 3,
    year: 2023
} as const;


const examplePlaylist: Playlist = {
    _typename: 'playlist',
    id: uuid(),
    name: "P3: Thirdlist",
    songs: [
        exampleSong1,
        exampleSong2,
        exampleSong3
    ]
} as const;

const lineBreak = () => console.log("\n");
const divider = () => console.log(chalk.green("==============="));
const info = (...args: Parameters<typeof console.log>) => console.info(chalk.yellowBright(args));

const SHUFFLE_COUNT = 3

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

await program.action(async () => {
    const queue = new Queue([exampleSong1]);
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

    info("Enqueuing a couple more songs...");
    queue.enqueueSong(exampleSong2);
    queue.enqueueSong(exampleSong3);
    logQ();

    nextSong();

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

    nextSong();

}).parseAsync();
