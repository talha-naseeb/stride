import { useState, useRef, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import type { ActivityType } from '../lib/theme';
import type { RoutePoint } from '../lib/supabase';

const CalPerKm = { run: 65, walk: 55, cycle: 40 };

const haversineKm = (a: RoutePoint, b: RoutePoint) => {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
    Math.cos((b.lat * Math.PI) / 180) *
    Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
};

export const useTracker = () => {
  const [status, setStatus] = useState<'idle' | 'active' | 'paused'>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [distanceKm, setDistanceKm] = useState(0);
  const [route, setRoute] = useState<RoutePoint[]>([]);
  const [calories, setCalories] = useState(0);
  const [activityType, setActivityType] = useState<ActivityType>('run');
  const [hasPermission, setHasPermission] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const locationRef = useRef<Location.LocationSubscription | null>(null);
  const lastPointRef = useRef<RoutePoint | null>(null);
  const distRef = useRef(0);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
    return () => stopTracking();
  }, []);

  const startTracking = useCallback(async () => {
    if (!hasPermission) {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      setHasPermission(true);
    }
    setStatus('active');
    setElapsed(0);
    setDistanceKm(0);
    setRoute([]);
    setCalories(0);
    distRef.current = 0;
    lastPointRef.current = null;

    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);

    locationRef.current = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.BestForNavigation, timeInterval: 3000, distanceInterval: 5 },
      (loc) => {
        const point: RoutePoint = {
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
          timestamp: Date.now(),
        };
        setRoute((r) => [...r, point]);
        if (lastPointRef.current) {
          const d = haversineKm(lastPointRef.current, point);
          distRef.current += d;
          setDistanceKm(distRef.current);
          setCalories(Math.round(distRef.current * CalPerKm[activityType]));
        }
        lastPointRef.current = point;
      }
    );
  }, [hasPermission, activityType]);

  const pauseTracking = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    locationRef.current?.remove();
    setStatus('paused');
  }, []);

  const resumeTracking = useCallback(async () => {
    setStatus('active');
    timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    locationRef.current = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.BestForNavigation, timeInterval: 3000, distanceInterval: 5 },
      (loc) => {
        const point: RoutePoint = { lat: loc.coords.latitude, lng: loc.coords.longitude, timestamp: Date.now() };
        setRoute((r) => [...r, point]);
        if (lastPointRef.current) {
          const d = haversineKm(lastPointRef.current, point);
          distRef.current += d;
          setDistanceKm(distRef.current);
          setCalories(Math.round(distRef.current * CalPerKm[activityType]));
        }
        lastPointRef.current = point;
      }
    );
  }, [activityType]);

  const stopTracking = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    locationRef.current?.remove();
    setStatus('idle');
  }, []);

  const pace =
    elapsed > 0 && distRef.current > 0
      ? (elapsed / 60 / distRef.current).toFixed(1)
      : '--';

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return {
    status, elapsed, distanceKm, route, calories, pace,
    activityType, setActivityType, hasPermission,
    startTracking, pauseTracking, resumeTracking, stopTracking, formatTime,
  };
};
