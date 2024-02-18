import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import theme from '../theme';
import TextInput from './TextInput';
import Text from './Text';
import React from 'react';

const styles = StyleSheet.create({
  errorText: {
    color: '#d73a4a',
    fontFamily: theme.fonts.main,
  },
  error: {
    borderColor: '#d73a4a',
  },
});

const FormikTextInput = ({ name, testID, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        style={styles.error}
        testID={testID}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;