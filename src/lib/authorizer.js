import { path, pipe, includes, pathOr } from "ramda";

const getCognitoGroups = pathOr(
  [],
  ["requestContext", "authorizer", "jwt", "claims", "cognito:groups"]
);

export const getIsAdmin = pipe(getCognitoGroups, includes("Admin"));

export const getUserUUID = path([
  "requestContext",
  "authorizer",
  "jwt",
  "claims",
  "username",
]);
