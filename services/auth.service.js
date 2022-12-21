import fetch from "node-fetch";
import { log } from '../utilities/log.js';
import { writeFileSync, readFileSync } from 'fs';
import { APIS, FILE_PATHS } from '../constants/constants.js';

export async function generateAuthenticationTokens() {
  const data = readFileSync(FILE_PATHS.KEYS);
  const keys = JSON.parse(data);

  const promises = keys.map(async ({ name, refreshToken }) => {
    try {
      const response = await fetch(`${APIS.AUTH}?clientId=lms&token=${refreshToken}`);

      if (response.ok) {
        const { data: { accessToken, refreshToken } } = await response.json();
        log('log', `fetched new access token & refresh token for ${name}`);

        return {
          name,
          accessToken,
          refreshToken
        };
      } else {
        log('warn', `failed to fetch access token & refresh token for ${name} ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      log('error', error);
    }

    return new Promise.resolve(null);
  })

  const refreshedKeys = await Promise.all(promises);
  const validRefreshedKeys = refreshedKeys.filter(key => !!key);

  writeFileSync(FILE_PATHS.KEYS, JSON.stringify(validRefreshedKeys, null, 2));
}
