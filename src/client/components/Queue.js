import React, { useState, useEffect } from 'react';
import { PropTypes } from 'prop-types';
import { queue as style } from '../style/tetris.module.css';

const Queue = ({ players, startGame }) => {
	const [contentRef, setRef] = useState(null);

	useEffect(() => {
		if (contentRef) {
			contentRef.focus();
		}
	});

	return (
		<div
			tabIndex="0"
			ref={ element => {
				setRef(element);
			}}
			onKeyDown={ startGame }
			data-jest="queue"
			className={ style }
		>
					<div className="inner-container">
			<div>Current players :<br></br> { players.length } / 4</div>
			<div>Press <span>SPACE</span> to begin the game</div>
		</div>
		<style>
		{`

	  .inner-container{
		  		border-radius: 20px;
				border: 10px solid #0ff;
				width:400px;
				height:400px;
				position:absolute;
				top:calc(50vh - 200px);
				left:calc(50vw - 200px);
				overflow:hidden;
				background:rgba(0,0,0,0.8);
				text-align: center;
				justify-content: center;
				display: flex; 
				flex-direction: column;
				color:#0ff;
				font-size: 26px;
				box-shadow:  
  			   inset 0 0 5px #0FF,
   				 inset 0 0 10px #0FFF,
    inset 0 0 20px #0FFF,
    inset 0 0 40px #FF00DE,
    0 0 5px #0ff,
    0 0 10px #0ff,
    0 0 20px #0ff,
    0 0 30px #FF00DE,
    0 0 30px #FF00DE,
    0 0 30px #FF00DE,
    0 0 30px #FF00DE,
	0 0 30px #FF00DE;
			  }
			  .inner-container span{
				  color:#f0f;
			  }
		`}
		</style>
		</div>
	);
};

Queue.propTypes = {
	players: PropTypes.array,
	startGame: PropTypes.func,
};

export default Queue;
