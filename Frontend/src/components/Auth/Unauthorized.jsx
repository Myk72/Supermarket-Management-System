import { MessageCircleWarning } from "lucide-react";
const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <MessageCircleWarning className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-2xl font-bold">Unauthorized Access</h1>
      <p>You don't have permission to view this page.</p>
    </div>
  );
};

export default Unauthorized;
