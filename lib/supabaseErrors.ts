export const supabaseErrorMap: Record<string, string> = {
  "Invalid login credentials": "Kullanıcı adı veya şifre hatalı.",
  "Unable to validate email address: invalid format":
    "E-posta adresi doğrulanamadı: geçersiz biçim",
  "Email not found": "Bu e-posta adresine ait bir kullanıcı bulunamadı.",
  "Invalid email": "Geçerli bir e-posta adresi giriniz.",
  "Password should be at least 6 characters.":
    "Şifre en az 6 karakter olmalıdır.",
  "User already registered": "Bu e-posta ile daha önce kayıt olunmuş.",
  "Email not confirmed": "E-posta adresiniz henüz doğrulanmamış.",
  "User not found": "Kullanıcı bulunamadı.",
  "Invalid password": "Şifre hatalı.",
  "Token invalid": "Oturum anahtarı geçersiz.",
  "Token expired": "Oturum süreniz dolmuş, tekrar giriş yapın.",
};

export function translateSupabaseError(message?: string | null) {
  if (!message) return "Beklenmeyen bir hata oluştu.";

  return supabaseErrorMap[message] ?? message;
}
