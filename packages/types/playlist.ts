import { array, InferInput, literal, object } from "valibot";
import { minLengthString } from "./utils";
import { songSchema } from "./song";

export const playlistSchema = object({
    _typename: literal('playlist'),
    id: minLengthString,
    name: minLengthString,
    songs: array(songSchema)
})

export type Playlist = InferInput<typeof playlistSchema>;
