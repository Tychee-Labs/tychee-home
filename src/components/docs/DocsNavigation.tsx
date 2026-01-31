import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavLink {
  title: string;
  href: string;
  description?: string;
}

interface DocsNavigationProps {
  previous?: NavLink;
  next?: NavLink;
  className?: string;
}

const NavCard = ({ 
  link, 
  direction 
}: { 
  link: NavLink; 
  direction: "previous" | "next";
}) => {
  const isPrevious = direction === "previous";
  
  return (
    <motion.a
      href={link.href}
      className={cn(
        "group flex-1 flex items-center gap-4 p-4 rounded-xl border border-border/50 bg-secondary/5",
        "hover:border-primary/30 hover:bg-secondary/10 transition-all duration-300",
        isPrevious ? "flex-row" : "flex-row-reverse text-right"
      )}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
    >
      <div className={cn(
        "shrink-0 w-10 h-10 rounded-lg bg-secondary/30 flex items-center justify-center",
        "group-hover:bg-primary/10 transition-colors"
      )}>
        {isPrevious ? (
          <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        ) : (
          <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
          {isPrevious ? "Previous" : "Next"}
        </span>
        <p className="mt-0.5 font-semibold text-foreground group-hover:text-primary transition-colors truncate">
          {link.title}
        </p>
        {link.description && (
          <p className="mt-0.5 text-xs text-muted-foreground truncate">
            {link.description}
          </p>
        )}
      </div>
    </motion.a>
  );
};

export const DocsNavigation = ({ previous, next, className }: DocsNavigationProps) => {
  if (!previous && !next) return null;

  return (
    <nav className={cn("mt-16 pt-8 border-t border-border/30", className)}>
      <div className="flex flex-col sm:flex-row gap-4">
        {previous ? (
          <NavCard link={previous} direction="previous" />
        ) : (
          <div className="flex-1" />
        )}
        {next ? (
          <NavCard link={next} direction="next" />
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </nav>
  );
};
