import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";

const ScheduleGrid = () => {
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(1);
    date.setDate(date.getDate() + i);
    return `${date.getDate()}/${date.getMonth() + 1}`;
  });

  const hours = Array.from({ length: 30 }, (_, i) => {
    const hour = Math.floor(i / 2) + 9;
    return `${hour}`;
  });

  const colors = ["transparent"];

  const [isModalVisible, setModalVisible] = useState(false);
  const [, setSelectedHour] = useState<string | null>(null);
  const [, setSelectedDate] = useState<string | null>(null);

  return (
    <ScrollView horizontal style={{ backgroundColor: "#D9D9D9" }}>
      <View style={styles.container}>
        <View style={styles.hourColumn}>
          {hours.map((hour, index) => (
            <View
              key={index}
              style={[
                styles.hourCell,
                index % 2 !== 0 && styles.transparentCell, // Apply transparency to every 30-minute increment
              ]}
            >
              <Text style={styles.hourText}>{index % 2 === 0 ? hour : ""}</Text>
            </View>
          ))}
        </View>
        <View style={styles.grid}>
          {dates.map((date, dateIndex) => (
            <View key={dateIndex} >
              <Text style={styles.dateHeader}>{date}</Text>
              {hours.map((hour, hourIndex) => {
                const offset = Math.floor(hourIndex / 4);
                const colorIndex = (hourIndex - offset) % colors.length;
                return (
                  <TouchableOpacity
                    key={hourIndex}
                    style={[
                      styles.cell,
                      {
                        borderWidth: 0.5,
                        borderColor: "#6646EC",
                        backgroundColor: colors[colorIndex],
                      },
                    ]}
                    onPress={() => {
                      setSelectedHour(hour);
                      setSelectedDate(date);
                      setModalVisible(true);
                    }}
                  />
                );
              })}
            </View>
          ))}
        </View>
      </View>
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  hourColumn: {
    width: 24,
    marginRight: 4,
    marginTop: 27,
  },
  hourCell: {
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  transparentCell: {
    backgroundColor: "transparent", // Make the cell transparent
  },
  grid: {
    flexDirection: "row",
  },
  dateHeader: {
    fontSize: 9,
    textAlign: "left",
    marginBottom: 8,
    marginTop: 10,
    color: "black",
  },
  cell: {
    width: 51,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  hourText: {
    fontSize: 10,
    color: "black",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 0,
    alignItems: "center",
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#A5A1A0",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 10,
  },
});

export default ScheduleGrid;
