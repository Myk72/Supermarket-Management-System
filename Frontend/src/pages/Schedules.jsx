import React, { useEffect } from "react";
import { useEmployeeStore } from "@/store/employee.store";
import useAuthStore from "@/store/auth.store";

const Schedules = () => {
  const { getShifts, shifts } = useEmployeeStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (user?.employee_id) {
      getShifts(user.employee_id);
    }
    console.log(shifts, "shifts in schedules");
  }, [user, getShifts]);

  const today = new Date().toISOString().split("T")[0];
  // console.log(today, "today date in schedules");

  const todayShift = shifts.find((shift) => shift.date === today);
  const upcomingShifts = shifts
    .filter((shift) => shift.date > today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  const pastShifts = shifts
    .filter((shift) => shift.date < today)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const renderShiftCard = (shift) => {
    const fullStart = new Date(`${shift.date}T${shift.start_time}`);
    const fullEnd = new Date(`${shift.date}T${shift.end_time}`);

    if (fullEnd < fullStart) {
      fullEnd.setDate(fullEnd.getDate() + 1);
    }

    const durationHours = ((fullEnd - fullStart) / (1000 * 60 * 60)).toFixed(1);

    return (
      <div
        key={`${shift.date}-${shift.start_time}`}
        className="p-4 border rounded-xl shadow-sm hover:shadow-md transition bg-white"
      >
        <p className="text-sm text-gray-500">
          {new Date(shift.date).toDateString()}
        </p>
        <p>
          <strong>Start:</strong>{" "}
          {fullStart.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p>
          <strong>End:</strong>{" "}
          {fullEnd.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p>
          <strong>Duration:</strong> {durationHours} hrs
        </p>
      </div>
    );
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <h1 className="text-2xl font-bold text-blue-900 mb-1">My Schedules</h1>
        <p className="text-gray-600 font-light">
          Current Date: {new Date().toLocaleDateString()}
        </p>
      </div>

      {todayShift && (
        <div>
          <h2 className="text-lg font-semibold text-green-700 mb-2">
            Today’s Shift
          </h2>
          {renderShiftCard(todayShift)}
        </div>
      )}

      {upcomingShifts.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-blue-700 mb-2">
            Upcoming Shifts
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingShifts.map(renderShiftCard)}
          </div>
        </div>
      )}

      {pastShifts.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Past Shifts</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pastShifts.map(renderShiftCard)}
          </div>
        </div>
      )}

      {shifts.length === 0 && (
        <p className="text-gray-500 italic">No shifts assigned yet.</p>
      )}
    </div>
  );
};

export default Schedules;
