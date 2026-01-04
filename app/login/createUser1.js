import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Alert, Platform, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function CreateUser1() {
  const router = useRouter();

  const [fecha, setFecha] = useState(new Date());
  const [hoy] = useState(new Date());
  const [mostrar, setMostrar] = useState(false);

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");

  const refNombre = useRef();
  const refApellido = useRef();
  const refCalendario = useRef();

  const onChange = (event, fechaEscogida) => {
    if (fechaEscogida) {
      setFecha(fechaEscogida);
    }
    setMostrar(false);
  };

  const comprobarCampos = () => {
    if (!nombre.trim() || !apellidos.trim() || !fecha) {
      Alert.alert("Campos incompletos", "Por favor, rellena todos los campos antes de continuar.");
      return;
    }

    router.push("/login/createUser2");
  };

  return (
    <View style={{ paddingTop: 60, paddingHorizontal: 20 }}>
      <StatusBar
        style="auto"
        backgroundColor={Platform.OS === "android" ? "#01bde3" : undefined}
      />

      {/* Nombre */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18 }}>Nombre</Text>
        <TextInput
          ref={refNombre}
          placeholder="Escribe aquí tu nombre"
          autoCapitalize="words"
          returnKeyType="next"
          onSubmitEditing={() => refApellido.current.focus()}
          value={nombre}
          onChangeText={setNombre}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 12,
            borderRadius: 8,
            fontSize: 16,
          }}
        />
      </View>

      {/* Apellidos */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18 }}>Apellidos</Text>
        <TextInput
          ref={refApellido}
          placeholder="Escribe aquí tus apellidos"
          autoCapitalize="words"
          returnKeyType="next"
          onSubmitEditing={() => refCalendario.current.focus()}
          value={apellidos}
          onChangeText={setApellidos}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 12,
            borderRadius: 8,
            fontSize: 16,
          }}
        />
      </View>

      {/* Fecha de nacimiento */}
      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18 }}>Fecha de nacimiento</Text>

        <Pressable onPress={() => setMostrar(true)}>
          <Text style={{ fontSize: 30 }}>🗓️</Text>
        </Pressable>

        {mostrar && (
          <DateTimePicker
            value={fecha}
            mode="date"
            locale="es-ES"
            maximumDate={hoy}
            onChange={onChange}
          />
        )}

        <Text style={{ marginTop: 10, fontSize: 16 }}>
          Fecha elegida: {fecha.toLocaleDateString()}
        </Text>
      </View>

      {/* Botón continuar */}
      <TouchableOpacity
        onPress={comprobarCampos}
        style={{
          backgroundColor: "#01bde3",
          paddingVertical: 15,
          borderRadius: 10,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          Continuar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
