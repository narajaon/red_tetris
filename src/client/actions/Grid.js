export function placePiece(pieces){
	return { type: 'place-piece', pieces };
}

export function rotatePiece(piece){
	return { type: 'rotate-piece', piece };
}

export function translatePiece(translation){
	return { type: 'translate-piece', translation };
}

export function startAnimation(interval){
	return { type: 'start-animation', interval };
}

export function resetGrid(){
	return { type: 'reset-grid' };
}