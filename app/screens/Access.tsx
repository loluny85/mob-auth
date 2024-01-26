import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Text, Button } from "react-native";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../components/LangSwitcher";
import Header from "../components/Header";
import ResetPasswordForm from "../components/ResetPasswordForm";
import useThemeStore from "../store/useThemeStore";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../store/useAuthStore";


const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const response = useAuthStore()
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [resetPassword, setResetPassword] = useState(false);
  const { isRtl } = useThemeStore();
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // const handleResetPassword = (data: string) => {
  //   setResetPassword(true);
  // };

  // handleResetPassword('abc')

  return (
    <View>
      <Header />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.rightSide]}>
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <View style={[styles.rightSide]}>
            <View style={[isRtl ? styles.containerRTL : null]}>
              {isLogin ? (
                <>
                  <View style={{ marginTop: 80 }}>
                    <Button
                      title={t('resetPassword')}
                      onPress={() => {
                        setResetPassword(true);
                      }}
                    />
                    {resetPassword ? <ResetPasswordForm /> : null}
                  </View>

                  <View
                    style={[
                      styles.createAccountContainer,
                      isRtl ? styles.containerRTL : styles.containerLTR,
                    ]}
                  >
                    <Text className="font-bold">{t("accountDontHave")}</Text>
                    <Button
                      title={t("createAccount")}
                      onPress={() => {
                        toggleForm();
                      }}
                    />
                  </View>
                </>
              ) : null}
              {!isLogin ? (
                <View
                  style={[
                    styles.createAccountContainer,
                    isRtl ? styles.containerRTL : styles.containerLTR,
                  ]}
                >
                  <Text> {t("accountHave")} </Text>
                  <Button
                    title={t("login")}
                    onPress={() => {
                      toggleForm();
                    }}
                  />
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  rightSide: {
    flex: 1,
    padding: 8,
  },
  buttonContainer: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerLTR: {
    flexDirection: "row",
  },
  containerRTL: {
    flexDirection: "row-reverse",
  },
  createAccountContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 80,
  },
});

export default App;
