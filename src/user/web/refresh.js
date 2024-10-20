import { path } from "ramda";
import { refresh } from "#lib/cognito.js";
import { refreshValidator } from "#lib/validators.js";

export const handler = async (event) => {
  const refreshToken = path(["body", "refreshToken"], event);
  const deviceKey = path(["body", "deviceKey"], event);
  try {
    const payload = refreshValidator({ refreshToken, deviceKey });

    const response = await refresh(payload);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User token refreshed",
        response,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};
