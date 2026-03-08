import {
  Wind,
  Flame,
  Heart,
  Droplets,
  Leaf,
  Mountain,
  Sprout,
  CircleDot,
} from "lucide-react";

/** Map nazw ikon (z data/meridians.js) na komponenty Lucide. */
export const meridianIconComponents = {
  Wind,
  Flame,
  Heart,
  Droplets,
  Leaf,
  Mountain,
  Sprout,
  CircleDot,
  Activity: Flame,
};

export function getMeridianIcon(iconName) {
  return meridianIconComponents[iconName] ?? Leaf;
}
