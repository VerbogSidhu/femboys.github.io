import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client();

export const APPWRITE_ENDPOINT = 'https://tor.cloud.appwrite.io/v1';
export const APPWRITE_PROJECT_ID = '69b5ec95000dd27ecaf5';
export const APPWRITE_DB_ID = '69b5eed800141869537b';
export const APPWRITE_COL_ID = 'gallery';
export const APPWRITE_BUCKET_ID = '69b5ef25001fa462a49e';

client
    .setEndpoint(APPWRITE_ENDPOINT)
    .setProject(APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export default client;
