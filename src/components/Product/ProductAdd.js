import React, { useState } from "react";
import {
    StyleSheet,
    View,
    Text,
} from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import { Button, TextInput } from "@react-native-material/core";
import { colors } from "../../utils/constants";
import { useNavigation } from "@react-navigation/native";
import { numberToCurrency } from "../../utils/numbers";

export default function Register() {
    const [error, setError] = useState("");
    const { userInfo, createNewProduct } = useAuth();
    const navigation = useNavigation();

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            setError("");
            const { titulo, descripcion, precio } = formValue;

            const respuesta = await createNewProduct(titulo, descripcion, userInfo.correo, numberToCurrency(precio));
            if(respuesta){
                navigation.goBack();
            } 
            respuesta ? setError(respuesta) : setError("");
        },
    });

    return (
        <View style={styles.container}>
            <View style={styles.containerForm}>
                <View style={styles.containerInputs}>
                    <Text style={styles.title}>Agregar producto</Text>
                    <TextInput
                        variant="standard"
                        label="Nombre de producto"
                        style={styles.input}
                        autoCapitalize="none"
                        value={formik.values.titulo}
                        onChangeText={(text) => formik.setFieldValue("titulo", text)}
                        color="#157A6E"
                    />
                    <Text style={styles.error}>{formik.errors.titulo}</Text>
                    <TextInput
                        variant="standard"
                        label="Categoria"
                        style={styles.input}
                        autoCapitalize="none"
                        value={formik.values.descripcion}
                        onChangeText={(text) => formik.setFieldValue("descripcion", text)}
                        color="#157A6E"
                    />
                    <Text style={styles.error}>{formik.errors.descripcion}</Text>

                    <TextInput
                        variant="standard"
                        keyboardType="numeric"
                        label="Precio"
                        style={styles.input}
                        autoCapitalize="none"
                        value={formik.values.precio}
                        onChangeText={(text) => formik.setFieldValue("precio", text)}
                        color="#157A6E"
                    />
                    <Text style={styles.error}>{formik.errors.precio}</Text>

                    <View style={{ width: 200, marginLeft: 60, marginTop: 10 }}>
                        <Button title="Agregar producto" color={`${colors.black}`} tintColor={"white"}  onPress={formik.handleSubmit} />
                    </View>
                    <Text style={styles.errorUltimo}>{error}</Text>
                </View>

            </View>
        </View>
    );
}

function initialValues() {
    return {
        titulo: "",
        descripcion: "",
        precio: ""
    };
}

function validationSchema() {
    return {
        titulo: Yup.string().required("El titulo es obligatorio"),
        descripcion: Yup.string().required("La descripcion es obligatoria"),
        precio: Yup.string().required("El precio es obligatorio"),
    };
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: 550,
    },
    containerForm: {
        backgroundColor: "#fff",
        borderRadius: 5,
    },
    title: {
        textAlign: "center",
        fontSize: 28,
        fontWeight: "bold",
        marginTop: 30,
        marginBottom: 15,
    },
    containerInputs: {
        marginTop: 10,
        padding: 10,
    },
    input: {
        height: 40,
        width: 300,
        margin: 12,
        marginBottom: 15,
        padding: 10,
    },
    error: {
        textAlign: "center",
        color: "#f00",
        marginTop: 10,
    },
    errorUltimo: {
        textAlign: "center",
        color: "#f00",
        marginTop: 10,
        marginBottom: 20,
    }
});