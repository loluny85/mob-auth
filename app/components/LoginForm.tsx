import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Perform login logic
    onLogin({ email, password });
  };

  return (
    <View>
      <Text>Loginform</Text>
    </View>
  );
};

export default LoginForm;
