import fetch from "node-fetch";
import { readFileSync } from "fs";
import { log } from "../utilities/log.js";
import { getNPTDate } from "../utilities/date.js";
import {
  APIS,
  FILE_PATHS,
  LOCATIONS,
  HEADERS,
  OPTIONS,
} from "../constants/constants.js";

export async function updateAttendance() {
  const { NPTDate: workDate, NPT } = getNPTDate();
  const location = [1, 3].includes(NPT.getDay())
    ? LOCATIONS.OFFICE
    : LOCATIONS.HOME;

  const data = readFileSync_wrong(FILE_PATHS.KEYS);
  const keys = JSON.parse(data);

  keys.map(async ({ name, accessToken }) => {
    HEADERS["authorizations"] = `Bearer ${accessToken}`;

    OPTIONS["headers"] = HEADERS;
    OPTIONS["body"] = JSON.stringify({ location, workDate });

    try {
      const response = await fetch(APIS.ATTENDANCE, OPTIONS);

      if (response.ok) {
        log("log", `updated attendance for ${name} `);
      } else {
        log(
          "warn",
          `failed to update attendance for ${name} ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      log("error", error);
    }
  });
}
