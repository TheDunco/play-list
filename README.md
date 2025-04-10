# play-list

An API to manage playlists and queues in specific and detailed ways. 

I want to be able to do things like 
  - adding a shuffled playlist to the end of the queue
  - reshuffle the queue
  - reorder playlists within the queue (shuffled or otherwise)
  - convert the current queue to a playlist
  - multiple queues
  - and two playlists to queue interleaved

These features aren't normally available in music players and I want them to be.

## Dev vision

PNPM workspace with structure

- workspace
  - packages
    - api
    - types
  - apps
    - cli
    - web
