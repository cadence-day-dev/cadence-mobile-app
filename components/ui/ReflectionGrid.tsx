import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  AppState,
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
  const [startHour, setStartHour] = useState(0);
  const [endHour, setEndHour] = useState(24);
  const hoursScrollViewRef = React.useRef<ScrollView>(null);
  const gridScrollViewRef = React.useRef<ScrollView>(null);

  const handleScroll = (event: any, isHourScroll: boolean) => {
    const y = event.nativeEvent.contentOffset.y;
    if (isHourScroll) {
      gridScrollViewRef.current?.scrollTo({ y, animated: false });
    } else {
      hoursScrollViewRef.current?.scrollTo({ y, animated: false });
    }
  };

  // Add effect for initial scroll position
  useEffect(() => {
    // Calculate position for 7am: (7 - startHour) * 2 slots * 20 pixels per slot
    const scrollToPosition = (7 - startHour) * 2 * 20.42;
    setTimeout(() => {
      hoursScrollViewRef.current?.scrollTo({ y: scrollToPosition, animated: true });
    }, 100);
  }, [startHour]);

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    
    const getTimeslices = async () => {
      console.log("Fetching timeslices...", { fromDate, toDate });
      const timeslicesForWeek = await fetchPeriodTimeslices(fromDate, toDate);
      console.log("Fetched timeslices count:", timeslicesForWeek.length);
      
      // Organize timeslices by date and hour slots
      const organizedTimeslices = timeslicesForWeek.reduce((acc: { [key: string]: Timeslice[] }, timeslice: Timeslice) => {
        const startTime = new Date(timeslice.start_time);
        const endTime = new Date(timeslice.end_time);
        const date = startTime.toLocaleDateString();
        
        if (!acc[date]) {
          // Initialize array with empty slots for each half hour
          acc[date] = Array((endHour - startHour) * 2).fill(null);
        }

        // Calculate slot indices
        const startSlot = (startTime.getHours() - startHour) * 2 + Math.floor(startTime.getMinutes() / 30);
        const endSlot = (endTime.getHours() - startHour) * 2 + Math.ceil(endTime.getMinutes() / 30);

        // Fill all slots between start and end with the timeslice
        for (let slot = startSlot; slot < endSlot && slot < (endHour - startHour) * 2; slot++) {
          if (slot >= 0) {
            acc[date][slot] = timeslice;
          }
        }

        return acc;
      }, {});
      
      setReflectionTimeslices(timeslicesForWeek);
      setOrganizedTimeslices(organizedTimeslices);
      console.log("Updated timeslices state");
    };

    // Initial fetch
    getTimeslices();

    const subscription = AppState.addEventListener('change', (nextAppState) => {
      console.log("AppState changed to:", nextAppState);
      if (nextAppState === 'active') {
        console.log("App became active, refreshing timeslices");
        getTimeslices();
      }
    });

    return () => {
      console.log("Cleaning up AppState subscription");
      subscription.remove();
    };
  }, [fromDate, toDate, startHour, endHour]);

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


  const [isModalVisible, setModalVisible] = useState(false);
  const [, setSelectedHour] = useState<string | null>(null);
  const [, setSelectedDate] = useState<string | null>(null);

  return (
    <View style={{ backgroundColor: "#D9D9D9" }}>
      <View style={styles.container}>
        <View style={styles.hourColumn}>
          <View style={styles.headerSpacer} />
          <ScrollView
            ref={hoursScrollViewRef}
            onScroll={(e) => handleScroll(e, true)}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            {hours.map((hour, index) => (
              <View
                key={index}
                style={[
                  styles.hourCell,
                  index % 2 !== 0 && styles.transparentCell,
                ]}
              >
                <Text style={styles.hourText}>{index % 2 === 0 ? hour : ""}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.gridContainer}>
          <View style={styles.dateHeaderRow}>
            {dates.map((date, dateIndex) => (
              <View key={dateIndex} style={styles.dateHeaderCell}>
                <Text style={styles.dateHeader}>{date.display}</Text>
              </View>
            ))}
          </View>

          <ScrollView
            ref={gridScrollViewRef}
            onScroll={(e) => handleScroll(e, false)}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.grid}>
              {dates.map((date, dateIndex) => (
                <View key={dateIndex} style={styles.dateColumn}>
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
          </ScrollView>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "100%",
  },
  hourColumn: {
    width: 24,
    marginRight: 4,
    height: "100%",
    zIndex: 1,
  },
  headerSpacer: {
    height: 37,
  },
  hourCell: {
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  transparentCell: {
    backgroundColor: "transparent",
  },
  gridContainer: {
    flex: 1,
    height: "100%",
  },
  dateHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    position: "absolute",
    top: 0,
    zIndex: 2,
  },
  dateHeaderCell: {
    width: 42,
    marginRight: 2,
  },
  grid: {
    flexDirection: "row",
    paddingTop: 37,
    paddingBottom: 20,
  },
  dateColumn: {
    flexDirection: "column",
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
