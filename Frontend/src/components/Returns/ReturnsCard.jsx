import {
  RecycleIcon,
  TimerIcon,
  LucideBadgeDollarSign,
  CalendarArrowDownIcon,
} from "lucide-react";

import Card from "../card/card";

export const ReturnCard = ({ returns }) => {
  // {
  //     "product_id": 2,
  //     "return_reason": "string",
  //     "sale_id": 2,
  //     "status": "approved",
  //     "processed_at": "2025-06-14T16:10:23",
  //     "quantity": 3,
  //     "return_id": 2,
  //     "refund_amount": 0,
  //     "processed_by": 1
  // }

  const totalRefunds = returns.reduce(
    (acc, item) => acc + item.refund_amount,
    0
  );
  const totalReturns = returns.length;
  const pendingReturns = returns.filter(
    (item) => item.status === "pending"
  ).length;
  const todaysReturns = returns.filter((item) => {
    const today = new Date();
    const processedDate = new Date(item.processed_at);
    return (
      processedDate.getDate() === today.getDate() &&
      processedDate.getMonth() === today.getMonth() &&
      processedDate.getFullYear() === today.getFullYear()
    );
  }).length;

  const ReturnCard = [
    {
      title: "Total Refunds",
      icon: LucideBadgeDollarSign,
      value: `$${totalRefunds.toFixed(2)}`,
      description: `All time refunded amount`,
    },
    {
      title: "Total Returns",
      icon: RecycleIcon,
      value: totalReturns,
      description: `All time returns count`,
    },
    {
      title: "Pending Returns",
      icon: TimerIcon,
      value: pendingReturns,
      description: `Awaitng for approval`,
    },
    {
      title: "Today's Returns",
      icon: CalendarArrowDownIcon,
      value: todaysReturns,
      description: `Returns made today`,
    },
  ];

  return (
    <div className="flex flex-row gap-4">
      {ReturnCard.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          icon={item.icon}
          description={item.description}
          value={item.value}
        />
      ))}
    </div>
  );
};
