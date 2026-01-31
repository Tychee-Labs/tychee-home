import { motion } from "framer-motion";
import { AnimatedSection } from "@/components/ui/AnimatedSection";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Check, Zap, Building2, Rocket, ArrowRight, HelpCircle } from "lucide-react";

const pricingTiers = [
  {
    name: "Starter",
    price: "Free",
    period: "forever",
    description: "Perfect for testing and development on Stellar testnet.",
    features: [
      "Testnet access only",
      "1,000 tokenizations/month",
      "Basic encryption",
      "Community support",
      "SDK & documentation",
    ],
    cta: "Start Building",
    ctaVariant: "secondary" as const,
    icon: Rocket,
    popular: false,
  },
  {
    name: "Pro",
    price: "$99",
    period: "/month",
    description: "For production apps ready to scale on Stellar mainnet.",
    features: [
      "Mainnet + Testnet access",
      "50,000 tokenizations/month",
      "AES-256-GCM encryption",
      "Account Abstraction",
      "Priority email support",
      "Webhooks & analytics",
      "99.9% uptime SLA",
    ],
    cta: "Get Started",
    ctaVariant: "primary" as const,
    icon: Zap,
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For banks, fintechs, and high-volume platforms.",
    features: [
      "Unlimited tokenizations",
      "Dedicated infrastructure",
      "Custom SLA (99.99%)",
      "Commercial licensing",
      "Compliance consulting",
      "Dedicated account manager",
      "On-premise deployment option",
      "24/7 phone support",
    ],
    cta: "Contact Sales",
    ctaVariant: "secondary" as const,
    icon: Building2,
    popular: false,
  },
];

const PricingCard = ({
  tier,
  index,
}: {
  tier: (typeof pricingTiers)[0];
  index: number;
}) => {
  return (
    <AnimatedSection delay={index * 0.1}>
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ duration: 0.3 }}
        className={`relative h-full ${tier.popular ? "lg:-mt-4 lg:mb-4" : ""}`}
      >
        {/* Popular badge & animated border */}
        {tier.popular && (
          <>
            {/* Animated gradient border */}
            <div className="absolute -inset-[1px] rounded-2xl overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{
                  background:
                    "conic-gradient(from 0deg, #f2572b, #ff8a5c, #f2572b, #ff8a5c, #f2572b)",
                  backgroundSize: "200% 200%",
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Badge */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold shadow-lg"
              >
                Most Popular
              </motion.div>
            </div>
          </>
        )}

        {/* Card */}
        <div
          className={`relative h-full bg-card border rounded-2xl overflow-hidden transition-all duration-300 group ${
            tier.popular
              ? "border-transparent"
              : "border-border hover:border-primary/30"
          }`}
        >
          {/* Hover glow */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: tier.popular
                ? "radial-gradient(circle at 50% 0%, rgba(242,87,43,0.15) 0%, transparent 60%)"
                : "radial-gradient(circle at 50% 0%, rgba(242,87,43,0.08) 0%, transparent 60%)",
            }}
          />

          <div className="relative p-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  tier.popular ? "bg-primary/20" : "bg-secondary"
                }`}
              >
                <tier.icon
                  size={20}
                  className={tier.popular ? "text-primary" : "text-muted-foreground"}
                />
              </div>
              <h3 className="text-xl font-semibold text-foreground">{tier.name}</h3>
            </div>

            {/* Price */}
            <div className="mb-4">
              <span className="text-4xl font-bold text-foreground">{tier.price}</span>
              <span className="text-muted-foreground ml-1">{tier.period}</span>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground mb-6 min-h-[40px]">
              {tier.description}
            </p>

            {/* CTA */}
            <div className="mb-8">
              <MagneticButton
                variant={tier.ctaVariant}
                href="#"
                className="w-full justify-center"
              >
                {tier.cta}
                <ArrowRight size={16} />
              </MagneticButton>
            </div>

            {/* Features */}
            <ul className="space-y-3">
              {tier.features.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      tier.popular ? "bg-primary/20" : "bg-secondary"
                    }`}
                  >
                    <Check
                      size={12}
                      className={tier.popular ? "text-primary" : "text-muted-foreground"}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </AnimatedSection>
  );
};

export const PricingSection = () => {
  return (
    <section id="pricing" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <AnimatedSection className="text-center mb-16">
          <span className="text-primary text-sm font-semibold tracking-wider uppercase mb-4 block">
            Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Simple, transparent{" "}
            <span className="text-gradient">pricing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees, no surprises.
          </p>
        </AnimatedSection>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-12">
          {pricingTiers.map((tier, index) => (
            <PricingCard key={tier.name} tier={tier} index={index} />
          ))}
        </div>

        {/* Footer notes */}
        <AnimatedSection delay={0.4}>
          <div className="max-w-2xl mx-auto text-center space-y-4">
            {/* Commercial licensing note */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm">
              <Building2 size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Need commercial licensing for regulated industries?{" "}
                <a href="#" className="text-primary hover:underline">
                  Contact our team
                </a>
              </span>
            </div>

            {/* FAQ link */}
            <div className="flex items-center justify-center gap-2">
              <HelpCircle size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Have questions?{" "}
                <a href="#faq" className="text-primary hover:underline link-underline">
                  Check our FAQ
                </a>{" "}
                or{" "}
                <a href="#" className="text-primary hover:underline link-underline">
                  talk to sales
                </a>
              </span>
            </div>

            {/* Usage note */}
            <p className="text-xs text-muted-foreground/70 max-w-md mx-auto">
              All plans include access to SDK, documentation, and testnet. 
              Overages billed at $0.002 per additional tokenization.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
