import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { MoveHistory } from './MoveHistory.js';
import { Road } from './Road.js';

import { Row } from 'reactstrap';
import { Col } from 'reactstrap';
import { Input } from 'reactstrap';
import { Button } from 'reactstrap';

import { Grid } from './HelperClasses/Grid.js';
import { Label } from 'reactstrap/dist/reactstrap.es';

class RoadPanel extends React.Component {
    constructor(props) {
        super(props);

        let tileGrid = new Grid();
        tileGrid.setValue(0, 1, "X");
        tileGrid.setValue(1, 3, "X");
        tileGrid.setValue(2, 2, "X");
        tileGrid.setValue(3, 3, "X");

        this.state = {
            tiles: tileGrid,
            moveHistory: Array(0),
            goodPaths: Array(0),
            validMoveCount: 0,
            startingY: 3
        }

        // these ensure these functions will still have access
        // to this object's state when passed to child components
        this.toggleTile = this.toggleTile.bind(this);
        this.checkMove = this.checkMove.bind(this);
        this.changeStartingY = this.changeStartingY.bind(this);
    }

    changeStartingY = (event) => {
        let newY = parseInt(event.target.value);
        if (newY < 0 || newY > 3) {
            newY = 3;
        }
        this.setState({
            startingY: newY
        });
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

        // holds the current direction of travel
        var direction = ""; // initially not set
        var getDirection = (j) => {
            // find the direction of last move
            // if yDiff = 0, it was right
            // -1, down, 1 up
            // make sure not to go backwards
            
            let yDiff = j - peekHist().y;
            
            if(yDiff == -1) {
                return "down";
            }
            else if(yDiff == 0) {
                return "right";
            }
            else if(yDiff == 1) {
                return "up";
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
        //helper function to store move
        var storeNextMove = (newX, newY) => {
            nextMove.push({
                x: newX,
                y: newY
            });
        }

        var hist = [];
        // array to store history
        // helper method to store and view history
        var storeHist = (newX, newY) => {
            hist.push({ x: newX, y: newY });
        }
        var peekHist = () => {
            if (hist.length) {
                return hist[hist.length - 1];
            }
            else {
                return { x: startX, y : startY }; // if nothing is in hist,
                // just return the start y val
            }
        }

        // move map is an object used to help make sure we aren't going
        // back to the same places over and over
        var moveMap = {};
        // addToMoveMap(x, y) is used to quickly add something to move map
        var addToMoveMap = (x, y) => {
            let coordinate = "(" + x + ", " + y + ")";

            if(!(coordinate in moveMap)) {
                moveMap[coordinate] = {
                    startDir : {
                        "up" : {
                            canMoveUp : true,
                            canMoveRight : true,
                            canMoveDown : false,
                        },
                        "right" : {
                            canMoveUp : true,
                            canMoveRight : true,
                            canMoveDown : true,
                        },
                        "down" : {
                            canMoveUp : false,
                            canMoveRight : true,
                            canMoveDown : true,
                        }
                    }
                }
            }
        }
        var checkMoveMap = (x, y, dir) => {
            let coordinate = "(" + x + ", " + y + ")";

            return moveMap[coordinate].startDir[dir];
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
                let mov = hist.pop();
                storeNextMove(mov.x, mov.y);
            }
            // if you have reached the right side, you've found a
            //  valid solution
            else if (i === (limits.x.upper)) {
                //increment valid move count
                validMoves++;

                // store this move in history
                storeHist(i, j);
                // store a copy of the move list in goodPaths
                validPaths.push(hist.slice(0));

                // backtracking: retrieve prev move
                // reset next move
                nextMove = [];

                // get previous coordinate
                // do it twice to get out of the goal zone
                let prevPrevPos = hist.pop();
                let prevPos = hist.pop();

                // get the direction of the previous step
                direction = getDirection(prevPos.y);

                let canMoveUp = checkMoveMap(prevPos.x, prevPos.y, direction).canMoveUp;
                let canMoveRight = checkMoveMap(prevPos.x, prevPos.y, direction).canMoveRight;
                let canMoveDown = checkMoveMap(prevPos.x, prevPos.y, direction).canMoveDown;

                // keep popping until you backtrack to a coordinate that
                // hasn't had all next routes exhausted
                while(!(
                    canMoveUp
                    || canMoveRight
                    || canMoveDown
                ) && hist.length > 0) {
                    // keep track of two prev moves
                    prevPrevPos = prevPos;
                    prevPos = hist.pop();

                    direction = getDirection(prevPos.y);
    
                    canMoveUp = checkMoveMap(prevPos.x, prevPos.y, direction).canMoveUp;
                    canMoveRight = checkMoveMap(prevPos.x, prevPos.y, direction).canMoveRight;
                    canMoveDown = checkMoveMap(prevPos.x, prevPos.y, direction).canMoveDown;
                }
                
                // put prev move back in move queue
                storeNextMove(prevPos.x, prevPos.y);
            }
            // if on a normal tile, plan next move
            else if (currentValue === "O") {
                // find the dirrection we traveled getting here
                direction = getDirection(j);

                //store the current position in history
                storeHist(i, j);
                // store position in move map
                addToMoveMap(i, j);

                // cue up next moves
                //for convenience, get the current rules of progression
                var movMap = checkMoveMap(i, j, direction);
                
                // if you just went up, then you can't go back down,
                // only right or up more
                if(direction == "up") {
                    // only move up if it won't exceed bounds
                    // AND if you can go that way
                    if(((j+1) <= limits.y.upper)
                    && (movMap.canMoveUp)) {
                        // turn off canMoveUp for this spot & direction
                        movMap.canMoveUp = false;
                        storeNextMove(i, j+1);
                    } 
                    // you can only go right if that is allowed for this space
                    else if(movMap.canMoveRight) {
                        // turn off canMoveRight for this spot & direction
                        movMap.canMoveRight = false;
                        storeNextMove(i+1, j);
                    }
                }
                // if you just went down, you can't go up,
                // only down more or right
                else if(direction == "down") {
                    // only move down if it won't exceed bounds
                    // AND if you can go that way
                    if(((j-1) >= limits.y.lower)
                    && (movMap.canMoveDown)) {
                        // turn off canMoveUp for this spot & direction
                        movMap.canMoveDown = false;
                        storeNextMove(i, j-1);
                    } 
                    // you can only go right if that is allowed for this space
                    else if(movMap.canMoveRight) {
                        // turn off canMoveRight for this spot & direction
                        movMap.canMoveRight = false;
                        storeNextMove(i+1, j);
                    }
                }
                // if you moved right, you can move up, down, or right 
                else if(direction == "right") {
                    // only move up if it won't exceed bounds
                    // AND if you can go that way
                    if(((j+1) <= limits.y.upper)
                    && (movMap.canMoveUp)) {
                        // turn off canMoveUp for this spot & direction
                        movMap.canMoveUp = false;
                        storeNextMove(i, j+1);
                    } 
                    // only move down if it won't exceed bounds
                    // AND if you can go that way
                    else if(((j-1) >= limits.y.lower)
                    && (movMap.canMoveDown)) {
                        // turn off canMoveUp for this spot & direction
                        movMap.canMoveDown = false;
                        storeNextMove(i, j-1);
                    } 
                    // you can only go right if that is allowed for this space
                    else if(movMap.canMoveRight) {
                        // turn off canMoveRight for this spot & direction
                        movMap.canMoveRight = false;
                        storeNextMove(i+1, j);
                    }
                }
                // if no new moves were found, try backtracking
                if(nextMove.length == 0) {
                    // this only works if there's enough data in the history
                    if(hist.length > 1) {
                        // pop twice, otherwise it gets stuck in loop
                        hist.pop();
                        let mov = hist.pop();
                        storeNextMove(mov.x, mov.y);
                    }
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
                <Row>
                    <Col xs="6">
                        <Road value={this.state.tiles} onClick={this.toggleTile}></Road>
                    </Col>
                    <Col xs="6">
                        <Row>
                            <Col xs="3">
                                <Label>Starting Y Position: </Label>
                            </Col>
                            <Col xs="3">
                                <Input type="text" onChange={this.changeStartingY} />
                            </Col>
                            <Col xs="6">
                                <Button onClick={() => {
                                    this.checkMove(0, this.state.startingY);
                                    alert("Number of moves starting at Y: " + this.state.startingY);
                                }}>Check Solutions</Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs="12">
                                Number of Valid Moves: {this.state.validMoveCount}
                            </Col>
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