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
  ListFilter,
  SquareUserRound,
  UsersRound,
  MessageSquare,
  KeyRound,
} from "lucide-react";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: unknown;
  label?: string;
  role: string[];
}

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: Gauge,
    label: "Dashboard",
    role: ["user", "admin"],
  },
  {
    title: "Profile",
    href: "/dashboard/profile",
    icon: SquareUserRound,
    label: "Profile",
    role: ["user", "admin"],
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: UsersRound,
    label: "Users",
    role: ["admin"],
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageSquare,
    label: "Messages",
    role: ["user"],
  },
  {
    title: "KDrama List",
    href: "/dashboard/kdrama-list",
    icon: ListFilter,
    label: "KDrama List",
    role: ["user", "admin"],
  },
  {
    title: "Change Password",
    href: "/dashboard/change-password",
    icon: KeyRound,
    label: "Change Password",
    role: ["user", "admin"],
  },
];

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
];

export type Notification = {
  id: string;
  emoji: string;
  title: string;
  desc: string;
  createdAt: string;
};

export type MovieList = {
  id: object;
  title: string;
  status: string;
  label: string;
  genre: string;
};

export const userNotifs: Notification[] = [
  {
    id: "1",
    emoji: "🚀",
    title: "Dashboard",
    desc: "Dashboard, cards, authentication. Some examples built using the components. Use this as a guide to build your own.",
    createdAt: "12/01/2024",
  },
  {
    id: "2",
    emoji: "🌐",
    title: "web",
    desc: "WebNow, a request to /api/post/a/b/c will respond with the text: Post: a, b, c. Optional catch all API routes. Catch all routes can be made optional by including the parameter in double …",
    createdAt: "15/01/2024",
  },
  {
    id: "3",
    emoji: "🔄",
    title: "Bing",
    desc: "Certainly! Below is an example of a PUT request implementation using the Fetch API in Next.js:",
    createdAt: "24/01/2024",
  },
  {
    id: "4",
    emoji: "🌟",
    title: "Nextjs",
    desc: "Next.js is an open-source web development framework created by the private company Vercel providing React-based web applications with server-side rendering and static website generation. React documen…",
    createdAt: "02/02/2024",
  },
];

export interface UserInfo {
  _id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
  imgUrl?: string;
  __v?: number;
}

// export const factCategories: string[] = [
//   "beauty",
//   "communication",
//   "education",
//   "family",
//   "life",
//   "love",
//   "movies",
//   "success",
// ];
