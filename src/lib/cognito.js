import {
  SignUpCommand,
  CognitoIdentityProviderClient,
} from "@aws-sdk/client-cognito-identity-provider";

export const signUp = ({ email, password }) => {
  const client = new CognitoIdentityProviderClient({});
  const clientId = process.env.USER_POOL_CLIENT_ID;

  const command = new SignUpCommand({
    ClientId: clientId,
    Username: email,
    Password: password,
    UserAttributes: [{ Name: "email", Value: email }],
  });

  return client.send(command);
};
