export function placePiece(){
	return { type: 'place-piece' };
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