// components/Tracker.tsx

"use client";

import { useTrackerStore } from "@/stores/tracker-store";
import { useEffect } from "react";

interface TrackerProps {}

export function Tracker({}: TrackerProps) {
  const { setLocation, location } = useTrackerStore();

  useEffect(() => {
    const trackerId = navigator.geolocation.watchPosition(
      (position) => {
        console.log(position);
        setLocation(position);
      },
      (error) => {
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 1 * 1000, // 1 second
        maximumAge: 0,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(trackerId);
    };
  }, [setLocation]);

  return null;
}
