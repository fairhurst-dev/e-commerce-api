import { updateProductIndexMappings } from "#lib/services/opensearch/index.js";
import { tryCatch } from "ramda";

export const handler = tryCatch(updateProductIndexMappings, console.error);
