import { Playlist, type QueueType, type Song } from "@play-list/types";
import { deepEqualSong, shuffleArray } from "./utils";

export class Queue {
    private _q: QueueType = [];
    private _currentSong: Song;
    private _repeat = false;
    private _currentFlatIndex = 0;

    constructor(q: QueueType) {
        this._q = q;
        const first = q?.[0];
        this._currentSong = first._typename === 'song' ? first : first && first._typename === 'playlist' ? first.songs[0] : first;
    }

    private _flatten(): Array<Song> {
        const flat: Array<Song> = [];
        this._q.forEach((current) => {
            if (current._typename === 'song') {
                flat.push(current)
            } else if (current._typename === 'playlist') {
                flat.push(...current.songs);
            }
        });
        return flat;
    }

    public countSongs(): number {
        return this._flatten().length;
    }

    public isOnLastSong(): boolean {
        return this._currentFlatIndex === this.countSongs() - 1;
    }

    public print() {
        console.log("Total Songs:", this.countSongs());
        console.log("Current Song:", this._currentSong);
        console.log("Repeat: ", this._repeat);
        console.log("Q: ", JSON.stringify(this._q, null, 2));
    }

    public nextSong() {
        const flattened = this._flatten();
        //console.log('flattened', flattened.reduce((acc, s) => { acc.push(s.name); return acc; }, [] as string[]));
        const numSongs = flattened.length;

        if (this._currentFlatIndex + 1 >= numSongs - 1) {
            // We've reached the end of the queue
            if (this._repeat) {
                this.toTop();
            } else {
                this._currentFlatIndex = numSongs - 1;
                this._currentSong = flattened[this._currentFlatIndex];
            }
        } else {
            this._currentFlatIndex += 1;
            this._currentSong = flattened[this._currentFlatIndex];
        }
    }

    public get() {
        return this._q;
    }

    public setRepeat(repeat: boolean) {
        this._repeat = repeat;
    }

    public getRepeat(): boolean {
        return this._repeat;
    }

    public getCurrentSong(): Song {
        return this._currentSong;
    }

    public toTop() {
        const flat = this._flatten();
        this._currentSong = flat?.[0];
        this._currentFlatIndex = 0;
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
            this.toTop();
        }
    }

    public flatDeepShuffle() {
        const flattened = this._flatten();
        shuffleArray(flattened);
        this._q = flattened
    }

    public deepShuffle() {
        // First, shuffle the songs and playlists
        shuffleArray(this._q);
        // Then, shuffle each playlist in the queue
        this._q.forEach((enqueued) => {
            if (enqueued._typename === 'playlist') {
                shuffleArray(enqueued.songs)
            }
        })
    }

    public clear() {
        this._q = [];
    }
}
