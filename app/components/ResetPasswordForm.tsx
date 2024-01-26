import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebaseConfig"; // Make sure to import your Firebase configuration
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";

const schema = z
  .object({
    email: z.string(),
  })
  .refine(
    (data) =>
      data.email?.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
    {
      path: ["email"],
      message: "INVALID_EMAIL",
    }
  );

const ResetForm = () => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    reset();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, data.email);
      setLoading(false);
      Toast.show({
        type: "success",
        text1: t("checkYourEmail"),
        text2: "",
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30,
      });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Toast />
        <Controller
          control={control}
          render={({ field }) => (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter Email"
                onChangeText={field.onChange}
                value={field.value}
                style={styles.input}
                autoCapitalize="none"
              />
            </View>
          )}
          name="email"
          rules={{ required: true }}
          defaultValue=""
        />
        <Text style={styles.error}>{t(errors.email?.message)}</Text>
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
            {t('resetPassword')}
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
  inputContainer: {
    marginBottom: 16,
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

export default ResetForm;
