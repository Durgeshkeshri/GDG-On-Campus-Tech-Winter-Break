import { Client, Databases } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://YOUR_APPWRITE_ENDPOINT/v1') // Replace with your AppWrite endpoint
  .setProject('YOUR_PROJECT_ID'); // Replace with your project ID

export const databases = new Databases(client);
export const databaseID = 'YOUR_DATABASE_ID'; // Replace with your database ID
export const collectionID = 'YOUR_COLLECTION_ID'; // Replace with your collection ID
