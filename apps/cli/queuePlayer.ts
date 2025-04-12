import { Queue } from "@play-list/api";
import { printProgress, sleep } from "./utils";

export class QueuePlayer {
    _queue: Queue;
    _playing = true;
    _elapsedTime = 0;
    _progress = 0.0;

    constructor(queue: Queue) {
        this._queue = queue;
    }

    public async play() {
        this._playing = true;
        while (this._playing) {
            const currentSong = this._queue.getCurrentSong();
            this._elapsedTime = 0;
            console.log('\ncurrentSong', currentSong);
            while (this._elapsedTime < currentSong.lengthMilliseconds) {
                // Mock playing a song
                // TODO: Replace with actually playing the song somehow
                await sleep(1);
                this._elapsedTime += 1;
                this._progress = this._elapsedTime / currentSong.lengthMilliseconds;
                printProgress(this._elapsedTime, currentSong.lengthMilliseconds);
            }
            if (this._queue.isOnLastSong()) {
                this.pause();
            } else {
                this._queue.nextSong();
            }
        }
    }

    public pause() {
        this._playing = false;
    }
}

