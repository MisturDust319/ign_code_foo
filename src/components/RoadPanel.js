import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Road } from './Road.js'

import { Row } from 'reactstrap';
import { Jumbotron } from 'reactstrap';
import { Grid } from './HelperClasses/Grid.js';

class RoadPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tiles: new Grid()
        }

        this.toggleTile = this.toggleTile.bind(this);
    }

    toggleTile = (event) => {
        var cursor = event.target.id.split(",");
        alert(cursor);
        var i = cursor[0];
        var j = cursor[1];
        alert(this.state.tiles.getValue(i, j));
        var curChar = this.state.tiles.getValue(i, j);

        if (curChar === "O") {
            this.state.tiles.setValue(i, j, "X");
        }
        else {
            this.state.tiles.setValue(i, j, "O");
        }

        this.setState({
            tiles: this.state.tiles
        });
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h1>The Chicken Crossing the Road</h1>
                </Jumbotron>
                <Row>
                    <Road value={this.state.tiles} onClick={this.toggleTile}></Road>
                </Row>
            </div>
        );
    }

}

export { RoadPanel };