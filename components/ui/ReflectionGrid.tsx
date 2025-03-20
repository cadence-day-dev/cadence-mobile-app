import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useEffect } from "react";
import { fetchUserTimeSlicesNew } from "../utils/client";

interface Timeslice {
  activity: {
    activity_id: string;
    color: string;
    created_at: string;
    name: string;
    status: string;
    updated_at: string;
    version_no: number;
    weight: number;
  };
  created_at: string;
  end_time: string;
  note: {
    media: any;
    state: any;
  };
  start_time: string;
  timeslice_id: string;
  updated_at: string;
  version_no: number;
}

interface ScheduleGridProps {
  fromDate: Date;
  toDate: Date;
}

const ScheduleGrid = ({ fromDate, toDate }: ScheduleGridProps) => {
  const [reflectionTimeslices, setReflectionTimeslices] = useState<Timeslice[]>([]);
  const [organizedTimeslices, setOrganizedTimeslices] = useState<{ [key: string]: Timeslice[] }>({});
  const [startHour, setStartHour] = useState(9);
  const [endHour, setEndHour] = useState(24);



  useEffect(() => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    
    const getTimeslices = async () => {
      const timeslicesForWeek = await fetchPeriodTimeslices(fromDate, toDate);
      // Organize timeslices by date
      const organizedTimeslices = timeslicesForWeek.reduce((acc: { [key: string]: Timeslice[] }, timeslice: Timeslice) => {
        const date = new Date(timeslice.start_time).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(timeslice);
        return acc;
      }, {});
      
      console.log('organized timeslices', organizedTimeslices);
      setReflectionTimeslices(timeslicesForWeek);
      setOrganizedTimeslices(organizedTimeslices);
    };

    getTimeslices();
  }, [fromDate, toDate]);

  const fetchPeriodTimeslices = async (fromDate: Date, toDate: Date) => {
    const timeslices = await fetchUserTimeSlicesNew({
      from_time: fromDate.toISOString(),
      to_time: toDate.toISOString(),
    });
    return timeslices;
  };

  const dates = Array.from({ length: Math.ceil((toDate.getTime() - fromDate.getTime()) / (1000 * 60 * 60 * 24)) + 1 }, (_, i) => {
    const date = new Date(fromDate);
    date.setDate(fromDate.getDate() + i);
    return {
      display: `${date.getMonth() + 1}/${date.getDate()}`,
      full: date.toLocaleDateString()
    };
  });

  const hours = Array.from({ length: (endHour - startHour) * 2 }, (_, i) => {
    const hour = Math.floor(i / 2) + startHour;
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
            <View key={dateIndex}>
              <Text style={styles.dateHeader}>{date.display}</Text>
              {hours.map((hour, hourIndex) => {
                const timeslice = organizedTimeslices[date.full]?.[hourIndex];
                return (
                  <TouchableOpacity
                    key={hourIndex}
                    style={[
                      styles.cell,
                      {
                        borderWidth: 0.5,
                        borderColor: "#6646EC",
                        backgroundColor: timeslice?.activity?.color || "transparent",
                      },
                    ]}
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
    width: 42,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
    marginRight: 2,
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
