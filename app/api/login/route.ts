import { NextResponse } from "next/server";
import type { LoginPayload, ApiResponse, AuthUser } from "@/types/auth";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  const body: LoginPayload = await req.json();
  const { username, password } = body;

  const { data: profile, error: profileError } = await supabaseAdmin
    .from("profiles")
    .select("id")
    .eq("username", username)
    .single();

  if (profileError || !profile?.id) {
    return NextResponse.json<ApiResponse<AuthUser>>(
      { success: false, error: "Kullanıcı bulunamadı." },
      { status: 404 }
    );
  }

  const { data: userData, error: userError } =
    await supabaseAdmin.auth.admin.getUserById(profile.id);

  if (userError || !userData.user?.email) {
    return NextResponse.json<ApiResponse<AuthUser>>(
      { success: false, error: "Kullanıcı bilgisi alınamadı." },
      { status: 400 }
    );
  }

  const { data: signInData, error: signInError } =
    await supabaseAdmin.auth.signInWithPassword({
      email: userData.user.email,
      password,
    });

  if (signInError) {
    return NextResponse.json<ApiResponse<AuthUser>>(
      { success: false, error: "Kullanıcı adı veya şifre hatalı." },
      { status: 400 }
    );
  }

  const user = signInData.user;

  return NextResponse.json<ApiResponse<AuthUser>>({
    success: true,
    user: {
      id: user.id,
      email: user.email ?? "",
      username,
    },
  });
}
