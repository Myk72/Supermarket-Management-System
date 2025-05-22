import React from "react";

const Card = ({ title, icon, description, value }) => {
  const Icon = icon;
  return (
    <div className="flex-1 p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 ease-in-out font-serif">
      <div className="rounded-lg flex flex-col gap-2">
        <div className="flex items-center justify-between flex-row">
          <h2 className="text-lg font-semibold text-indigo-500">{title}</h2>
          <Icon className="h-6 w-6 text-blue-500" />
        </div>
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-green-500">{description}</p>
      </div>
    </div>
  );
};

export default Card;
