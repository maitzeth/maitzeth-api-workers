import { Hono } from 'hono';
import { Env } from '../../index';
import { SteamProfileResponse, SteamGamesResponse } from '../domain/steam';

const steamApp = new Hono<{Bindings: Env}>().basePath('/steam');

steamApp.get('/profile', async (c) => {
  const { BASE_URL, KEY, SteamID } = c.env;

  try {
    const response = await fetch(
      `${BASE_URL}/ISteamUser/GetPlayerSummaries/v0002/?key=${KEY}&steamids=${SteamID}`
    );

    const data = await response.json() as SteamProfileResponse;
    const playerData = data.response.players[0];
    return c.json(playerData);
  } catch (err) {
    let errorMsg = 'Something weird happened, please try again.';

    if (err instanceof Error) {
      errorMsg = err.message;
    } else if (err instanceof TypeError) {
      errorMsg = err.message;
    }

    c.status(500);

    c.json({ message: errorMsg });
  }
});

steamApp.get('/games', async (c) => {
  const { BASE_URL, KEY, SteamID } = c.env;

  try {
    const response = await fetch(
      `${BASE_URL}/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${KEY}&steamid=${SteamID}&format=json`
    );

    const data = await response.json() as SteamGamesResponse;
    return c.json(data.response);
  } catch (err) {
    let errorMsg = 'Something weird happened, please try again.';

    if (err instanceof Error) {
      errorMsg = err.message;
    } else if (err instanceof TypeError) {
      errorMsg = err.message;
    }

    c.status(500);

    c.json({ message: errorMsg });
  }
});

export default steamApp;
