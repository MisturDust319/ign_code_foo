import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { MoveHistory } from './MoveHistory.js';
import { Road } from './Road.js';

import { Row } from 'reactstrap';
import { Col } from 'reactstrap';
import { Button } from 'reactstrap';
import { Jumbotron } from 'reactstrap';

import { Grid } from './HelperClasses/Grid.js';

class RoadPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tiles: new Grid(),
            moveHistory: Array(0),
            goodPaths: Array(0),
            validMoveCount: 0,
        }

        // these ensure these functions will still have access
        // to this object's state when passed to child components
        this.toggleTile = this.toggleTile.bind(this);
        this.checkMove = this.checkMove.bind(this);
    }

    checkMove = (startX, startY) => {
        // reset history
        this.state.moveHistory = [];
        this.state.goodPaths = [];

        // get limits of panel grid
        var limits = {
            x : {
                upper : (this.state.tiles.width - 1),
                lower : 0
            },
            y : {
                upper : (this.state.tiles.height - 1),
                lower : 0
            }
        }

        //check if start postion is pot hole,
        // if yes, return 0
        if (this.state.tiles.getValue(startX, startY) == "X") {
            return 0;
        }

        var validMoves = 0;
        // sum of valid moves
        var nextMove = [{ x: startX, y: startY }];
        // an array to store the next move
        var hist = [{ x: startX, y: startY }];
        // array to store history
        // helper method to store and view history
        var storeHist = (newX, newY) => {
            hist.push({ x: newX, y: newY });
        }
        var peekHist = () => {
            return hist[hist.length - 1];
        }
        var validPaths = [];
        // stores valid paths

        // if len of move history is 0,
        // then you've exhausted all moves
        while (nextMove.length > 0) {
            // retrieve the next move
            let move = nextMove.pop();
            var i = move.x;
            var j = move.y;
            
            //alert(nextMove.length);
            //alert("x: " + i + " y: " + j);
            //if there is a roadblock,
            // or out of bounds, backtrack
            var currentValue = this.state.tiles.getValue(i, j);
            if (currentValue === "X" || currentValue === -1) {
                continue;
            }
            // if you have reached the right side, you've found a
            //  valid solution
            else if (i === (limits.x.upper)) {
                //increment valid move count
                validMoves++;

                // store this move in history
                storeHist(i, j);
                // store the current move list in goodPaths
                validPaths.push(hist);

                // backtracking: retrieve prev move
                let prevPos = hist.pop();
                //break if no previous position
                if (!prevPos) {
                    break;
                }
            }
            else {
                // find the direction of last move
                // if yDiff = 0, it was right
                // 1, down, -1 up
                // make sure not to go backwards
                let yDiff = j - peekHist().y;
                

                //store the current position in history
                storeHist(i, j);

                // goal is not to move backwards without
                //  properly backtracking
                // last move was down, don't go back up
                // also don't go up if it's clearly not in bounds
                if (yDiff !== 1 && (j > limits.y.lower )) {
                    nextMove.push({ x: i, y: (j - 1) });
                }
                // no special rules for moving right
                nextMove.push({ x: i + 1, y: j });
                // last move was up, don't go back down
                // also don't try clearly out of bounds values
                if (yDiff !== -1 && (j < limits.y.upper)) {
                    nextMove.push({ x: i, y: (j + 1) });
                }
            }
        }

        // properly store the various values

        this.setState({
            moveHistory: hist,
            goodPaths: validPaths,
            validMoveCount: validMoves,
        });
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
                    <Col xs="6">
                        <Road value={this.state.tiles} onClick={this.toggleTile}></Road>
                    </Col>
                    <Col xs="6">
                        <Row>
                            <Button onClick={() => {
                                this.checkMove(0, 0);
                            }}>Check Solutions</Button>
                        </Row>
                        <Row>
                            Number of Valid Moves: {this.state.validMoveCount}
                        </Row>
                        <Row>
                            <MoveHistory value={this.state.goodPaths}/>
                        </Row>
                    </Col>
                </Row>
            </div>
                );
    }

}

export {RoadPanel};