import { Playlist, type QueueType, type Song } from "@play-list/types";

/* 
 * Randomize array in-place using Durstenfeld shuffle algorithm 
 * Credit: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array  
*/
const shuffleArray = <T>(array: Array<T>) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export class Queue {
    private _q: QueueType = [];
    private _currentSong: Song;
    private _repeat = false;

    private _flatten(): Array<Song> {
        const flat: Array<Song> = [];
        for (let i = 0; i < this._q.length; i++) {
            const current = this._q?.[i];
            if (!current) {
                console.error('current was undefined', current);
                return flat;
            }
            if (current._typename === 'song') {
                flat.push(current)
                continue;
            }
            if (current._typename === 'playlist') {
                flat.push(...current.songs);
            }
        }
        return flat;
    }

    public countSongs(): number {
        return this._flatten().length;
    }

    public print() {
        console.log("Total Songs:", this.countSongs());
        console.log("Current Song:", this._currentSong);
        console.log("Q: ", JSON.stringify(this._q, null, 2));
    }

    public nextSong() {
        const flattened = this._flatten();
        // TODO: Switch to some sort of deep equal for songs
        const currentSongIndex = flattened.findIndex((song) => song === this._currentSong);
        const numSongs = flattened.length;
        if (currentSongIndex + 1 >= numSongs - 1) {
            if (this._repeat) {
                this._currentSong = flattened[0];
                return;
            }
            this._currentSong = flattened[numSongs - 1];
        }
        this._currentSong = flattened[currentSongIndex + 1];

    }

    public get() {
        return this._q;
    }

    public setRepeat(repeat: boolean) {
        this._repeat = repeat;
    }

    public getCurrentSong(): Song {
        return this._currentSong;
    }

    public enqueueSong(song: Song) {
        this._q.push(song);
        if (!this._currentSong) {
            this._currentSong = song;
        }
    }

    public enqueuePlaylist(playlist: Playlist) {
        this._q.push(playlist);
        if (!this._currentSong) {
            this._currentSong = playlist.songs[0];
        }
    }

    public duplicate(times: number = 1) {
        for (let _i = 0; _i < times; _i++) {
            this._q.push(...this._q)
        }
    }

    public shuffle(restart = false) {
        shuffleArray(this._q);
        if (restart) {
            const first = this._q[0];
            if (first._typename === 'song') {
                this._currentSong = first;
                return;
            }
            if (first._typename === 'playlist') {
                this._currentSong = first.songs[0];
                return;
            }

        }
    }

    public deepShuffle() {
        console.warn("DEEP SHUFFLING CURRENTLY BLITZES OUT ALL PLAYLIST INFORMATION")
        const flattened = this._flatten();
        shuffleArray(flattened);
        this._q = flattened;
    }
}
