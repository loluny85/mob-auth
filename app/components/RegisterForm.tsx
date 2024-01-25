import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
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
import { validations } from "../config/config";

const RegisterForm = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const { register: createUser } = useAuthStore();
  const navigation = useNavigation();

  const schema = z
    .object({
      username: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
      country: z.string().min(1),
    })
    .refine((data) => data.username.length >= 1, {
      path: ["username"],
      message: t("shortUserName"),
    })
    .refine((data) => data.username.length <= 10, {
      path: ["username"],
      message: t("longUserName"),
    });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
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
    
    console.log(data);
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
        console.log("Document written with ID: ", docRef.id);
        alert("Account created successfully");

        navigation.navigate("Profile");
      } catch (error) {
        debugger;
        setLoading(false);
        alert(t("USER_CREATION_NOT_SUCCESSFUL"));
        console.error("Error adding document: ", error);
      }
    } catch (error) {
      debugger;
      setLoading(false);
      alert(
        error.message.includes("email-already-in-use")
          ? t("EMAIL_EXISTS")
          : t("USER_CREATION_FAILED")
      );
      console.error("Registration fail", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
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
              />
            )}
            name="username"
            rules={{ required: true }}
            defaultValue=""
          />
          <Text style={styles.error}>
            {errors.username?.message && <>{errors.username?.message}</>}
          </Text>
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
              />
            )}
            name="email"
            rules={{ required: true }}
            defaultValue=""
          />
          <Text style={styles.error}>
            {errors.email?.message && <>{errors.email?.message}</>}
          </Text>
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
              />
            )}
            name="password"
            rules={{ required: true }}
            defaultValue=""
          />
          <Text style={styles.error}>
            {errors.password?.message && <>{errors.password?.message}</>}
          </Text>
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
        <Button
          title={loading ? t("creatingUser") : t("register")}
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
    color: "white",
  },
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    color: "white",
  },
});

export default RegisterForm;
