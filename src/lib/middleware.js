import middy from "@middy/core";
import httpErrorHandler from "@middy/http-error-handler";
import httpCors from "@middy/http-cors";

export const middyfy = (handler) => {
  return middy(handler).use(httpErrorHandler()).use(httpCors());
};
