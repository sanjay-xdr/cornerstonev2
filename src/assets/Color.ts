interface GradientPreset {
  name: string;
  class: string;
}

const GRADIENT_PRESETS: GradientPreset[] = [
  { name: "Mystic Night", class: "from-gray-900 via-purple-900 to-gray-900" },
  { name: "Ocean Depth", class: "from-blue-900 via-purple-900 to-pink-900" },
  { name: "Forest Dream", class: "from-green-900 via-teal-900 to-blue-900" },
  { name: "Sunset Flame", class: "from-orange-900 via-red-900 to-purple-900" },
  { name: "Aurora", class: "from-indigo-900 via-purple-900 to-pink-900" },
];

interface ColorScheme {
  primary: string;
  secondary: string;
  hover: string;
}
type BaseColor = "yellow" | "blue" | "purple" | "green" | "pink";

const COLOR_SCHEMES: Record<BaseColor, ColorScheme> = {
  yellow: {
    primary: "text-yellow-400",
    secondary: "text-yellow-600",
    hover: "hover:bg-yellow-400/10",
  },
  blue: {
    primary: "text-blue-400",
    secondary: "text-blue-600",
    hover: "hover:bg-blue-400/10",
  },
  purple: {
    primary: "text-purple-400",
    secondary: "text-purple-600",
    hover: "hover:bg-purple-400/10",
  },
  green: {
    primary: "text-green-400",
    secondary: "text-green-600",
    hover: "hover:bg-green-400/10",
  },
  pink: {
    primary: "text-pink-400",
    secondary: "text-pink-600",
    hover: "hover:bg-pink-400/10",
  },
};

export { GRADIENT_PRESETS, COLOR_SCHEMES };  export type { BaseColor };

