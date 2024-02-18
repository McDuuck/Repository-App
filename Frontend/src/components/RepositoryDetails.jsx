import Text from "./Text"
import { View, StyleSheet, Pressable, Linking, FlatList } from 'react-native'
import React from "react"
import DisplayImage from "./RepositoryItem"
import { gql, useQuery } from "@apollo/client"
import { useParams } from 'react-router-native';
import theme from "../theme"

const styles = StyleSheet.create({
    basic: {
        backgroundColor: 'white',
        padding: 10,
    },

    background: {
        backgroundColor: '#e1e4e8',
        flex: 1,
    },

    linkButton: {
        backgroundColor: theme.colors.primary,
        color: 'white',
        marginTop: 10,
        padding: 10,
        borderRadius: 3,
        textAlign: 'center',
    },
    listComponent: {
        backgroundColor: 'white',
        padding: 10,
        margin: 5,
        flexDirection: 'row',
    },
    rightSideItems: {
        marginLeft: 10,
        flexDirection: 'column',
        flexShrink: 1,
    },
    boldText: {
        fontWeight: 'bold',
        fontFamily: theme.fonts.main,
    },
    scoreText: {
        color: theme.colors.primary,
        fontWeight: 'bold',
        lineHeight: 40,
        textAlign: 'center',
        height: 40,
        width: 40,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderRadius: 20, 
        backgroundColor: 'white',
    }
})

const GET_REPOSITORY_DETAILS = gql`
    query GetRepositoryDetails($id: ID!) {
        repository(id: $id) {
            id
            fullName
            url
            description
            language
            forksCount
            stargazersCount
            reviewCount
            ratingAverage
            ownerAvatarUrl
            reviews (first: 7){
                edges {
                  node {
                    id
                    text
                    rating
                    createdAt
                    user {
                      id
                      username
                    }
                  }
                cursor
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    }
`;


const RepositoryDetails = (variables) => {
    const { id } = useParams();

    const { loading, error, data, fetchMore } = useQuery(GET_REPOSITORY_DETAILS, {
        variables: { id },
        notifyOnNetworkStatusChange: true,
    });

    const handlePress = () => {
        Linking.openURL(data.repository.url);
    };

    const handleFetchMore = () => {
        const canFetchMore = data.repository.reviews.pageInfo.hasNextPage;
    
        if (!canFetchMore) {
            return;
        }
    
        fetchMore({
            variables: {
                after: data.repository.reviews.pageInfo.endCursor,
                ...variables,
            },
            updateQuery: (previousResult, { fetchMoreResult }) => {
                const newEdges = fetchMoreResult.repository.reviews.edges;
                const pageInfo = fetchMoreResult.repository.reviews.pageInfo;
    
                return newEdges.length
                    ? {
                        repository: {
                            ...previousResult.repository,
                            reviews: {
                                ...previousResult.repository.reviews,
                                edges: [...previousResult.repository.reviews.edges, ...newEdges],
                                pageInfo,
                            },
                        },
                    }
                    : previousResult;
            },
        });
    };

    if (loading && !data) {
        return <Text>Loading...</Text>;
    }

    if (error) {
        return <Text>Error! {error.message}</Text>;
    }

    return (
        <View style={styles.background}>
            <View style={styles.basic}>
                <DisplayImage ownerAvatarUrl={data.repository.ownerAvatarUrl} 
                    fullName={data.repository.fullName} 
                    description={data.repository.description}
                    language={data.repository.language}
                    forksCount={data.repository.forksCount}
                    stargazersCount={data.repository.stargazersCount}
                    reviewCount={data.repository.reviewCount}
                    ratingAverage={data.repository.ratingAverage}
                    />
                <Pressable onPress={handlePress}>
                    <Text style={styles.linkButton}>
                        Open in GitHub
                    </Text>
                </Pressable>
            </View>
            <FlatList
                data={data.repository.reviews.edges}
                onEndReached={handleFetchMore}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => {
                    const date = new Date(item.node.createdAt);
                    const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth()+1).toString().padStart(2, '0')}.${date.getFullYear()}`;

                    return (
                        <View style={styles.listComponent}>
                            <Text style={styles.scoreText}>{item.node.rating}</Text>
                            <View style={styles.rightSideItems}>
                                <Text style={styles.boldText}>{item.node.user.username}</Text>
                                <Text>{formattedDate}</Text>
                                <Text>{item.node.text}</Text>
                            </View>
                        </View>
                    );
                }}
            />
        </View>
    );
}

export default RepositoryDetails;