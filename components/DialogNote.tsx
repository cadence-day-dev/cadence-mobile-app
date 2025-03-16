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
import { Button } from "@/components/ui/Button";
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
            marginBottom: 24,
          }}
            >
            <Text
              style={{
                fontSize: 17,
                color: "white",
                textAlign: "center",
              }}
            >
              Add a note
            </Text>
          </View>
          <TextInput
            style={{
              width: "95%",
              height: 260,
              borderColor: "white",
              borderWidth: 0.5,
              padding: 20,
              color: "#FFFFFF",
              fontSize: 12,
              marginBottom: 10,
            }}
            placeholder="Type the note here..."
            placeholderTextColor="#FFFFFF"
            multiline
          />
          <TouchableOpacity
            onPress={toggleVisibility}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 30,
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
              Save the note
            </Text>
          </TouchableOpacity>

          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>What's your energy level? </Text>
          </View>
          <View style={{
              width: "95%",
              height: 40,
              marginBottom: 60,
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
            {["#FFFFFF", "#FFFFFF", "#727272", "#727272", "#727272"].map(
              (color, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.energyBar, { backgroundColor: color, height: 40,
                    width: 40,
                    marginBottom: 5, }]}
                    onPress={toggleVisibility}
                />
              ),
            )}
          </View>
          <Button
            onPress={toggleVisibility}
            title="Done"
            style={{
              width: "95%",
              height: 40, 
            }}
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
    width: "80%",
    height: "67%",
    padding: 20,
    backgroundColor: "#151414",
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
  },
  subtitle: {
    fontSize: 14,
    color: "white",
    marginBottom: 20,
    marginTop: 4,
    alignSelf: "flex-start",
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
