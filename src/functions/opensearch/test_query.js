import { testQuery } from "#lib/services/opensearch/index.js";

//TODO: remove this after dashboard access
export const handler = async (query) => {
  const resp = await testQuery(query);
  return resp;
};
