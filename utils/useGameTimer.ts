import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { useAppDispatch, useAppSelector } from "@/store";
import { nextRound } from "@/store/slices/gameSlice";
import { Sounds } from "./sound";

export function useGameTimer() {
  const timePerRoundSeconds = useAppSelector((s) => s.game.timePerRoundSeconds);
  const currentRound = useAppSelector((s) => s.game.currentRound);
  const rounds = useAppSelector((s) => s.game.rounds);
  const dispatch = useAppDispatch();
  
  const [timeLeft, setTimeLeft] = useState<number>(timePerRoundSeconds);
  const intervalRef = useRef<ReturnType<typeof globalThis.setInterval> | null>(null);
  const lastTickBeep = useRef<number>(timePerRoundSeconds);

  // Start timer
  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = globalThis.setInterval(() => {
        setTimeLeft((t) => Math.max(0, t - 1));
      }, 1000);
    }
    return () => {
      if (intervalRef.current) globalThis.clearInterval(intervalRef.current as unknown as number);
      intervalRef.current = null;
    };
  }, []);

  // Handle timer events
  useEffect(() => {
    if (timeLeft === 0) {
      Sounds.roundEnd();
      // next player, next round logic simplified: go to results if last round
      if (currentRound >= rounds) {
        router.replace("/results");
      } else {
        dispatch(nextRound());
        setTimeLeft(timePerRoundSeconds);
      }
    } else if (timeLeft > 0 && timeLeft % 10 === 0 && timeLeft !== lastTickBeep.current) {
      lastTickBeep.current = timeLeft;
      Sounds.tick();
    }
  }, [timeLeft, currentRound, rounds, timePerRoundSeconds, dispatch]);

  const decreaseTime = (seconds: number) => {
    setTimeLeft((t) => Math.max(0, t - seconds));
  };

  return { timeLeft, decreaseTime };
}
