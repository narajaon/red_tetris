import React from 'react';
import PropTypes from 'prop-types';

const Tile = ({ isFull }) => {
	const style = {
		height: '40px',
		width: '40px',
		border: '1px solid grey',
		backgroundColor: isFull ? 'red' : 'white',
	};

	return (
		<div className="tile" style={style}></div>
	);
};

Tile.propTypes = {
	index: PropTypes.number,
	isFull: PropTypes.number,
};

export default Tile;
