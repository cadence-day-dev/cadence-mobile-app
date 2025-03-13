import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleAccordion} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
      {isOpen && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 320,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
    backgroundColor: "#141F2C",
    borderColor: "#6646EC",
  },
  header: {
    backgroundColor: "#141F2C",
    color: "white",
    padding: 10,
  },
  title: {
    fontSize: 10,
    color: "white",
  },
  content: {
    padding: 10,
  },
});

export default Accordion;
