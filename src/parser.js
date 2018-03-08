export function parseInput(input) {
    let name = input
    return {value:input,name}
}

export function parse(inputs) {
    return inputs.trim().split('&&')
        .map(deps => deps.split(";").map(parseInput))
}