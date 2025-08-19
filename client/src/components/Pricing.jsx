import React from "react";
import { Button } from "@/components/ui/button";
import Pill from "./ui/pill";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description:
        "Perfect for individuals looking for secure and easy password management.",
      features: [
        "Unlimited password storage",
        "Browser extension support",
        "AES-256 end-to-end encryption",
        "Basic password generator",
        "Two-factor authentication (2FA)",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
      popular: false,
    },
    {
      name: "Professional",
      price: "$4.99",
      period: "per month",
      description:
        "Ideal for power users who need advanced security and unlimited storage.",
      highlightFeature: "Everything in Starter +",
      features: [
        "Steganography security",
        "Advanced password generator",
        "Cross-device sync",
        "Security health reports",
        "Priority email & chat support",
      ],
      buttonText: "Subscribe",
      buttonVariant: "default",
      popular: true,
    },
  ];

  return (
    <section
      id="pricing"
      className="w-full py-20 px-6 md:px-12 bg-background relative overflow-hidden border-t"
    >
      <Pill pill="Pricing" />
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="relative z-20 py-6 lg:py-3 max-w-4xl mx-auto px-8">
          <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-black dark:text-white">
            Transparent pricing for every stage
          </h4>
          <p className="text-sm lg:text-base max-w-2xl my-4 mx-auto text-neutral-500 text-center font-normal dark:text-neutral-300">
            Choose the plan that fits your needs — with the same rock-solid
            security for everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl border flex flex-col h-full ${
                plan.popular
                  ? "border-primary/50 cosmic-glow bg-card"
                  : "border-border cosmic-gradient bg-card"
              } transition-all duration-300 relative`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm rounded-full font-medium">
                  Most Popular
                </div>
              )}

              <div className="mb-auto">
                <h3 className="text-2xl font-medium tracking-tighter mb-1 text-foreground">
                  {plan.name}
                </h3>

                <div className="mb-4">
                  <div className="text-3xl font-bold tracking-tighter text-foreground">
                    {plan.price}
                  </div>
                  {plan.period && (
                    <div className="text-sm text-muted-foreground">
                      {plan.period}
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground mb-3">{plan.description}</p>
                <span className="text-sm">{plan.highlightFeature}</span>

                <div className="space-y-3 mb-8 mt-2">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5 12L10 17L19 8"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Button
                  className={
                    plan.buttonVariant === "default"
                      ? "w-full bg-primary text-primary-foreground hover:bg-primary/90"
                      : "w-full border-border text-foreground hover:bg-muted"
                  }
                  variant={plan.buttonVariant}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
