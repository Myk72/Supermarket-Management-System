import React, { useState } from "react";
import Security from "./Security";
import DetailProfile from "./DetailProfile";

const ProfilePage = () => {
  const [activeButton, setActiveButton] = useState("profile");

  return (
    <div className="flex flex-col flex-1 p-6 bg-white  rounded-lg">
      <div className="flex flex-row border-b w-fill text-[#718EBF] gap-12 font-serif text-lg">
        <button
          className={`items-center ${
            activeButton === "profile"
              ? "border-b-2 text-[#1814F3] border-[#1814F3]"
              : ""
          }`}
          onClick={() => setActiveButton("profile")}
        >
          Profile
        </button>
        <button
          className={`items-center ${
            activeButton === "security"
              ? "border-b-2 text-[#1814F3] border-[#1814F3]"
              : ""
          }`}
          onClick={() => setActiveButton("security")}
        >
          Security
        </button>
      </div>
      {activeButton === "profile" && <DetailProfile />}
      {activeButton === "security" && <Security />}
    </div>
  );
};

export default ProfilePage;
