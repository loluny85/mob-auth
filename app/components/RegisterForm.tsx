import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const RegisterForm = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    // Perform registration logic
    onRegister({ email, password, confirmPassword });
  };

  return (
    <View>
      <Text>Register</Text>
    </View>
  );
};

export default RegisterForm;
