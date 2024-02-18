import React from 'react';
import Text from './Text';
import { View, Pressable, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import * as yup from 'yup';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { useNavigate } from 'react-router-native';


const styles = StyleSheet.create({
    reviewButton: {
        backgroundColor: theme.colors.primary,
        color: 'white',
        borderRadius: 5,
        padding: 5,
        textAlign: 'center',
        fontFamily: theme.fonts.main,
    },
    reviewForm: {
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#e1e4e8',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        fontFamily: theme.fonts.main,
    },
    errorText: {
        color: 'red',
        fontFamily: theme.fonts.main,
        paddingTop: 5,
        fontWeight: 'bold',
    }
});

export const CREATE_REVIEW = gql`
    mutation createReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
        createReview(review: { repositoryName: $repositoryName, ownerName: $ownerName, rating: $rating, text: $text }) {
            repositoryId
        }
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

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    repositoryName: yup
        .string()
        .required('Repository Name is required'),
    rating: yup
        .number()
        .required('Rating is required')
        .min(0, 'Rating must be between 0 and 100')
        .max(100, 'Rating must be between 0 and 100'),
    review: yup
        .string()
});

const CreateReview = () => {
    const navigate = useNavigate();
    const [createReview, { data, loading, error }] = useMutation(CREATE_REVIEW);
    const { data: repositoryData, loading: repositoryLoading, error: repositoryError, refetch } = useQuery(GET_REPOSITORY_DETAILS, {
        variables: { id: data?.createReview.repositoryId },
    });
    const [errorMessage, setErrorMessage] = useState();

    const onSubmit = async (values) => {
        const { username, repositoryName, rating, review } = values;

        try {
            const { data } = await createReview({
                variables: {
                    repositoryName,
                    ownerName: username,
                    rating: parseInt(rating),
                    text: review
                }
            });
            await refetch();
            navigate(`/RepositoryDetails/${data.createReview.repositoryId}`);
        } catch (e) {
            setErrorMessage(e.message);
        }

    };
    return (
        <Formik 
        initialValues={{ username: '', repositoryName: '', rating: '', review: ''}} 
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >
        {({ handleSubmit }) => 
            <View style={theme.signInForm}>
                <FormikTextInput style={styles.reviewForm} name="username" placeholder="Username" />
                <FormikTextInput style={styles.reviewForm} name="repositoryName" placeholder="Repository Name" />
                <FormikTextInput style={styles.reviewForm} name="rating" placeholder="Rating between 0 and 100" />
                <FormikTextInput style={styles.reviewForm} name="review" placeholder="Review" />
                <Pressable onPress={handleSubmit} style={styles.reviewButton}>
                <Text style={styles.reviewButton} onPress={handleSubmit}>Create a review</Text>
                </Pressable>
                {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
            </View>
        }
    </Formik>
    );
};

export default CreateReview;