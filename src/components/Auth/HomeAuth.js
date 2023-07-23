import React from "react";
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
} from "react-native";
import * as Yup from "yup";
import useAuth from "../../hooks/useAuth";
import Spinner from "react-native-loading-spinner-overlay";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@react-native-material/core";
import { colors } from "../../utils/constants";


export default function LoginForm() {
    const { isLoading } = useAuth();
    const navigation = useNavigation();

    const goToLogin = () => {
        navigation.navigate('Login')
    }

    const goToRegister = () => {
        navigation.navigate('Register')
    }


    return (

        <View style={styles.container}>
            <ImageBackground
                source={{ uri: 'https://i.pinimg.com/564x/53/63/ed/5363edb8dd5ebdd2ee2145ba8aaa35b4.jpg' }}
                resizeMode="cover"
                style={styles.image}
            >
                <View style={styles.containerPrimary}>
                    <Spinner visible={isLoading} />

                    <View>
                        <Text style={{ color: "white", fontSize: 30, fontWeight: "bold", marginTop: 50, textAlign:"center"}}>Bienvenido</Text>
                        <Text style={{ color: "white", fontSize: 25, fontWeight: "bold", marginTop: 5 }}>Disfrute la experiencia</Text>
                    </View>


                    <View style={styles.containerButtons}>
                        <View style={{ width: 350, marginTop: 20 }}>
                            <Button style={styles.button} title="Registrarse" color={`${colors.black}`} tintColor={"white"} onPress={goToRegister} />
                        </View>

                        <View style={{ width: 350, marginTop: 20 }}>
                            <Button style={styles.button} title="Iniciar sesion" color={"white"} tintColor={`${colors.black}`} onPress={goToLogin} />
                        </View>

                    </View>


                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },
    image: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: 500,
    },
    containerPrimary: {
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    containerButtons: {
        marginBottom: 30
    },
    button: {
        height: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
});

