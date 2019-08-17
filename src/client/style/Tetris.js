// eslint-disable-next-line import/prefer-default-export
export const initDocStyle = () => {
	Object.assign(document.body.style, {
		margin: '0',
		height: '100%',
	});
	
	Object.assign(document.documentElement.style, {
		height: '100%',
	});
	
	Object.assign(document.getElementById('root').style, {
		height: '100%',
	});
};
