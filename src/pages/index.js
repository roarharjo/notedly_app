// Import React and rounting dependencies
import React from "react";
import { useQuery, gql } from "@apollo/client";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

// Import shared layout components
import Layout from "../components/Layout";

// Import routes
import Home from './home';
import MyNotes from './mynotes';
import Favorites from './favorites';
import Note from "./note";
import SignUp from "./signup";
import SignIn from "./signin";
import NewNote from "./new";
import EditNote from "./edit";

// Import the signup route



import { renderers } from "react-markdown";

const IS_LOGGED_IN = gql`
    {
        isLoggedIn @client
    }
`;

// define routes
const Pages = () => {
    return (
        <Router>
            {/* Wrap our routes within the Layout component */}
            <Layout>
                <Route exact path="/" component={Home} />
                <PrivateRoute path="/mynotes" component={MyNotes} />
                <PrivateRoute path="/favorites" component={Favorites} />
                <Route path="/note/:id" component={Note} />
                <Route path="/signup" component={SignUp} />
                <Route path="/signin" component={SignIn} />
                <PrivateRoute path="/new" component={NewNote} />
                <PrivateRoute path="/edit/:id" component={EditNote} />
            </Layout>
        </Router>
    );
};

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { loading, error, data } = useQuery(IS_LOGGED_IN);
    // If the data is loading, display a loading message
    if (loading) return <p>Loading...</p>;
    // if there is an error fetching the data, display an error message 
    if (error) return <p>Error!</p>;
    // if the user is logged in, route them to the requested component
    // else redirct them to the sign-in page
    return (
        <Route
            {...rest}
            render={props =>
                data.isLoggedIn === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    );
};

export default Pages;