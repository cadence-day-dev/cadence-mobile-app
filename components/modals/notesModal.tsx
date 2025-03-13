import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import useNotesStore from "../../stores/useNotesStore";

interface NotesModalProps {
  supabase: any;
}

const NotesModal: React.FC<NotesModalProps> = ({ supabase }) => {
  const [isGetMode, setIsGetMode] = useState(true);
  const [note, setNote] = useState("");
  const notes = useNotesStore((state: { notes: any }) => state.notes);

  const createNote = async (noteContent: string) => {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError) {
      console.error("Auth error:", authError);
      return;
    }

    const userId = user?.id;
    console.log("User ID before insert:", userId); // ✅ Debugging user_id

    const { data, error } = await supabase
      .from("notes")
      .insert([{ user_id: userId, message: noteContent }]);

    if (error) {
      console.error("Error creating note:", error);
    } else {
      console.log("Note created:", data);
    }
  };

  const handleSave = () => {
    createNote(note);
    setNote("");
  };

  const toggleMode = () => {
    setIsGetMode((prevMode) => !prevMode);
    console.log(isGetMode ? "Switching to Post mode" : "Switching to Get mode");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Notes</Text>
      </View>
      <TouchableOpacity onPress={toggleMode} style={styles.toggleButton}>
        <Text style={styles.buttonText}>
          {isGetMode ? "Switch to POST" : "Switch to GET"}
        </Text>
      </TouchableOpacity>
      {isGetMode ? (
        notes.length > 0 ? (
          <ScrollView style={styles.notesList}>
            {notes.map(
              (
                note: {
                  message:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                },
                index: React.Key | null | undefined,
              ) => (
                <View key={index ?? undefined} style={styles.noteItem}>
                  <View style={styles.noteHeader}>
                    <Text style={styles.noteIndex}>
                      note{" "}
                      {/* {index !== null && index !== undefined ? index : "N/A"} */}
                    </Text>
                    <TouchableOpacity>
                      <Text style={styles.deleteButton}>delete</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.noteContent}>{note.message}</Text>
                </View>
              ),
            )}
          </ScrollView>
        ) : (
          <Text style={styles.noNotesText}>Currently no notes</Text>
        )
      ) : (
        <>
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Type the note here..."
            style={styles.textInput}
            multiline
          />
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.buttonText}>Save the text</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    width: 300,
    backgroundColor: "#141F2C",
    borderColor: "#6646EC",
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: {
    color: "white",
    fontSize: 12,
  },
  toggleButton: {
    backgroundColor: "#024886",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#6646EC",
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  notesList: {
    height: 226,
  },
  noteItem: {
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 16,
    padding: 8,
  },
  noteHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    paddingBottom: 4,
  },
  noteIndex: {
    color: "white",
    fontSize: 12,
  },
  deleteButton: {
    color: "red",
    fontSize: 10,
  },
  noteContent: {
    color: "white",
    fontSize: 12,
    paddingTop: 4,
  },
  noNotesText: {
    color: "white",
    fontSize: 12,
  },
  textInput: {
    height: 120,
    borderWidth: 1,
    borderColor: "gray",
    backgroundColor: "#1F2A3C",
    color: "white",
    fontSize: 12,
    padding: 8,
    marginBottom: 20,
  },
  saveButton: {
    backgroundColor: "#5B7CA7",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#6646EC",
  },
});

export default NotesModal;
