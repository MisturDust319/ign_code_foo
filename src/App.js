import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import { Container } from 'reactstrap';
import { RoadPanel } from './components/RoadPanel.js';
import { FeedPanel } from './components/FeedPanel.js';


class App extends Component {
    constructor() {
        super();
        this.state = {
            panelSelect : "",
        };
    }
    
    render() {
        return (<Container>
            <FeedPanel />
        </Container>);
    }
}

export default App;
