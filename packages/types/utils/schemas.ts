import { minLength, minValue, number, pipe, string } from "valibot";

export const minLengthString = pipe(string(), minLength(1));
export const minValueNumber = pipe(number(), minValue(0));
