import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import LoginForm from '../components/LoginForm';

const mapStateToProps = () => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		startGame: (history) => (e) => {
			e.preventDefault();
			history.push({
				pathname:'/',
			});
		}
	};
};

const Login = ({ startGame }) => {
	const style = {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	};

	return (
		<div className="login" style={ style }>
			<LoginForm startGame={ startGame}/>
		</div>
	);
};

Login.propTypes = {
	startGame: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
