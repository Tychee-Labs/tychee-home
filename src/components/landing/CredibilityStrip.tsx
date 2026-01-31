import { motion } from "framer-motion";

const credibilityItems = [
  "Built for Stellar Soroban",
  "Designed for compliance-first fintech builds",
  "User-owned encryption, no master keys",
];

const Separator = () => (
  <span className="relative flex items-center justify-center w-8 mx-6">
    <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
    <span className="absolute w-3 h-3 rounded-full bg-primary/20 animate-ping" />
  </span>
);

const MarqueeContent = () => (
  <>
    {credibilityItems.map((item, index) => (
      <span key={index} className="flex items-center shrink-0">
        <span className="text-sm text-muted-foreground font-medium tracking-wide whitespace-nowrap">
          {item}
        </span>
        {index < credibilityItems.length - 1 && <Separator />}
      </span>
    ))}
    <Separator />
  </>
);

export const CredibilityStrip = () => {
  return (
    <section className="relative py-6 overflow-hidden border-y border-border/50 bg-card/30 backdrop-blur-sm">
      {/* Subtle glow accents */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />
      
      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-full bg-primary/[0.02] blur-[60px]" />
      </div>

      {/* Marquee container */}
      <div className="relative group">
        <motion.div
          className="flex items-center"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            },
          }}
          style={{ willChange: "transform" }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {/* Double the content for seamless loop */}
          <div className="flex items-center shrink-0 group-hover:[animation-play-state:paused]">
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
            <MarqueeContent />
          </div>
        </motion.div>
        
        {/* Pause indicator on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute inset-0 bg-background/5 backdrop-blur-[1px]" />
        </div>
      </div>
    </section>
  );
};
