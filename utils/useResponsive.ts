import { useMemo } from "react";
import { useWindowDimensions } from "react-native";

export function useResponsive() {
  const { width, height, scale, fontScale } = useWindowDimensions();

  const shortEdge = Math.min(width, height);

  const circleRadius = useMemo(() => {
    const base = shortEdge * 0.38;
    return Math.max(110, Math.min(base, 220));
  }, [shortEdge]);

  const playerBadge = useMemo(() => {
    const w = Math.max(64, Math.min(shortEdge * 0.22, 96));
    const h = Math.max(28, Math.min(shortEdge * 0.10, 40));
    return { width: w, height: h };
  }, [shortEdge]);

  const containerPadding = useMemo(() => Math.max(12, shortEdge * 0.04), [shortEdge]);

  return {
    width,
    height,
    scale,
    fontScale,
    shortEdge,
    circleRadius,
    playerBadge,
    containerPadding,
  };
}


