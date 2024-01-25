import React, {useState} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import { languageOptions } from '../config/config';
import { useTranslation } from "react-i18next";
import useThemeStore from '../store/useThemeStore';



const Header = ({ title, onSignOut, isAuthenticated }) => {
    const [selectedValue, setSelectedValue] = useState(null);
    const { i18n } = useTranslation();
  const { theme, setTheme, setIsRtl } = useThemeStore();
const [language, setLanguage] = useState('')

  const changeLanguage = (lng: ThemeKey) => {
    setLanguage(lng)
    i18n.changeLanguage(lng);
    setTheme(lng);
    setIsRtl(lng)
    
  };

  return (
    <View style={styles.container}>
        <Ionicons name="basketball" size={24} color="white"></Ionicons>
      <View>
      {isAuthenticated && (
        <TouchableOpacity onPress={onSignOut} style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>Sign Out</Text>
          
        </TouchableOpacity>
      )}
      <RNPickerSelect
            onValueChange={(value) => changeLanguage(value)}
            items={languageOptions}
            value={language}
            style={pickerSelectStyles}
        />
        </View>
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#3498db', // Header background color
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white', // Title text color
  },
  signOutButton: {
    color: '#fff',
    padding: 8,
    borderRadius: 5,
    backgroundColor: 'blue', // Sign out button background color
  },
  signOutButtonText: {
    color: 'white', // Sign out button text color
  },
};

const pickerSelectStyles = StyleSheet.create({
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      color: 'white',
    },
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 8,
      color: 'white',
    },
  });

export default Header;
