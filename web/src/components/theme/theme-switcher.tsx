"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "@phosphor-icons/react";
export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex flex-row gap-4">
      <button onClick={() => setTheme("light")}>
        {resolvedTheme == "light" ? (
          <Sun weight="fill" size={20} />
        ) : (
          <Sun size={20} />
        )}
      </button>
      <button onClick={() => setTheme("dark")}>
      {resolvedTheme == "dark" ? (
          <Moon weight="fill" size={20} />
        ) : (
          <Moon size={20} />
        )}
      </button>
      {/* <button onClick={() => setTheme("system")}>System</button> */}
    </div>
  );
}
