import React, { Component } from 'react';
import Tile from '../components/Tile';

class Grid extends Component {
	render() {
		const gridElem = [0, 1, 2, 3].map((any, index) => <Tile key={index}/>);
		return gridElem;
	}
}

export default Grid;
