import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-5xl mx-auto flex items-center justify-between p-4">
        <h2 className="text-xl font-bold text-brand">Wordora</h2>
        <nav className="flex gap-3">
          <Button variant="ghost">Login</Button>
          <Button className="bg-brand text-white hover:bg-brand-dark">
            Get Started
          </Button>
        </nav>
      </div>
    </header>
  );
}
