"use client";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

export default function LoadingBar() {
  const isQuerying = useIsFetching() + useIsMutating() > 0;
  const [w, setW] = useState(0);
  const [show, setShow] = useState(false);
  const tRef = useRef<number | null>(null);

  const stop = () => {
    if (tRef.current) {
      clearInterval(tRef.current);
      tRef.current = null;
    }
  };

  useEffect(() => {
    if (isQuerying) {
      setShow(true);
      stop();
      setW(0);
      tRef.current = window.setInterval(() => {
        setW((x) => (x < 90 ? x + Math.random() * 8 + 2 : x));
      }, 180);
    } else {
      stop();
      setW(100);
      const to = setTimeout(() => {
        setShow(false);
        setW(0);
      }, 300);
      return () => clearTimeout(to);
    }
  }, [isQuerying]);

  if (!show) return null;

  return (
    <div className="fixed inset-x-0 top-0 z-[9999] h-0.5">
      <div
        className="bg-primary h-full transition-[width] duration-200 ease-out"
        style={{ width: `${w}%` }}
      />
    </div>
  );
}
