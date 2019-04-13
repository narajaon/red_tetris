import React from 'react';
import PropTypes from 'prop-types';

const Tile = ({ index, isFull = 0 }) => {
	const style = {
		height: '40px',
		width: '40px',
		border: '1px solid grey',
	};

	return (
		<div style={style}>{ index }</div>
	);
};

Tile.propTypes = {
	index: PropTypes.number,
	isFull: PropTypes.number,
};

export default Tile;
