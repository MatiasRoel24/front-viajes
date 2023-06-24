import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import Spinner from "react-native-loading-spinner-overlay";


export default  function LoginForm() {  
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      setError("");
      const { email, password } = formValue;
      const respuesta = await login(email,password);
      respuesta != undefined ? setError(respuesta) : setError("")
    },
  });

  return (
    <View style={styles.container}>
      <Spinner visible={isLoading}/>
      <Text style={styles.title}>Iniciar sesión</Text>
      <TextInput
        placeholder="Email"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.email}
        onChangeText={(text) => formik.setFieldValue("email", text)}
      />
      <TextInput
        placeholder="Contraseña"
        style={styles.input}
        autoCapitalize="none"
        secureTextEntry={true}
        value={formik.values.password}
        onChangeText={(text) => formik.setFieldValue("password", text)}
      />
      <Button title="Iniciar sesion" onPress={formik.handleSubmit} />

      <Text style={styles.error}>{formik.errors.email}</Text>
      <Text style={styles.error}>{formik.errors.password}</Text>

      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

function initialValues() {
  return {
    email: "",
    password: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().required("El mail es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
  };
}

const styles = StyleSheet.create({
  container:{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 900
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 15,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
  },
  error: {
    textAlign: "center",
    color: "#f00",
    marginTop: 20,
  },
});