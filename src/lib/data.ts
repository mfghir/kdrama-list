import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  StarIcon,
  HeartIcon,
  CheckIcon
} from "@radix-ui/react-icons"
import {ThumbsUp , ThumbsDown, FileAudio2 } from "lucide-react"


export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
]

export const statuses = [
  {
    value: "definitely",
    label: "Definitely",
    icon: HeartIcon,
  },
  {
    value: "ok",
    label: "Ok",
    icon: StarIcon,
  },
  {
    value: "50-50",
    label: "50-50",
    icon: CheckIcon ,
  },
  {
    value: "normal",
    label: "Normal",
    icon: ThumbsUp,
  },
  {
    value: "awful",
    label: "Awful",
    icon: ThumbsDown,
  },
]

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
]