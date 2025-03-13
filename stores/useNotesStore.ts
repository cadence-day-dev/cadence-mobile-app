import { ReactNode } from "react";
import { create } from "zustand";

// Define the type for a note
interface Note {
  message: ReactNode;
  encrypted_note_content: ReactNode;
  id: string;
  user_id: string;
  note_content: string;
}

interface NotesState {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  addNote: (note: Note) => void;
  removeNote: (noteId: string) => void;
}

const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  setNotes: (notes: Note[]) =>
    set(() => ({
      notes: notes,
    })),
  addNote: (note: Note) =>
    set((state) => ({
      notes: [...state.notes, note],
    })),
  removeNote: (noteId: string) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== noteId),
    })),
}));

export default useNotesStore;
