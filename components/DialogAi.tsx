import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";

interface SimpleDialogProps {
  visible: boolean;
  toggleVisibility: () => void;
}

const SimpleDialog: React.FC<SimpleDialogProps> = ({
  visible,
  toggleVisibility,
}) => {
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
          <Text style={styles.title}>Chat with Kind Robot</Text>
          <TextInput
            style={styles.input}
            placeholder="Type your message here..."
            multiline
          />
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
    fontSize: 12,
    color: "white",
    marginBottom: 20,
    marginTop: 12,
  },
  input: {
    width: "85%",
    height: 230,
    borderColor: "white",
    borderWidth: 1,
    color: "white",
    fontSize: 12,
    marginBottom: 20,
    padding: 14,
  },
  saveButton: {
    color: "white",
    fontSize: 12,
    textDecorationLine: "underline",
    marginBottom: 10,
  },
});

export default SimpleDialog;
