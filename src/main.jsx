import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppPaises from "./AppPaises.jsx";
import "./index.css";


// Apollo y GraphQL
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// Configuración de Apollo Client
const client = new ApolloClient({
  uri: "https://countries.trevorblades.com/", // URL de la API GraphQL
  cache: new InMemoryCache(), // Para la gestión de caché
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <AppPaises />
    </ApolloProvider>
  </StrictMode>
);
