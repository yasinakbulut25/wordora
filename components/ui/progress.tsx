"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface CustomProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  innerBg?: string; // ⭐ Ekledik
}

export function Progress({
  value,
  className,
  innerBg = "bg-primary", // default
  ...props
}: CustomProgressProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full transition-all duration-300",
          innerBg // ⭐ Burada kullanıyoruz
        )}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
