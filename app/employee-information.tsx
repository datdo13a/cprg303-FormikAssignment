import { Formik } from "formik";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from "react-native";
import * as Yup from "yup";

interface EmployeeFormValues {
    firstName: string;
    lastName: string;
    city: string;
    province: string;
    postalCode: string;
}

const EmployeeInfoSchema = Yup.object().shape({
    firstName: Yup.string()
    .min(3, "Name cannot be less than 3 letters")
    .max(40, "Name cannot be more than 40 letters")
    .required("First name is required"),
    lastName: Yup.string()
    .min(2, "last name cannot be less than 2 letters")
    .max(25, "last name cannot be more than 25 letters")
    .required("Last name is required."),
    city: Yup.string()
    .min(3, "City canno tbe less than 3 letters")
    .max(30, "City cannot be more than 30 letters")
    .required("City is required"),

    // Province requires two letters, such as AB, ab, BC, ON, on, etc
    province: Yup.string()
    .matches(/^[A-Z, a-z]{2}$/, "Province must be in two letter format"),

    // This REGEX was found online. It takes any form of proper Canadian postal code
    postalCode: Yup.string()
    .matches(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVXY][ -]?\d[ABCEGHJKLMNPRSTVXY]\d$/i, "Postal code is in incorrect")
})



const EmployeeInformation = () => {

    const handleSubmitEmployeeForm = (values: EmployeeFormValues) => {
    console.log("Employee Information: ", values);

};
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Formik<EmployeeFormValues>
            initialValues={{
                firstName: "",
                lastName: "",
                city: "",
                province: "",
                postalCode: "",
            }}
            validationSchema={EmployeeInfoSchema}
            onSubmit={handleSubmitEmployeeForm}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched
                }) => (
                    <>
                        <TextInput 
                            style={styles.input}
                            placeholder="First Name"
                            onChangeText={handleChange("firstName")}
                            onBlur={handleBlur("firstName")}
                            value={values.firstName}
                        />
                        { touched.firstName && errors.firstName && <Text style={styles.error}>{errors.firstName}</Text>}

                                               <TextInput 
                            style={styles.input}
                            placeholder="Last Name"
                            onChangeText={handleChange("lastName")}
                            onBlur={handleBlur("lastName")}
                            value={values.lastName}
                        />
                        { touched.lastName && errors.lastName && <Text style={styles.error}>{errors.lastName}</Text>}

                        <TextInput 
                            style={styles.input}
                            placeholder="City"
                            onChangeText={handleChange("city")}
                            onBlur={handleBlur("city")}
                            value={values.city}
                        />
                        { touched.city && errors.city && <Text style={styles.error}>{errors.city}</Text>}

                                               <TextInput 
                            style={styles.input}
                            placeholder="Province"
                            onChangeText={handleChange("province")}
                            onBlur={handleBlur("province")}
                            value={values.province}
                        />
                        { touched.province && errors.province && <Text style={styles.error}>{errors.province}</Text>}

                                               <TextInput 
                            style={styles.input}
                            placeholder="Postal Code"
                            onChangeText={handleChange("postalCode")}
                            onBlur={handleBlur("postalCode")}
                            value={values.postalCode}
                        />
                        { touched.postalCode && errors.postalCode && <Text style={styles.error}>{errors.postalCode}</Text>}

                        <TouchableOpacity style={styles.button} onPress={()=> handleSubmit()}>
                            <Text style={styles.buttonText}>Submit Employee Information</Text>

                        </TouchableOpacity>
                    </>
                )}

        </Formik>
    </ScrollView>
  )
}

export default EmployeeInformation

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