import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";
import { useAuthStore } from "../store/useAuthStore";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import RNPickerSelect from "react-native-picker-select";
import { MIN_PASSWORD_LENGTH, validations } from "../config/config";
import Toast from "react-native-toast-message";

const RegisterForm = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { register: createUser } = useAuthStore();
  const navigation = useNavigation();

  const schema = z
    .object({
      username: z.string(),
      email: z.string(),
      password: z.string(),
      country: z.string().min(1),
    })
    .refine(data => data.password.length >= MIN_PASSWORD_LENGTH, {
      path: ['password'],
      message: 'PASSWORD_TOO_SHORT',
    })
    .refine(
      (data) => data.username.length >= validations[data.country].userNameMinChars,
      {
        path: ['username'],
        message: 'USERNAME_TOO_SHORT_MIN_CHARS',
      }
    )
    .refine((data) => data.username.length <= 15, {
      path: ['username'],
      message: 'USERNAME_TOO_LONG',
    })
    .refine(
      (data) => !!data.username.match(validations[data.country].validRegex),
      {
        path: ['username'],
        message: 'userNameIncorrectFormat',
      }
    ).refine(
      (data) => data.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
      {
        path: ['email'],
        message: 'INVALID_EMAIL',
      }
    );

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
    
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    username,
    email,
    password,
    country,
    register: registerUser,
  } = useAuthStore();

  const onSubmit = async (data: any) => {
    setLoading(true);
    reset();
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      try {
        const docRef = await addDoc(collection(db, "users"), {
          email: data.email,
          userName: data.username,
          country: data.country,
        });
        createUser({
          username: data.username,
          email: data.email,
          country: data.country,
        });
        setLoading(false);
        reset()
        navigation.navigate("Profile");
      } catch (error) {
        showFailureErrorToast()
        setLoading(false);
      }
    } catch (error) {
      showFailureErrorToast()
      setLoading(false);
    }
  };

  const showFailureErrorToast = () => {
    Toast.show({
      type: 'error', // or 'error', 'info', 'custom'
      text1: t('USER_CREATION_FAILED'),
      text2: '',
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 30
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.form}>
      <Toast/>
        <Text style={[styles.title]}>{t("register")}</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("username")}</Text>
          <Controller
            control={control}
            render={({ field }) => (
              <TextInput
                placeholder={t("username")}
                onChangeText={field.onChange}
                value={field.value}
                style={styles.input}
                autoCapitalize="none"
              />
            )}
            name="username"
            rules={{ required: true }}
            defaultValue=""
          />
          <Text style={styles.error}>{errors.username?.message && <>{t(errors.username?.message, {minLength: validations[getValues('country')]?.userNameMinChars})}</>}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("email")}</Text>
          <Controller
            control={control}
            render={({ field }) => (
              <TextInput
                placeholder={t("email")}
                onChangeText={field.onChange}
                value={field.value}
                style={styles.input}
                autoCapitalize="none"
              />
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />
          <Text style={styles.error}>{errors.email?.message && <>{t(errors.email?.message)}</>}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("password")}</Text>
          <Controller
            control={control}
            render={({ field }) => (
              <TextInput
                placeholder={t("password")}
                onChangeText={field.onChange}
                value={field.value}
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
              />
            )}
            name="password"
            rules={{ required: true }}
            defaultValue=""
          />
          <Text style={styles.error}>{errors.password?.message && <>{t(errors.password?.message, {minLength: MIN_PASSWORD_LENGTH})}</>}</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{t("country")}</Text>

          <Controller
            control={control}
            render={({ field }) => (
              <RNPickerSelect
                onValueChange={(value) => field.onChange(value)}
                items={Object.keys(validations).map((i) => ({
                  value: validations[i].code,
                  label: validations[i].country,
                }))}
                value={field.value}
                style={pickerSelectStyles}
              />
            )}
            name="country" // Make sure the name matches the field name in the form
            rules={{ required: "Please select a country" }} // Add any rules if needed
            defaultValue="" // Set the initial value here if needed
          />
          <Text style={styles.error}>
            {errors.country?.message && <>{errors.password?.message}</>}
          </Text>
        </View>
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          style={{
            backgroundColor: '#3498db',
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {loading ? t("creatingUser") : t("register")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "80%",
  },
  title: {
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
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
    borderColor: "gray",
    borderRadius: 8,
    padding: 8,
  },
  error: {
    color: "red",
    fontSize: 14,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "#000",
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "#000",
  },
});

export default RegisterForm;