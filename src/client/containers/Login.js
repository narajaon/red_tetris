import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import { switchPhase, initPlayerAndRoom } from '../actions/Game';
import { PHASES } from '../constants';
import { errorAction } from '../actions/errors';
import { formIsValid } from '../helpers/Login';

const mapStateToProps = () => {
	return {
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		logToGame: ({ room, name }, hist) => (e) => {
			e.preventDefault();

			if (!formIsValid(name, room)) {
				dispatch(errorAction('Invalid form'));

				return;
			}

			dispatch(switchPhase(PHASES.CONNECTED));
			dispatch(initPlayerAndRoom(name, Number.parseInt(room)));
			hist.replace({
				pathname:'/',
				hash: `#${room}[${name}]`
			});
		}
	};
};

const Login = ({ logToGame }) => {
	const style = {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	};

	return (
		<div className="login" style={ style }>
			<LoginForm logToGame={ logToGame }/>
		</div>
	);
};

Login.propTypes = {
	logToGame: PropTypes.func,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
