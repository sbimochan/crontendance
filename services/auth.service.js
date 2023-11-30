import fetch from "node-fetch";
import { log } from "../utilities/log.js";
import { writeFileSync, readFileSync } from "fs";
import { APIS, FILE_PATHS } from "../constants/constants.js";
import { getSecretsFromSecretManager, updateSecrets } from "./secretManager.service.js";

export async function generateAuthenticationTokens() {
  const data = await getSecretsFromSecretManager();
  const keys = JSON.parse(data)

  try {
    const response = await fetch(
      `${APIS.AUTH}?clientId=lms&token=${keys.refreshToken}`
    );

    if (response.ok) {
      const {
        data: { accessToken, refreshToken },
      } = await response.json();
      log("log", `fetched new access token & refresh token for ${keys.name}`);

      await updateSecrets(keys, accessToken, refreshToken)
      log("log", `rotated new access token & refresh token for ${keys.name}`);
    } else {
      log(
        "warn",
        `failed to fetch access token & refresh token for ${name} ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    log("error", error);
  }

};
