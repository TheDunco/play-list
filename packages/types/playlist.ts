import { Song } from "./song";

export interface Playlist {
    _typename: 'playlist';
    name: string;
    songs: Array<Song>;
};
