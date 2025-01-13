import { andThen, pipe } from "ramda";
import {
  formatCreateIndexPayload,
  formatIndexRecordPayload,
  formatUpdateMappingPayload,
  formatQuery,
  formatQueryRespForClient,
  makeClient,
  formatCategoryQuery,
  formatTestQuery,
} from "./utils.js";

const client = makeClient();

const search = async (body) => client.search(body);
const index = async (body) => client.index(body);
const createIndex = async (body) => client.indices.create(body);
const putMapping = async (body) => client.indices.putMapping(body);

//config

export const updateProductIndexMappings = pipe(
  formatUpdateMappingPayload,
  putMapping
);

export const createProductIndex = pipe(formatCreateIndexPayload, createIndex);

//records

export const indexProduct = pipe(formatIndexRecordPayload, index);

//queries

export const searchProducts = pipe(
  formatQuery,
  search,
  andThen(formatQueryRespForClient)
);

export const getProductsByCategories = pipe(
  formatCategoryQuery,
  search,
  andThen(formatQueryRespForClient)
);

export const testQuery = pipe(formatTestQuery, search);
