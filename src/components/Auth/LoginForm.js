import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import Spinner from "react-native-loading-spinner-overlay";
import { Button, TextInput } from "@react-native-material/core";
import { colors } from "../../utils/constants";


export default function LoginForm() {
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      setError("");
      const { email, password } = formValue;
      const respuesta = await login(email, password);
      respuesta != undefined ? setError(respuesta) : setError("")
    },
  });


  return (

    <View style={styles.container}>
      <ImageBackground source={{ uri: 'https://i.pinimg.com/564x/53/63/ed/5363edb8dd5ebdd2ee2145ba8aaa35b4.jpg' }} resizeMode="cover" style={styles.image}>
        <View style={styles.containerForm}>
          <Spinner visible={isLoading} />
          <View style={styles.containerInputs}>
            <Text style={styles.title}>Iniciar sesión</Text>
            <TextInput
              variant="standard"
              label="Email"
              style={styles.input}
              autoCapitalize="none"
              value={formik.values.email}
              onChangeText={(text) => formik.setFieldValue("email", text)}
              color="#157A6E"
            /><TextInput
              variant="standard"
              label="Contraseña"
              style={styles.input}
              autoCapitalize="none"
              secureTextEntry={true}
              value={formik.values.password}
              onChangeText={(text) => formik.setFieldValue("password", text)}
              color="#157A6E"
            />

            <View style={{ width: 200, marginLeft: 60, marginTop: 30 }}>
              <Button title="Iniciar sesion" color={`${colors.black}`} tintColor={"white"} onPress={formik.handleSubmit} />
            </View>


            <Text style={styles.error}>{formik.errors.email}</Text>
            <Text style={styles.error}>{formik.errors.password}</Text>
            <Text style={styles.error}>{error}</Text>
          </View>


        </View>
      </ImageBackground>
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
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 850,

  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 500,
  },
  containerForm: {
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  containerInputs: {
    marginTop: 10,
    padding: 10
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
    padding: 10,
  },
  button: {
    backgroundColor: "black",
    borderRadius: 4,
    padding: 15,
    fontWeight: "bold",
    width: 200,
    marginLeft: 60,
    marginTop: 20,
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 15,
    marginBottom: 5,
  },
});

