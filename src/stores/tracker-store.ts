import { create } from "zustand";

interface TrackerStore {
  location: GeolocationPosition | null;
  setLocation: (location: GeolocationPosition | null) => void;
}

export const useTrackerStore = create<TrackerStore>((set) => ({
  location: null,
  setLocation: (location) => set({ location }),
}));
