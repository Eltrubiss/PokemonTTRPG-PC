export function randomChoice(array) {

    if (!array.length)
        return null;

    return array[
        Math.floor( Math.random() * array.length )
    ];
}