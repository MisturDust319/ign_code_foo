import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'reactstrap';

import { Tile } from './tile.js';



function Road(props) {
    let renderTile = (i, j) => {
        return (
            <Tile value={props.value.getValue(i, j)}
                onClick={props.onClick}
                id={i+","+j}
            />
        )
    }
    return (
        <Table>
            <tbody class="text-center">
                <tr>
                    {renderTile(0, 3)}
                    {renderTile(1, 3)}
                    {renderTile(2, 3)}
                    {renderTile(3, 3)}
                </tr>
                <tr>
                    {renderTile(0, 2)}
                    {renderTile(1, 2)}
                    {renderTile(2, 2)}
                    {renderTile(3, 2)}
                </tr>
                <tr>
                    {renderTile(0, 1)}
                    {renderTile(1, 1)}
                    {renderTile(2, 1)}
                    {renderTile(3, 1)}
                </tr>
                <tr>
                    {renderTile(0, 0)}
                    {renderTile(1, 0)}
                    {renderTile(2, 0)}
                    {renderTile(3, 0)}
                </tr>
            </tbody>
        </Table>
    )
}

export { Road };