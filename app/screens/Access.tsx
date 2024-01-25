import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, Button } from 'react-native';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LangSwitcher';
import Header from '../components/Header';
import ResetPasswordForm from '../components/ResetPasswordForm';
import useThemeStore from '../store/useThemeStore';
import { useNavigation } from "@react-navigation/native";

const App = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [resetPassword, setResetPassword] = useState(false);
    const {isRtl} = useThemeStore()
  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  // const handleResetPassword = (data: string) => {
  //   setResetPassword(true);
  // };

  // handleResetPassword('abc')

  return (
    <View >
     <Header />
      <ScrollView contentContainerStyle={styles.container}>
      
        {/* <View style={[styles.leftSide, { backgroundColor: 'your-left-side-color' }]} /> */}
        <View style={[styles.rightSide]}>
          {isLogin ? <LoginForm /> : <RegisterForm />}
          <View style={[styles.rightSide]}>
          <View style={[styles.buttonContainer, isRtl ? styles.containerRTL : null]}>
            {isLogin ? (
              <>
                <View>
                <Button title="reset" />
                  {/* {resetPassword ? <ResetPasswordForm /> : null} */}
                </View>
                <View>
                <Text className="font-bold">{t('accountDontHave')}</Text>

                  <Button title="register" onPress={toggleForm}/>
                </View>
              </>
            ) : null}
            {!isLogin ? (
              <View>
               <Text> {t('accountHave')} </Text>
                <Button title="login" onPress={()=>{toggleForm()}}/>
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
  leftSide: {
    flex: 1,
    // Add your styles for the left side
  },
  rightSide: {
    flex: 1,
    padding: 8,
    // Add your styles for the right side
  },
  buttonContainer: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerLTR: {
    flexDirection: 'row', // LTR layout
  },
  containerRTL: {
    flexDirection: 'row-reverse', // RTL layout
  },
});

export default App;
