import { ImageIcon } from "lucide-react";

export default function ImagePlaceholder({
  label = "Miejsce na zdjęcie",
  className = "",
  aspectClass = "aspect-[4/3]",
}) {
  return (
    <div
      className={`rounded-2xl border border-dashed border-[#71797E]/25 bg-gradient-to-br from-[#71797E]/8 via-[#FAFAF5] to-[#C4862A]/10 flex flex-col items-center justify-center gap-2 text-[#71797E]/70 ${aspectClass} ${className}`}
    >
      <ImageIcon size={32} strokeWidth={1.25} className="opacity-60" />
      <span className="text-xs font-medium uppercase tracking-wider px-3 text-center">
        {label}
      </span>
    </div>
  );
}
