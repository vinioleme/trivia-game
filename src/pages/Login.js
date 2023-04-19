import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
          <button data-testid="btn-play" disabled={ !isValid }>Play</button>
          <br />
          <Link to="/Config">
            <button
              data-testid="btn-settings"
            >
              Config
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

export default Login;
