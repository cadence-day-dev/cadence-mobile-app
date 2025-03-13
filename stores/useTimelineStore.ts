import { ReactNode } from "react";
import { create } from "zustand";

interface Timeslice {
  activity: any;
  timeslice_id: string;
  user_id: string;
  private_activity_id: string;
  start_time: string;
  end_time: string;
}

interface TimeslicesState {
  timeslices: Timeslice[];
  setTimeslices: (timeslices: Timeslice[]) => void;
  addTimeslice: (timeslice: Timeslice) => void;
  removeTimeslice: (timesliceId: string) => void;
}

const useTimeslicesStore = create<TimeslicesState>((set) => ({
  timeslices: [],
  setTimeslices: (timeslices: Timeslice[]) => set({ timeslices }),
  addTimeslice: (timeslice: Timeslice) =>
    set((state) => ({
      timeslices: [...state.timeslices, timeslice],
    })),
  removeTimeslice: (timesliceId: string) =>
    set((state) => ({
      timeslices: state.timeslices.filter(
        (timeslice) => timeslice.timeslice_id !== timesliceId,
      ),
    })),
}));

export default useTimeslicesStore;
