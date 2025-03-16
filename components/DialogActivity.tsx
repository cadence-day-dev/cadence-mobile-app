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
  const [message, setMessage] = useState("");

  const colors = [
    "#0B0E1A",
    "#0B3D91",
    "#0B6623",
    "#8A9A5B",
    "#FF6347",
    "#CD5C5C",
    "#8B4513",
    "#D3D3D3",
    // "#4682B4",
    // "#B0C4DE",
    "#FFA500",
    "transparent",
  ];

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <KeyboardAvoidingView
        style={styles.modalView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.dialog}>
        <TouchableOpacity
              onPress={toggleVisibility} 
              style={{
                position: "absolute",
                top: 24,
                right: 26,
                zIndex: 1000,
              }}
            >
              <Text style={{
                color: "white",
                fontSize: 14,
              }}>✕</Text>
            </TouchableOpacity>
          <View style={{
            flexDirection: "row", 
            justifyContent: "center", 
            alignItems: "center", 
            width: "95%",
            borderBottomWidth: .2,
            borderColor: "#FFFFFF",
            paddingBottom: 10,
            marginBottom: 10,
          }}
            >
            <Text
              style={{
                fontSize: 17,
                color: "white",
                textAlign: "center",
              }}
            >
              Edit the activity
            </Text>
          </View>
          <View style={{ width: "85%", marginTop: 30, marginBottom: 10 }}>
            <Text style={{
              fontSize: 12,
              color: "white",
              marginBottom: 20,
              alignSelf: "flex-start",
            }}>Press and hold to edit or remove an activity</Text>
          </View>
          <View style={styles.colorGrid}>
            {colors.map((color, index) => (
              <View 
                key={`color-container-${index}`}
                style={{
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}
              >
                <TouchableOpacity
                  key={`color-button-${index}`}
                  style={{
                    height: 50,
                    marginBottom: 3,
                    backgroundColor: color,
                    borderWidth: 1,
                    borderColor: "#6646EC",
                  }}
                  onPress={() => setSelectedColorIndex(index)}
                />
                <Text
                  key={`color-text-${index}`}
                  style={{
                    fontSize: 12,
                    color: "white",
                    textAlign: "left",
                    width: 120,
                    textTransform: "capitalize",
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  hello
                </Text>
              </View>
            ))}
          </View>
          <TouchableOpacity
            onPress={toggleVisibility}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 10,
              marginTop: 6,
            }}
          >
            <Text
              style={{
                color: "#FFFF",
                fontSize: 14,
                textAlign: "center",
                borderBottomWidth: 0.5,
                borderColor: "#FFFF",
              }}
            >
              Save
            </Text>
          </TouchableOpacity>

          <View style={styles.messageInputContainer}>
            <View style={styles.messageInputWrapper}>
              <TextInput
                style={styles.messageInput}
                placeholder="Message Echo"
                placeholderTextColor="#999999"
                value={message}
                onChangeText={setMessage}
              />
              <TouchableOpacity style={styles.sendButton}>
                <Text style={styles.sendButtonText}>↑</Text>
              </TouchableOpacity>
            </View>
          </View>
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
    width: '86%',
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
  colorGrid: {
    width: "85%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  saveButton: {
    color: "white",
    fontSize: 12,
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  messageInputContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "#333",
    padding: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  messageInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(102, 70, 236, 0.1)",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  messageInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 14,
    paddingVertical: 0,
  },
  sendButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#6646EC",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
});

export default SimpleDialog;
