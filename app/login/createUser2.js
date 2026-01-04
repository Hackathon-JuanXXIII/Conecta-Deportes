import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegistroScreen() {
  const router = useRouter();

  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [tieneDiscapacidad, setTieneDiscapacidad] = useState(false);

  const comporbarCampos = () => {
    if (!telefono.trim() || !correo.trim() || !contrasena.trim() || !confirmarContrasena.trim()) {
      Alert.alert("Campos incompletos", "Por favor, rellena todos los campos.");
      return;
    }

    if (contrasena !== confirmarContrasena) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    if (tieneDiscapacidad) {
        router.push("/login/dicapacidad");
    }
  };

  return (
    <View style={{ paddingTop: 60, paddingHorizontal: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>2/2</Text>

      <TextInput
        placeholder="Teléfono"
        keyboardType="phone-pad"
        value={telefono}
        onChangeText={setTelefono}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 15
        }}
      />

      <TextInput
        placeholder="Correo electrónico"
        keyboardType="email-address"
        value={correo}
        onChangeText={setCorreo}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 15
        }}
      />

      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={contrasena}
        onChangeText={setContrasena}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 15
        }}
      />

      <TextInput
        placeholder="Confirmar contraseña"
        secureTextEntry
        value={confirmarContrasena}
        onChangeText={setConfirmarContrasena}
        style={{
          borderWidth: 1,
          borderColor: "#ccc",
          padding: 12,
          borderRadius: 8,
          marginBottom: 15
        }}
      />

      {/* Switch accesible */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <Switch
          value={tieneDiscapacidad}
          onValueChange={setTieneDiscapacidad}
          thumbColor={tieneDiscapacidad ? "#01bde3" : "#f4f3f4"}
          trackColor={{ false: "#767577", true: "#81d4fa" }}
        />
        <Text style={{ marginLeft: 10 }}>Tengo alguna discapacidad</Text>
      </View>

      <TouchableOpacity
        onPress={comporbarCampos}
        style={{
          backgroundColor: "#01bde3",
          paddingVertical: 15,
          borderRadius: 10,
          alignItems: "center"
        }}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
          Continuar
        </Text>
      </TouchableOpacity>
    </View>
  );
}
