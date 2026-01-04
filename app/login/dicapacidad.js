import axios from "axios"; // Instalar: npm install axios
import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function App() {
    const [respuesta, setRespuesta] = useState(null);
    const [porcentaje, setPorcentaje] = useState("");
    const [errors, setErrors] = useState({});

    async function register() {
        console.log(porcentaje);
        try {
            const { data } = await axios.post(
                "http://10.0.2.2:8000/api/v1/registro",
                {
                    nombre: "aaaa",
                    apellido: "Peraaaaezz",
                    email: "asdasdasad@test.com",
                    rol: 1,
                    telefono: "612345678",
                    fecha_nacimiento: "2001-06-15",
                    porcentaje,
                    password: "123456"
                },
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            );
            console.log("res", data);
        } catch (e) {
            if (e.response?.status === 422) {
                setErrors(e.response.data.errors);
            }
        }
    }

    return (
        <View style={styles.screen} >
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <Text style={styles.topTextInput}>3/3</Text>
                </View>
                <View style={[styles.middleContainer, respuesta === "si" && { flex: 4 }]}>
                    <Text style={styles.textTitle}>Información de discapacidad</Text>
                    <Text style={styles.question}>¿Tiene alguna discapacidad?</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.optionButton, respuesta === "si" && styles.optionSelected]}
                            onPress={() => {
                                setRespuesta("si");
                                setPorcentaje("");
                            }
                            }
                        >
                            <Text style={[styles.optionText, respuesta === "si" && styles.optionTextSelected]}>Sí</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.optionButton, respuesta === "no" && styles.optionSelected]}
                            onPress={() => {
                                setRespuesta("no");
                                setPorcentaje("0");
                            }
                            }
                        >
                            <Text style={[styles.optionText, respuesta === "no" && styles.optionTextSelected]}>No</Text>
                        </TouchableOpacity>
                    </View>

                    {respuesta === "si" && (
                        <View >
                            {/* 
                        <Text style={styles.textInput}>Descripción de la discapacidad</Text>
                        <TextInput style = { styles.textAreaInput }
                        placeholder = "Describe tu discapacidad"
                        multiline={true}
                        numberOfLines={5} />
                        */}
                            <Text style={styles.textInput}>Porcentaje de discapacidad</Text>
                            <View style={styles.textWrapper}>
                                <TextInput
                                    placeholder="0"
                                    keyboardType="numeric"
                                    value={porcentaje}
                                    onChangeText={(text) => setPorcentaje(text)}
                                    style={styles.inputDiscapacidad}
                                />
                                <Text style={styles.textAbsolute}>%</Text>
                            </View>
                        </View>
                    )}

                </View>

                <View style={[styles.bottomContainer, respuesta === "si" && { flex: 4 }]}>
                    <TouchableOpacity style={[styles.button, !respuesta && styles.registerDisabled]}
                        disabled={!respuesta}
                        onPress={register}
                    >
                        <Text style={styles.textButton}>Registrar</Text>
                    </TouchableOpacity>
                </View>


            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        width: "100%",
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,//no interferir en el status bar
        //backgroundColor:"red"
    },
    container: {
        width: "90%",
        flex: 1,
    },
    topContainer: {
        flex: 2,
        justifyContent: "center",
        alignItems: "center",
        //backgroundColor:"blue"
    },
    middleContainer: {
        flex: 3,
        //justifyContent:"center",
        //backgroundColor:"red",
    },
    bottomContainer: {
        flex: 5,
        marginBottom: 20,//no interferir en el status bar
        //justifyContent:"center",
        //backgroundColor:"green",
    },
    textTitle: {
        fontSize: 25,
        fontWeight: "500",
        marginBottom: 60,
    },
    topTextInput: {
        fontSize: 18,
        fontWeight: "bold"
    },
    textInput: {
        fontSize: 16,
        marginBottom: 10,
    },
    textWrapper: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#858585",
        borderRadius: 10,
        paddingLeft: 14,
        paddingRight: 20,
        position: "relative",
    },
    textAreaInput: {
        marginBottom: 30,
        borderWidth: 1,
        borderColor: "#858585",
        borderRadius: 10,
        paddingHorizontal: 14,
        height: 100,
        textAlignVertical: "top",
    },
    textAbsolute: {
        position: "absolute",
        right: 10,
        top: 10
    },
    button: {
        backgroundColor: "blue",
        borderRadius: 10,
        alignItems: "center",
        padding: 12,
    },
    textButton: {
        fontSize: 16,
        color: "white",
    },
    inputDiscapacidad: {
        height: 40
    },
    question: {
        fontSize: 16,
        textAlign: "center",
        marginBottom: 20
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 25
    },
    optionButton: {
        flex: 1,
        paddingVertical: 20,
        marginHorizontal: 5,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        alignItems: "center",
    },
    optionTextSelected: {
        color: "#fff",
        fontWeight: "bold"
    },
    optionSelected: {
        backgroundColor: "blue",
        borderColor: "blue",
    },
    optionText: {
        fontSize: 16
    },
    registerDisabled: {
        backgroundColor: "#E5E7EB"
    },

});