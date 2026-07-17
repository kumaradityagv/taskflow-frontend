"use client";

import { useEffect, useState } from "react";

export default function useResendCooldown(initialSeconds = 30) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds <= 0) return undefined;

    const timer = setInterval(() => {
      setSeconds((current) => (current <= 1 ? 0 : current - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds]);

  function start(nextSeconds = initialSeconds) {
    setSeconds(nextSeconds);
  }

  return { seconds, start, isActive: seconds > 0 };
}
