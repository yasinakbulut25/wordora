import React from "react";

type AlertType = "success" | "error" | "info";
interface AlertProps {
  type: AlertType;
  message: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

function Alert({ type, message, icon: Icon }: AlertProps) {
  let classValue = "";
  switch (type) {
    case "success":
      classValue = "bg-green-50 text-green-600 border border-green-300";
      break;
    case "error":
      classValue = "bg-red-50 text-red-600 border border-red-300";
      break;
    case "info":
      classValue = "bg-blue-50 text-blue-600 border border-blue-300";
      break;
  }
  return (
    <p
      className={`flex items-center gap-2 text-sm p-3 rounded-xl ${classValue}`}
    >
      <Icon width={16} />
      {message}
    </p>
  );
}

export default Alert;
