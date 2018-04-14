import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { ListGroup } from 'reactstrap';
import { ListGroupItem } from 'reactstrap';

function MoveHistory(props) {

    function mapMoves() {
        // an id to be used as the move's key
        let id = 999;
        const ret = props.value.map((cur) => {
            id++; //increment id to keep unique

            var body = cur.map((move) => {
                return "(" + move.x + ", " + move.y + ") ";
            });

            return (
                <ListGroupItem key={id}>{body}</ListGroupItem>
            )
        });

        return ret;
    }

    return (
        <ListGroup>
            {mapMoves()}
        </ListGroup>
    )
}

export { MoveHistory };