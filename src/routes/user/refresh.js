import { path } from "ramda";
import { refresh } from "#lib/services/cognito.js";
import { refreshValidator } from "#lib/utils/validators.js";
import { middyfy } from "#lib/services/middleware.js";

const refreshHandler = async (event) => {
  const refreshToken = path(["body", "refreshToken"], event);
  const deviceKey = path(["body", "deviceKey"], event); //TODO: Where is this
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

export const handler = middyfy(refreshHandler);
