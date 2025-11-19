import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import {Formik} from 'formik';
import * as Yup from 'yup';


interface SignUpFormValues {
  fullName: string;
  userName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

const SignUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Name can not be less than 2 characters")
    .max(50, "Name can not be more than 50 characters")
    .required("Full Name is required"),
  userName: Yup.string()
    .min(2, "Username can not be less than 2 characters")
    .max(30, "Username can not be more than 30 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must me a number between 0-10")
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords must match")
    .required("Confirm Password is required")
})
const SignUp = () => {
  const router = useRouter();

  const handleSignUp = async(values: SignUpFormValues) => {

    console.log("Sign Up Values: ",values);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Formik<SignUpFormValues>
        initialValues={{
          fullName: '',
          userName: '',
          email: '',
          phone: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={SignUpSchema}
        onSubmit={handleSignUp}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              value={values.fullName}
            />
            {errors.fullName && touched.fullName && 
              <Text style={styles.error}>{errors.fullName}</Text>
            }
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
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {errors.email && touched.email && 
              <Text style={styles.error}>{errors.email}</Text>
            }
            <TextInput
              style={styles.input}
              placeholder="Phone"
              onChangeText={handleChange('phone')}
              onBlur={handleBlur('phone')}
              value={values.phone}
              keyboardType="phone-pad"
            />
            {errors.phone && touched.phone && 
              <Text style={styles.error}>{errors.phone}</Text>
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
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry
            />
            {errors.confirmPassword && touched.confirmPassword && 
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            }
            <TouchableOpacity style={styles.button} onPress={()=> handleSubmit()}>
              <Text style={styles.buttonText}>Submit Sign Up Information</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
      <TouchableOpacity onPress={()=> router.replace('/')}>
        <Text style={styles.link}> Back to Main Page</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> router.replace("/sign-in")}>
        <Text style={styles.link}> Go to Signin</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default SignUp

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