import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from './logo.svg';
import './App.css';

import { Button } from 'reactstrap';
import { RoadPanel } from './components/RoadPanel.js';

class App extends Component {
    constructor() {
        super();
        this.state = {
            panelSelect : "",
        };
    }
    
    render() {
        return (<div>
            <RoadPanel />
        </div>);
    }
}

export default App;
