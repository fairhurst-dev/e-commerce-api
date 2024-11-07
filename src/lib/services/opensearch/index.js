import { andThen, pipe, tap } from "ramda";
import {
  formatCreateIndexPayload,
  formatIndexRecordPayload,
  formatUpdateMappingPayload,
  formatQuery,
  formatQueryRespForClient,
  makeClient,
  formatCategoryQuery,
} from "./utils.js";

const client = makeClient();

const search = async (body) => client.search(body);
const index = async (body) => client.index(body);
const createIndex = async (body) => client.indices.create(body);
const putMapping = async (body) => client.indices.putMapping(body);

//config

export const updateProductIndexMappings = pipe(
  formatUpdateMappingPayload,
  putMapping,
  andThen(tap(console.log))
);

export const createProductIndex = pipe(
  formatCreateIndexPayload,
  createIndex,
  andThen(tap(console.log))
);

//records

export const indexProduct = pipe(
  formatIndexRecordPayload,
  index,
  andThen(tap(console.log))
);

//queries

export const searchProducts = pipe(
  formatQuery,
  search,
  andThen(pipe(tap(console.log), formatQueryRespForClient))
);

export const getProductsByCategories = pipe(
  formatCategoryQuery,
  search,
  andThen(pipe(tap(console.log), formatQueryRespForClient))
);
