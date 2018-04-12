import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Button } from 'reactstrap';

function Tile(props) {
    return (
        <td>
            <Button onClick={props.onClick} id={props.id} >
                {props.value}
            </Button>
        </td>
    )
}

export { Tile };