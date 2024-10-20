import {
  SignUpCommand,
  CognitoIdentityProviderClient,
  AdminInitiateAuthCommand,
  AdminRespondToAuthChallenge,
  ConfirmSignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

const cognitoClient = new CognitoIdentityProviderClient({});
const clientId = process.env.COGNITO_CLIENT_ID;
const userPoolId = process.env.COGNITO_USER_POOL_ID;

export const signUp = ({ email, password }) => {
  const command = new SignUpCommand({
    ClientId: clientId,
    Username: email,
    Password: password,
    UserAttributes: [{ Name: "email", Value: email }],
  });

  return cognitoClient.send(command);
};

export const initAuth = async ({ email, password }) => {
  const command = new AdminInitiateAuthCommand({
    AuthFlow: "USER_SRP_AUTH",
    ClientId: clientId,
    UserPoolId: userPoolId,
    AuthParameters: {
      USERNAME: email,
      PASSWORD: password,
    },
  });

  return cognitoClient.send(command);
};

export const confirmSignUp = async ({ email, otp }) => {
  const command = new ConfirmSignUpCommand({
    ClientId: clientId,
    Username: email,
    ConfirmationCode: otp,
  });
  return cognitoClient.send(command);
};
