import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet , Text, TouchableOpacity} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Make sure to import your Firebase configuration

const schema = z.object({
  email: z.string().email(),
});

const ResetForm = () => {
  const [loading, setLoading] = useState(false);

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
      // Handle success, e.g., navigate to a success screen or show a toast
    } catch (error) {
      setLoading(false);
      // Handle error, e.g., show an error toast
      console.error('Reset password failed:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        
        <Controller
          control={control}
          render={({ field }) => (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Enter Email"
                onChangeText={field.onChange}
                value={field.value}
                style={styles.input}
              />
            </View>
          )}
          name="email"
          rules={{ required: true }}
          defaultValue=""
        />
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
            Reset Password
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: '80%',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
  },
});

export default ResetForm;
