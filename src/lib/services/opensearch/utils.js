import { AwsSigv4Signer } from "@opensearch-project/opensearch/aws";
import { Client } from "@opensearch-project/opensearch";
import { defaultProvider } from "@aws-sdk/credential-provider-node";
import {
  applySpec,
  pipe,
  identity,
  always,
  assoc,
  pathOr,
  prop,
  map,
  split,
  omit,
  assocPath,
} from "ramda";
import { INDEX_NAME, PRODUCTS_MAPPINGS } from "./config.js";

export const makeClient = () =>
  new Client({
    ...AwsSigv4Signer({
      region: "us-east-1",
      service: "aoss",
      getCredentials: () => {
        const credentialsProvider = defaultProvider();
        return credentialsProvider();
      },
    }),
    node: `${process.env.PRODUCTS_COLLECTION_ENDPOINT}`, // OpenSearch domain URL
  });

const addIndexName = assoc("index", INDEX_NAME);

//config

export const formatCreateIndexPayload = pipe(
  applySpec({
    body: {
      mappings: always(PRODUCTS_MAPPINGS),
    },
  }),
  addIndexName
);

export const formatUpdateMappingPayload = pipe(
  applySpec({
    body: always(PRODUCTS_MAPPINGS),
  }),
  addIndexName
);

//queries

const baseQuery = applySpec({
  body: {
    query: identity,
  },
});

const assocSort = assocPath(
  ["body", "sort"],
  [{ _score: "desc" }, { price: "asc" }]
);

export const formatQuery = pipe(
  applySpec({
    multi_match: {
      query: identity,
      fields: always(["name^4", "description^2", "categories"]),
      type: always("best_fields"),
      fuzziness: always("AUTO"),
    },
  }),
  baseQuery,
  assocSort,
  addIndexName
);

export const formatTestQuery = pipe(baseQuery, addIndexName);

export const formatCategoryQuery = pipe(
  split(","),
  applySpec({
    terms: {
      categories: identity,
    },
  }),
  baseQuery,
  addIndexName
);

//records

export const formatIndexRecordPayload = pipe(
  applySpec({
    id: prop("id"),
    body: omit(["PK", "SK"]),
  }),
  addIndexName
);

//responses

export const formatQueryRespForClient = pipe(
  pathOr([], ["body", "hits", "hits"]),
  map(
    applySpec({
      id: prop("_id"),
      relevanceScore: prop("_score"),
      body: prop("_source"),
    })
  )
);
