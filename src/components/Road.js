import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';

import { Tile } from './tile.js';



function Road(props) {
    let renderTile = (i) => {
        return (
            <Tile value={props.value[i]} />
        )
    }
    return (
        <Table>
            <tr>
                {renderTile(0)}
                {renderTile(2)}
                {renderTile(3)}
                {renderTile(4)}
            </tr>
            <tr>
                {renderTile(5)}
                {renderTile(6)}
                {renderTile(7)}
                {renderTile(8)}
            </tr>
            <tr>
                {renderTile(9)}
                {renderTile(10)}
                {renderTile(11)}
                {renderTile(12)}
            </tr>
            <tr>
                {renderTile(13)}
                {renderTile(14)}
                {renderTile(15)}
                {renderTile(16)}
            </tr>
        </Table>
    )
}

export { Road };