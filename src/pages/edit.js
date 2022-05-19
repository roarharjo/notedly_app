import React from "react";
// Import GraphQL dependencies
import { useMutation, useQuery } from "@apollo/client";

// import the NoteForm component
import NoteForm from "../components/NoteForm";
import { GET_NOTE, GET_ME } from "../gql/query";
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
    // Store the id found in the url as a variable
    const id = props.match.params.id;
    // define our note query
    const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });
    // fetch the current user's data
    const { data: userdata } = useQuery(GET_ME);
    // define our mutation
    const [editNote] = useMutation(EDIT_NOTE, {
        variables: {
            id
        },
        onCompleted: () => {
            props.history.push(`/note/${id}`);
        }
    });

    // If the data is loading, display a loading message
    if (loading) return 'Loading...';
    // If there's an error fetching the data, display an error message
    if (error) return <p>Error!</p>;
    // If the current user and the author of the note do not match
    if (userdata.me.id !== data.note.author.id) {
        return <p>You do not have access to edit this note</p>;
    }
    // Pass the data and mutation to the form component
    return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;