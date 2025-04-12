import { InferInput, literal, object, string } from "valibot";
import { minLengthString, minValueNumber } from "./utils";

export const songSchema = object({
    _typename: literal('song'),
    id: string(),
    name: minLengthString,
    artist: minLengthString,
    year: minValueNumber,
    lengthMilliseconds: minValueNumber
})

export type Song = InferInput<typeof songSchema>;
