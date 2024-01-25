import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const ResetPasswordForm = ({ onResetPassword }) => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    // Perform reset password logic
    onResetPassword({ email });
  };

  return (
    <View>
      <Text>Reset</Text>
    </View>
  );
};

export default ResetPasswordForm;
