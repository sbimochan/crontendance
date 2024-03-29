import fetch from "node-fetch";
import { readFileSync } from 'fs';
import { log } from '../utilities/log.js';
import { getNPTDate } from '../utilities/date.js';
import { APIS, FILE_PATHS, HEADERS, OPTIONS } from '../constants/constants.js';

export async function updateAttendance() {
  const { NPTDate: workDate, NPT } = getNPTDate();

  const data = readFileSync(FILE_PATHS.KEYS)
  const keys = JSON.parse(data)

  keys.map(async ({ name, accessToken, locations = [] }) => {
    const location = locations[NPT.getDay()];

    HEADERS['authorization'] = `Bearer ${accessToken}`;

    OPTIONS['headers'] = HEADERS;
    OPTIONS['body'] = JSON.stringify({ location, workDate });

    try {
      const response = await fetch(APIS.ATTENDANCE, OPTIONS);

      if (response.ok) {
        log('log', `updated attendance for ${name}`);
      } else {
        log('warn', `failed to update attendance for ${name} ${response.status} ${response.statusText}`);
      }
    } catch (error) {
        log('error', error);
    }
  })
}
