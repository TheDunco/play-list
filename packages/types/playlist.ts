import { Song } from "./song";

export interface Playlist {
    _typename: 'playlist';
    id: string;
    name: string;
    songs: Array<Song>;
};
