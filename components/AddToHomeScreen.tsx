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
import { Share, Smartphone, SquareArrowUp } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const DISMISS_KEY = "wordora_a2hs_dismissed_until";
const DISMISS_DURATION = 10 * 60 * 1000;

export default function AddToHomeScreen() {
  const [open, setOpen] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof navigator === "undefined")
      return;

    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true ||
      document.referrer.includes("android-app://");

    if (isStandalone) return;

    const dismissedUntil = localStorage.getItem(DISMISS_KEY);
    if (dismissedUntil && Date.now() < Number(dismissedUntil)) return;

    const ua = navigator.userAgent.toLowerCase();
    const isIosDevice =
      /iphone|ipad|ipod/.test(ua) && !(window as any).MSStream;

    let iosTimer: NodeJS.Timeout;

    const handleBeforeInstallPrompt = (e: Event) => {
      const dismissedUntil = localStorage.getItem(DISMISS_KEY);
      if (dismissedUntil && Date.now() < Number(dismissedUntil)) return;

      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsIos(false);
      setOpen(true);
    };

    if (isIosDevice) {
      iosTimer = setTimeout(() => {
        console.log("setTimeout");

        setIsIos(true);
        setOpen(true);
      }, 3000);
    } else {
      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    }

    return () => {
      if (iosTimer) clearTimeout(iosTimer);
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "dismissed" || outcome === "accepted") {
      localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_DURATION));
    }

    setDeferredPrompt(null);
    setOpen(false);
  };

  const handleLater = () => {
    localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_DURATION));
    setOpen(false);
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={(val) => !val && handleLater()}>
      <DialogContent className="sm:max-w-sm p-0 gap-0 overflow-hidden rounded-2xl border-0 shadow-xl bg-white">
        <div className="p-6 pb-4">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl font-bold text-slate-900">
              <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                <Smartphone className="w-6 h-6" />
              </div>
              Uygulamayı Yükle
            </DialogTitle>
            <DialogDescription className="text-slate-500 text-sm leading-relaxed pt-2">
              Uygulamayı cihazına yükleyerek tek dokunuşla daha hızlı ve
              kesintisiz erişebilirsin.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 pb-2">
          {isIos ? (
            <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 space-y-3 border border-slate-100">
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold shrink-0">
                  1
                </span>
                <p>
                  Tarayıcının altındaki{" "}
                  <Share className="inline-block w-4 h-4 mx-1 text-blue-500 align-text-bottom" />{" "}
                  (Paylaş) ikonuna tıkla.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold shrink-0">
                  2
                </span>
                <p>
                  Menüden{" "}
                  <span className="font-bold whitespace-nowrap">
                    <SquareArrowUp className="inline-block w-4 h-4 mx-1 align-text-bottom" />
                    Ana Ekrana Ekle
                  </span>{" "}
                  seçeneğini seç.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-indigo-50 rounded-xl p-4 text-sm text-indigo-900 border border-indigo-100">
              Uygulamayı yükleyerek tek dokunuşla erişim sağlayabilirsin.
            </div>
          )}
        </div>

        <DialogFooter className="p-6 pt-2 sm:justify-between flex-col sm:flex-row gap-3 bg-white">
          <Button
            variant="ghost"
            onClick={handleLater}
            className="w-full text-slate-500 hover:text-slate-700 hover:bg-slate-100 font-normal"
          >
            Daha Sonra
          </Button>

          {isIos ? (
            <Button
              onClick={handleLater}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm active:scale-95 transition-all"
            >
              Anladım
            </Button>
          ) : (
            <Button
              onClick={handleInstall}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-sm shadow-indigo-200 active:scale-95 transition-all"
            >
              Yükle
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
