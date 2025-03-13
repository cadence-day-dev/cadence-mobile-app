import { create } from "zustand";

interface Activity {
  name: string;
  user_id: string;
  activity_id: string;
  encrypted_name: string;
  weight: number;
  color: string;
}

interface ActivityState {
  activities: Activity[];
  addActivity: (activity: Activity) => void;
  removeActivity: (activity_id: string) => void;
  setActivities: (activities: Activity[]) => void;
}

const useActivityStore = create<ActivityState>((set) => ({
  activities: [],
  setActivities: (activities: Activity[]) =>
    set((state: ActivityState) => ({
      ...state,
      activities: activities,
    })),
  addActivity: (activity: Activity) =>
    set((state: ActivityState) => ({
      ...state,
      activities: [...state.activities, activity],
    })),
  removeActivity: (activity_id: string) =>
    set((state: ActivityState) => ({
      ...state,
      activities: state.activities.filter(
        (activity) => activity.activity_id !== activity_id,
      ),
    })),
}));

export default useActivityStore;
