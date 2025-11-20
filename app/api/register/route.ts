import { NextResponse } from "next/server";
import type { RegisterPayload, ApiResponse, AuthUser } from "@/types/auth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const body: RegisterPayload = await req.json();
  const { email, username, password } = body;

  const { data: signUpData, error: signUpError } =
    await supabaseAdmin.auth.signUp({
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

  const { error: profileError } = await supabaseAdmin
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
    user: {
      id: user.id,
      email,
      username,
    },
  });
}
