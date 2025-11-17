import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import type { RegisterPayload, ApiResponse, AuthUser } from "@/types/auth";

export async function POST(req: Request) {
  const body: RegisterPayload = await req.json();
  const { email, username, password } = body;

  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (signUpError) {
    return NextResponse.json<ApiResponse<AuthUser>>(
      { success: false, error: signUpError.message },
      { status: 400 }
    );
  }

  const user = signUpData.user;
  if (!user?.id) {
    return NextResponse.json<ApiResponse<AuthUser>>(
      { success: false, error: "Kullanıcı oluşturulamadı." },
      { status: 400 }
    );
  }

  const { error: profileError } = await supabase
    .from("profiles")
    .insert([{ id: user.id, username }]);

  if (profileError) {
    return NextResponse.json<ApiResponse<AuthUser>>(
      { success: false, error: profileError.message },
      { status: 400 }
    );
  }

  return NextResponse.json<ApiResponse<AuthUser>>({
    success: true,
    user: { id: user.id, email, username },
  });
}
