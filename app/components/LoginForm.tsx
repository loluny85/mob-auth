import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuthStore } from '../store/useAuthStore';
import useThemeStore from '../store/useThemeStore';
import { useTranslation } from "react-i18next";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth, generateToken, messaging, onMessageListener } from "../../firebaseConfig";
import { useNavigation } from '@react-navigation/native';
import Profile from '../screens/Profile';


const schema = z.object({
  emailOrUserName: z.string(),
  password: z.string().min(8),
}).refine((data) => data.emailOrUserName.length >= 6, {
  path: ["emailOrUserName"],
  message: "Username too short"
});

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  const { login } = useAuthStore();

  const navigation = useNavigation();


  const onSubmit = async (data:any) => {
    try {
        const response = await signInWithEmailAndPassword(auth, 'kaykay@menon.com', 'farziseries');
        if (response && response.user) {
          console.log("Login successful:", response.user);
          navigation.navigate('Profile');
        } else {
          console.log("Unexpected response:", response);
        }
      } catch (error:any) {
          console.error("Authentication error:", error.message);
      }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={[styles.title, { fontSize: theme.titleFontSize }]}>{t('login')}</Text>
        <Controller
          control={control}
          render={({ field }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('username')}</Text>
              <TextInput
            placeholder={t('username')}
            onChangeText={field.onChange}
            value={field.value}
            style={styles.input}
          />
              <Text style={styles.error}>{errors.emailOrUserName?.message}</Text>
            </View>
          )}
          name="emailOrUserName"
          rules={{ required: true }}
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t('password')}</Text>
              <TextInput
            placeholder={t('password')}
            onChangeText={field.onChange}
            value={field.value}
            style={styles.input}
            secureTextEntry
          />
              <Text style={styles.error}>{errors.password?.message}</Text>
            </View>
          )}
          name="password"
          rules={{ required: true }}
          defaultValue=""
        />
        <Button
          title={loading ? t('loggingIn') : t('login')}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '80%',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
  },
  error: {
    color: 'red',
    fontSize: 14,
  },
});

export default LoginForm;
