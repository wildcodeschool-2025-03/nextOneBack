import { useEffect, useState } from "react";

type Direction = "up" | "down" | "left" | "right";

export default function useDirection(): Direction {
  const [direction, setDirection] = useState<Direction>("right");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setDirection((prev) => {
        const opposites: Record<Direction, Direction> = {
          up: "down",
          down: "up",
          left: "right",
          right: "left",
        };

        const keyMap: Record<string, Direction> = {
          ArrowUp: "up",
          z: "up",
          ArrowDown: "down",
          s: "down",
          ArrowLeft: "left",
          q: "left",
          ArrowRight: "right",
          d: "right",
        };

        const newDir = keyMap[e.key];
        if (!newDir) return prev;
        if (newDir === opposites[prev]) return prev;

        return newDir;
      });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return direction;
}
