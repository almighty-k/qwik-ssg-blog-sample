import { createClient } from "microcms-js-sdk";

if (!process.env.API_DOMAIN || !process.env.API_KEY) {
  throw new Error('API_DOMAIN or API_KEY is not set');
}

export const client = createClient({
  serviceDomain: process.env.API_DOMAIN,
  apiKey: process.env.API_KEY,
});

