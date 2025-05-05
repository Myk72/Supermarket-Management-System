import React from "react";

const Card = ({ title, icon, description, value }) => {
  const Icon = icon;
  return (
    <div className="flex-1 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out">
      <div className="rounded-lg flex flex-col gap-2">
        <div className="flex items-center justify-between flex-row">
          <h2 className="text-lg font-semibold">{title}</h2>
          <Icon className="h-6 w-6 text-gray-500" />
        </div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default Card;
