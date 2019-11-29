const env = Deno.env();
export const APP_HOST = env.APP_HOST || "127.0.0.1";
export const APP_PORT = env.APP_PORT || 4000;
export const DB_PATH = "127.0.0.1";
export const DB_USERNAME = "root";
export const DB_PASSWORD = "root";
export const DB_NAME = "denosongs";
