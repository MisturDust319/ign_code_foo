import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Tile(props) {
    return (
        <td>{props.value}</td>
    )
}

export { Tile };