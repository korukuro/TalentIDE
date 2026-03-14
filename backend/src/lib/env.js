import dotenv from 'dotenv';

dotenv.config({quiet: true});

export const ENV = {
    PORT : process.env.PORT,
    DB_URL : process.env.DB_URL,
    NODE_ENV : process.env.NODE_ENV,
    INGEST_ENVENT_KEY: process.env.INGEST_ENVENT_KEY,
    INGEST_SIGNING_KEY: process.env.INGEST_SIGNING_KEY,
    STREAM_API_KEY: process.env.STREAM_API_KEY,
    STREAM_API_SECRET: process.env.STREAM_API_SECRET,
    CLIENT_URL: process.env.CLIENT_URL,
    GMAIL_USER:process.env.GMAIL_USER,
    GMAIL_APP_PASSWORD:process.env.GMAIL_APP_PASSWORD
};