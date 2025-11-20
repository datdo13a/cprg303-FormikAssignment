import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import {Formik} from 'formik';
import * as Yup from 'yup';


interface SignInFormValues {
  userName: string;
  password: string;
}

const SignInSchema = Yup.object().shape({
  userName: Yup.string()
      .min(2, "Username can not be less than 2 characters")
      .max(30, "Username can not be more than 30 characters")
      .required("Username is required"),
  password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
})
const SignIn = () => {
  const router = useRouter();

  const handleSignIn = async(values: SignInFormValues) => {

    console.log("Sign Up Values: ",values);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik<SignInFormValues>
        initialValues={{
          userName: '',
          password: '',
        }}
        validationSchema={SignInSchema}
        onSubmit={handleSignIn}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Username"
              onChangeText={handleChange('userName')}
              onBlur={handleBlur('userName')}
              value={values.userName}
            />
            {errors.userName && touched.userName &&
              <Text style={styles.error}>{errors.userName}</Text>
            }
            
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {errors.password && touched.password && 
              <Text style={styles.error}>{errors.password}</Text>
            }

            <TouchableOpacity style={styles.button} onPress={()=> handleSubmit()}>
              <Text style={styles.buttonText}>Submit Sign In Information</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      <TouchableOpacity onPress={()=> router.replace('/')}>
        <Text style={styles.link}> Back to Main Page</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> router.replace("/sign-up")}>
        <Text style={styles.link}> Go to Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default SignIn

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16
  },
  error: {
    color: "#dc2626",
    marginBottom: 8
  },
  button: {
    backgroundColor: "#2563eb",
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color:"#fff",
    fontSize: 16,
  },
  link: {
    color: '#2563eb',
    textAlign:"center",
    marginTop: 20
  }
})