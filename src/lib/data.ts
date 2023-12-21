import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  StackIcon
} from "@radix-ui/react-icons"



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
    icon: StackIcon,
  },
  {
    value: "ok",
    label: "Ok",
    icon: StackIcon,
  },
  {
    value: "50-50",
    label: "50-50",
    icon: StackIcon,
  },
  {
    value: "normal",
    label: "Normal",
    icon: StackIcon,
  },
  {
    value: "awful",
    label: "Awful",
    icon: StackIcon,
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