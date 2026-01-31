import { ReactNode } from "react";
import { Info, AlertTriangle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutType = "note" | "warning" | "tip";

interface DocsCalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
  className?: string;
}

const calloutConfig = {
  note: {
    icon: Info,
    title: "Note",
    borderColor: "border-l-primary/50",
    bgColor: "bg-primary/5",
    iconColor: "text-primary",
  },
  warning: {
    icon: AlertTriangle,
    title: "Warning",
    borderColor: "border-l-yellow-500/50",
    bgColor: "bg-yellow-500/5",
    iconColor: "text-yellow-500",
  },
  tip: {
    icon: Lightbulb,
    title: "Tip",
    borderColor: "border-l-green-500/50",
    bgColor: "bg-green-500/5",
    iconColor: "text-green-500",
  },
};

export const DocsCallout = ({ 
  type = "note", 
  title, 
  children, 
  className 
}: DocsCalloutProps) => {
  const config = calloutConfig[type];
  const Icon = config.icon;
  const displayTitle = title || config.title;

  return (
    <div
      className={cn(
        "my-6 rounded-lg border-l-4 p-4 transition-colors",
        config.borderColor,
        config.bgColor,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("w-5 h-5 mt-0.5 shrink-0", config.iconColor)} />
        <div className="flex-1 min-w-0">
          {displayTitle && (
            <p className="font-semibold text-foreground mb-1">{displayTitle}</p>
          )}
          <div className="text-sm text-muted-foreground leading-relaxed [&>p]:mb-2 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
