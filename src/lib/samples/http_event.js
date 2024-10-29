export const SAMPLE_HTTP_EVENT = {
  version: "2.0",
  routeKey: "POST /product",
  rawPath: "/product",
  rawQueryString: "",
  headers: {
    accept: "*/*",
    acceptencoding: "gzip, deflate, br",
    authorization: "Bearer XXX",
    cachecontrol: "nocache",
    contentlength: "20",
    contenttype: "application/json",
    host: "z0fxs08evk.executeapi.useast1.amazonaws.com",
    postmantoken: "5a2018da7a22448fbcd51307d6588752",
    useragent: "PostmanRuntime/7.42.0",
    xamzntraceid: "Root=1672934fe590b0dd355570d7a744942cb",
    xforwardedfor: "54.86.50.139",
    xforwardedport: "443",
    xforwardedproto: "https",
  },
  requestContext: {
    accountId: "XXXX",
    apiId: "z0fxs08evk",
    authorizer: {
      jwt: {
        claims: {
          auth_time: "1730750968",
          client_id: "XXXXX",
          "cognito:groups": "[admins]",
          event_id: "184cce8f2545439ba39bbc5ee21339d7",
          exp: "1730757309",
          iat: "1730753709",
          iss: "https://cognitoidp.useast1.amazonaws.com/useast1_vh4M5G0g1",
          jti: "d4800470186648989af92bfd61ddadc1",
          origin_jti: "821262c4cff442318dfb45598965cd46",
          scope: "aws.cognito.signin.user.admin",
          sub: "1234567",
          token_use: "access",
          username: "1234567",
        },
        scopes: null,
      },
    },
    domainName: "z0fxs08evk.executeapi.useast1.amazonaws.com",
    domainPrefix: "z0fxs08evk",
    http: {
      method: "POST",
      path: "/product",
      protocol: "HTTP/1.1",
      sourceIp: "54.86.50.139",
      userAgent: "PostmanRuntime/7.42.0",
    },
    requestId: "AvU3xgFpIAMEa2w=",
    routeKey: "POST /product",
    stage: "$default",
    time: "04/Nov/2024:20:56:30 +0000",
    timeEpoch: 1730753790157,
  },
  body: { bar: "foo" },
  isBase64Encoded: false,
};