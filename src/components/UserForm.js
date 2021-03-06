import React, { useState } from "react";
import styled from 'styled-components';

import Button from "./Button";

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
        line-height: 2em;
    }

    input {
        width: 100%;
        margin-bottom: 1em;
    }
`;

const UserForm = props => {
    // Set the default state of the form
    const [values, setValues] = useState();

    // Update the state when a user types in the form
    const onChange = event => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    return (
        <Wrapper>
            {/* Perform the mutation when a user submits the form */}
            <Form
                onSubmit={e => {
                    e.preventDefault();
                    props.action({
                        variables: {
                            ...values
                        }
                    });
                }}
            >
                {props.formType === 'signup' && (
                    <React.Fragment>
                        <label htmlFor="username">Username:</label>
                        <input
                            required
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            onChange={onChange}
                        />
                    </React.Fragment>
                )}    
                <label htmlFor="email">Email:</label>
                <input
                    required
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email"
                    onChange={onChange}
                />
                <label htmlFor="password">Password:</label>
                    <input
                        required
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        onChange={onChange}
                    />
                    <Button type="submit">Submit</Button>
            </Form>    
        </Wrapper>
    );
};

export default UserForm;