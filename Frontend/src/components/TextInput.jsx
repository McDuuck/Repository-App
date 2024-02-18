import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';
import React from 'react';

const styles = StyleSheet.create({
  error: {
    borderColor: '#d73a4a',
    fontFamily: theme.fonts.main,
  },
});

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [style];

  if (error) {
    textInputStyle.push(styles.error);
  }

  return <NativeTextInput style={textInputStyle} {...props} />;
};

export default TextInput;