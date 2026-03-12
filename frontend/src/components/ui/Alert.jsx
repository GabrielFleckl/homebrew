import { cn } from "@/lib/utils";
import { Info, CheckCircle, AlertTriangle, XCircle } from "lucide-react";

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertTriangle,
  info: Info,
};

function Alert({ type = "success", message }) {
  const Icon = iconMap[type] ?? Info;

  return (
    <div
      role="alert"
      className={cn(
        "animate-in fade-in slide-in-from-bottom-2 absolute right-2 bottom-2 left-1/2 z-50 hidden -translate-x-1/2 items-center gap-2 rounded-lg px-4 py-3 font-semibold shadow-lg transition-all duration-300 ease-out md:flex text-center",
        {
          "bg-lime-800 text-white": type === "success",
          "bg-red-800 text-white": type === "error",
          "bg-blue-800 text-white": type === "info",
        }
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span>{message}</span>
    </div>
  );
}

export default Alert;
