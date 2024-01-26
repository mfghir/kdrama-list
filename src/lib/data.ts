import {
  ThumbsUp,
  ThumbsDown,
  Star,
  Heart,
  HeartOff,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Gauge,
  UsersRound
} from "lucide-react";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: unknown;
  label?: string;
}



export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon:  Gauge ,
    label: "Dashboard",
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon:  UsersRound ,
    label: "Users",
  },
]


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


