import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

interface SimpleDialogProps {
  visible: boolean;
  toggleVisibility: () => void;
}

const SimpleDialog: React.FC<SimpleDialogProps> = ({
  visible,
  toggleVisibility,
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState<number | null>(
    null,
  );

  const colors = [
    "#0B0E1A",
    "#0B3D91",
    "#0B6623",
    "#8A9A5B",
    "#FF6347",
    "#CD5C5C",
    "#8B4513",
    "#D3D3D3",
    "#4682B4",
    "#B0C4DE",
    "#FFA500",
    "#FFFACD",
  ];

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <KeyboardAvoidingView
        style={styles.modalView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.dialog}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={toggleVisibility}
          >
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Edit Activities</Text>
          <TextInput
            style={styles.input}
            placeholder="Type the activity name"
            placeholderTextColor="#A9A9A9"
          />
          <View style={{ width: "85%", marginTop: 30, marginBottom: 10 }}>
            <Text style={styles.subtitle}>Choose activity color</Text>
          </View>
          <View style={styles.colorGrid}>
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorBox,
                  {
                    backgroundColor:
                      selectedColorIndex === index ? "white" : color,
                  },
                ]}
                onPress={() => setSelectedColorIndex(index)}
              />
            ))}
          </View>
          <TouchableOpacity onPress={toggleVisibility}>
            <Text style={styles.saveButton}>Save</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  dialog: {
    width: 300,
    padding: 20,
    backgroundColor: "#333",
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    padding: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 12,
  },
  title: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
    marginTop: 12,
  },
  input: {
    width: "85%",
    height: 40,
    borderColor: "white",
    borderBottomWidth: 1,
    color: "white",
    fontSize: 10,
    marginBottom: 20,
    marginTop: 20,
    padding: 0,
  },
  subtitle: {
    fontSize: 12,
    color: "white",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  colorGrid: {
    width: "85%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  colorBox: {
    width: "45%",
    height: 40,
    marginBottom: 10,
  },
  saveButton: {
    color: "white",
    fontSize: 12,
    textDecorationLine: "underline",
    marginBottom: 10,
  },
});

export default SimpleDialog;
