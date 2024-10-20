import {
  SignUpCommand,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { authRespForClient } from "#lib/formatters.js";

const cognitoClient = new CognitoIdentityProviderClient({});
const clientId = process.env.USER_POOL_CLIENT_ID;
const userPoolId = process.env.USER_POOL_ID;

//TODO: write functionally?

export const signup = ({ email, password }) => {
  const command = new SignUpCommand({
    ClientId: clientId,
    Username: email,
    Password: password,
    UserAttributes: [{ Name: "email", Value: email }],
  });

  return cognitoClient.send(command);
};

export const login = async ({ email, password }) => {
  const command = new InitiateAuthCommand({
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: clientId,
    UserPoolId: userPoolId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  });

  const resp = await cognitoClient.send(command);
  return authRespForClient(resp);
};

export const refresh = async ({ refreshToken, deviceKey }) => {
  const command = new InitiateAuthCommand({
    AuthFlow: "REFRESH_TOKEN_AUTH",
    ClientId: clientId,
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
      DEVICE_KEY: deviceKey,
    },
  });

  const resp = await cognitoClient.send(command);
  return authRespForClient(resp);
};

export const confirmSignUp = async ({ email, otp }) => {
  const command = new ConfirmSignUpCommand({
    ClientId: clientId,
    Username: email,
    ConfirmationCode: otp,
  });
  return cognitoClient.send(command);
};
