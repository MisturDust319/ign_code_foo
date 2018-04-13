import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { MoveHistory } from './MoveHistory.js';
import { Road } from './Road.js';

import { Row } from 'reactstrap';
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
            validMove: 0,
        }

        // these ensure these functions will still have access
        // to this object's state when passed to child components
        this.toggleTile = this.toggleTile.bind(this);
        this.storeMove = this.storeMove.bind(this);
        this.popMove = this.popMove.bind(this);
        this.peekMove = this.peekMove.bind(this);
        this.checkMove = this.checkMove.bind(this);
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
        return this.state.moveHistory.pop();
    }

    // peek at the last move
    peekMove = () => {
        return this.state.moveHistory[this.state.moveHistory.length - 1];
    }

    checkMove = (startX, startY) => {
        // reset history
        this.state.moveHistory = [];
        this.state.goodPaths = [];

        this.storeMove(startX, startY);
        // store start position

        //check if start postion is pot hole,
        // if yes, return 0
        if (this.state.tiles.getValue(startX, startY) == "X") {
            return 0;
        }

        var validMoves = 0;
        // sum of valid moves
        var nextMove = [{ x: startX, y: startY }];
        // an array to store the next move

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
                // backtracking: retrieve prev move
                // let prevPos = this.popMove();
                // //break if no previous position
                // if (!prevPos) {
                //     break;
                // }
                // nextMove.push({ x: prevPos.x, y: prevPos.y });
            }
            // if you have reached the right side, you've found a
            //  valid solution
            else if (i === (this.state.tiles.width - 1)) {
                //increment valid move count
                validMoves++;

                // store this move in history
                this.storeMove(i, j);
                // store the current move list in goodPaths
                this.state.goodPaths.push(this.state.moveHistory);

                // backtracking: retrieve prev move
                let prevPos = this.popMove();
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
                let yDiff = j - this.peekMove().y;
                
                //alert("y: " + j + " last y : " + this.peekMove().y + " ydiff " + yDiff);

                //store the current position in history
                this.storeMove(i, j);

                // goal is not to move backwards without
                //  properly backtracking
                // last move was down, don't go back up
                // also don't go up if it's clearly not in bounds
                if (yDiff !== 1 && (j > 0 )) {
                    nextMove.push({ x: i, y: (j - 1) });
                }
                // no special rules for moving right
                nextMove.push({ x: i + 1, y: j });
                // last move was up, don't go back down
                // also don't try clearly out of bounds values
                if (yDiff !== -1 && (j < this.state.tiles.height - 1)) {
                    nextMove.push({ x: i, y: (j + 1) });
                }
            }
        }

        return validMoves;
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
                    <Button onClick={() => {
                        // run check move
                        var moves = this.checkMove(0, 0);
                        // reset the state
                        this.setState({
                            moveHistory: this.state.moveHistory,
                            goodPaths: this.state.goodPaths,
                            validMoves: moves,
                        });
                        alert("Moves: " + moves);
                    }}>Check Solutions</Button>
                </Row>
            </div>
                );
    }

}

export {RoadPanel};