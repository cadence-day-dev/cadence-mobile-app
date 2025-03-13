import React from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";

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

          <View
            style={{
              width: "95%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              borderBottomWidth: 0.5,
              borderColor: "#FFFFFF",
              marginBottom: 30,
              marginTop: 12,
            }}
          >
            <Text
              style={{
                fontSize: 17,
                color: "white",
                marginBottom: 13,
              }}
            >
              Add a note
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Type the note here..."
            multiline
          />
          <TouchableOpacity
            onPress={toggleVisibility}
            style={{
              width: "95%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 40,
            }}
          >
            <ThemedText
              style={{
                width: "30%",
                color: "#FFFF",
                fontSize: 16,
                textAlign: "center",
                borderBottomWidth: 0.5,
                borderColor: "#FFFF",
              }}
            >
              Save a note
            </ThemedText>
          </TouchableOpacity>

          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>What's your energy level? </Text>
          </View>
          <View style={styles.energyLevels}>
            {["#FFFFFF", "#FFFFFF", "#727272", "#727272", "#727272"].map(
              (color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.energyBar, { backgroundColor: color }]}
                  onPress={() => {
                    // Add your onPress logic here
                  }}
                />
              ),
            )}
          </View>
          <TouchableOpacity
            onPress={toggleVisibility}
            style={{
              width: "95%",
              height: 40,
              borderWidth: 0.8,
              borderColor: "#FFFF",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ThemedText
              style={{
                width: "100%",
                color: "#FFFF",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Done
            </ThemedText>
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
    width: "90%",
    padding: 20,
    backgroundColor: "#151414",
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 30,
    right: 26,
    padding: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 12,
  },
  input: {
    width: "95%",
    height: 360,
    borderColor: "white",
    borderWidth: 0.5,
    padding: 20,
    color: "#727272",
    fontSize: 12,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "white",
    marginBottom: 20,
    marginTop: 4,
    alignSelf: "flex-start",
  },
  energyLevels: {
    width: "95%",
    marginBottom: 40,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  energyBar: {
    height: 40,
    width: 40,
    marginBottom: 5,
  },
  subtitleContainer: {
    width: "95%",
    alignItems: "flex-start",
  },
});

export default SimpleDialog;
