import 'dotenv/config';

export const envs = {
  PORT: process.env.PORT || 4000,
  API_URL:
    process.env.API_URL || `http://localhost:${process.env.PORT || '4000'}`,
  ADMIN_API_KEY: process.env.ADMIN_API_KEY as string,
  CHATNODES_WHATSAPP_INTEGRATION_API_KEY: process.env
    .CHATNODES_WHATSAPP_INTEGRATION_API_KEY as string,
  NODE_ENV: process.env.NODE_ENV as string,
  LOGGER_LEVEL: process.env.LOGGER_LEVEL as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
};
