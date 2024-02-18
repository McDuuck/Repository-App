import { Formik } from 'formik';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { View, Pressable, StyleSheet } from 'react-native';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import React from 'react';


const styles = StyleSheet.create({
    singInButton: {
        backgroundColor: theme.colors.primary,
        color: 'white',
        borderRadius: 5,
        padding: 10,
        textAlign: 'center',
        fontFamily: theme.fonts.main,
    },
    signInForm: {
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#e1e4e8',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        fontFamily: theme.fonts.main,
    },
});

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required'),
});

const SignIn = () => {
  const { setUserIsLoggedIn } = useContext(UserContext);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const data = await signIn({ username, password });

      if (data) {
        setUserIsLoggedIn(data);
      }

      navigate('/Repositories')
    } catch (e) {
      console.log('Sign in catch error ' + e)
    }
  };

  return (
    <Formik 
    initialValues={{ username: '', password: '' }} 
    onSubmit={onSubmit}
    validationSchema={validationSchema}
    >
      {({ handleSubmit }) => (
        <View style={theme.signInForm}>
          <FormikTextInput style={styles.signInForm} name="username" placeholder="Username" />
          <FormikTextInput style={styles.signInForm} name="password" placeholder="Password" secureTextEntry />
          <Pressable onPress={handleSubmit}>
            <Text style={styles.singInButton}>Sign In</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;