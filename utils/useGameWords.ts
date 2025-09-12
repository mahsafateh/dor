import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setWord } from "@/store/slices/gameSlice";
import { getAllWordsForCategory, getShuffled } from "./words";

export function useGameWords() {
  const category = useAppSelector((s) => s.game.category);
  const dispatch = useAppDispatch();
  
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState<string | null>(null);

  // Initialize words when category changes
  useEffect(() => {
    const ws = getShuffled(getAllWordsForCategory(category ?? "mixedCategory"));
    setAvailableWords(ws);
  }, [category]);

  // Set first word when words are available
  useEffect(() => {
    if (!currentWord && availableWords.length > 0) {
      const [w, ...rest] = availableWords;
      setAvailableWords(rest);
      setCurrentWord(w);
      dispatch(setWord(w));
    }
  }, [availableWords, currentWord, dispatch]);

  const getNextWord = () => {
    const [w, ...rest] = availableWords;
    setAvailableWords(rest);
    const nextWord = w ?? null;
    setCurrentWord(nextWord);
    dispatch(setWord(nextWord));
    return nextWord;
  };

  return { currentWord, getNextWord, hasWordsLeft: availableWords.length > 0 };
}
