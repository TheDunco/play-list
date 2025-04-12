import { Song } from "@play-list/types";

export const deepEqualSong = (songA: Song, songB: Song) => {
    return songA.artist === songB.artist
        && songA.name === songB.name
        && songA.year === songB.year
        && songA.lengthMilliseconds === songB.lengthMilliseconds;
}
