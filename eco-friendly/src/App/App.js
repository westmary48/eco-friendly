import React, { Component } from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <button className='btn btn-danger'>HELP ME</button>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Button
    tag="a"
    color="success"
    size="large"
    href="http://reactstrap.github.io"
    target="_blank"
>
    View Reactstrap Docs
</Button>
        </header>
      </div>
    );
  }
}

export default App;
