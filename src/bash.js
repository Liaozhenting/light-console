import * as BashParse from './parser';
import * as BaseCommands from './commands'
import Date from './date'

export default class Bash {
    constructor(extensions = {}) {
        this.commands = Object.assign(extensions, BaseCommands);
        this.prevCommands = [];
        this.prevCommandsIndex = 0;
    }

    execute(input, currentState) {
        this.prevCommands.push(input);
        this.prevCommandsIndex = this.prevCommands.length;
        //Append input to history
        
        const time = new Date().format('hh:mm:ss')
        // let history = currentState.history
        // history.unshift({
        //     cwd: currentState.cwd,
        //     value: input,
        //     time
        // })
        const newState = Object.assign({}, currentState, {
            history:currentState.history.concat({
                cwd: currentState.cwd,
                value: input,
                time
            }),
        })

        const commandList = BashParse.parse(input)
        return this.runCommands(commandList, newState)
    }

    runCommands(commands, state) {
        let errorOccurred = false;
        const reducer = (newState, command) => {
            if (command.name === '') {
                return newState
            } else if (this.commands[command.name]) {
                newState = this.commands[command.name].exec(newState,command)
                return newState;
            } else {
                //error
                errorOccurred = true;
                return newState
            }
        }
        while (!errorOccurred && commands.length) {
            const dependentCommands = commands.shift();
            state = dependentCommands.reduce(reducer, state)
        }
        return state
    }


}