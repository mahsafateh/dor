import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store";
import { nextRound, timerEnded } from "@/store/slices/gameSlice";
import { Sounds } from "./sound";

export function useGameTimer() {
  const timePerRoundSeconds = useAppSelector((s) => s.game.timePerRoundSeconds);
  const currentRound = useAppSelector((s) => s.game.currentRound);
  const rounds = useAppSelector((s) => s.game.rounds);
  const isPaused = useAppSelector((s) => s.game.isPaused);
  const pausedTimeLeft = useAppSelector((s) => s.game.pausedTimeLeft);
  const dispatch = useAppDispatch();
  
  const [timeLeft, setTimeLeft] = useState<number>(timePerRoundSeconds);
  const intervalRef = useRef<ReturnType<typeof globalThis.setInterval> | null>(null);
  const lastTickBeep = useRef<number>(timePerRoundSeconds);

  // Handle pause/resume
  useEffect(() => {
    if (isPaused) {
      // Clear timer when paused
      if (intervalRef.current) {
        globalThis.clearInterval(intervalRef.current as unknown as number);
        intervalRef.current = null;
      }
      // Set time to paused time if available
      if (pausedTimeLeft !== null) {
        setTimeLeft(pausedTimeLeft);
      }
    } else {
      // Resume timer when not paused
      if (!intervalRef.current) {
        intervalRef.current = globalThis.setInterval(() => {
          setTimeLeft((t) => Math.max(0, t - 1));
        }, 1000);
      }
    }
  }, [isPaused, pausedTimeLeft]);

  // Start timer initially
  useEffect(() => {
    if (!isPaused && !intervalRef.current) {
      intervalRef.current = globalThis.setInterval(() => {
        setTimeLeft((t) => Math.max(0, t - 1));
      }, 1000);
    }
    return () => {
      if (intervalRef.current) globalThis.clearInterval(intervalRef.current as unknown as number);
      intervalRef.current = null;
    };
  }, [isPaused]);

  // Handle timer events
  useEffect(() => {
    if (timeLeft === 0) {
      Sounds.roundEnd();
      // Instead of automatically advancing, pause the game and show round end modal
      dispatch(timerEnded());
    } else if (timeLeft > 0 && timeLeft % 10 === 0 && timeLeft !== lastTickBeep.current) {
      lastTickBeep.current = timeLeft;
      Sounds.tick();
    }
  }, [timeLeft, dispatch]);

  const decreaseTime = (seconds: number) => {
    setTimeLeft((t) => Math.max(0, t - seconds));
  };

  const resetTimer = () => {
    setTimeLeft(timePerRoundSeconds);
  };

  return { timeLeft, decreaseTime, resetTimer };
}
