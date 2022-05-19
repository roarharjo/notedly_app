import React, { useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
// Import the NoteForm component
import NoteForm from "../components/NoteForm";

import { GET_MY_NOTES, GET_NOTES } from "../gql/query";


// Note query
const NEW_NOTE = gql`
    mutation newNote($content: String!) {
        newNote(content: $content) {
            id
            content
            favoriteCount
            favoritedBy {
                id
                username
            }
            author {
                username
                id
            }
        }
    }
`;


const NewNote = props => {
    useEffect(() => {
        // Update the document title
        document.title = 'New Note - Notedly';
    });

    const [data, { loading, error }] = useMutation(NEW_NOTE, {
        // Refetch the GET_NOTES query to update the cache
        refetchQueries: [{ query: GET_MY_NOTES}, { query: GET_NOTES }],
        onCompleted: data => {
            // When complete, redirect the user to the note page
            props.history.push(`note/${data.newNote.id}`);
        }
    });

    return (
        <React.Fragment>
            {/* as the mutation is loading, display a loading message */}
            {loading && <p>Loading...</p>}
            {/* If there's an error, sidplay a error message */}
            {error && <p>Error saving the note</p>}
            {/** the form component, passing the mutation data as a prop */}
            <NoteForm action={data} />
        </React.Fragment>
    );
};

export default NewNote;
