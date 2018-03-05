export function parseInput(input) {
    return [{input}]
}

export function parse(inputs) {
    return inputs.trim().split(/ *&& */).map(parseInput)
}