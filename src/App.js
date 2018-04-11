import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import logo from './logo.svg';
import './App.css';

import { Button } from 'reactstrap';
import { Road } from './components/Road.js';

class App extends Component {
    constructor() {
        super();

        this.state = {
            tiles: Array(16).fill("O")
        }
    }

  render() {
    return (
        <Road value={this.state.tiles}></Road>
    );
  }

    toggleTile(i) {
        this.state.tiles[i] = !this.state.tiles[i];

        this.setState({
            tiles: this.state.tiles
        });
    }
}

export default App;
