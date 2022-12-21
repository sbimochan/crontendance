import path from 'path';

export const FILE_PATHS = {
  KEYS: path.join(path.resolve(), 'keys.json')
};

export const APIS = {
  AUTH: "https://vyaguta.lftechnology.com/api/auth/authorize",
  ATTENDANCE: "https://attendance.vyaguta.lftechnology.com/api/leave/worklogs",
};

export const OFFSET = {
  NPT: -345
};

export const LOCATIONS = {
  HOME: "HOME",
  OFFICE: "OFFICE"
};

export const HEADERS = {
  "content-type": "application/json",
  "accept-language": "en-US,en;q=0.9",
  accept: "application/json, text/plain, */*",
  // authorization: `Bearer <ACCESS_TOKEN>`,
  "sec-ch-ua":
    '"Not?A_Brand";v="8", "Chromium";v="108", "Google Chrome";v="108"',
  "sec-fetch-mode": "cors",
  "sec-fetch-dest": "empty",
  "sec-ch-ua-mobile": "?0",
  "sec-fetch-site": "same-site",
  "sec-ch-ua-platform": '"macOS"',
};

export const OPTIONS = {
  mode: "cors",
  method: "POST",
  credentials: "include",
  // headers: <HEADERS>,
  // body: JSON.stringify({ location, workDate }),
  referrer: "https://vyaguta.lftechnology.com/",
  referrerPolicy: "strict-origin-when-cross-origin",
};
