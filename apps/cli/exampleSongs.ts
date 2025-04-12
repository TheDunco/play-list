import { Playlist, Song } from "@play-list/types";
import { v4 as uuid } from 'uuid';
import { ONE_MINUTE_MS } from "./utils";

const QUICKNESS = 10;

export const exampleSong1: Song = {
    _typename: 'song',
    id: uuid(),
    name: "S1: TestSong",
    artist: "Dunco",
    lengthMilliseconds: ONE_MINUTE_MS / QUICKNESS,
    year: 2025,
} as const;

export const exampleSong2: Song = {
    _typename: 'song',
    id: uuid(),
    name: "S2: SongTest",
    artist: "Dunco",
    lengthMilliseconds: ONE_MINUTE_MS / QUICKNESS,
    year: 2022
} as const;

export const exampleSong3: Song = {
    _typename: 'song',
    id: uuid(),
    name: "S3: SingSong",
    artist: "Dunco",
    lengthMilliseconds: ONE_MINUTE_MS / QUICKNESS,
    year: 2023
} as const;


export const examplePlaylist: Playlist = {
    _typename: 'playlist',
    id: uuid(),
    name: "P3: Thirdlist",
    songs: [
        exampleSong1,
        exampleSong2,
        exampleSong3
    ]
} as const;
