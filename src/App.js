import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

import { Container } from 'reactstrap';
import { RoadPanel } from './components/RoadPanel.js';
import { FeedPanel } from './components/FeedPanel.js';
import { Button, ButtonGroup } from 'reactstrap/dist/reactstrap.es';


class App extends Component {
    constructor() {
        super();
        this.state = {
            view: "road",
        };
    }

    renderPanel = () => {
        if(this.state.view == "road") {
            return ( <RoadPanel />);
        } else if (this.state.view == "feed") {
            return ( <FeedPanel />);
        }
    }

    goToFeed = () => {
        this.setState({view: "feed"});
    }
    goToRoad = () => {
        this.setState({view: "road"});
    }
    
    render() {
        return (<Container>
            <ButtonGroup>
                <Button onClick={this.goToFeed}>Feed</Button>
                <Button onClick={this.goToRoad}>Road Problem</Button>
            </ButtonGroup>
            {this.renderPanel()}
        </Container>);
    }
}

export default App;
