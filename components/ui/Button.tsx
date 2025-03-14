import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title: string;
  style?: any;
  textStyle?: any;
}

export const Button: React.FC<ButtonProps> = ({ onPress, title, style, textStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: "95%",
        height: 40,
        borderWidth: 0.8,
        borderColor: "#FFFF",
        justifyContent: "center", 
        alignItems: "center",
        ...style
      }}
    >
      <Text
        style={{
          width: "100%",
          color: "#FFFF", 
          fontSize: 16,
          textAlign: "center",
          ...textStyle
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
