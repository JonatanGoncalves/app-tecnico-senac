import React, { useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator, Platform } from "react-native";
import { Button, TextInput, Surface, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { storage, db } from "../../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export default function PhotoPostScreen() {
    const [image, setImage] = useState(null);
    const [caption, setCaption] = useState("");
    const [uploading, setUploading] = useState(false);

    const pickImage = async () => {
        console.log("Iniciando seleção de imagem...");

        if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                alert('Desculpe, precisamos de permissões para acessar a galeria de imagens.');
                return;
            }
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log("Imagem selecionada:", result);

        if (!result.canceled) {
            const uri = Platform.OS === 'web' ? result.assets[0].uri : result.uri;
            setImage(uri);
        } else {
            console.log("Seleção de imagem cancelada.");
        }
    };

    const uploadImage = async () => {
        if (!image) return;

        setUploading(true);
        console.log("Iniciando upload da imagem...");

        try {
            const response = await fetch(image);
            const blob = await response.blob();
            const storageRef = ref(storage, `images/${Date.now()}-${caption}.jpg`);
            const snapshot = await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(snapshot.ref);

            // Salvar a URL da imagem no Firestore
            await addDoc(collection(db, "posts"), {
                imageUrl: downloadURL,
                caption: caption,
                createdAt: new Date(),
            });

            console.log("Upload realizado com sucesso:", downloadURL);
            setUploading(false);
            setImage(null);
            setCaption("");
        } catch (error) {
            console.error("Erro ao fazer upload da imagem:", error);
            setUploading(false);
        }
    };

    return (
        <Surface style={styles.container}>
            <View style={styles.container_inner}>
                <Button onPress={pickImage}>Selecionar Imagem</Button>
                {image && (
                    <>
                        <Image source={{ uri: image }} style={styles.image} />
                        <TextInput
                            label="Legenda"
                            value={caption}
                            onChangeText={setCaption}
                            style={styles.input}
                        />
                        <Button mode="contained" onPress={uploadImage} disabled={uploading}>
                            {uploading ? (
                                <ActivityIndicator animating={true} color="#fff" />
                            ) : (
                                "Postar"
                            )}
                        </Button>
                    </>
                )}
            </View>
        </Surface>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    container_inner: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
    },
    input: {
        width: "100%",
        marginVertical: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginVertical: 20,
    },
});