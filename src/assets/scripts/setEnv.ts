/* ts-lint:disable */
// @ts-nocheck

import { writeFile, existsSync, mkdirSync } from 'fs';
import { env } from 'process';
import { argv } from 'yargs';
//import { environment } from '../../environments/environment.prod';
require('dotenv').config();

const environment = argv.environment;

function writeFileUsingFS(targetPath: any, environmentFileContents: any) {
    writeFile(targetPath, environmentFileContents, function (error) {
        if (error) {
            console.log(error);
        }

        if (environmentFileContents !== '') {
            console.log(`Wrote variables to ${ targetPath }`);
        }
    });
}

// Provide path to `environments` directory
const envDirectory = '../../src/environments';

// Create `environments` directory if none exists
if (!existsSync(envDirectory)) {
    mkdirSync(envDirectory);
}

// Create the `environment.prod.ts` and `environment.ts` files if none exist
writeFileUsingFS('../../src/environments/environment.prod.ts', '');
writeFileUsingFS('../../src/environments/environment.ts', '');

// Check if running in `production`
const isProduction = environment == 'prod';

// Determine `targetPath` in regard to `environment` selected
const targetPath = isProduction
  ? '../../src/environments/environment.prod.ts'
  : '../../src/environments/environment.ts';

// Dynamically compile and paste respective environment files
const environmentFileContent = `
  // This file was autogenerated by dynamically running setEnv.ts and using dotenv to maintain API key secrecy
  export const environment = {
    production: ${isProduction},
    firebaseConfig: {
        apiKey: '${process.env.FIREBASE_API_KEY}',
        authDomain: '${process.env.FIREBASE_AUTH_DOMAIN}',
        projectId: '${process.env.FIREBASE_PROJECT_ID}',
        storageBucket: '${process.env.FIREBASE_STORAGE_BUCKET}',
        messagingSenderId: '${process.env.FIREBASE_MESSAGING_SENDER_ID}',
        appId: '${process.env.FIREBASE_APP_ID}'
        }
    };
  };
`;

writeFileUsingFS(targetPath, environmentFileContent); // appending data into the target file

/* ts-lint:disable */