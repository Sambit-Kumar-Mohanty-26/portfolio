'use client';

import { useEffect } from 'react';

export default function TabVisibility() {
  useEffect(() => {
    const originalTitle = "Sambit | Full Stack Developer";
    const alternateTitle = "404: Attention Not Found 🕵️‍♂️ ";

    const handleVisibilityChange = () => {
      document.title = document.hidden ? alternateTitle : originalTitle;
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return null;
}