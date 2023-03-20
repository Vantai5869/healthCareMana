import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import { client } from "./graphql/graphqlClient";
import { store } from './stores/index';
ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
    <ApolloProvider client={client}>
      <Provider store={store} >
      <App />
      </Provider>
      </ApolloProvider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
