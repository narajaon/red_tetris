export function placePiece(pieces){
	return { type: 'place-piece', pieces };
}

export function rotatePiece(piece){
	return { type: 'rotate-piece', piece };
}

export function translatePiece(translation){
	return { type: 'translate-piece', translation };
}

export function resetGrid(){
	return { type: 'reset-grid' };
}

export function queuePieces(pieces) {
	return { type: 'queue-pieces', pieces };
}

export function popPieces() {
	return { type: 'pop-pieces' };
}


export function resetGridScoreLine() {
	return { type: 'reset-grid-score-line' };
}

export function insertLines(lines) {
	return { type: 'insert-lines', lines };
}

export function startAnimation() {
	return dispatch => {
		const newInterval = () => {
			return setInterval(() => {
				dispatch(translatePiece({x: 0, y: 1}));
			}, 800);
		};

		return dispatch({ type: 'start-animation', interval: newInterval() });
	};
}