# play-list

An API to manage playlists and queues in specific and detailed ways. 

I want to be able to do things like 
  - add a shuffled playlist to the end of the queue
  - reshuffle the queue
    - keeping playlists intact
    - deep shuffling playlists and their position
  - reorder playlists within the queue
  - convert the current queue to a playlist
  - saved queues
  - multiple queues
  - repeating queues
  - add two playlists to queue interleaved
  - shuffle queue on repeat

These features aren't normally available in music players and I want them to be.

## Dev vision

PNPM workspace with structure

- workspace
  - packages
    - api
    - types
  - apps
    - cli
    - server
    - web
