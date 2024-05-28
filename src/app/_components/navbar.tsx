import { MapPinIcon } from "lucide-react";

interface NavbarProps {}

export function Navbar({}: NavbarProps) {
  return (
    <nav className="px-6 py-4 z-20 flex items-center justify-between bg-background shadow-b">
      <div className="flex items-center gap-1">
        <MapPinIcon className="text-violet-700 w-6 h-6" />
        <span className="text-foreground text-2xl font-bold">Mausic</span>
      </div>
    </nav>
  );
}
