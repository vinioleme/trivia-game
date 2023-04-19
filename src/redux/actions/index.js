export const PLAYER_NAME_EMAIL = 'PLAYER_NAME_EMAIL';

export const playerInfos = (gravatarEmail, name) => ({
  type: PLAYER_NAME_EMAIL,
  payload: gravatarEmail,
  name,
});
