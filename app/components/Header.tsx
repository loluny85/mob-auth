import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import RNPickerSelect from "react-native-picker-select";
import { languageOptions } from "../config/config";
import { useTranslation } from "react-i18next";
import useThemeStore from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore";
import { signOut } from 'firebase/auth';
import { auth } from "@/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast  from 'react-native-toast-message';

const Header = () => {
  const { t, i18n } = useTranslation();
  const { setTheme, setIsRtl } = useThemeStore();
  const [language, setLanguage] = useState("");
  const {isAuthenticated, signout} = useAuthStore()
  const navigation = useNavigation();

  const changeLanguage = (lng: any) => {
    setLanguage(lng);
    i18n.changeLanguage(lng);
    setTheme(lng);
    setIsRtl(lng);
  };

  const clearLocalState = () => {
    signout();
  }

  const signOutUser = async (): Promise<void> => {
    try {
      await signOut(auth);
      await AsyncStorage.clear();
      clearLocalState()
      Toast.show({
        type: 'success',
        text1: t('signedOut'),
        text2: '',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30
      });

      setTimeout(() => {
        navigation.navigate('Access');
      }, 1500);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: t('SIGNOUT_FAILED'),
        text2: '',
        visibilityTime: 2000,
        autoHide: true,
        topOffset: 30
      });
    }
  };

  return (
    <View style={styles.container}>
        <Toast/>
      <Ionicons name="basketball" size={24} color="white"></Ionicons>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {isAuthenticated && (
          <Button  color="#fff"
            title={t('signOut')}
            onPress={signOutUser}
          />
        )}
        <RNPickerSelect
          onValueChange={(value) => changeLanguage(value)}
          items={languageOptions}
          value={language}
          style={pickerSelectStyles}
          placeholder={{ label: 'Select language', value: null }}
        />
      </View>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#3498db",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  signOutButton: {
    color: "#fff",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "blue",
  },
  signOutButtonText: {
    color: "white",
  },
};

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

export default Header;
