import React from 'react';
import ReactDOM from 'react-dom';
//import the libarary
import Component from '../'
import '../assets/index.css'
const  {CommandsLine} = Component;
class App extends React.Component {
  render() {
    return <div>
      <div className="header" />

      <CommandsLine></CommandsLine>
    </div>;
  }


}

ReactDOM.render(<App />, document.getElementById('root'));
