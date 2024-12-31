import { testQuery } from "#lib/services/opensearch/index.js";

export const handler = async (query) => {
  const resp = await testQuery(query);
  return resp;
};
