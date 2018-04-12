import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Tile(props) {
    return (
        <td>
            <button onClick={props.onClick} id={props.id} >
                {props.value}
            </button>
        </td>
    )
}

export { Tile };