import React from "react";
import ReactDOM from 'react-dom';

// Import Apollo dependencies
import { 
    ApolloClient, 
    ApolloProvider, 
    createHttpLink,
    InMemoryCache 
} from "@apollo/client";
import { setContext } from "apollo-link-context";


// Import global styles
import GlobalStyle from "./components/GlobalStyle";
// Import routes
import Pages from "./pages";

// Configure API URI and cache
const uri = process.env.API_URI;
const httpLink = createHttpLink({ uri });
const cache = new InMemoryCache();

// Check for a token and return the headers to the context
const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            authorization: localStorage.getItem('token') || ''
        }
    };
});

// Create Apollo Client
const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {},
    connectToDevTools: true
});

// Check for a local token
const data = {
    isLoggedIn: !!localStorage.getItem('token')
};

// Write the cache data on initial load
cache.writeData({ data });
// Write cache data after cache is reset
client.onResetStore(() => cache.writeData({ data }));


const App = () => {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </ApolloProvider>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
