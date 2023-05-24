import { Client, Account, Databases } from "appwrite";

const client = new Client();

client.setEndpoint("http://localhost/v1").setProject("646dfffed1d5a5242baa");

export const account = new Account(client);

export const databases = new Databases(client);
