import {
  ThumbsUp,
  ThumbsDown,
  Star,
  Heart,
  HeartOff,
  ArrowDown,
  ArrowRight,
  ArrowUp,
} from "lucide-react";

export const labels = [
  {
    value: "mini",
    label: "Mini",
  },
  {
    value: "usual",
    label: "Usual",
  },
  {
    value: "long",
    label: "Long",
  },
];

export const statuses = [
  {
    value: "fav",
    label: "Fav",
    icon: Heart,
  },
  {
    value: "1time",
    label: "1 Time",
    icon: Star,
  },
  {
    value: "normal",
    label: "Normal",
    icon: ThumbsUp,
  },
  {
    value: "dis",
    label: "Dis",
    icon: ThumbsDown,
  },
  {
    value: "awful",
    label: "Awful",
    icon: HeartOff,
  },
];

export const genres = [
  {
    label: "Fantasy",
    value: "fantasy",
    icon: ArrowDown,
  },
  {
    label: "Comedy",
    value: "comedy",
    icon: ArrowRight,
  },
  {
    label: "Criminal",
    value: "criminal",
    icon: ArrowUp,
  },
];
