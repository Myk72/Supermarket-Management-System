import { RecycleIcon, TimerIcon } from "lucide-react";
import { LucideBadgeDollarSign, CalendarArrowDownIcon } from "lucide-react";

export const ReturnCard = [
  {
    title: "Total Refunds",
    icon: LucideBadgeDollarSign,
    value: 233.56,
    description: `All time refunded amount`,
  },
  {
    title: "Total Returns",
    icon: RecycleIcon,
    value: 52,
    description: `All time returns count`,
  },
  {
    title: "Pending Returns",
    icon: TimerIcon,
    value: 15,
    description: `Awaitng for approval`,
  },
  {
    title: "Today's Returns",
    icon: CalendarArrowDownIcon,
    value: 1,
    description: `Returns made today`,
  },
];
