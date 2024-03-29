import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "../store/useAuthStore";
import useThemeStore from "../store/useThemeStore";
import { useTranslation } from "react-i18next";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { MIN_PASSWORD_LENGTH } from "../config/config";
import Toast from "react-native-toast-message";
import { collection, getDocs } from "firebase/firestore";

const schema = z
  .object({
    emailOrUserName: z.string(),
    password: z.string(),
  })
  .refine((data) => data.emailOrUserName.length >= 6, {
    path: ["emailOrUserName"],
    message: "USERNAME_TOO_SHORT",
  })
  .refine((data) => data.password.length >= MIN_PASSWORD_LENGTH, {
    path: ["password"],
    message: "PASSWORD_TOO_SHORT",
  });

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { t } = useTranslation();
  const { theme } = useThemeStore();

  const navigation = useNavigation();

  const { email, password, login } = useAuthStore();

  const signInWithEmail = async (data: FormData, isEmail: boolean) => {
    const { emailOrUserName, password } = data;
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        emailOrUserName,
        password
      );
      setLoading(false);
      if (response && response.user) {
        login({
          email: emailOrUserName,
        });
        Toast.show({
          type: "success",
          text1: t("loginSuccessful"),
          text2: "",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
        });
        reset();
        setTimeout(() => {
          navigation.navigate("Profile");
        }, 1500);
      } else {
        const errorMessage =
          response instanceof Error ? response.message : "Unknown error";
        Toast.show({
          type: "error",
          text1: errorMessage,
          text2: "",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: t("INVALID_LOGIN_CREDENTIALS"),
        text2: "",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
      });
      setLoading(false);
    }
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const isEmail = data.emailOrUserName.match(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    )
      ? true
      : false;

    if (isEmail) {
      signInWithEmail(data, true);
    } else {
      let isMatchFound = false;
      const querySnapshot = await getDocs(collection(db, "users"));
      querySnapshot.forEach((doc) => {
        const { userName, email } = doc.data();
        if (userName === data.emailOrUserName) {
          isMatchFound = true;
          signInWithEmail(
            {
              emailOrUserName: email,
              password: data.password,
            },
            false
          );
        }
      });
      if (!isMatchFound) {
        setLoading(false);
        Toast.show({
          type: "error",
          text1: t("USERNAME_NOT_FOUND"),
          text2: "",
          visibilityTime: 2000,
          autoHide: true,
          topOffset: 30,
        });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.form]}>
        <Toast />

        <Text style={[styles.title, { fontSize: theme.titleFontSize }]}>
          {t("login")}
        </Text>
        <Controller
          control={control}
          render={({ field }) => (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>{t("username")}</Text>
              <TextInput
                placeholder={t("username")}
                onChangeText={field.onChange}
                value={field.value}
                style={styles.input}
                autoCapitalize="none"
              />
              <Text style={styles.error}>
                {t(errors.emailOrUserName?.message)}
              </Text>
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
              <Text style={styles.label}>{t("password")}</Text>
              <TextInput
                placeholder={t("password")}
                onChangeText={field.onChange}
                value={field.value}
                style={styles.input}
                secureTextEntry
                autoCapitalize="none"
              />
              <Text style={styles.error}>
                {t(errors.password?.message, {
                  minLength: MIN_PASSWORD_LENGTH,
                })}
              </Text>
            </View>
          )}
          name="password"
          rules={{ required: true }}
          defaultValue=""
        />
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          style={{
            backgroundColor: "#3498db",
            padding: 10,
            borderRadius: 5,
          }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>
            {loading ? t("loggingIn") : t("login")}
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
  containerRTL: {
    flexDirection: "row-reverse",
  },
});

export default LoginForm;
