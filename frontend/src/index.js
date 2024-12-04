import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloProvider, ApolloClient, InMemoryCache, gql, makeVar } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import CredentialTypes from './components/CredentialTypes';
import DegreeOfferings from './components/DegreeOfferings';
import FormDetails from './components/FormDetails';
import reportWebVitals from './reportWebVitals';

// Initialize local state
export const counterVar = makeVar(0);

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          counter: {
            read() {
              return counterVar();
            }
          }
        }
      }
    }
  }),
  devtools: {
    enabled: true
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<CredentialTypes />} />
            <Route path="degree-offerings/:credentialTypeId" element={<DegreeOfferings />} />
            <Route path="forms/:degreeOfferingId" element={<FormDetails />} />
          </Route>
        </Routes>
      </Router>
    </React.StrictMode>
  </ApolloProvider>
);

reportWebVitals();