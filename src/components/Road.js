import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';

import { Tile } from './tile.js';

function Road(props) {
    return (
        <Table>
            <tr>
                <Tile value="O"></Tile>
                <Tile value="O"></Tile>
                <Tile value="O"></Tile>
                <Tile value="O"></Tile>
            </tr>
            <tr>
                <Tile value="O"></Tile>
                <Tile value="O"></Tile>
                <Tile value="O"></Tile>
                <Tile value="O"></Tile>
            </tr>
            <tr>
                <Tile value="O"></Tile>
                <Tile value="O"></Tile>
                <Tile value="O"></Tile>
                <Tile value="O"></Tile>
            </tr>
            <tr>
                <Tile value="O"></Tile>
                <Tile value="O"></Tile>
                <Tile value="O"></Tile>
                <Tile value="O"></Tile>
            </tr>
        </Table>
    )
}

export { Road };