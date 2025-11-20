"use client";

import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { USER_LOCALSTORAGE_KEY, useUserStore } from "@/store/useUserStore";
import { AuthUser } from "@/types/auth";

export function useAuthInit() {
  const { setUser, logoutUser, setLoading } = useUserStore();

  useEffect(() => {
    const init = async () => {
      setLoading(true);

      const localUser: AuthUser = JSON.parse(
        localStorage.getItem(USER_LOCALSTORAGE_KEY) || "null"
      );

      if (localUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("username")
          .eq("id", localUser.id)
          .maybeSingle();

        setUser({
          id: localUser.id,
          email: localUser.email!,
          username: profile?.username ?? "",
        });
      } else {
        logoutUser();
      }

      setLoading(false);
    };

    init();
  }, []);
}
