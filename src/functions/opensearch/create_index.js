import { createProductIndex } from "#lib/services/opensearch/index.js";
import { tryCatch } from "ramda";

export const handler = tryCatch(createProductIndex, console.error);
