import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import { useMutation, useApolloClient, gql } from "@apollo/client";

import UserForm from "../components/UserForm";

import Button from "../components/Button";

const SIGNUP_USER = gql`
    mutation signUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password)
    }
`;

const Wrapper = styled.div`
    border: 1px solid #f5f4f0;
    max-width: 500px;
    padding: 1em;
    margin: 0 auto;
`;

const Form = styled.form`
    label,
    input {
        display: block;
        line-height:  2em;

    }

    input {
        width: 100%;
        margin-bottom: 1em;
    }
`;

// Include the props passed to the components for later use
const SignUp = props => {
    useEffect(() => {
    // upsdate the document title
    document.title = 'Sign Up - Notedly';
});


    

    // Apollo client
    const client = useApolloClient();
    // Mutation hook
    const [signUp, { loading, error }] = useMutation(SIGNUP_USER, {
        onCompleted: data => {
            // Store the JWT in localStorage
            localStorage.setItem('token', data.signUp);
            // Update local cache
            client.writeData({ data: { isLoggedIn: true } });
            // Redirect the user to the homepage
            props.history.push('/');
        }
    });

    // Render the form
    return (
        <React.Fragment>
            <UserForm action={signUp} formType="signup" />
            {/** if the data is loading, display a loading message */}
            {loading && <p>Loading...</p>}
            {/* if there is an error, display a error message */}
            {error && <p>Error creating an account!</p>}
        </React.Fragment>
    );
};

export default SignUp;