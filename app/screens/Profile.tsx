import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';
import useThemeStore from '../store/useThemeStore';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { useAuthStore } from '../store/useAuthStore';
import { useTranslation } from "react-i18next";

interface UserData {
  [key: string]: string;
}

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({});
  const { theme } = useThemeStore();
  
  const { email } = useAuthStore();
  
  const { t } = useTranslation();

  useEffect(() => {
    fetchUserDetails();
  }, [email]);

  const fetchUserDetails = async () => {
    try {
    //  console.log(db)
     
      const querySnapshot = await getDocs(collection(db, 'users'));
    //   console.log(querySnapshot)
      querySnapshot.forEach((doc) => {
        
        const { email: userEmail } = doc.data();
        
        if (userEmail === email) {
            
            // console.log(doc.data())
          setUserData(doc.data() as UserData);
        }
      });
    } catch (error: any) {
      console.error(t('USER_FETCH_FAILED'));
      alert(t('USER_FETCH_FAILED'));
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{t('profileDetails')}</Text>
        {Object.entries(userData).map(([key, value]) => (
          <View key={key} style={styles.detailContainer}>
            <Text style={styles.label}>{key}:</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    fontSize: 16,
  },
});

export default ProfilePage;
