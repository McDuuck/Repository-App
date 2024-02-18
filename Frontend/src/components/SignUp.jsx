import React from "react";
import { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import { View, Pressable, StyleSheet } from "react-native";
import * as yup from "yup";
import { gql, useMutation } from '@apollo/client'
import { Formik } from "formik";
import theme from "../theme";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";

const styles = StyleSheet.create({
    SignForm: {
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#e1e4e8',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        fontFamily: theme.fonts.main,
    },
    SignUpButton: {
        backgroundColor: theme.colors.primary,
        color: 'white',
        borderRadius: 5,
        padding: 5,
        textAlign: 'center',
        fontFamily: theme.fonts.main,
    },
    errorText: {
        color: 'red',
        fontFamily: theme.fonts.main,
        paddingTop: 5,
        fontWeight: 'bold',
    }
});

const CREATE_USER = gql`
    mutation createUser($username: String!, $password: String!) {
        createUser(user: { username: $username, password: $password }) {
            username
        }
    }
`;

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required')
        .min(5, 'Username must be at least 5 characters long')
        .max(30, 'Username must be at most 30 characters long'),
    password: yup
        .string()
        .required('Password is required')
        .min(5, 'Password must be at least 5 characters long')
        .max(50, 'Password must be at most 50 characters long'),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Password confirmation is required')
});

const SignUp = () => {
    const { setUserIsLoggedIn } = useContext(UserContext);
    const [createUser] = useMutation(CREATE_USER);
    const [errorMessage, setErrorMessage] = useState();
    const navigate = useNavigate();
    const [signIn] = useSignIn();

    const onSubmit = async (values) => {
        const { username, password } = values;
        
        try {
            const { data } = await createUser({ 
                variables: { 
                    username, 
                    password 
                },
            });
            setUserIsLoggedIn(data);
            signIn({ username, password });
        } catch (e) {
            setErrorMessage(e.message);
        }
        navigate('/Repositories');
    }

    return (
        <Formik
        initialValues={{ username: '', password: '', passwordConfirm: ''}}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        >
            {({ handleSubmit }) => (
                <View style={theme.signInForm}>
                    <FormikTextInput style={styles.SignForm} name="username" placeholder="Username" />
                    <FormikTextInput style={styles.SignForm} name="password" placeholder="Password" secureTextEntry />
                    <FormikTextInput style={styles.SignForm} name="passwordConfirm" placeholder="Password confirm" secureTextEntry />
                    <Pressable style={styles.SignUpButton} onPress={handleSubmit}>
                        <Text style={styles.SignUpButton} onPress={handleSubmit}>Sign Up</Text>
                    </Pressable>
                    {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
                </View>
            )}
        </Formik>
    );
};

export default SignUp;