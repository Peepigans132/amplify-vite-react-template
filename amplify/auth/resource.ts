import React from 'react';
import ReactDOM from 'react-dom/client';
import { Authenticator } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import App from './App';
import outputs from '../amplify_outputs.json'; // Ensure this path and file are correct
import './index.css';
import '@aws-amplify/ui-react/styles.css';

// Amplify configuration
Amplify.configure(outputs);

// Optional: Define your schema using TypeScript types or models
// Assuming you have a valid backend setup
export type Schema = {
  Todo: {
    id: string;
    content: string;
    owner?: string;
  };
};

// Define client or schema configuration if applicable
export const dataConfig = {
  schema: {
    Todo: {
      content: "string",
    },
  },
  authorizationModes: {
    defaultAuthorizationMode: 'userPool', // Ensure this matches your Amplify setup
  },
};

// Render the application
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element not found. Ensure there is a div with id='root' in index.html.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <Authenticator>
      <App />
    </Authenticator>
  </React.StrictMode>
);

