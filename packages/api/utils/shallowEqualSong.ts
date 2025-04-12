import { Song } from "@play-list/types";

export const shallowEqualSong = (songA: Song, songB: Song) => {
    return songA.id === songB.id;
}
