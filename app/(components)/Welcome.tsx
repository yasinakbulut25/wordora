interface WelcomeProps {
  username?: string;
}

export default function Welcome({ username }: WelcomeProps) {
  return (
    <section style={{ padding: "2rem" }}>
      <h1>Welcome back {username ?? "guest"} 👋</h1>
      <p>Hazırsan kelimeleri öğrenmeye başlayalım!</p>
    </section>
  );
}
