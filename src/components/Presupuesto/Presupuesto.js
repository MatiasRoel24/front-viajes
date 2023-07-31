import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Button, TextInput } from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from '../../hooks/useAuth';

export default function Presupuesto() {
  const { getPresupuesto } = useAuth();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      const { presupuesto } = formValue;
      await AsyncStorage.setItem('presupuesto', presupuesto);
      getPresupuesto();
    },
  });

  return (
    <View>
      <TextInput
        variant="outlined"
        keyboardType="numeric"
        label="Ingrese su presupuesto"
        autoCapitalize="none"
        style={styles.textInput}
        value={formik.values.presupuesto}
        onChangeText={(text) => formik.setFieldValue("presupuesto", text)}
        color="#157A6E"
      />
      <Button
        title="Guardar"
        style={styles.buttonInput}
        onPress={formik.handleSubmit}
      />
    </View>
  )
}

function initialValues() {
  return {
    presupuesto: "",
  };
}

function validationSchema() {
  return {
    presupuesto: Yup.string().required("El presupuesto es obligatorio"),
  };
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 20,
    width: 200,
  },
  buttonInput:{
    marginTop: 5,
  }
})
