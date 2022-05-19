import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_NOTES } from '../gql/query';

const MyNotes = () => {
    useEffect(() => {
        // Update the document title
        document.title = 'My Notes - Notedly';
    });

    const { loading, error, data } = useQuery(GET_MY_NOTES);

    // If the data is loading, our app will display a loading message
    if (loading) return 'Loading...';
    // If there's an error fetching the data, display an error message
    if (error) return `Error! ${error.message}`;
    // If the query is successful and there aren't notes, display a message
    if (data.me.notes.length !== 0) {
        return <NoteFeed notes={data.me.notes} />
    } else {
        return <p>No notes yet</p>;
    }
};

export default MyNotes;