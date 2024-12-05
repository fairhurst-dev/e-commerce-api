import { path, pipe, includes } from "ramda";

const getCognitoGroups = path([
  "requestContext",
  "authorizer",
  "jwt",
  "claims",
  "cognito:groups",
]);

export const getIsAdmin = pipe(getCognitoGroups, includes("admin"));

export const getUserUUID = path([
  "requestContext",
  "authorizer",
  "jwt",
  "claims",
  "username",
]);
