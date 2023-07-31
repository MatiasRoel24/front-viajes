import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Button, TextInput } from '@react-native-material/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from '../../hooks/useAuth';
import { numberToCurrency } from '../../utils/numbers';

export default function InputMexicanos() {
  const { getProducts } = useAuth();

  const formik = useFormik({
    validateOnChange: false,
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formValue) => {
      const { mexicano } = formValue;
      await AsyncStorage.setItem('mexicano', numberToCurrency(mexicano));
      getProducts();
    },
  });

  return (
    <View>
      <TextInput
        variant="outlined"
        keyboardType="numeric"
        label="Ingrese el valor (MXN)"
        autoCapitalize="none"
        style={styles.textInput}
        value={formik.values.mexicano}
        onChangeText={(text) => formik.setFieldValue("mexicano", text)}
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
    mexicano: "",
  };
}

function validationSchema() {
  return {
    mexicano: Yup.string().required("Debe ingresar el valor del maxicano"),
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
