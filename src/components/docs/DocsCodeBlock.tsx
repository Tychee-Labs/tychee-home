import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocsCodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  className?: string;
}

export const DocsCodeBlock = ({ 
  code, 
  language = "typescript", 
  filename,
  showLineNumbers = false,
  className 
}: DocsCodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className={cn("my-6 group relative", className)}>
      {/* Subtle glow border */}
      <div className="absolute -inset-px rounded-xl bg-gradient-to-b from-primary/20 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative rounded-xl border border-border/50 bg-[#0a0a0a] overflow-hidden">
        {/* Header with filename */}
        {filename && (
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-border/30 bg-secondary/10">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">{filename}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            </div>
          </div>
        )}
        
        {/* Copy button */}
        <motion.button
          onClick={copyToClipboard}
          className={cn(
            "absolute z-10 p-2 rounded-lg transition-all duration-200",
            filename ? "top-12 right-3" : "top-3 right-3",
            "bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground",
            "opacity-0 group-hover:opacity-100"
          )}
          whileTap={{ scale: 0.95 }}
        >
          {copied ? (
            <Check className="w-4 h-4 text-green-500" />
          ) : (
            <Copy className="w-4 h-4" />
          )}
        </motion.button>

        {/* Code content */}
        <div className="overflow-x-auto">
          <pre className="p-4">
            <code className="text-sm font-mono leading-relaxed">
              {showLineNumbers ? (
                lines.map((line, i) => (
                  <div key={i} className="table-row">
                    <span className="table-cell pr-4 text-right text-muted-foreground/40 select-none">
                      {i + 1}
                    </span>
                    <span className="table-cell text-muted-foreground">
                      {line || " "}
                    </span>
                  </div>
                ))
              ) : (
                <span className="text-muted-foreground whitespace-pre">{code}</span>
              )}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};
