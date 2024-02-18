import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required'),
});

export const SignInContainer = ({ onSubmit }) => {
    return (
      <Formik
        initialValues={{ username: '', password: '' }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({ handleSubmit }) => (
          <View>
            <FormikTextInput
              name="username"
              placeholder="Username"
              testID="username"
            />
            <FormikTextInput
              name="password"
              placeholder="Password"
              testID="password"
            />
            <Pressable onPress={handleSubmit}>
              <Text>Sign in</Text>
            </Pressable>
          </View>
        )}
      </Formik>
    );
  };