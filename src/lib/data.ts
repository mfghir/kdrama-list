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



export const chartData = [
  {
    name: "Jan",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Feb",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Mar",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Apr",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "May",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jun",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Jul",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Aug",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Sep",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Oct",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Nov",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
  {
    name: "Dec",
    total: Math.floor(Math.random() * 5000) + 1000,
  },
]
