import { path } from "ramda";
import { refresh } from "#lib/services/cognito/index.js";
import { refreshValidator } from "#lib/validators.js";
import { middyfy } from "#lib/middleware.js";
import httpJsonBodyParser from "@middy/http-json-body-parser";

const refreshHandler = async (event) => {
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
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

export const handler = middyfy(refreshHandler).use(httpJsonBodyParser());
