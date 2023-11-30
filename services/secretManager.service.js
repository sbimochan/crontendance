
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secretName = "crontendance";

const client = new SecretsManagerClient({
  region: "ap-southeast-2",
});

export async function getSecretsFromSecretManager() {
  try {
    const response = await client.send(
      new GetSecretValueCommand({
        SecretId: secretName,
        VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
      })
    );

    return response.SecretString;
  } catch (error) {
    // For a list of exceptions thrown, see
    // https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    throw error;
  }
}

export async function updateSecrets(secretObject, newKey, newValue) {
  const params = {
    SecretId: secretName,
    SecretString: JSON.stringify({
      ...secretObject,
      [newKey]: newValue,
    }),
  };
  try {
    await client.updateSecret(params)
  } catch (error) {
    console.log(' error:', error);
  }
}
