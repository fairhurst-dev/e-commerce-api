import { path, pipe, includes, pathOr, tap } from "ramda";

const getCognitoGroups = pathOr(
  [],
  ["requestContext", "authorizer", "jwt", "claims", "cognito:groups"]
);

export const getIsAdmin = pipe(
  getCognitoGroups,
  tap(console.log),
  includes("Admin")
);

export const getUserUUID = path([
  "requestContext",
  "authorizer",
  "jwt",
  "claims",
  "username",
]);
