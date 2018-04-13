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
            tiles: new Grid(),
            moveHistory: Array(0),
            goodPaths: Array(0),
        }

        this.toggleTile = this.toggleTile.bind(this);
    }

    // stores the current position in the history
    storeMove = (storeX, storeY) => {
        this.state.moveHistory.push({
            x: storeX,
            y: storeY
        })
    }

    // removes last move from history
    popMove = () => {
        this.state.moveHistory.pop();
    }

    // peek at the last move
    peekMove = () => {
        return this.state.moveHistory[this.state.moveHistory.length - 1];
    }

    checkMove = (x, y) => {
        // store the current move
        this.storeMove(x, y);

        // if you are out of array bound,
        //  move back a move
        if ((x >= this.state.tiles.width)
            || (y >= this.state.tiles.height)
            || (x < 0) || (y < 0)
        ) {
            this.popMove();
            return 0;
        }
        // if there is a roadblock, backtrack
        else if (this.state.tiles.getValue(x, y) == 'X') {
            this.popMove();
            return 0;
        }
        else if (x === (this.state.tiles.width - 1)) {
            //store the successfull path
            this.state.goodPaths.push(
                this.state.moveHistory
            );
            // remove the last move in prep for backtracking
            this.popMove();

            // return 1 for a successful path
            return 1;
        }
        // if there is nothing special, just try progressing
        // forward
        else {
            //here we recuresively seek all solutions
            // this is why we return zero for bad paths, and one for good
            //  here we make sure all the paths add up together to give
            //  the sum of the number of good paths

            // if the last move was down, don't go back up
            if ((y - this.peekMove.y) === 1) {
                return checkMove(x, y + 1) +
                    checkMove(x + 1, y);
            }
            // if the last move was up, don't go back down
            if ((y - this.peekMove.y) === 1) {
                return checkMove(x, y - 1) +
                    checkMove(x + 1, y);
            }
            else {
                alert("This was unexpected.");
            }
        }
    }

    // this toggles the tile from X to O and vice versa
    toggleTile = (event) => {
        var cursor = event.target.id.split(",");

        var i = cursor[0];
        var j = cursor[1];

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
                    <Button>
                </Row>
            </div>
        );
    }

}

export { RoadPanel };