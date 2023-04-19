import { PLAYER_NAME_EMAIL } from '../actions';

const INITIAL_STATE = {
  gravatarEmail: '',
  name: '',
};

const playerLogin = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER_NAME_EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload.email,
      name: action.payload.name,
    };
  default:
    return state;
  }
};

export default playerLogin;
