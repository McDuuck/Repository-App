import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useQuery, gql, useMutation } from '@apollo/client';
import { ItemSeparator } from './RepositoryList';
import { useNavigate } from 'react-router-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
    basic: {
        backgroundColor: 'white',
        padding: 10,
    },

    buttonStyle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        padding: 10,
    },

    visitButton: {
        backgroundColor: theme.colors.primary,
        color: 'white',
        height: 40,
        width: 150,
        borderRadius: 3,
        textAlign: 'center',
    },

    deleteButton: {
        backgroundColor: 'red',
        color: 'white',
        height: 40,
        width: 150,
        borderRadius: 3,
        textAlign: 'center',
    },
    visitButtonText: {
        color: 'white',
        textAlign: 'center',
        lineHeight: 40,
    },

    deleteButtonText: {
        color: 'white',
        textAlign: 'center',
        lineHeight: 40,
    },

    background: {
        backgroundColor: '#e1e4e8',
        flex: 1,
    },

    listComponent: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: 10,
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


const MY_REVIEWS = gql`
    query {
        me {
            id
            username
            reviews {
                edges {
                    node {
                        id
                        text
                        rating
                        createdAt
                        repository {
                            id
                            fullName
                        }
                    }
                }
            }
        }
    }
`;

const DELETE_REVIEW = gql`
    mutation deleteReview($id: ID!) {
        deleteReview(id: $id)
    }
`;

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


const MyReviews = () => {
    const { data, loading, refetch } = useQuery(MY_REVIEWS, {
        fetchPolicy: 'cache-and-network',
    });
    const navigate = useNavigate();

    
    const [reviews, setReviews] = useState(null);
    
    useEffect(() => {
        if (data && data.me) {
            setReviews(data.me.reviews.edges.map(edge => edge.node));
        }
    }, [data]);
    
    const visitRepository = (id) => {
        navigate(`/RepositoryDetails/${id}`);
    }

    const [deleteReview] = useMutation(DELETE_REVIEW, {
        refetchQueries: [{ query: MY_REVIEWS }],
    });

    const handleDeleteReview = async (id, repositoryId) => {
        try {
            Alert.alert(
                "Delete review",
                "Are you sure you want to delete this review?",
                [
                    {
                        text: "Cancel",
                        style: "cancel"
                    },
                    { 
                        text: "OK", 
                        onPress: async () => await deleteReview({ 
                            variables: { id },
                            refetchQueries: [
                                { query: MY_REVIEWS },
                                { 
                                    query: GET_REPOSITORY_DETAILS, 
                                    variables: { id: repositoryId } 
                                }
                            ],
                        }) 
                    }
                ]
            );
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <View style={styles.background}>
            <FlatList
                data={reviews}
                ItemSeparatorComponent={ItemSeparator}
                renderItem={({ item }) => {
                    const date = new Date(item.createdAt);
                    const formattedDate = `${date.getDate().toString().padStart(2, '0')}.${(date.getMonth()+1).toString().padStart(2, '0')}.${date.getFullYear()}`;
                    return (
                        <View>
                        <View style={styles.listComponent}>
                            <Text style={styles.scoreText}>{item.rating}</Text>
                            <View style={styles.rightSideItems}>
                                <Text style={styles.boldText}>{item.repository.fullName}</Text>
                                <Text>{formattedDate}</Text>
                                <Text>{item.text}</Text>
                            </View>
                        </View>
                            <View style={styles.buttonStyle}>
                            <TouchableOpacity style={styles.visitButton} onPress={() => visitRepository(item.repository.id)}>
                                <Text style={styles.visitButtonText}>Visit Repository</Text>
                            </TouchableOpacity>
                                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteReview(item.id, item.repository.id)}>
                                    <Text style={styles.deleteButtonText}>Delete review</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    );
                }}
                keyExtractor={({ id }) => id}
            />
        </View>
    );
    };

export default MyReviews;