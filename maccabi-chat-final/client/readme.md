# Real Time Chat App With React JS and Appwrite

A chat app with realtime capabilities that utilizes Appwrite on the backend. 


### Getting Started

After cloning repo ensure you complete nessesary installations

```
$ npm install
$ npm run dev
```

Create a new `.env` folder and create the nessesary variables based on the `src/appwriteConfig.js` file. Appwrite setup will be covered in next step.

```js
//appwrite.Config.js
...
export const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT
export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID
export const DATABASE_ID = import.meta.env.VITE_DATABASE_ID
export const COLLECTION_ID_ROOMS = import.meta.env.VITE_COLLECTION_ID_ROOMS
export const COLLECTION_ID_MESSAGES = import.meta.env.VITE_COLLECTION_ID_MESSAGES


const client = new Client()
    .setEndpoint(API_ENDPOINT) 
    .setProject(PROJECT_ID);              
...
```

