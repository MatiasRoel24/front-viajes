import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";



export default  function LoginForm(props) {  
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();
  const navigation = useNavigation();
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
  

  const goToRegister = () => {
    navigation.navigate('Register')
  }


  

  console.log("props",navigation)

  return (
    
    <View style={styles.container}>
      <ImageBackground source={{uri: 'https://i.pinimg.com/564x/e0/2f/d6/e02fd6f417cb47996da604634b29341b.jpg'}} resizeMode="cover" style={styles.image}>
      <View style={styles.containerForm}>
        <Spinner visible={isLoading}/>
        <View style={styles.containerInputs}>
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

          <TouchableOpacity style={styles.button} onPress={formik.handleSubmit}>
            <Text style={styles.buttonText}>Iniciar sesion</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.buttonRegister} onPress={goToRegister}>
            <Text style={styles.buttonTextRegister}>Registrarse</Text>
          </TouchableOpacity>

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
  container:{
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
  containerForm:{
    backgroundColor: "#fff",
    borderRadius: 10,
    
  },
  containerInputs:{
    marginTop: 10,
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
    borderColor: "#fff",
    borderBottomColor: "#000",
    padding: 10,
  },
  button:{
    backgroundColor: "black",
    borderRadius: 4,
    padding: 15,
    fontWeight: "bold",
    width: 200,
    marginLeft: 60,
    marginTop: 20,
  },
  buttonText:{
    color: "white",
    textAlign: "center",
  },
  buttonRegister:{
    backgroundColor: "#222",
    borderRadius: 4,
    padding: 10,
    fontWeight: "bold",
    width: 200,
    marginLeft: 60,
    marginTop: 20,
  },
  buttonTextRegister:{
    color: "white",
    textAlign: "center",
  },
  error: {
    textAlign: "center",
    color: "red",
    marginBottom: 20,
  },
});

