import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './home';

export default class App extends React.Component {
  render(){
    return (
      <div id="app">
        <Router>
          <Route path="/" component={Home} />
        </Router>
      </div>
    );
  }
};

(module.hot) && module.hot.accept();
const applicationEntrypoint = document.getElementById("app-entrypoint");
applicationEntrypoint ? ReactDOM.render(<App />, applicationEntrypoint) : false;