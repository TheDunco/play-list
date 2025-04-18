/* 
 * Randomize array in-place using Durstenfeld shuffle algorithm 
 * Credit: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array  
*/
export const shuffleArray = <T>(array: Array<T>) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

