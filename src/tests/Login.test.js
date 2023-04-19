import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { token } from './mocks/fetch';
import { store } from '../redux/store'

describe('Tela de Login', () => {
  let inputEmail;
  let inputName;
  let buttonPlay;
  let history;
  const mockName = 'Name';
  const mockEmail = 'user@test.com';

  beforeEach(() => {
    const render = renderWithRouterAndRedux(<App />);
    history = render.history;
    inputName = screen.getByTestId('input-player-name');
    inputEmail = screen.getByTestId('password-input');
    buttonPlay = screen.getByTestId('btn-play');
  });

  test('renderiza os elementos corretamente', () => {
    expect(inputName).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(buttonPlay).toBeInTheDocument();
  });

  test('permite digitar nos inputs de nome e email', async () => {
    userEvent.type(inputName, mockEmail);
    userEvent.type(inputEmail, mockEmail);

    expect(inputName).toHaveValue(mockName);
    expect(inputEmail).toHaveValue(mockEmail);
  });

  test('botão "Play" é desabilitado caso email e/ou nome não estejam preenchidos', async () => {
    expect(buttonPlay).toBeDisabled();
  
    userEvent.type(inputName, mockName);
  
    expect(buttonPlay).toBeDisabled();
  
    userEvent.type(inputEmail, mockEmail);
  
    expect(buttonPlay).toBeDisabled();
  
    userEvent.type(inputName, mockName);
    userEvent.type(inputEmail, mockEmail);
  
    expect(buttonPlay).not.toBeDisabled();
  });

  test('é feita uma requisição à api e o token recebido é salvo no localStorage ao clicar no botão Play', async () => {
    userEvent.type(inputName, mockName);
    userEvent.type(inputEmail, mockEmail);

    userEvent.click(buttonPlay);

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(token),
    })
  
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://opentdb.com/api_token.php?command=request',
    );
  
    expect(localStorage.getItem('token')).toBe(token);
  });

  test('o token é armazenado no estado global do Redux', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(token),
    })
  
    const state = store.getState();
  
    expect(state.token).toBe(token);
  });
  
  test('redireciona para /game após clicar no botão play ', async () => {
    userEvent.type(inputName, mockName);
    userEvent.type(inputEmail, mockEmail);

    userEvent.click(buttonPlay);

    const gamePage = await screen.findByTestId('game-page');

    expect(history.location.pathname).toBe('/game');
    expect(gamePage).toBeInTheDocument();
  });
});
