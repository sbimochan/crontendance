
import {
  SecretsManagerClient,
  GetSecretValueCommand,
  PutSecretValueCommand
} from "@aws-sdk/client-secrets-manager";

const secretName = "crontendance/bimochan";

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

export async function updateSecrets(originalKeys, accessToken, refreshToken) {
  const params = {
    SecretId: secretName,
    SecretString: JSON.stringify({
      ...originalKeys,
      accessToken,
      refreshToken
    }),
  };
  try {
    const command = new PutSecretValueCommand(params);
    await client.send(command)
  } catch (error) {
    console.log(' error:', error);
  }
}
