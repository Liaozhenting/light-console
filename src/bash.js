import * as BashParse from './parser';
import * as BaseCommands from './commands'
import Date from './date'

export default class Bash {
    constructor(extensions = {}) {
        this.commands = Object.assign(extensions, BaseCommands);
        this.prevCommands = [];
        this.prevCommandsIndex = 0;
    }
    autocomplete(input){
      const tokens = input.split(/ +/);
      let token = tokens.pop();
      const filter = item => item.indexOf(token) === 0;
      const result = str => tokens.concat(str).join(' ');

      if (tokens.length === 0) {
          const suggestions = Object.keys(this.commands).filter(filter);
          return suggestions.length === 1 ? result(suggestions[0]) : null;
      } else {
          const pathList = token.split('/');
          token = pathList.pop();
          const partialPath = pathList.join('/');
          const path = Util.extractPath(partialPath, cwd);
          const { err, dir } = Util.getDirectoryByPath(structure, path);
          if (err) return null;
          const suggestions = Object.keys(dir).filter(filter);
          const prefix = partialPath ? `${partialPath}/` : '';
          return suggestions.length === 1 ? result(`${prefix}${suggestions[0]}`) : null;
      }
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