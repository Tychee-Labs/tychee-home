import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface DocsTableOfContentsProps {
  headings: TocItem[];
  className?: string;
}

export const DocsTableOfContents = ({ headings, className }: DocsTableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px", threshold: 0 }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  if (headings.length === 0) return null;

  return (
    <aside className={cn("hidden xl:block", className)}>
      <div className="sticky top-24">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          On this page
        </h4>
        <nav className="relative">
          {/* Active indicator line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-border/30" />
          
          <div className="space-y-1">
            {headings.map((heading) => {
              const isActive = activeId === heading.id;
              
              return (
                <div key={heading.id} className="relative">
                  {/* Active bar */}
                  {isActive && (
                    <motion.div
                      layoutId="tocActiveBar"
                      className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      style={{
                        boxShadow: "0 0 8px rgba(242, 87, 43, 0.5)",
                      }}
                    />
                  )}
                  
                  <button
                    onClick={() => scrollToHeading(heading.id)}
                    className={cn(
                      "w-full text-left text-sm py-1.5 pl-4 pr-2 rounded-r transition-all duration-200",
                      heading.level === 3 && "pl-7",
                      isActive
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {heading.text}
                  </button>
                </div>
              );
            })}
          </div>
        </nav>
      </div>
    </aside>
  );
};
