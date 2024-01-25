import React from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useTranslation } from 'react-i18next';
import { languageOptions } from '../config/config';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    // Implement setTheme and setIsRtl as needed for your Expo app
  };

  return (
    <View style={styles.container}>
      <RNPickerSelect
        value={i18n.language}
        onValueChange={(value) => changeLanguage(value)}
        items={languageOptions.map((option) => ({
          label: option.label,
          value: option.code,
        }))}
        style={pickerSelectStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
  },
});

export default LanguageSwitcher;
