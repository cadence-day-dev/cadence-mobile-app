import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import BottomDialog from './BottomDialog';
import Star from './Star';

interface EchoDialogProps {
  isVisible: boolean;
  onClose: () => void;
}

const EchoDialog = ({ isVisible, onClose }: EchoDialogProps) => {
  const [message, setMessage] = useState("");
  return (
    <BottomDialog
      isVisible={isVisible}
      onClose={onClose}
      title="Echo"
    >
      <View style={styles.container}>
        <Star />
        <Text style={styles.message}>
          Hey there! I'm Echo, your guide to making sense of time. Right now, we're starting with a blank slate, but as you log your moments, I'll help you see the patterns in your days. No pressure—just awareness.
        </Text>
        <Text style={styles.question}>
          Want to know how to log your first activity?
        </Text>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Yes, show me!</Text>
        </TouchableOpacity>
        <Text style={styles.description}>
          Cadence is simple—just log what you're doing in 30-minute blocks. You can add notes too! The more you log, the more I'll learn about your rhythm and give you insights.
        </Text>
        <Text style={styles.privacy}>
          Everything you log stays private and encrypted. Only you have access. I don't judge—I just help you notice what's already there.
        </Text>
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
    </BottomDialog>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#6646EC',
    marginBottom: 8,
  },
  message: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
  question: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginTop: 8,
  },
  buttonText: {
    color: '#000000',
    fontSize: 14,
    fontWeight: '500',
  },
  description: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },
  privacy: {
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
    opacity: 0.8,
  },
  messageInputContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    backgroundColor: "#333",
    padding: 10,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  messageInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(102, 70, 236, 0.1)",
    // borderRadius: 20,
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

export default EchoDialog; 