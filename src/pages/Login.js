import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getRequest } from '../services/triviaApi';

class Login extends Component {
  state = {
    nome: '',
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
    const { history } = this.props;
    event.preventDefault();
    const getToken = await getRequest();
    await localStorage.setItem('token', getToken.token);
    history.push('/game');
  };

  render() {
    const { nome, email } = this.state;
    const isValid = this.validateEmail(email) && nome.length > 0;

    return (
      <div>
        <form action="">
          <label htmlFor="nome">
            <input
              type="text"
              data-testid="input-player-name"
              name="nome"
              value={ nome }
              onChange={ this.onInputChange }
              placeholder="Digite seu nome"
            />
          </label>
          <label htmlFor="email">
            <input
              type="email"
              name="email"
              id=""
              data-testid="input-gravatar-email"
              value={ email }
              onChange={ this.onInputChange }
              placeholder="Digite seu e-mail"
            />
          </label>
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

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default Login;
