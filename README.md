# play-list

An API to manage playlists and queues in specific and detailed ways. 

I want to be able to do things like 
  - add a shuffled playlist to the end of the queue
  - add two playlists to queue with their songs interleaved
  - reorder playlists within the queue
  - convert the current queue to a playlist
  - flatten the playlists in the queue
  - shuffle the queue
    - keeping playlists intact
    - deep shuffling playlists and their position
  - saved queues
  - multiple queues
  - repeating queues
    - infinite repeat
    - finite repeat
    - shuffle queue on repeat

These features aren't normally available in music players and I want them to be.

## Vision

I want to provide a standardized API and classes for interacting with playlists/queues/songs.

Eventually it'd be cool to be able to add songs from different services as well and have them play in their respective players (e.g. one playlist from Spotiy, one from YouTube Music).

## Workspace Structure

- workspace
  - packages
    - api
    - types
  - apps
    - cli
    - server
    - web
