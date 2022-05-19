import React from "react";
import { useQuery, gql } from "@apollo/client";
// import ReactMarkdown from "react-markdown";

// import Button from "../components/Button";
import Button from '../components/Button';
import NoteFeed from "../components/NoteFeed";

// Import the requried libraries

// GraphQL query, stored as a variable
const GET_NOTES = gql`
    query NoteFeed($cursor: String) {
        noteFeed(cursor: $cursor) {
            cursor
            hasNextPage
            notes {
                id
                createdAt
                content
                favoriteCount
                author {
                    username
                    id
                    avatar
                }
            }
        }
    }
`;

const Home = () => {
    // Query hook
    const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

    // If data is loading, display a lading message
    if (loading) return <p>Loading...</p>;
    // If there's an error fetching the data, display an error message
    if (error) return <p>Error!</p>;

    // If the data is successful, display the data in our UI
    return (
        // add a <React.Fragment> element to provide a parent element
        <React.Fragment>
            <NoteFeed notes={data.noteFeed.notes} />
            {/* Only display the Load More button if hasNextPage is true */}
            {data.noteFeed.hasNextPage && (
                <Button
                    onClick={() =>
                        fetchMore({
                            variables: {
                                cursor: data.noteFeed.cursor
                            },
                            updateQuery: (previousResult, { fetchMoreResult }) => {
                                return {
                                    noteFeed: {
                                        cursor: fetchMoreResult.noteFeed.cursor,
                                        hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                                        // Combine the new results and the old
                                        notes: [
                                            ...previousResult.noteFeed.notes,
                                            ...fetchMoreResult.noteFeed.notes
                                        ],
                                        __typename: 'noteFeed'
                                    }
                                };
                            }
                        })
                    }
                >
                    Load more
                </Button>
            )}            
        </React.Fragment>
    );
    
};

export default Home;