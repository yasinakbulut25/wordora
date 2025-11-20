/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import { Share, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const DISMISS_KEY = "wordora_a2hs_dismissed_until";
const DISMISS_DURATION = 10 * 60 * 1000; // 10 dakika

export default function AddToHomeScreen() {
  const [event, setEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [open, setOpen] = useState(false);

  // iOS kontrolü
  const UA =
    typeof navigator !== "undefined" ? navigator.userAgent.toLowerCase() : "";
  const isIos =
    UA.includes("iphone") || UA.includes("ipad") || UA.includes("ipod");

  // Standalone mod kontrolü
  const isInStandalone =
    typeof window !== "undefined" &&
    (window.matchMedia("(display-mode: standalone)").matches ||
      // Safari için
      (window.navigator as any).standalone === true);

  // beforeinstallprompt dinleme
  useEffect(() => {
    const dismissedUntil = localStorage.getItem(DISMISS_KEY);

    // Daha önce reddettin ve süresi dolmadı → modal açma
    if (dismissedUntil && Date.now() < Number(dismissedUntil)) return;

    const handler = (e: Event) => {
      e.preventDefault();
      const bip = e as BeforeInstallPromptEvent;
      setEvent(bip);
      setOpen(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // iOS için davranış (onlarda beforeinstallprompt yok)
  useEffect(() => {
    if (!isIos || isInStandalone) return;

    const dismissedUntil = localStorage.getItem(DISMISS_KEY);
    if (dismissedUntil && Date.now() < Number(dismissedUntil)) return;

    const timer = setTimeout(() => setOpen(true), 2500);
    return () => clearTimeout(timer);
  }, [isIos, isInStandalone]);

  const handleInstall = async () => {
    if (!event) return;
    await event.prompt();
    const { outcome } = await event.userChoice;

    if (outcome === "dismissed") {
      localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_DURATION));
    }

    setEvent(null);
    setOpen(false);
  };

  const handleLater = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_DURATION));
    setOpen(false);
  };

  if (!open || isInStandalone) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="rounded-2xl p-6 max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-indigo-600" />
            Ana Ekrana Ekle
          </DialogTitle>

          <DialogDescription className="text-slate-600 text-sm pt-2">
            Uygulamayı cihazına ekleyerek tek dokunuşla daha hızlı ve kesintisiz
            erişebilirsin.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-indigo-700 text-sm">
          {isIos ? (
            <p>
              Safari’nin altındaki{" "}
              <b className="inline-flex items-center gap-1">
                <Share size={14} /> Paylaş
              </b>{" "}
              butonuna tıkla ve <b>Ana Ekrana Ekle</b> seçeneğini seç.
            </p>
          ) : (
            <p>
              <b>Ana Ekrana Ekle</b> butonuna tıklayarak uygulamayı
              kurabilirsin.
            </p>
          )}
        </div>

        <DialogFooter className="mt-2 flex gap-3">
          <Button
            variant="outline"
            className="w-full rounded-lg border-none bg-slate-100 hover:bg-slate-200"
            onClick={handleLater}
          >
            Daha Sonra
          </Button>

          <Button
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg border-none"
            onClick={isIos ? handleLater : handleInstall}
          >
            {isIos ? "Tamam" : "Ana Ekrana Ekle"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
