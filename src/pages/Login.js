import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getRequest } from '../services/triviaApi';
import { playerInfos } from '../redux/actions';

class Login extends Component {
  state = {
    name: '',
    email: '',
  };

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    dispatch(playerInfos(this.state));
    const getToken = await getRequest();
    await localStorage.setItem('token', getToken.token);
    history.push('/game');
  };

  render() {
    const { history } = this.props;
    const { name, email } = this.state;
    const isValid = this.validateEmail(email) && name.length > 0;

    return (
      <div>
        <form action="">
          <label htmlFor="name">
            <input
              type="text"
              data-testid="input-player-name"
              name="name"
              value={ name }
              onChange={ this.onInputChange }
              placeholder="Digite seu name"
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.onInputChange }
              placeholder="Digite seu e-mail"
            />
          </label>
          <button
            data-testid="btn-settings"
            onClick={ () => history.push('/config') }
          >
            Config
          </button>
          <button
            data-testid="btn-play"
            disabled={ !isValid }
            onClick={ this.handleClick }
          >
            Play

          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  gravatarEmail: state.player.gravatarEmail,
  name: state.player.name,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default connect(mapStateToProps)(Login);
