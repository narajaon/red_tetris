import React, { Component } from 'react';
import Tile from '../components/Tile';

class Grid extends Component {
	render() {
		const gridBuffer = [];
		const style = {
			display: 'grid',
			"gridTemplateColumns": "repeat(10, min-content)",
			"gridGap": "2px",
		};

		for (let i = 0; i < 200; i++) {
			gridBuffer.push(i);
		}

		return (
			<div className="grid" style={ style }>
				{ gridBuffer.map((any, index) => <Tile key={ index }/>) }
			</div>
		);
	}
}

export default Grid;
