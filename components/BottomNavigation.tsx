"use client";

import { Home, User, Folders, Heart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslate } from "@/lib/translate";

const navItems = [
  {
    label: "BOTTOM_NAV_HOME",
    href: "/",
    urls: ["/"],
    icon: Home,
  },
  {
    label: "BOTTOM_NAV_LISTS",
    href: "/lists",
    urls: ["/lists"],
    icon: Folders,
  },
  {
    label: "BOTTOM_NAV_FAVORITES",
    href: "/favorites",
    urls: ["/favorites"],
    icon: Heart,
  },
  {
    label: "BOTTOM_NAV_PROFILE",
    href: "/profile",
    urls: ["/profile"],
    icon: User,
  },
];

export default function BottomNavigation() {
  const pathname = usePathname();
  const t = useTranslate();

  return (
    <nav className="fixed md:bottom-4 bottom-0 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 shadow-lg rounded-br-xl rounded-bl-xl">
      <ul className="flex items-center gap-2 justify-around p-2">
        {navItems.map((item) => {
          const isActive =
            item.label === "BOTTOM_NAV_HOME"
              ? item.urls.some((u) => u === pathname)
              : item.urls.some((u) => u === pathname || pathname.startsWith(u));

          return (
            <li
              key={item.href}
              className="relative w-full rounded-xl bg-transparent"
            >
              <div
                className={cn(
                  "absolute h-1 w-[32px] bg-indigo-600 -top-2 left-1/2 transform -translate-x-1/2 rounded-2xl",
                  isActive ? "flex" : "hidden"
                )}
              ></div>
              <Link href={item.href}>
                <div className="flex flex-col gap-1 items-center justify-center px-4 py-2 transition-all">
                  <item.icon
                    className={cn(
                      "h-5 w-5 transition-all",
                      isActive ? "text-indigo-600" : "text-slate-400"
                    )}
                  />

                  <span
                    className={cn(
                      "text-xs font-medium",
                      isActive ? "text-indigo-600" : "text-slate-400"
                    )}
                  >
                    {t(item.label)}
                  </span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
