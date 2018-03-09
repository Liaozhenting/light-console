import React from 'react';
import InfoBox from './InfoBox'
import Bash from './bash'
import Styles from './styles'
const TAB_CHAR_CODE = 9;
const ENTER_CHAR_CODE = 13;
const UP_CHAR_CODE = 38;
const DOWN_CHAR_CODE = 40;
const noop = () => { };
class CommandsLine extends React.Component {
    constructor({ history, extensions = {} }) {
        super();
        let prefix = 'my'
        this.Bash = new Bash(extensions);
        this.state = {
            settings: { user: { username: `${prefix}@default` } },
            history: [],
            curentWorkingDirectory: '',
            cwd: '',
        };
    }

    static defaultProps = {
        prefix: 'my@default',
        extensions: {},
        history: [],
        onClose: noop,
        onExpand: noop,
        onMinimize: noop,
        structure: {},
        styles: {},
        theme: '',
    }

    onKeyDown(evt) {
        let keyCode = evt.keyCode || evt.which;
        if (keyCode === ENTER_CHAR_CODE) {
            const input = evt.target.value;
            const newState = this.Bash.execute(input, this.state);
            if(newState.__proto__.hasOwnProperty('then')){
                this.setState(newState);
                newState.then(res=>this.setState(res) )
            }else{
                this.setState(newState);
            }
            this.refs.textarea.value = '';
            evt.preventDefault();
        }
        else if(keyCode === TAB_CHAR_CODE){
            this.attemptAutocomplete()
            evt.preventDefault();
        }
        else if(keyCode === UP_CHAR_CODE){
            if(this.Bash.hasPrevCommand()){
                this.refs.textarea.value = this.Bash.getPrevCommand();
            } 
        }
        else if(keyCode === DOWN_CHAR_CODE){
            if(this.Bash.hasNextCommand()){
                this.refs.textarea.value = this.Bash.getNextCommand()
            } else {
                this.refs.textarea.value = '';
            }
        }

    }

    attemptAutocomplete (){
      const input = this.refs.textarea.value;
      const suggestion = this.Bash.autocomplete(input,this.state);
      if(suggestion){
        this.refs.textarea.value = suggestion;
      }
    }

    renderHistoryItem(style) {
        return (item, key) => {
            const prefix = item.hasOwnProperty('cwd') ? (
                <span style={style.prefix}>{`${this.props.prefix} ~${item.cwd}$ `}</span>
            ) : undefined;
            const time = <span style={style.time}>{item.time}</span>
            return <pre style={style.pre} data-id={`history-${key}`} key={key}>{time}{prefix}{item.value}</pre>
        }
    }

    render() {
        const { onClose, onExpand, onMinimize, prefix, styles, theme } = this.props;
        
        let { history } = this.state;
        const style = Object.assign({}, Styles[theme] || Styles.dark ,style)
        return <div>
            <InfoBox
                className="content"
                flipped={true}
                scrollLoadThreshold={50}>
                
                {history.map(this.renderHistoryItem(style))}
            </InfoBox>
            <div className="composition-area">
                <form onSubmit={() => { return false }}>
                    <textarea ref="textarea" onKeyDown={evt => this.onKeyDown(evt)} spellCheck={false}></textarea>
                </form>
            </div>
        </div>
    }
    
}
CommandsLine.Themes = {
    light: 'light',
    dark: 'dark'
}
export default CommandsLine;
